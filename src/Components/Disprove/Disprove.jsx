import React, { useEffect, useState } from 'react'
import { set, get, ref, onValue, getDatabase, update } from 'firebase/database'
import { db } from '../../firebase'
import CluelessContext from '../../CluelessContext'
import { images } from '../../utils/cards'
import { keyToCharacter, manageRooms } from '../../utils/constants'
import './Disprove.css'

/*
Overview: This files handles showing users suggestions that were made and lets them know
when a suggestion has been completed. Additionally it handles when the player must make
a selection to disprove the suggestor as well as showing the suggestor the disprover's
chosen card.

Assumptions: This whole file assumes that PlayerAction.JSX will update the suggestion object 
in firebase when another player makes a suggestion on their turn. Prior to updating the sugestion
object I assume the object is empty, which i will mention later. Updating is assumed to include 
setting the suggestor, character, weapon, location and disprover variables (ideally all at once to 
avoid weird rendering stuff), then this file updates to show the player a suggestion was made
and if this player is the disprover then it will prompt them for a disproving card which it will
then update in firebase. It also assumes the PlayerAction.JSX will clear the suggestion object
once it sees that the disproving card has been updated (assuming a couple second wait should be
added). If the disprover is someone else it will just show them who the suggestor is and which
cards they suggested. It will also indicate who the disprover is, but not show the card
that the disprover shows the suggestor. Also if the player is the suggestor this file handles
showing the user the card which the disprover selected to show them. But again, this does not
handle any poriton of the suggestion action and also does not clear the suggestion object,
that needs to be performed by the PlayerAction.JSX 
*/

