import { set, get, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { uid } from 'uid'
import { db } from '../../firebase'
import './Home.css';
import CluelessContext from '../../CluelessContext';

const Home = () => {
  const [todo, setTodo] = useState('')

  const [gameFull, setgameFull] = useState(false)


  const handleNameChange = (e) => {
    setPlayerName(e.target.value)
  }
  const handleJoinGame = () => {
    //const starCountRef = ref(db, 'game/players');
    get(ref(db, `/game/players`)).then((snapshot) => {
      let updatedPlayerList = snapshot.val()
      if (snapshot.exists()) {
        for (let item of Object.keys(updatedPlayerList)) {
          if (updatedPlayerList[item].name == '') {
            updatedPlayerList[item].name = playerName
            break
          }
        }
        if (updatedPlayerList === snapshot.val()) {
          console.log('Game Full')
        }
        else {
          set(ref(db, '/game/players'), updatedPlayerList)
            .then(() => {
              console.log("playersUpdated")
              setShowHome(false)
              setShowLobby(true)
            })
            .catch((error) => {
              console.log("Failed to update players object")
            });
        }
        console.log(updatedPlayerList)
      } else {
        console.log("No data available");
      }
      const uuid = uid()
    }).catch((error) => {
      console.error(error);
    });
  }
  const handleCreateGame = () => {
    const uuid = uid()
    set(ref(db, `/${uuid}`), {
      playerName,
      uuid,

    });

  }
  const {
    playerName,
    setPlayerName,
    showHome,
    setShowHome,
    showLobby,
    setShowLobby,
  } = React.useContext(CluelessContext)

  return (
    <div className='homeContainer'>
      <div className="test">
        {playerName}
      </div>
      <div className="joinGameForm">
        <input placeholder="Player Name" type="text" value={playerName} onChange={handleNameChange} />
        <button onClick={handleJoinGame} >
          Join Game
        </button>
        <br />
      </div>

      {/* <button>
        Create New Lobby
      </button> */}
    </div>
  )
}

export default Home