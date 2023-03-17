import { set, get, ref, onValue } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
const WaitingLobby = () => {

  const characters = [
    'Miss Scarlet',
    'Col. Mustard',
    'Mrs. White',
    'Mr. Green',
    'Mrs. Peacock',
    'Prof. Plum',

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
    <div>
      <h1>
        Players in the Lobby:
      </h1>
      {Object.values(players).map((player) => (
        <div className="">
          <h3>
            {player.name} will Play as {characters[player.turn - 1]}
          </h3>
        </div>
      ))}
    </div>
  )
}

export default WaitingLobby