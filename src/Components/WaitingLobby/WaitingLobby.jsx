import { set, get, ref, onValue } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import './WaitingLobby.css'
import scarletJpg from '../../Assets/Players/Scarlet.jpg'
import { FaMapPin } from 'react-icons/fa';
import CluelessContext from '../../CluelessContext'
import { locationCards, characterCards, weaponCards } from '../../utils/constants'


const WaitingLobby = () => {
  const {
    playerName,
    setPlayerName,
    showHome,
    setShowHome,
    showLobby,
    setShowLobby,
    showGame,
    setShowGame
  } = React.useContext(CluelessContext)


  const handleStartGame = () => {
    let playerDecks = {

    }
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



    console.log(winningCards)
    console.log(playerDecks)

    let initalPlayerLocations = {

    }

    for (var x = 0; x < NewPlayers.length; x++) {
      var propName = NewPlayers[x]
      switch (propName) {
        case "scarlet":
          initalPlayerLocations[propName] = "hall 2"
          break;
        case "Plum":
          initalPlayerLocations[propName] = "hall 3"
          break;
        case "mustard":
          initalPlayerLocations[propName] = "hall 5"
          break;
        case "Peacock":
          initalPlayerLocations[propName] = "hall 6"
          break;
        case "green":
          initalPlayerLocations[propName] = "hall 8"
          break;
        case "white":
          initalPlayerLocations[propName] = "hall 10"
          break;
      }
    }

    const BasicGameState = {
      currentTurn: 1,
      playerCount: NewPlayers.length,
      playerDecks: playerDecks,
      winningCards: winningCards,
      playerLocations: initalPlayerLocations
    }

    set(ref(db, '/game/BasicGameState'), BasicGameState)
      .then(() => {
        console.log("Game is now starting")
        setShowGame(true)
        setShowLobby(false)
      })
      .catch((error) => {
        console.log("Failed to update players object")
      });


  }

  const characters = [
    {
      name: 'Miss Scarlet',
      class: 'scarlet'
    },
    {
      name: 'Col. Mustard',
      class: 'mustard'
    },
    {
      name: 'Mrs. White',
      class: 'white'
    },
    {
      name: 'Mr. Green',
      class: 'green'
    },
    {
      name: 'Mrs. Peacock',
      class: 'Peacock'
    },
    {
      name: 'Prof. Plum',
      class: 'Plum'
    },

  ]

  const [players, setPlayers] = useState({})

  useEffect(() => {
    const playerRef = ref(db, '/game/players');
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
      <div className="lobbyContainer">
        <div className="grid">
          {Object.values(players).map((player) => {
            if (player.name) {
              return (
                <div className="article">
                  <img src={scarletJpg} alt="Sample photo"></img>
                  <FaMapPin className={`playerIcon ${characters[player.turn - 1].class} `} />
                  <div className="text">
                    <h3>
                      {player.name} will Play as {characters[player.turn - 1].name}
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