import { set, get, ref, update, getDatabase} from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { uid } from 'uid'
import { db } from '../../firebase'
import { characterCards, characterToKey} from '../../utils/constants'
import './Home.css';
import CluelessContext from '../../CluelessContext';
import basicGameObject from'./basicGameObject.json'

const Home = () => {
  const {
    playerName,
    setPlayerName,
    showHome,
    setShowHome,
    showLobby,
    setShowLobby,
    localPlayerObj, 
    setLocalPlayerObj,
    gameCode,
    setGameCode,
    dbRef,
  } = React.useContext(CluelessContext)


  const [todo, setTodo] = useState('')
  const [gameFull, setgameFull] = useState(false)
  
  //use states and functions for updating player selections
  const [createGame, setCreateGame] = useState(false)
  const [joinGame, setJoinGame] = useState(false)
  const [characterSelection, setCharacterSelction] = useState(false)
  const [invalidGameCode, setInvalidGameCode] = useState(false)
  const [fullGameCode, setFullGameCode] = useState(false)
  const [availableCharacters, setAvailableCharacters] = useState([])
  const [playerCharacter, setPlayerCharacter] = useState("")


  const handleSetJoin = () => {setJoinGame(true)}
  const handleSetCreate = () => {
    setCreateGame(true)
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < 4; i ++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setGameCode(result)
  }
  const handleNameChange = (e) => {setPlayerName(e.target.value)}
  const handleInputGameCode = (e) => {setGameCode(e.target.value.toUpperCase())}

  const handleCreateGame = () => {
    set(ref(db,gameCode),basicGameObject)
    setCreateGame(false)
    setCharacterSelction(true)
    setAvailableCharacters(characterCards)
  }
  const handleJoinGame = () => {
    if(availableCharacters.length > 0){
      setInvalidGameCode(false)
      setJoinGame(false)
      setCharacterSelction(true)
    }
  }

  useEffect(() => {
    get(ref(db, `/${gameCode}/players`)).then(
      (snapshot) => {
        const playersObj = snapshot.val()
        if(playersObj != null){
          setInvalidGameCode(false)
          let possibleCharacters = []
          if(playersObj.Green.name == ""){possibleCharacters.push("Reverend Green")}
          if(playersObj.Mustard.name == ""){possibleCharacters.push("Colonel Mustard")}
          if(playersObj.Peacock.name == ""){possibleCharacters.push("Mrs. Peacock")}
          if(playersObj.Plum.name == ""){possibleCharacters.push("Professor Plum")}
          if(playersObj.Scarlet.name == ""){possibleCharacters.push("Miss Scarlet")}
          if(playersObj.White.name == ""){possibleCharacters.push("Mrs. White")}
          if(possibleCharacters.length == 0){setFullGameCode(true)}else{setFullGameCode(false)}
          setAvailableCharacters(possibleCharacters)
        }else{
          setInvalidGameCode(true) 
          setFullGameCode(false)
        }
      }
    ).catch((error) => {console.log("error with useEffect calculating available characters: "+error)})
  }, [gameCode])

  const handleCharacterSelection = () => {
    setLocalPlayerObj({
      name: playerName,
      playingAs: playerCharacter
    })
    const characterUpdate = {}
    characterUpdate[`${gameCode}/players/${playerCharacter}/name`] = playerName
    characterUpdate[`${gameCode}/players/${playerCharacter}/turn`] = 7 - availableCharacters.length
    update(dbRef, characterUpdate);
    setShowHome(false)
    setShowLobby(true)
  }

  return (
    <div className='container'>
      <div className="card">
        <h1 className="card-heading" >
          Clueless
        </h1>
        {!joinGame && !createGame && !characterSelection &&
          <div className="card-form">
            <button className="action-button" onClick={handleSetJoin}>Join Game</button>
            <p>or</p>
            <button className="action-button" onClick={handleSetCreate}>Create Game</button>
          </div>
        }
        {createGame &&
          <div className="card-form">
            <div className="user-box">
              <input placeholder="" type="text" onChange={handleNameChange} required />
              <label>Player Name</label>
            </div>
            <div className="btnHolder">
              <button className="action-button" onClick={handleCreateGame} >
                Create Game
              </button>
            </div>
          </div>
        }
        {joinGame &&
          <div className="card-form">
            <div className="user-box">
              <input placeholder="" type="text" onChange={handleNameChange} required />
              <label>Player Name</label>
            </div>
            <div className="user-box">
              <input placeholder="" type="text" maxlength="4" onChange={handleInputGameCode} required />
              <label>Game Room Code</label>
            </div>
            <div className="btnHolder">
              <button className="action-button" onClick={handleJoinGame} >
                Join Game
              </button>
            </div>
            {invalidGameCode &&
              <div>
                <label>Invalid Game Code. Try again.</label>
              </div>
            }
            {fullGameCode &&
              <div>
                <label>The game you are attempting to join is full.</label>
              </div>
            }
          </div>
        }
        {characterSelection &&
          <div className="card-form">
            <select name="" id="" onChange={e => setPlayerCharacter(characterToKey[e.target.value])} >
                        <option value=''>--Select a character--</option>
                        {
                            availableCharacters.map((card, index) => (
                            <option value={card}>
                                {card}
                            </option>
                            ))
                        }
            </select>
            <div className="btnHolder">
              <button className="action-button" onClick={handleCharacterSelection}>
                Submit
              </button>
            </div>
          </div>  
        }
      </div>
    </div>
  )
}

export default Home

{/* <button>
Create New Lobby
</button> */}