import './Home.css';
import CluelessContext from '../../CluelessContext';
import React, { useEffect, useState } from 'react'
import { set, get, ref, update, remove } from 'firebase/database'
import { keyToCharacter, characterToKey} from '../../utils/constants'
import { basicGameObject } from '../../utils/basicGameObject'


const Home = () => {
  const {
    //the database which is used when we call get(ref(db,pathToVariable)) to get a specific variable
    //and a ref to the database used when we call update(dbRef,updates) where updates has absolute
    //paths to the variable as well as what to change to (key value pair), from firebase.js import
    db, dbRef,
    //useStates to track firebase real-time database (FBRTDB)
    players,
    //useState to track my specific player
    localPlayer, setLocalPlayer,
    //useState to control what is shown
    setShowHome, setShowLobby, setShowGame,
    //useState so we access the right game in the FBRTDB
    gameCode, setGameCode,
    gameJoined, setGameJoined
  } = React.useContext(CluelessContext)

  //use states and functions for updating player selections
  //controls the screen the player sees
  const [joinOrCreateGame, setJoinOrCreateGame] = useState(true)
  const [createGame, setCreateGame] = useState(false)
  const [joinGame, setJoinGame] = useState(false)
  const [rejoinGame, setRejoinGame] = useState(false)
  const [characterSelection, setCharacterSelction] = useState(false)
  //controls the game code errors the player sees
  const [invalidGameCode, setInvalidGameCode] = useState(false)
  const [fullGameCode, setFullGameCode] = useState(false)
  const [startedGameCode, setStartedGameCode] = useState(false)
  const [alreadyJoinedGameCode, setAlreadyJoinedGameCode] = useState(false)
  //to track all games the user has already joined
  const [joinedGameCodes, setJoinedGameCodes] = useState([])
  //to track currently available characters
  const [availableCharacters, setAvailableCharacters] = useState([])
  const [playerCharacter, setPlayerCharacter] = useState("")

  //triggered when player clicks join game
  //if there are joined game codes show rejoin option
  //otherwise just show screen to join new game
  const handleSetJoin = () => {
    if(joinedGameCodes.length > 0){
      setJoinOrCreateGame(false)
      setRejoinGame(true)
    }else{
      setJoinOrCreateGame(false)
      setJoinGame(true)
    }
  }

  //triggered when a player clicks create game
  //moves to create game screen asking for name
  //also creates a new random 4 letter game object with the basic game object
  //also tags it with the date of creation so it can be deleted when time passes
  //updated GameJoined useState boolean to create onValue listeners in App.js 
  //since now we have a game object to monitor
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
    setGameJoined(true)
  }

  //triggered whenever a user types in the player name field
  //updates local player name
  const handleNameChange = (e) => {
    let newLocalPlayer = localPlayer
    newLocalPlayer.playerName = e.target.value
    setLocalPlayer(newLocalPlayer)
  }

  //triggered when the player selects a player character from character selection screen
  //updates local player character name
  const handleCharacterChange = (e) => {
    let newLocalPlayer = localPlayer
    newLocalPlayer.characterName = keyToCharacter[e]
    setLocalPlayer(newLocalPlayer)
  }

  //triggered when a user types in the game code field or selects from dropdown menu
  //updates the game code 
  const handleInputGameCode = (e) => {
    setGameCode(e.target.value.toUpperCase())
  }

  //triggered when a player selects to creates a game
  //moves to character selection screen
  //does nothing if a name has not been entered
  const handleCreateGame = () => {
    if(localPlayer.playerName != ""){
      setCreateGame(false)
      setCharacterSelction(true)
    }
  }

  //triggered when a user click the rejoin button
  //if no existing gameCode was selected nothing happens
  //gets players objects and itterates through to find the player you were and sets the local to match
  //gets the gameStarted bool and either shows the lobby or the game screen
  //updates the GameJoined useState boolean to create onValue listeners in App.js 
  //since now we have a game object to monitor
  const handleRejoinGame = () =>{
    if(gameCode){
      setJoinGame(false)
      setRejoinGame(false)
      setShowHome(false)
      get(ref(db, `${gameCode}/players`)).then(
        (snapshot) => {
          let existingPlayers = snapshot.val()
          Object.keys(existingPlayers).map( (existingPlayer) => {
            if(existingPlayers[existingPlayer].uid == localPlayer.uid){
              setLocalPlayer(existingPlayers[existingPlayer])
            }
          })
      }).catch((error) => {console.log("error rejoining game "+gameCode+": "+error)})
      get(ref(db, `${gameCode}/gameStarted`)).then( (snapshot) => {
        if(snapshot.val()){
          setShowGame(true)
        }else{
          setShowLobby(true)
        }
      }).catch((error) => {console.log("error rejoining game "+gameCode+": "+error)})
      setGameJoined(true)
    }
  }

  //triggers when user selects to join a new game isntead of rejoin an old
  //clears game code and moves to typical join screen
  const handleNotRejoinGame = () => {
    setGameCode("")
    setRejoinGame(false)
    setJoinGame(true)
  }

  //triggers when the user selects to join a game from join new game screen
  //if there was a name and game code input plus no errors
  //then the error codes are removed and we are moved to the character selection screen
  const handleJoinGame = () => {
    if(localPlayer.playerName && gameCode && !invalidGameCode && !fullGameCode && !startedGameCode && !alreadyJoinedGameCode){
      setInvalidGameCode(false)
      setJoinGame(false)
      setRejoinGame(false)
      setCharacterSelction(true)
      setGameJoined(true)
    }
  }

  //triggers when the user clicks submit after selecting a character to play as
  //checks something was selected and double checks the character is still available
  //updates the local player with the character name
  //upddates the datebase with the player's info, then sets local player turn to match
  //then moves to the lobby
  const handleCharacterSelection = () => {
    let characterSelection = characterToKey[localPlayer.characterName]
    if(characterSelection && availableCharacters.includes(keyToCharacter[characterSelection])){
      const characterUpdate = {}
      characterUpdate[`${gameCode}/players/${characterSelection}/playerName`] = localPlayer.playerName
      characterUpdate[`${gameCode}/players/${characterSelection}/uid`] = localPlayer.uid
      characterUpdate[`${gameCode}/players/${characterSelection}/turn`] = 7 - availableCharacters.length
      update(dbRef, characterUpdate);
      let newLocalPlayer = localPlayer
      newLocalPlayer.turn = 7 - availableCharacters.length
      setLocalPlayer(newLocalPlayer)
      setShowHome(false)
      setShowLobby(true)
    }
  }

  //use effect for setting game code error
  useEffect(() => { 
    get(ref(db, `${gameCode}/`)).then(
      (snapshot) => {
        const obj = snapshot.val()
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
          let playerCount = 0
          Object.keys(playersJoined).map( (playerJoined) => {
            if(playersJoined[playerJoined]["playerName"] != ""){
              playerCount++
              if(playerCount == 6){setFullGameCode(true)}
            }
            if(playersJoined[playerJoined]["uid"] != "" && playersJoined[playerJoined]["uid"] == localPlayer.uid){
              haveIJoined = true
            }
          })
          setAlreadyJoinedGameCode(haveIJoined)
        }
      }
    ).catch((error) => {console.log("error with useEffect calculating available gamecode: "+error)})
  }, [gameCode])

  //use effect for updating available players after joining a game and when players update
  useEffect(() => { 
    if(gameJoined){
      let possibleCharacters = []
      if(players?.Green?.playerName == ""){possibleCharacters.push("Reverend Green")}
      if(players?.Mustard?.playerName == ""){possibleCharacters.push("Colonel Mustard")}
      if(players?.Peacock?.playerName == ""){possibleCharacters.push("Mrs. Peacock")}
      if(players?.Plum?.playerName == ""){possibleCharacters.push("Professor Plum")}
      if(players?.Scarlet?.playerName == ""){possibleCharacters.push("Miss Scarlet")}
      if(players?.White?.playerName == ""){possibleCharacters.push("Mrs. White")}
      setAvailableCharacters(possibleCharacters)
    }
  }, [gameJoined, players])

  //use effect for deleting old game objects runs on mount and once player has a UID
  const gameTimeOut = 1 //CHANGE IF DESIRED, THIS IS HOURS TILL EXPIRATION OF GAME OBJECTS
  useEffect(() => {
    const uid = localPlayer.uid
    get(ref(db, "/")).then( (snapshot) => {
      let dataBase = snapshot.val()
      if(dataBase){
        const today = new Date()
        Object.keys(dataBase).map( (oldGameCode) => {
          let prevDate = new Date(dataBase[oldGameCode]["dateCreated"])
          if(today - prevDate > (1000*60*60*gameTimeOut) || dataBase[oldGameCode]["gameEnded"]){ //change last number to alter hours for game expiration
            remove(ref(db,`${oldGameCode}/`))
          }else{ //otherwise checks if you were in the old game
            let oldPlayers = dataBase[oldGameCode]["players"]
            if(localPlayer.uid != ""){
              Object.keys(oldPlayers).map( (oldPlayer) => {
                if(oldPlayers[oldPlayer]["uid"] == localPlayer.uid){
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
      }
    }).catch( (error) => {console.log("Failed to clear old games and find my old game codes: "+error)});
  }, [localPlayer])  

  return (
    <div className='container'>
      <div className="card">
        <h1 className="card-heading" >
          Clueless
        </h1>
        {localPlayer.uid == "" &&
          <h1>ERROR LOGGING IN</h1>
        }
        {joinOrCreateGame && localPlayer.uid != "" &&
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
                            joinedGameCodes.map((prevGameCode, id) => (
                            <option key={prevGameCode+id} value={prevGameCode}>
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
            <select name="" id="" onChange={e => handleCharacterChange(characterToKey[e.target.value])} >
                        <option value=''>--Select a character--</option>
                        {
                            availableCharacters.map((card ,id) => (
                            <option key={card+id} value={card}>
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