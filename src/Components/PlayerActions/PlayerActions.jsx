import './PlayerActions.css'
import CluelessContext from '../../CluelessContext'
import React, { useEffect, useState } from 'react'
import { update } from 'firebase/database'
import { characterCards, locationCards, weaponCards } from '../../utils/constants'
import { manageRooms, hallwayLocations, roomLocations, roomNameToNum } from '../../utils/constants'
import { characterToKey} from '../../utils/constants'
import { calculateDisprover } from './CalculateDisprover'
import { calculateNextTurn } from './CalculateNextTurn'

const PlayerActions = () => {

  const {
    //the database which is used when we call get(ref(db,pathToVariable)) to get a specific variable
    //and a ref to the database used when we call update(dbRef,updates) where updates has absolute
    //paths to the variable as well as what to change to (key value pair), from firebase.js import
    dbRef,
    //useStates to track firebase real-time database (FBRTDB)
    suggestion, players, winningCards,
    //useState to track my specific player
    localPlayer,
    //useState so we access the right game in the FBRTDB
    gameCode
  } = React.useContext(CluelessContext)

  //controls the screen the player sees
  const [chooseScreen, setChooseScreen] = useState(true)
  const [moveScreen, setMoveScreen] = useState(false)
  const [suggestScreen, setSuggestScreen] = useState(false)
  const [awaitingSuggestionScreen, setAwaitingSuggestionScreen] = useState(false)
  const [accuseScreen, setAccuseScreen] = useState(false)
  //use states to track suggest and accuse selections
  const [suggestedCharacter, setSuggestedCharacter] = useState("")
  const [suggestedWeapon, setSuggestedWeapon] = useState("")
  const [lastMoveLocation, setLastMoveLocation] = useState("")
  const [accusedCharacter, setAccusedCharacter] = useState("")
  const [accusedWeapon, setAccusedWeapon] = useState("")
  const [accusedLocation, setAccusedLocation] = useState("")
  //use state to track movement options
  const [moveOptions, setMoveOptions] = useState([])
  const [moveSelection, setMoveSelection] = useState(0)
  //use state to track what I can do / have done
  const [moved, setMoved] = useState(false)
  const [suggested, setSuggested] = useState(false)
  const [accused, setAccused] = useState(false)
  const [won, setWon] = useState(false)
  const [inHallway, setInHallway] = useState(false)
  const [canSuggest, setCanSuggest] = useState(false)

  const handleSetChoose = () => {
    setMoveScreen(false)
    setSuggestScreen(false)
    setAccuseScreen(false)
    setChooseScreen(true)
  }

  //triggered from choose screen when the user selects to move
  //turns of choose screen and turns on move screen
  const handleSetMove = () => {
    setChooseScreen(false)
    setMoveScreen(true)
  }

  //triggered from choose screen when the user selects to suggest
  //turns of choose screen and turns on suggest screen
  const handleSetSuggest = () => {
    setChooseScreen(false)
    setSuggestScreen(true)
  }

  //triggered from choose screen when the user selects to accuse
  //turns of choose screen and turns on accuse screen
  const handleSetAccuse = () => {
    setChooseScreen(false)
    setAccuseScreen(true)
  }

  //triggered when the player hits submit on the move screen
  //updates the players locaton in firebase and indicates they have moved
  //moves back to choose screen
  const handleMove = () => {
    const moveUpdate = {}
    moveUpdate[`${gameCode}/players/${characterToKey[localPlayer.characterName]}/location`] = moveSelection;
    update(dbRef, moveUpdate);
    setMoved(true)
    setMoveScreen(false)
    if(roomLocations.includes(moveSelection)){
      setSuggestScreen(true)
    }else{
      setChooseScreen(true)
    }
  }

  //triggers on the suggest screen when the user clicks enter
  //moves to the await suggest screen
  //updates suggestion data in firebase accordingly
  const handleSuggest = () => {
    if(suggestedCharacter && suggestedWeapon && lastMoveLocation){
      setAwaitingSuggestionScreen(true)
      setSuggestScreen(false)

      const newSuggestion = {
        character: suggestedCharacter,
        location: lastMoveLocation,
        weapon: suggestedWeapon,
        disprover: calculateDisprover(localPlayer,suggestedCharacter,suggestedWeapon,lastMoveLocation,players),
        suggestor: localPlayer.playerName,
        disprovingCard: "",
        accepted: false,
        submitted: false,
      }

      const suggestionUpdate = {}
      suggestionUpdate[`${gameCode}/suggestion`] = newSuggestion;
      suggestionUpdate[`${gameCode}/players/${characterToKey[localPlayer.characterName]}/lastSuggestedLocation`] = roomNameToNum[lastMoveLocation];
      if(Object.keys(players).includes(characterToKey[suggestedCharacter])){
        suggestionUpdate[`${gameCode}/players/${characterToKey[suggestedCharacter]}/location`] = roomNameToNum[lastMoveLocation];
      }
      update(dbRef, suggestionUpdate);

      setSuggested(true)
    }
  }
  
  //triggered when a player clicks submit on their accusation
  //if they accused correctly the game is ended, GameOver.jsx handles that
  const handleAccuse = () => {
    if(winningCards["character"] == accusedCharacter && winningCards["weapon"] == accusedWeapon && winningCards["location"] == accusedLocation){
      setWon(true)
    }
    const accuseUpdate = {} // IKNOW this should be its own object but I am lazy
    accuseUpdate[`${gameCode}/suggestion/character`] = accusedCharacter 
    accuseUpdate[`${gameCode}/suggestion/location`] = accusedLocation 
    accuseUpdate[`${gameCode}/suggestion/weapon`] = accusedWeapon  
    update(dbRef, accuseUpdate)
    setAccuseScreen(false)
    setAccused(true)
  }

  //triggered after a player accuses and is wrong, then clicks end turn
  //this is to give other players time to see their accusation
  //if they accused correctly the game is ended, GameOver.jsx handles that
  //otherwise the game is assumed to be over and each player is looked at
  //if the player has not failed an accuse and the player not the accusing player 
  //then the game is not over aka there is still a player in the game
  //if there was no one left in the game the game over updates are sent and everyone sees GameOver.jsx
  //otherwise the local player is taken out of the game and the turn is ended
  const endAccuse = () => {
    if(won){
      const winUpdate = {}
      winUpdate[`${gameCode}/gameEnded`] = true //this will close the game board for everyone
      winUpdate[`${gameCode}/winningCards/player`] = localPlayer.playerName 
      update(dbRef, winUpdate)
    }else{
      let gameOver = true
      Object.keys(players).map( (player) => { //looks at all players to find one still in the game
        if(players[player]['isFailAccuse'] == false  && players[player]['playerName'] != localPlayer.playerName){
          gameOver = false
        }
      })
      if(gameOver){ //no players remain
        const loseUpdate = {}
        loseUpdate[`${gameCode}/gameEnded`] = true //this will close the game board for everyone
        loseUpdate[`${gameCode}/players/${characterToKey[localPlayer.characterName]}/isFailAccuse`] = true
        loseUpdate[`${gameCode}/winningCards/player`] = "No One" 
        loseUpdate[`${gameCode}/suggestion/character`] = "" 
        loseUpdate[`${gameCode}/suggestion/location`] = "" 
        loseUpdate[`${gameCode}/suggestion/weapon`] = "" 
        update(dbRef, loseUpdate)
      }else{ //a player was still in the game
        const loseUpdate = {}
        loseUpdate[`${gameCode}/players/${characterToKey[localPlayer.characterName]}/isFailAccuse`] = true
        loseUpdate[`${gameCode}/suggestion/character`] = "" 
        loseUpdate[`${gameCode}/suggestion/location`] = "" 
        loseUpdate[`${gameCode}/suggestion/weapon`] = ""  
        update(dbRef, loseUpdate);
        handleEndTurn()
      }
    }
  }

  //triggered once the player selects end turn
  //updates the current turn and resets remaining suggestion variables
  //also prepares use states for next turn
  const handleEndTurn = () => {
    setChooseScreen(true)
    setMoveScreen(false)
    setSuggestScreen(false)
    setAwaitingSuggestionScreen(false)
    setAccuseScreen(false)
    setSuggested(false)
    setMoved(false)
    const endTurnupdates = {};
    let nextTurn = calculateNextTurn(localPlayer, players);
    endTurnupdates[`${gameCode}/suggestion/accepted`] = false;
    endTurnupdates[`${gameCode}/suggestion/submitted`] = false;
    endTurnupdates[`${gameCode}/currentTurn`] = nextTurn;
    update(dbRef, endTurnupdates);
  }
  
  
  //triggered whenever the players object updates
  //firstly gets my new location and sets the suggested location as that
  //if it is not a hallway because I can only ever suggest where I am
  //goes through all the players and pulls together their locations
  //then sets the options depending on if the player is in a room or hallway
  //if in a hallway their move options are set since it is static
  //if in a room the options are grabbed and all players are itterated through
  //if a player is in the potential move spot and it is a hallway
  //then that option is removed and in the end the remaining options are set as the options
  useEffect( () => {
    
    //creates object with players and their locations
    let playerLocations = {}
    Object.keys(players).map( (player) => {
      playerLocations[player] = players[player]["location"]
    })

    //
    let myLocation = playerLocations[characterToKey[localPlayer.characterName]]
    if(hallwayLocations.includes(myLocation)){
      setLastMoveLocation("")
    }else{
      setLastMoveLocation(manageRooms[myLocation - 1]["roomTitle"])
    }

    let potentialOptionsPtr = manageRooms[myLocation-1]["options"]
    let potentialOptions = []
    for(let i = 0; i < potentialOptionsPtr.length; i++){
      potentialOptions.push(potentialOptionsPtr[i])
    }

    if(hallwayLocations.includes(myLocation)){
      setMoveOptions(potentialOptions)
    }else{ //in a room
      Object.keys(playerLocations).map( (player) => {
        //the current player is in potential move location and it is a hallway
        if(potentialOptions.includes(playerLocations[player]) && hallwayLocations.includes(playerLocations[player])){
          potentialOptions.splice(potentialOptions.indexOf(playerLocations[player]), 1);
        }
      })
      setMoveOptions(potentialOptions)
    }
  }, [players])

  //triggered when suggestion updates
  //if we are awaiting a suggestion and it is now accepted
  //then we can move back to the choose screen
  useEffect( () => {
    if(awaitingSuggestionScreen && suggestion.accepted){
      setAwaitingSuggestionScreen(false)
      setChooseScreen(true)
    }
  }, [suggestion])


  //triggered when the local player updates
  //tracks if the player is currently in a hallway 
  //as well as if they currently suggest and if (have moved rooms)
  useEffect( () => {
    if(hallwayLocations.includes(localPlayer.location)){setInHallway(true)}else{setInHallway(false)}
    if(localPlayer.lastSuggestedLocation != localPlayer.location){setCanSuggest(true)}else{setCanSuggest(false)}
  }, [localPlayer])

  //triggered on mount
  //if the player has failed an accuse their turn is skipped
  useEffect( () => {
    if(localPlayer.isFailAccuse){
      handleEndTurn()
    }
  }, [])

  return (
    <div className='actionContainer'>
      {chooseScreen && 
        <div className="space-y-4 space-x-4" >
          <h2 className= "bg-indigo-500 text-white border-solid border-2 border-black text-center text-base">Select an action</h2>
          {!moved && moveOptions.length > 0 && !suggested &&
            <button className="bg-blue-500 hover:bg-yellow-500 text-sm text-white font-bold py-2 px-4  rounded-full" onClick={handleSetMove}>Move</button>
          }
          {canSuggest && !inHallway && !suggested &&
            <button className="bg-blue-500 hover:bg-yellow-500 text-sm text-white font-bold py-2 px-4  rounded-full" onClick={handleSetSuggest}>Suggest</button>
          }
          <button className="bg-blue-500 hover:bg-yellow-500 text-sm text-white font-bold py-2 px-4  rounded-full" onClick={handleSetAccuse}>Accuse</button>
          <button className="bg-blue-500 hover:bg-yellow-500 text-sm text-white font-bold py-2 px-4  rounded-full" onClick={handleEndTurn}>End Turn</button>
        </div>
      }
      {moveScreen && 
        <div className="moveContainer">
          <h2 className= "bg-indigo-500 text-white border-solid border-2 border-black text-center text-sm ">Please Select Where to Move</h2>
          <div className="py-2 px-2">
          <select className="" name="" id="" onChange={e => {setMoveSelection(roomNameToNum[e.target.value])}}>
            <option value='placeholder'>--Please choose an option--</option>
            {moveOptions.map((roomNum, index) => (
                <option value={manageRooms[roomNum - 1]["roomTitle"]} key={roomNum+index}>
                  {manageRooms[roomNum - 1]["roomTitle"]}
                </option>
              ))
            }
          </select>
          </div>
          <div className="space-y-2 space-x-4">
            <button className="bg-blue-500 hover:bg-yellow-500 text-sm text-white font-bold py-2 px-4  rounded-full" onClick={handleMove}>Submit Move</button>
            <button className="bg-blue-500 hover:bg-yellow-500 text-sm text-white font-bold py-2 px-4  rounded-full" onClick={handleSetChoose}>Back</button>
          </div>
        </div>
      }
      {suggestScreen &&
        <div className='suggestionContainer'>
          <h2 className = "bg-indigo-500 text-white border-solid border-2 border-black text-center text-sm ">
            Suggestion
          </h2>
          <h3 className="text-sm">
            Who did it?
          </h3>
          <select className="text-sm"  name="" id="" onChange={e => setSuggestedCharacter(e.target.value)}>
            <option value='placeholder'>--Please choose an option--</option>
            {characterCards.map((card, index) => (
                <option value={card} key={card+index}>
                  {card}
                </option>
              ))
            }
          </select>
          <h3 className="text-sm">
            With what weapon?
          </h3>
          <select className="text-sm" name="" id="" onChange={e => setSuggestedWeapon(e.target.value)} >
            <option value='placeholder'>--Please choose an option--</option>
            {
              weaponCards.map((card, index) => (
                <option value={card} key={card+index}>
                  {card}
                </option>
              ))
            }
          </select>
          <h3 className="text-sm">
            Location: {lastMoveLocation}
          </h3>
          <div className="space-y-2 space-x-4">
            <button className="bg-blue-500 hover:bg-yellow-500 text-sm text-white font-bold py-2 px-4  rounded-full" onClick={handleSuggest}>Submit Suggestion</button>
            {/*<button className="bg-blue-500 hover:bg-yellow-500 text-sm text-white font-bold py-2 px-4  rounded-full" onClick={handleSetChoose}>Cancel Suggestion</button> uncomment if we want the options to not HAVE to suggest when moving into a room*/}
          </div>
        </div>
      }
      {awaitingSuggestionScreen &&
        <div className="sugggestionContainer">
          <h2 className="bg-yellow-500 text-white border-solid border-2 border-black text-center text-sm flex">Awaiting Disproval</h2>
        </div>
      }
      {accuseScreen &&
        <div className="accuseContainer">
          <h2 className= "bg-indigo-500 text-white border-solid border-2 border-black text-center text-sm ">Accusation</h2>
          <div className="py-2 px-2">
            <select className="text-sm" name="" id="" onChange={e => setAccusedCharacter(e.target.value)}>
              <option value='placeholder'>--Please choose a character--</option>
              {characterCards.map((card, index) => (
                  <option value={card} key={"accuse"+card+index}>
                    {card}
                  </option>
                ))
              }
            </select>
            <select className="text-sm" name="" id="" onChange={e => setAccusedWeapon(e.target.value)}>
              <option value='placeholder'>--Please choose a weapon--</option>
              {weaponCards.map((card, index) => (
                  <option value={card} key={"accuse"+card+index}>
                    {card}
                  </option>
                ))
              }
            </select>
            <select className="text-sm" name="" id="" onChange={e => setAccusedLocation(e.target.value)}>
              <option value='placeholder'>--Please choose a location--</option>
              {locationCards.map((card, index) => (
                  <option value={card} key={"accuse"+card+index}>
                    {card}
                  </option>
                ))
              }
            </select>
          </div >
          <div className="space-y-2 space-x-4">
          <button className="bg-blue-500 hover:bg-yellow-500 text-sm text-white font-bold py-2 px-4  rounded-full" onClick={handleAccuse}>Make Accusation</button>
          <button className="bg-blue-500 hover:bg-yellow-500 text-sm  text-white font-bold py-2 px-4  rounded-full" onClick={handleSetChoose}>Back</button>
          </div>
        </div>
      }
      {accused &&
        <div>
          <p>You accused {accusedCharacter} of doing it with the {accusedWeapon} in the {accusedLocation}</p>
          <p>Upon checking the sealed envelope, you learn that {accusedCharacter} did it with the {accusedWeapon} in the {accusedLocation}</p>
          {won && <p>You accused correctly! You win! Please click end turn.</p>}
          {!won && <p>You accused incorrectly! You lose! Please click end turn, but remain in the game to disprove other player's suggestions</p>}
          <button onClick={endAccuse}>End Turn</button>
        </div>
      }
    </div>
  )
}

export default PlayerActions