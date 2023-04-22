import { set, get, ref, onValue } from 'firebase/database'
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
import { locationCards, characterCards, weaponCards, turnState } from '../../utils/constants'
import { characterAliasMap, characterToKey } from '../../utils/constants'


const WaitingLobby = () => {
  const {
    playerName,
    setPlayerName,
    showHome,
    setShowHome,
    showLobby,
    setShowLobby,
    showGame,
    setShowGame,
    gameCode,
  } = React.useContext(CluelessContext)

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

    let initalPlayerLocations = {

    }

    for (var x = 0; x < NewPlayers.length; x++) {
      var propName = NewPlayers[x]
      switch (propName) {
        case "Scarlet":
          initalPlayerLocations[propName] = 4
          break;
        case "Plum":
          initalPlayerLocations[propName] = 6
          break;
        case "Mustard":
          initalPlayerLocations[propName] = 8
          break;
        case "Peacock":
          initalPlayerLocations[propName] = 10
          break;
        case "Green":
          initalPlayerLocations[propName] = 14
          break;
        case "White":
          initalPlayerLocations[propName] = 16
          break;
      }
    }
    const BasicGameState = {
      gameOver: false,
      turnState: turnState,
      currentTurn: 1,
      playerCount: NewPlayers.length,
      playerDecks: playerDecks,
      winningCards: winningCards,
      playerLocations: initalPlayerLocations
    }

    set(ref(db, `/${gameCode}/BasicGameState`), BasicGameState)
      .then(() => {
        console.log("Game is now starting")
        setShowGame(true)
        setShowLobby(false)
      })
      .catch((error) => {
        console.log("Failed to update players object")
      });


  }

  //the order of the characters and their corresponding images are in the order
  //of their turns as it is defined in firebase (I believe currently these are
  //static) but since the JSX return accesses the character and images using their
  //turn number I had to put it in turn order. At some point this will need to be
  //changed as the turn order values become dyanmic between games, but this is
  //probably fine for the minimal increment
  const characters = [
    {
      name: 'Reverend Green',
      class: 'green'
    },
    {
      name: 'Colonel Mustard',
      class: 'mustard'
    },
    {
      name: 'Mrs. Peacock',
      class: 'Peacock'
    },
    {
      name: 'Professor Plum',
      class: 'Plum'
    },
    {
      name: 'Miss Scarlet',
      class: 'scarlet'
    },
    {
      name: 'Mrs. White',
      class: 'white'
    },
  ]
  const images = {
    "Reverend Green": greenJpg,
    "Colonel Mustard": mustardJpg,
    "Mrs. Peacock": peacockJpg,
    "Professor Plum": plumJpg,
    "Miss Scarlet": scarletJpg,
    "Mrs. White": whiteJpg,
  }

  const [players, setPlayers] = useState({})

  useEffect(() => {
    const playerRef = ref(db, `/${gameCode}/players`);
    onValue(playerRef, (snapshot) => {
      const data = snapshot.val();
      setPlayers(data);
    });
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
                  </div>
                </div>
              )
            }
          })}
        </div>
        <button className='startGame' onClick={handleStartGame}>
          Start Game
        </button>
      </div>
    </div>
  )
}

export default WaitingLobby