const Disprove = () => {
    //brings in local player object so I know my player's character alias/nams
  const {
    localPlayerObj, 
    setLocalPlayerObj,
    gameCode,
  } = React.useContext(CluelessContext)

  //my full character name from my playingAs alias, i.e. Plum -> Professor Plum
  const myCharacter = keyToCharacter[localPlayerObj.playingAs]

  //use state to track the suggestion
  const [suggestion, setSuggestion] = useState([])

  //use effect to get updated suggestion object
  useEffect(() => {
    const suggestionRef = ref(db, `${gameCode}/BasicGameState/turnState/currentSuggestion`);
    onValue(suggestionRef, (snapshot) => {
      const data = snapshot.val();
      if(data){setSuggestion(data);}else{setSuggestion([]);}
    });
  }, [])

  //use states to track my player's cards in their deck
  const [characterCards, setCharacterCards] = useState([])
  const [weaponCards, setWeaponCards] = useState([])
  const [locationCards, setLocationCards] = useState([])

  //use effects to update my player's cards in their deck
  useEffect(() => {
    const playersRef = ref(db, `${gameCode}/BasicGameState/playerDecks/${localPlayerObj.playingAs}/characterCards`);
    onValue(playersRef, (snapshot) => {
      const data = snapshot.val();
      if(data){setCharacterCards(data);}else{setCharacterCards([]);}
    });
  }, [])

  useEffect(() => {
    const playersRef = ref(db, `${gameCode}/BasicGameState/playerDecks/${localPlayerObj.playingAs}/weaponCards`);
    onValue(playersRef, (snapshot) => {
      const data = snapshot.val();
      if(data){setWeaponCards(data);}else{setWeaponCards([]);}
    });
  }, [])

  useEffect(() => {
    const playersRef = ref(db, `${gameCode}/BasicGameState/playerDecks/${localPlayerObj.playingAs}/locationCards`);
    onValue(playersRef, (snapshot) => {
      const data = snapshot.val();
      if(data){setLocationCards(data);}else{setLocationCards([]);}
    });
  }, [])

  //use state and effect to get one array with all of my cards for easier later searching
  const [myDeck, setMyDeck] = useState([])
  useEffect(()=> {
    setMyDeck([])
    for(let i = 0; i < characterCards.length; i++){
        setMyDeck(prevMyDeck => [...prevMyDeck, characterCards[i]])
    }
    for(let i = 0; i < weaponCards.length; i++){
        setMyDeck(prevMyDeck => [...prevMyDeck, weaponCards[i]])
    }
    for(let i = 0; i < locationCards.length; i++){
        setMyDeck(prevMyDeck => [...prevMyDeck, locationCards[i]])
    }
  }, [characterCards,weaponCards,locationCards])

  //use state and effect to get an array of cards I could use in the event the disprover is set to my name
  const [cardsToDisprove, setCardsToDisprove] = useState([])
  useEffect(()=> {
    setCardsToDisprove([])
    for(let i = 0; i < myDeck.length; i++){
        if(myDeck[i] == suggestion.character){
            setCardsToDisprove(prevCardsToDisprove => [...prevCardsToDisprove, suggestion.character]) 
        }
        if(myDeck[i] == suggestion.weapon){
            setCardsToDisprove(prevCardsToDisprove => [...prevCardsToDisprove, suggestion.weapon]) 
        }
        if(myDeck[i] == suggestion.locationTitle){
            setCardsToDisprove(prevCardsToDisprove => [...prevCardsToDisprove, suggestion.locationTitle]) 
        }
    }
  }, [suggestion,myDeck])

  //use state to track my disproving card selection and function to send to firebase on click
  const [disprovingCard, setDisprovingCard] = useState("")
  const submitCard = () => {
    set(ref(db, `${gameCode}/BasicGameState/turnState/currentSuggestion/disprovingCard`), disprovingCard)
    set(ref(db, `${gameCode}/BasicGameState/turnState/currentSuggestion/submitted`), true)
  }

  const acceptCard = () => {
    set(ref(db, `${gameCode}/BasicGameState/turnState/currentSuggestion/accepted`), true)
    const dbRef = ref(getDatabase());
    const updates = {}
    const noSuggeston = {
        character: "",
        location: "",
        locationTitle: "",
        weapon: "",
        disprover: "",
        suggestor: "",
        disprovingCard: "",
        accepted: true,
        submitted: true,
      }
    updates[`${gameCode}/BasicGameState/turnState/currentSuggestion`] = noSuggeston;
    update(dbRef, updates)
  }

  return (
    <div className='suggestion'>
        <h2 className='suggestionTitle'>Suggestion</h2>
        <div className='suggestDisproveRow'>
            <div className='suggestionHalf'>
                {suggestion.suggestor && suggestion.suggestor != myCharacter &&
                    <label className='suggestorName'>{suggestion.suggestor} suggested:</label>
                }
                {suggestion.suggestor && suggestion.suggestor == myCharacter &&
                    <label className='suggestorName'>You suggested:</label>
                }
                {suggestion.suggestor == "" && 
                    <label className='suggestorName'>Suggestor: </label>
                }
            </div>
            <div className='disproveHalf'>
                <label className = 'disproverName'>Disprover: {suggestion.disprover}</label>
            </div>
        </div>
        <div className='bottom'>
            {suggestion.suggestor &&
                <div className='suggestionHalf'>
                    <div className='cardTextRow'>
                        <label className='card'>{suggestion.character}</label>
                        <label className='card'>{suggestion.weapon}</label>
                        <label className='card'>{suggestion.locationTitle}</label>
                    </div>
                    <div className='cardImageRow'>
                        <img className='card' src = {images[suggestion.character]} alt = "Card not found"></img>
                        <img className='card' src = {images[suggestion.weapon]} alt = "Card not found"></img>
                        <img className='card' src = {images[suggestion.locationTitle]} alt = "Card not found"></img>
                    </div>
                </div>
            }
            {suggestion.suggestor == "" &&
                <div className='suggestionHalf'></div>
            }
            <div className='disproveHalf'>
            {suggestion.suggestor == myCharacter && suggestion.disprovingCard == "" &&
                <label>Awaiting {suggestion.disprover}'s selection</label>
            }
            {suggestion.suggestor == myCharacter && suggestion.disprovingCard &&
                <div>
                    <div className='disproveCardText'>
                        <label className='card'>{suggestion.disprover} shows you the {suggestion.disprovingCard} card</label>
                    </div>
                    <div className='disproveImageText'>
                        <img className='card' src = {images[suggestion.disprovingCard]} alt = "Card not found"></img>
                    </div>
                    <button type="button" onClick={acceptCard}>Accept</button>
                </div>
            }
            {suggestion.suggestor != myCharacter && suggestion.disprover != myCharacter && suggestion.disprovingCard &&
                <label>{suggestion.disprover} disproved {suggestion.suggestor}</label>
            }
            {suggestion.suggestor != "" && suggestion.suggestor != myCharacter && suggestion.disprover != myCharacter && suggestion.disprovingCard == "" &&
                <label>Awaiting {suggestion.disprover}'s selection</label>
            }
            {suggestion.disprover == myCharacter &&
                <div>
                    <p>You must disprove {suggestion.suggestor}</p>
                    <select name="" id="" onChange={e => setDisprovingCard(e.target.value)} >
                        <option value=''>--Select a card--</option>
                        {
                            cardsToDisprove.map((card, index) => (
                            <option value={card}>
                                {card}
                            </option>
                            ))
                        }
                    </select>
                    {suggestion.submitted == false &&
                        <div>
                            <button type="button" onClick={submitCard}>Submit</button>
                        </div>
                    }
                    {suggestion.submitted &&
                        <div>
                            <img className='card' src = {images[suggestion.disprovingCard]} alt = "Card not found"></img>
                        </div>
                    }
                </div>
            }
            </div>
        </div>
    </div>
  )
}

export default Disprove