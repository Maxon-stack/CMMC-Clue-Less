import { set, get, ref, update, onValue } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import './WaitingLobby.css'
import mustardJpg from '../../Assets/Players/Mustard.jpg'
import plumJpg from '../../Assets/Players/Plum.jpg'
import greenJpg from '../../Assets/Players/Green.jpg'
import peacockJpg from '../../Assets/Players/Peacock.jpg'
import scarletJpg from '../../Assets/Players/Scarlet.jpg'
import whiteJpg from '../../Assets/Players/White.jpg'
import { FaMapPin } from 'react-icons/fa';
import CluelessContext from '../../CluelessContext'
import { locationCards, characterCards, weaponCards } from '../../utils/constants'
import { keyToCharacter, characterToKey } from '../../utils/constants'


const WaitingLobby = () => {
  const {
    playerName,
    setPlayerName,
    showHome,
    setShowHome,
    showLobby,
    setShowLobby,
    showGame,
    localPlayerObj,
    setShowGame,
    gameCode,
    dbRef,
  } = React.useContext(CluelessContext)

  
  function handleRemove(characterToRemove){
    characterToRemove = characterToKey[characterToRemove]
    get(ref(db, `${gameCode}/players`)).then((snapshot) => {
      let obj = snapshot.val()
      let turnRemoved = obj[characterToRemove]["turn"]
      Object.keys(obj).map( (currentPlayer) => {
        console.log('comparing '+characterToRemove+' turn: '+turnRemoved+' with')
        console.log(currentPlayer+' turn '+obj[currentPlayer]["turn"])
        if(obj[currentPlayer]["turn"] > turnRemoved){
          let newTurn = obj[currentPlayer]["turn"] - 1
          console.log('decreasing '+currentPlayer+' turn to '+newTurn)
          let turnUpdate = {}
          turnUpdate[`${gameCode}/players/${currentPlayer}/turn`] = newTurn
          update(dbRef, turnUpdate);
        }
      })
    }).catch((error) => {console.log("error rejoining game "+gameCode+": "+error)})
    const removeUpdate = {}
    removeUpdate[`${gameCode}/players/${characterToRemove}/name`] = ""
    removeUpdate[`${gameCode}/players/${characterToRemove}/uid`] = ""
    removeUpdate[`${gameCode}/players/${characterToRemove}/turn`] = 0
    update(dbRef, removeUpdate);
  }

  const handleStartGame = () => {
    let playerDecks = {}
    var NewPlayers = Object.keys(players);
    for (var i = 0; i < NewPlayers.length; i++) {
      var propName = NewPlayers[i]
      playerDecks[propName] = {
        playerName: players[NewPlayers[i]].name,
        locationCards: [],
        characterCards: [],
        weaponCards: []
      }

    }

    let remaindingLocations = locationCards
    let remaindingCharacters = characterCards
    let remaindingWeapons = weaponCards

    var locationIndex = Math.floor(Math.random() * remaindingLocations.length)
    var characterIndex = Math.floor(Math.random() * remaindingCharacters.length)
    var weaponIndex = Math.floor(Math.random() * remaindingWeapons.length)

    let winningCards = {
      location: remaindingLocations[locationIndex],
      character: remaindingCharacters[characterIndex],
      weapon: remaindingWeapons[weaponIndex]
    }
    remaindingLocations.splice(locationIndex, 1);
    remaindingCharacters.splice(characterIndex, 1);
    remaindingWeapons.splice(weaponIndex, 1);

    var playerPointer = 0;

    while (remaindingLocations.length != 0) {
      var templocationIndex = Math.floor(Math.random() * remaindingLocations.length)
      playerDecks[NewPlayers[playerPointer]].locationCards.push(remaindingLocations[templocationIndex])
      remaindingLocations.splice(templocationIndex, 1);
      if ((playerPointer + 1) == NewPlayers.length) {
        playerPointer = 0
      }
      else {
        playerPointer += 1
      }
    }
    while (remaindingCharacters.length != 0) {
      var templocationIndex = Math.floor(Math.random() * remaindingCharacters.length)
      playerDecks[NewPlayers[playerPointer]].characterCards.push(remaindingCharacters[templocationIndex])
      remaindingCharacters.splice(templocationIndex, 1);
      if ((playerPointer + 1) == NewPlayers.length) {
        playerPointer = 0
      }
      else {
        playerPointer += 1
      }
    }
    while (remaindingWeapons.length != 0) {
      var templocationIndex = Math.floor(Math.random() * remaindingWeapons.length)
      playerDecks[NewPlayers[playerPointer]].weaponCards.push(remaindingWeapons[templocationIndex])
      remaindingWeapons.splice(templocationIndex, 1);
      if ((playerPointer + 1) === NewPlayers.length) {
        playerPointer = 0
      }
      else {
        playerPointer += 1
      }
    }

    let initalPlayerLocations = {}
    let gamePlayers = players
    if(players?.Green?.name != ""){initalPlayerLocations["Green"] = 14}else{delete gamePlayers["Green"]}
    if(players?.Mustard?.name != ""){initalPlayerLocations["Mustard"] = 8}else{delete gamePlayers["Mustard"]}
    if(players?.Peacock?.name != ""){initalPlayerLocations["Peacock"] = 10}else{delete gamePlayers["Peacock"]}
    if(players?.Plum?.name != ""){initalPlayerLocations["Plum"] = 6}else{delete gamePlayers["Plum"]}
    if(players?.Scarlet?.name != ""){initalPlayerLocations["Scarlet"] = 4}else{delete gamePlayers["Scarlet"]}
    if(players?.White?.name != ""){initalPlayerLocations["White"] = 16}else{delete gamePlayers["White"]}

    const startGameUpdate = {}
    startGameUpdate[`${gameCode}/gameStarted`] = true
    startGameUpdate[`${gameCode}/players`] = gamePlayers
    startGameUpdate[`${gameCode}/BasicGameState/gameOver`] = false
    startGameUpdate[`${gameCode}/BasicGameState/currentTurn`] = 1
    startGameUpdate[`${gameCode}/BasicGameState/playerCount`] = playerCount
    startGameUpdate[`${gameCode}/BasicGameState/playerDecks`] = playerDecks
    startGameUpdate[`${gameCode}/BasicGameState/winningCards`] = winningCards
    startGameUpdate[`${gameCode}/BasicGameState/playerLocations`] = initalPlayerLocations
    update(dbRef, startGameUpdate);
    setShowGame(true)
    setShowLobby(false)
    }


  const images = {
    "Reverend Green": greenJpg,
    "Colonel Mustard": mustardJpg,
    "Mrs. Peacock": peacockJpg,
    "Professor Plum": plumJpg,
    "Miss Scarlet": scarletJpg,
    "Mrs. White": whiteJpg,
  }

  const [players, setPlayers] = useState({})
  const [playerCount, setPlayerCount] = useState(0)
  useEffect(() => {
    const playerRef = ref(db, `/${gameCode}/players`);
    onValue(playerRef, (snapshot) => {
        const data = snapshot.val();
        setPlayers(data);
        let count = 0
        if(data?.Green?.name != ""){count += 1}
        if(data?.Mustard?.name != ""){count += 1}
        if(data?.Peacock?.name != ""){count += 1}
        if(data?.Plum?.name != ""){count += 1}
        if(data?.Scarlet?.name != ""){count += 1}
        if(data?.White?.name != ""){count += 1}
        setPlayerCount(count)
        if(data[localPlayerObj.playingAs]["name"] == ""){
          window.location.reload(true)
        }
    });
  }, [])

  useEffect(() => {
    const startRef = ref(db, `/${gameCode}/gameStart`);
    onValue(startRef, (snapshot) => {
        if(snapshot.val()){
          setShowGame(true)
          setShowLobby(false)
        }
    });
  }, [])


  useEffect(() => {
    const startRef = ref(db, `/${gameCode}/gameStarted`);
    onValue(startRef, (snapshot) => {
      if(snapshot.val() ==true){
        setShowGame(true)
        setShowLobby(false)
      }
    });
  }, [])

  const [adminPriv, setAdminPriv] = useState(false)
  useEffect( () => {
    get(ref(db, `${gameCode}/players/${localPlayerObj.playingAs}/turn`)).then((snapshot) => {
        if(snapshot.val() == 1){setAdminPriv(true)}
      }).catch((error) => {console.log("error setting admin privledges: "+error)})
  }, [])

  return (
    <div className='WaitingLobbyContainer'>
      <h1>
        Players in the Lobby:
      </h1>
      <h2>Room Code: {gameCode}</h2>
      <div className="lobbyContainer">
        <div className="grid">
          {Object.values(players).map((player) => {
            if (player.name) {
              return (
                <div className="article">
                  <img src={images[player.characterName]} alt="Sample photo"></img>
                  <FaMapPin className={`playerIcon ${characterToKey[player.characterName]} `} />
                  <div className="text">
                    <h3>
                      {player.name} will Play as {player.characterName}
                    </h3>
                    <p>
                      Player Description
                    </p>
                    {characterToKey[player.characterName] == localPlayerObj.playingAs && <p>this is you</p>}
                    {adminPriv && characterToKey[player.characterName] != localPlayerObj.playingAs &&
                      <button type='submit' className='actionButton' onClick={() => handleRemove(player.characterName)}>
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