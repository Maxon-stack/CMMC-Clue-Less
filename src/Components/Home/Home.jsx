import { set, get, ref, update, onValue, remove, Database} from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { uid } from 'uid'
import { db } from '../../firebase'
import { keyToCharacter, characterCards, characterToKey} from '../../utils/constants'
import { basicGameObject } from '../../utils/basicGameObject'
import './Home.css';
import CluelessContext from '../../CluelessContext';

const Home = () => {
  const {
    playerName,
    setPlayerName,
    setShowHome,
    setShowLobby,
    setShowGame,
    localPlayerObj, 
    setLocalPlayerObj,
    gameCode,
    setGameCode,
    uid,
    dbRef,
  } = React.useContext(CluelessContext)
  
  //use states and functions for updating player selections
  const [joinOrCreateGame, setJoinOrCreateGame] = useState(true)
  const [createGame, setCreateGame] = useState(false)
  const [joinGame, setJoinGame] = useState(false)
  const [characterSelection, setCharacterSelction] = useState(false)
  const [invalidGameCode, setInvalidGameCode] = useState(false)
  const [fullGameCode, setFullGameCode] = useState(false)
  const [startedGameCode, setStartedGameCode] = useState(false)
  const [alreadyJoinedGameCode, setAlreadyJoinedGameCode] = useState(false)
  const [joinedGameCodes, setJoinedGameCodes] = useState([])
  const [rejoinGame, setRejoinGame] = useState(false)
  const [availableCharacters, setAvailableCharacters] = useState(characterCards)
  const [playerCharacter, setPlayerCharacter] = useState("")


  const handleSetJoin = () => {
    if(joinedGameCodes.length > 0){
      setJoinOrCreateGame(false)
      setRejoinGame(true)
    }else{
      setJoinOrCreateGame(false)
      setJoinGame(true)
    }
  }
  const handleSetCreate = () => {
    setJoinOrCreateGame(false)
    setCreateGame(true)
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < 4; i ++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setGameCode(result)
    set(ref(db,result),basicGameObject)
    const timeUpdate = {}
    timeUpdate[`${result}/dateCreated`] = Date()
    update(dbRef, timeUpdate);
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
  const handleRejoinGame = () =>{
    if(gameCode){
      setInvalidGameCode(false)
      setJoinGame(false)
      setRejoinGame(false)
      setShowHome(false)
      get(ref(db, `${gameCode}/gameStarted`)).then( (snapshot) => {
        if(snapshot.val()){
          setShowGame(true)
        }else{
          setShowLobby(true)
        }
      }).catch((error) => {console.log("error rejoining game "+gameCode+": "+error)})
      get(ref(db, `${gameCode}/players`)).then(
        (snapshot) => {
          let existingPlayers = snapshot.val()
          Object.keys(existingPlayers).map( (existingPlayer) => {
            if(existingPlayers[existingPlayer].uid == uid){
              setLocalPlayerObj({
                name: existingPlayers[existingPlayer]["name"],
                playingAs: existingPlayer
              })
            }
          })
        }).catch((error) => {console.log("error rejoining game "+gameCode+": "+error)})
      }
    }
  const handleNotRejoinGame = () => {
    setGameCode("")
    setRejoinGame(false)
    setJoinGame(true)
  }
  const handleJoinGame = () => {
    if(playerName && gameCode && !invalidGameCode && !fullGameCode && !startedGameCode && !alreadyJoinedGameCode){
      setInvalidGameCode(false)
      setJoinGame(false)
      setRejoinGame(false)
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
        characterUpdate[`${gameCode}/players/${playerCharacter}/uid`] = uid
        characterUpdate[`${gameCode}/players/${playerCharacter}/turn`] = 7 - availableCharacters.length
        update(dbRef, characterUpdate);
        setShowHome(false)
        setShowLobby(true)
      }
  }

  const [gameObj, setGameObj] = useState({})
  useEffect(() => { //use effect for updating game object on changes
    if(gameCode != ""){ //just so that this listener is not set on mount
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
          setAlreadyJoinedGameCode(false)
        }else if(obj == null){
          setInvalidGameCode(true) 
          setFullGameCode(false)
          setStartedGameCode(false)
          setAlreadyJoinedGameCode(false)
        }else if(obj.gameStarted){
          setInvalidGameCode(false) 
          setFullGameCode(false)
          setStartedGameCode(true)
          setAlreadyJoinedGameCode(false)
        }else{
          setInvalidGameCode(false) 
          setFullGameCode(false)
          setStartedGameCode(false)
          let playersJoined = obj["players"]
          let haveIJoined = false
          Object.keys(playersJoined).map( (playerJoined) => {
            if(playersJoined[playerJoined]["uid"] != "" && playersJoined[playerJoined]["uid"] == uid){
              haveIJoined = true
            }
          })
          setAlreadyJoinedGameCode(haveIJoined)
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

    useEffect(() => { //use effect for deleting old game objects
      get(ref(db, "/")).then( (snapshot) => {
        let dataBase = snapshot.val()
        const today = new Date()
        Object.keys(dataBase).map( (oldGameCode) => {
          let prevDate = new Date(dataBase[oldGameCode]["dateCreated"])
          if(today - prevDate > (1000*60*60*1)){ //change last number to alter hours for game expiration
            remove(ref(db,`${oldGameCode}/`))
          }else{ //otherwise checks if game is active and you were in the old game
            let oldPlayers = dataBase[oldGameCode]["players"]
            let gameOver = dataBase[oldGameCode]["gameEnded"]
            if(!gameOver && uid != ""){
              Object.keys(oldPlayers).map( (oldPlayer) => {
                if(uid != null && oldPlayers[oldPlayer]["uid"] == uid && !gameOver){
                  setJoinedGameCodes( (prevJoinedGameCodes) => {
                    let output = prevJoinedGameCodes
                    if(output.includes(oldGameCode)){
                      return output
                    }else{
                      output.push(oldGameCode)
                      return output
                    }
                  })
                }
              })
            }
          }
        })
      }).catch( (error) => {console.log("Failed to clear old games and find my old game codes: "+error)});
    }, [uid])  

  return (
    <div className='container'>
      <div className="card">
        <h1 className="card-heading" >
          Clueless
        </h1>
        {joinOrCreateGame && uid != "" &&
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
        {rejoinGame &&
          <div className="card-form">
            <select name="" id="" onChange={e => setGameCode(e.target.value)} >
                        <option value=''>--Select Your Game--</option>
                        {
                            joinedGameCodes.map((prevGameCode) => (
                            <option value={prevGameCode}>
                                {prevGameCode}
                            </option>
                            ))
                        }
            </select>
            <div className="btnHolder">
              <button className="action-button" onClick={handleRejoinGame} >
                Rejoin Game
              </button>
              <p>or</p>
              <button className="action-button" onClick={handleNotRejoinGame} >
                Join New Game
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
            {alreadyJoinedGameCode && 
              <div>
                <label>The game you are attempting to join you have already joined. Refresh the page and rejoin.</label>
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