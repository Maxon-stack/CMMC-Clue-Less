import './WaitingLobby.css'
import CluelessContext from '../../CluelessContext'
import React, { useEffect, useState } from 'react'
import { update } from 'firebase/database'
import { FaMapPin } from 'react-icons/fa';
import { locationCards, characterCards, weaponCards } from '../../utils/constants'
import { characterToKey } from '../../utils/constants'
import { characterImages } from '../../utils/constants';


const WaitingLobby = () => {
  const {
    //the database which is used when we call get(ref(db,pathToVariable)) to get a specific variable
    //and a ref to the database used when we call update(dbRef,updates) where updates has absolute
    //paths to the variable as well as what to change to (key value pair), from firebase.js import
    dbRef,
    //useStates to track firebase real-time database (FBRTDB)
    gameStarted, players,
    //useState to track my specific player
    localPlayer,
    //useState to control what is shown
    setShowLobby, setShowGame,
    //useState so we access the right game in the FBRTDB
    gameCode,
  } = React.useContext(CluelessContext)

  //useState for lobby only so we can track when to show start game button
  const [playerCount, setPlayerCount] = useState(0)
  
  //function called when the first player who joined clicks remove on another player
  //first sees their turn and any other player who had a turn number higher they decrease by 1
  //the simply removes that player by removing their name, turn and UID (reset to basic state)
  function handleRemove(characterToRemove){
    let charKeyToRemove = characterToKey[characterToRemove]
    let turnRemoved = players[charKeyToRemove]["turn"]
    Object.keys(players).map( (currentPlayer) => {
      if(players[currentPlayer]["turn"] > turnRemoved){
        let newTurn = players[currentPlayer]["turn"] - 1
        let turnUpdate = {}
        turnUpdate[`${gameCode}/players/${currentPlayer}/turn`] = newTurn
        update(dbRef, turnUpdate);
      }
    })
    const removeUpdate = {}
    removeUpdate[`${gameCode}/players/${charKeyToRemove}/playerName`] = ""
    removeUpdate[`${gameCode}/players/${charKeyToRemove}/uid`] = ""
    removeUpdate[`${gameCode}/players/${charKeyToRemove}/turn`] = 0
    update(dbRef, removeUpdate);
  }

  const handleStartGame = () => {

    //removes characters not selected by a player and adds a deck variable to those who have a player
    let initalPlayerLocations = {}
    let gamePlayers = players
    if(players?.Green?.playerName != ""){gamePlayers["Green"]["deck"] = []}else{delete gamePlayers["Green"]}
    if(players?.Mustard?.playerName != ""){gamePlayers["Mustard"]["deck"] = []}else{delete gamePlayers["Mustard"]}
    if(players?.Peacock?.playerName != ""){gamePlayers["Peacock"]["deck"] = []}else{delete gamePlayers["Peacock"]}
    if(players?.Plum?.playerName != ""){gamePlayers["Plum"]["deck"] = []}else{delete gamePlayers["Plum"]}
    if(players?.Scarlet?.playerName != ""){gamePlayers["Scarlet"]["deck"] = []}else{delete gamePlayers["Scarlet"]}
    if(players?.White?.playerName != ""){gamePlayers["White"]["deck"] = []}else{delete gamePlayers["White"]}

    //creates a "stack" of each set of cards
    let remainingLocations = locationCards
    let remainingCharacters = characterCards
    let remainingWeapons = weaponCards
    //picks a random index in each "stack"
    var locationIndex = Math.floor(Math.random() * remainingLocations.length)
    var characterIndex = Math.floor(Math.random() * remainingCharacters.length)
    var weaponIndex = Math.floor(Math.random() * remainingWeapons.length)
    //sets winning cards for each "stack"
    let winningCards = {
      location: remainingLocations[locationIndex],
      character: remainingCharacters[characterIndex],
      weapon: remainingWeapons[weaponIndex],
      player: ""
    }
    //removes winning cards from "stack""
    remainingLocations.splice(locationIndex, 1);
    remainingCharacters.splice(characterIndex, 1);
    remainingWeapons.splice(weaponIndex, 1);

    //shuffles the remaining cards to the players in the game
    //if there are remaining cards dealt. 21 cards with 3 winning, 
    //so 18 to deal. This means 4 or 5 players leads to uneven decks)
    let cardsToDeal = remainingLocations.concat(remainingCharacters,remainingWeapons)
    const numCardsToDeal = cardsToDeal.length
    const numRemainingCards = numCardsToDeal % playerCount
    const numCardsEach = Math.floor(numCardsToDeal / playerCount) 
    Object.keys(gamePlayers).map( (player) => {
      let deal = numCardsEach
      if(gamePlayers[player]["turn"] <= numRemainingCards){deal++}
      for(let i = 0; i<deal; i++){
        var index = Math.floor(Math.random() * cardsToDeal.length)
        gamePlayers[player]["deck"].push(cardsToDeal[index])
        cardsToDeal.splice(index, 1);
      }
    })

    //update data to database
    const startGameUpdate = {}
    startGameUpdate[`${gameCode}/gameStarted`] = true 
    startGameUpdate[`${gameCode}/currentTurn`] = 1
    startGameUpdate[`${gameCode}/winningCards`] = winningCards
    startGameUpdate[`${gameCode}/players`] = gamePlayers
    update(dbRef, startGameUpdate);
    setShowGame(true)
    setShowLobby(false)
  }
 
  //useEffect that triggers when the players object updates
  //checks if you have been removed, reloads your screen if so
  //also goes through players counting who is in to update playerCount useState
  useEffect(() => {
    if(players[characterToKey[localPlayer.characterName]].playerName == ""){window.location.reload(true)}
    let count = 0
    if(players?.Green?.playerName != ""){count += 1}
    if(players?.Mustard?.playerName != ""){count += 1}
    if(players?.Peacock?.playerName != ""){count += 1}
    if(players?.Plum?.playerName != ""){count += 1}
    if(players?.Scarlet?.playerName != ""){count += 1}
    if(players?.White?.playerName != ""){count += 1}
    setPlayerCount(count)
  }, [players])

  //useEffect that triggers when gameStarted updates
  //if updates to true move to game screen
  useEffect(() => {
    if(gameStarted){
      setShowGame(true)
      setShowLobby(false)
    }
  }, [gameStarted])

  return (
    <div className='WaitingLobbyContainer'>
      <h1>
        Players in the Lobby:
      </h1>
      <h2>Room Code: {gameCode}</h2>
      <div className="lobbyContainer">
        <div className="grid">
          {Object.keys(players).map((playerNameKey) => {
            let player = players[playerNameKey]
            if (player.playerName != "") {
              return (
                <div className="article" key={playerNameKey+"div1"}>
                  <img src={characterImages[player.characterName]} alt="Sample photo" key={playerNameKey+"image"}></img>
                  <FaMapPin className={`playerIcon ${characterToKey[player.characterName]} `} key={playerNameKey+"pin"} />
                  <div className="text" key={playerNameKey+"div2"}>
                    <h3 key={playerNameKey+"h3"}>
                      {player.playerName} will Play as {player.characterName}
                    </h3>
                    <p key={playerNameKey+"p1"}>
                      Player Description
                    </p>
                    {player.playerName == localPlayer.playerName && <p key={playerNameKey+"p2"}>this is you</p>}
                    {localPlayer.turn == 1 && player.characterName != localPlayer.characterName &&
                      <button type='submit' className='actionButton' onClick={() => handleRemove(player.characterName)} key={playerNameKey+"button"}>
                          Remove from Game
                      </button>
                    }
                  </div>
                </div>
              )
            }
          })}
        </div>
        {playerCount >= 2 &&
            <button className='startGame' onClick={handleStartGame}>
                Start Game
            </button>
        }
      </div>
    </div>
  )
}

export default WaitingLobby