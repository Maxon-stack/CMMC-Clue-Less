import { set, get, ref, onValue } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import './WaitingLobby.css'
import scarletJpg from '../../Assets/Players/Scarlet.jpg'
import { FaMapPin } from 'react-icons/fa';


const WaitingLobby = () => {

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
        <button className='startGame'>
          Start Game
        </button>
      </div>
    </div>
  )
}

export default WaitingLobby