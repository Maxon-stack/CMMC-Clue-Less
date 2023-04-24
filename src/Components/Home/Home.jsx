import { set, get, ref, update, onValue, getDatabase} from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { uid } from 'uid'
import { db } from '../../firebase'
import { keyToCharacter, characterCards, characterToKey} from '../../utils/constants'
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
  
  //use states and functions for updating player selections
  const [createGame, setCreateGame] = useState(false)
  const [joinGame, setJoinGame] = useState(false)
  const [characterSelection, setCharacterSelction] = useState(false)
  const [invalidGameCode, setInvalidGameCode] = useState(false)
  const [fullGameCode, setFullGameCode] = useState(false)
  const [startedGameCode, setStartedGameCode] = useState(false)
  const [availableCharacters, setAvailableCharacters] = useState(characterCards)
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
    set(ref(db,result),basicGameObject)
    setAvailableCharacters(characterCards)
  }
  const handleNameChange = (e) => {setPlayerName(e.target.value)}
  const handleInputGameCode = (e) => {setGameCode(e.target.value.toUpperCase())}

  const handleCreateGame = () => {
    if(playerName != ""){
      setCreateGame(false)
      setCharacterSelction(true)
    }
  }
  const handleJoinGame = () => {
    if(playerName && gameCode && !invalidGameCode && !fullGameCode && !startedGameCode){
      setInvalidGameCode(false)
      setJoinGame(false)
      setCharacterSelction(true)
    }
  }

  const handleCharacterSelection = () => {
      if(playerCharacter && availableCharacters.includes(keyToCharacter[playerCharacter])){
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
  }

  const [gameObj, setGameObj] = useState({})
  useEffect(() => { //use effect for updating game object on changes
    if(gameCode != ""){
      const gameRef =ref(db,`${gameCode}/`)
      onValue(gameRef, (snapshot) => {
        setGameObj(snapshot.val())
      });
    }
  }, [characterSelection])

  useEffect(() => { //use effect for setting game code error
    get(ref(db, `${gameCode}/`)).then(
      (snapshot) => {
        const obj = snapshot.val()
        setGameObj(obj)
        if(gameCode == ""){
          setInvalidGameCode(false) 
          setFullGameCode(false)
          setStartedGameCode(false)
        }else if(obj == null){
          setInvalidGameCode(true) 
          setFullGameCode(false)
          setStartedGameCode(false)
        }else if(obj.gameStarted){
          setInvalidGameCode(false) 
          setFullGameCode(false)
          setStartedGameCode(true)
        }else{
          setInvalidGameCode(false) 
          setFullGameCode(false)
          setStartedGameCode(false)
        }
      }
    ).catch((error) => {console.log("error with useEffect calculating available gamecode: "+error)})
  }, [gameCode])

  useEffect(() => { //use effect for updating available players during game code entering & character selection
        if(gameObj && gameCode){
          let possibleCharacters = []
          if(gameObj?.players?.Green?.name == ""){possibleCharacters.push("Reverend Green")}
          if(gameObj?.players?.Mustard?.name == ""){possibleCharacters.push("Colonel Mustard")}
          if(gameObj?.players?.Peacock?.name == ""){possibleCharacters.push("Mrs. Peacock")}
          if(gameObj?.players?.Plum?.name == ""){possibleCharacters.push("Professor Plum")}
          if(gameObj?.players?.Scarlet?.name == ""){possibleCharacters.push("Miss Scarlet")}
          if(gameObj?.players?.White?.name == ""){possibleCharacters.push("Mrs. White")}
          setAvailableCharacters(possibleCharacters)
          if(possibleCharacters.length == 0){
            setFullGameCode(true)
          }else{
            setFullGameCode(false)
          }
        }
    }, [gameObj])

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
              <input placeholder="" type="text" maxLength="4" onChange={handleInputGameCode} required />
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
            {startedGameCode &&
              <div>
                <label>The game you are attempting to join has already started.</label>
              </div>
            }
          </div>
        }
        {characterSelection &&
          <div className="card-form">
            <select name="" id="" onChange={e => setPlayerCharacter(characterToKey[e.target.value])} >
                        <option value=''>--Select a character--</option>
                        {
                            availableCharacters.map((card) => (
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