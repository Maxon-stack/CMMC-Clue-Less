import './Disprove.css'
import CluelessContext from '../../CluelessContext'
import React, { useEffect, useState } from 'react'
import { update } from 'firebase/database'
import { images } from '../../utils/cards'


const Disprove = () => {
    const {
    //the database which is used when we call get(ref(db,pathToVariable)) to get a specific variable
    //and a ref to the database used when we call update(dbRef,updates) where updates has absolute
    //paths to the variable as well as what to change to (key value pair), from firebase.js import
    dbRef,
    //useStates to track firebase real-time database (FBRTDB)
    suggestion,
    //useState to track my specific player
    localPlayer,
    //useState so we access the right game in the FBRTDB
    gameCode
      } = React.useContext(CluelessContext)

  //use state and effect to get an array of cards I could use in the event the disprover is set to my name
  const [cardsToDisprove, setCardsToDisprove] = useState([])
  useEffect(()=> {
    if(Object.keys(localPlayer).includes("deck")){
        setCardsToDisprove([])
        const myDeck = Object.values(localPlayer.deck)
        for(let i = 0; i < myDeck.length; i++){
            if(myDeck[i] == suggestion.character){
                setCardsToDisprove(prevCardsToDisprove => [...prevCardsToDisprove, suggestion.character]) 
            }
            if(myDeck[i] == suggestion.weapon){
                setCardsToDisprove(prevCardsToDisprove => [...prevCardsToDisprove, suggestion.weapon]) 
            }
            if(myDeck[i] == suggestion.location){
                setCardsToDisprove(prevCardsToDisprove => [...prevCardsToDisprove, suggestion.location]) 
            }
        }
    }
  }, [suggestion])

  //use state to track my disproving card selection and function to send to firebase on click
  const [disprovingCard, setDisprovingCard] = useState("")
  const submitCard = () => {
    const submitUpdate = {}
    submitUpdate[`${gameCode}/suggestion/disprovingCard`] = disprovingCard;
    submitUpdate[`${gameCode}/suggestion/submitted`] = true;
    update(dbRef, submitUpdate)
  }

  const acceptCard = () => {
    const updates = {}
    const noSuggeston = {
        character: "",
        location: "",
        weapon: "",
        disprover: "",
        suggestor: "",
        disprovingCard: "",
        accepted: true,
        submitted: true,
      }
    updates[`${gameCode}/suggestion`] = noSuggeston;
    update(dbRef, updates)
  }

  return (
    <div className='suggestion'>
        <h2 class = "bg-indigo-600 text-white border-solid border-4 border-black text-center text-xl" >Suggestion</h2>
        <div className='suggestDisproveRow'>
            <div className='suggestionHalf'>
                {suggestion.suggestor && suggestion.suggestor != localPlayer.playerName &&
                    <label class="bg-yellow-500 text-white border-solid border-2 border-black text-center text-lg flex">{suggestion.suggestor} suggested:</label>
                }
                {suggestion.suggestor && suggestion.suggestor == localPlayer.playerName &&
                    <label class="bg-yellow-500 text-white border-solid border-2 border-black text-center text-lg flex" >You suggested:</label>
                }
                {suggestion.suggestor == "" && 
                    <label class="bg-yellow-500 text-white border-solid border-2 border-black text-left text-lg flex">Suggestor: </label>
                }
            </div>
            <div className='disproveHalf'>
                <label class="bg-yellow-500 text-white border-solid border-2 border-black text-center text-lg flex">Disprover: {suggestion.disprover}</label>
            </div>
        </div>
        <div className='bottom'>
            {suggestion.suggestor &&
                <div className='suggestionHalf'>
                    <div className='cardTextRow'>
                        <label class="bg-green-600 border-gray border-solid border-2 text-white font-bold text-center pl-2 pr-2 rounded-full" >{suggestion.character}</label>
                        <label class="bg-green-600 border-gray border-solid border-2 text-white font-bold text-center pl-2 pr-2 rounded-full">{suggestion.weapon}</label>
                        <label class="bg-green-600 border-gray border-solid border-2 text-white font-bold text-center pl-2 pr-2 rounded-full">{suggestion.location}</label>
                    </div>
                    <div class="flex flex-row flex-wrap flex gap-3" >
                        <img className='card' src = {images[suggestion.character]} alt = "Card not found"></img>
                        <img className='card' src = {images[suggestion.weapon]} alt = "Card not found"></img>
                        <img className='card' src = {images[suggestion.location]} alt = "Card not found"></img>
                    </div>
                </div>
            }
            {suggestion.suggestor == "" &&
                <div className='suggestionHalf'></div>
            }
            <div className='disproveHalf'>
            {suggestion.suggestor == localPlayer.playerName && suggestion.disprovingCard == "" && suggestion.disprover != "Not Found" &&
                <label>Awaiting {suggestion.disprover}'s selection</label>
            }
            {suggestion.suggestor == localPlayer.playerName && suggestion.disprovingCard &&
                <div>
                    <div className='disproveCardText'>
                        <label className='card'>{suggestion.disprover} shows you the {suggestion.disprovingCard} card</label>
                    </div>
                    <div className='disproveImageText'>
                        <img className='card' src = {images[suggestion.disprovingCard]} alt = "Card not found"></img>
                    </div>
                    <button class="bg-blue-500 hover:bg-yellow-500 text-white font-bold py-2 px-4  rounded-full" type="button" onClick={acceptCard}>Accept</button>
                </div>
            }
            {suggestion.suggestor != localPlayer.playerName && suggestion.disprover != localPlayer.playerName && suggestion.disprovingCard &&
                <label>{suggestion.disprover} disproved {suggestion.suggestor}</label>
            }
            {suggestion.suggestor != "" && suggestion.suggestor != localPlayer.playerName && suggestion.disprover != localPlayer.playerName && suggestion.disprovingCard == "" && suggestion.disprover != "Not Found" &&
                <label>Awaiting {suggestion.disprover}'s selection</label>
            }
            {suggestion.disprover == localPlayer.playerName &&
                <div>
                    <p>You must disprove {suggestion.suggestor}</p>
                    <select name="" id="" onChange={e => setDisprovingCard(e.target.value)} >
                        <option value=''>--Select a card--</option>
                        {
                            cardsToDisprove.map((card, index) => (
                            <option value={card} key={card+index}>
                                {card}
                            </option>
                            ))
                        }
                    </select>
                    {suggestion.submitted == false &&
                        <div>
                            <button class="bg-blue-500 hover:bg-yellow-500 text-white font-bold py-2 px-4  rounded-full" type="button" onClick={submitCard}>Submit</button>
                        </div>
                    }
                    {suggestion.submitted &&
                        <div>
                            <img className='card' src = {images[suggestion.disprovingCard]} alt = "Card not found"></img>
                        </div>
                    }
                </div>
            }
            {suggestion.disprover == "Not Found" && suggestion.suggestor == localPlayer.playerName &&
                <div>
                    <button class="bg-blue-500 hover:bg-yellow-500 text-white font-bold py-2 px-4  rounded-full" type="button" onClick={acceptCard}>Accept</button>
                </div>
            }
            </div>
        </div>
    </div>
  )
}

export default Disprove