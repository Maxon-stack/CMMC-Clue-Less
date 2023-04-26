import './App.css';
import Home from './Components/Home/Home';
import WaitingLobby from './Components/WaitingLobby/WaitingLobby';
import { set, get, ref, update, getDatabase } from 'firebase/database'
import { signInAnonymously, onAuthStateChanged} from 'firebase/auth'
import { db, app, auth} from './firebase'
import { uid } from 'uid';
import { Route, Routes } from 'react-router-dom';
import CluelessContext from './CluelessContext';
import { useEffect, useState } from 'react';
import Main from './Components/Main/Main';

function App() {
  const [playerName, setPlayerName] = useState('')
  const [localPlayerObj, setLocalPlayerObj] = useState({})
  const [showHome, setShowHome] = useState(true)
  const [showLobby, setShowLobby] = useState(false)
  const [showGame, setShowGame] = useState(false)
  const [gameState, setGameState] = useState({});
  const [gameOver, setGameOver] = useState(false)
  const [gameCode, setGameCode] = useState("")
  const [uid, setUid] = useState("")
  const dbRef = ref(getDatabase());


  const contextValue = {
    playerName,
    setPlayerName,
    localPlayerObj, 
    setLocalPlayerObj,
    showHome, 
    setShowHome,
    showLobby, 
    setShowLobby,
    showGame,
    setShowGame,
    gameState, 
    setGameState,
    gameOver,
    setGameOver,
    gameCode,
    setGameCode,
    uid,
    dbRef
  }

  useEffect( () => {
    signInAnonymously(auth)
    onAuthStateChanged(auth, (user) => {
      if(user != null){
        console.log("logged in as "+user.uid)
        setUid(user.uid)
      }else{
        console.log("not logged in")
      }
    }) 
  }, [])
  
  return (
    <CluelessContext.Provider value={contextValue}>
      <Main/>
    </CluelessContext.Provider>
  );
}

export default App;
