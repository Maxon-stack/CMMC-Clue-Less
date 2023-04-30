import './App.css';
import CluelessContext from './CluelessContext';
import Main from './Components/Main/Main';
import { useEffect, useState } from 'react';
import { db, dbRef, auth} from './firebase'
import { signInAnonymously, onAuthStateChanged} from 'firebase/auth'
import { ref, onValue } from 'firebase/database'
import { basicLocalPlayer } from './utils/basicLocalPlayer'
import { characterToKey } from './utils/constants'

function App() {
  //useStates to track firebase real-time database (FBRTDB)
  const [suggestion, setSuggestion] = useState({})
  const [currentTurn, setCurrentTurn] = useState(0)
  const [gameEnded, setGameEnded] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [players, setPlayers] = useState({})
  const [winningCards, setWinningCards] = useState({})
  //useState to track my specific player
  const [localPlayer, setLocalPlayer] = useState(basicLocalPlayer)
  //useState to control what is shown
  const [showHome, setShowHome] = useState(false)
  const [showLobby, setShowLobby] = useState(false)
  const [showGame, setShowGame] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  //useState so we access the right game in the FBRTDB
  const [gameCode, setGameCode] = useState("")
  const [gameJoined, setGameJoined] = useState(false)
  

  const contextValue = {
    //the database which is used when we call get(ref(db,pathToVariable)) to get a specific variable
    //and a ref to the database used when we call update(dbRef,updates) where updates has absolute
    //paths to the variable as well as what to change to (key value pair), from firebase.js import
    db, dbRef,
    //useStates to track firebase real-time database (FBRTDB)
    suggestion, setSuggestion,
    currentTurn, setCurrentTurn,
    gameEnded, setGameEnded,
    gameStarted, setGameStarted,
    players, setPlayers,
    winningCards, setWinningCards,
    //useState to track my specific player
    localPlayer, setLocalPlayer,
    //useState to control what is shown
    showHome, setShowHome,
    showLobby, setShowLobby,
    showGame, setShowGame,
    gameOver, setGameOver,
    //useState so we access the right game in the FBRTDB
    gameCode, setGameCode,
    gameJoined, setGameJoined
  }

  //useEffect on render signs the user in to firebase
  //creates listener to set uid once logged in
  useEffect( () => {
    signInAnonymously(auth)
    onAuthStateChanged(auth, (user) => {
      if(user != null){
        let newLocalPlayer = localPlayer
        newLocalPlayer.uid = user.uid
        setLocalPlayer(newLocalPlayer)
        setShowHome(true)
      }
    }) 
  }, [])

  /*
  This useEffect triggers on render but gameJoined starts as false so nothing happens.
  When the user submits their game code (or it is generated for them) the gameCode 
  useState is set as well as gameJoined, which is set to true triggering this. The
  gameJoined useState is (should) only be changed once as described, that way there is
  only one onValue listener for each object in the desired game object. Then obviously
  each listener will now trigger whenever the object updates and then the set function
  for the corresponding useState will trigger.
  */
  useEffect(()=>{
    if(gameJoined){
      const suggestionRef = ref(db, `${gameCode}/suggestion`);
      onValue(suggestionRef, (snapshot) => {setSuggestion(snapshot.val())});
      const currentTurnRef = ref(db, `${gameCode}/currentTurn`);
      onValue(currentTurnRef, (snapshot) => {setCurrentTurn(snapshot.val())});
      const gameEndedRef = ref(db, `${gameCode}/gameEnded`);
      onValue(gameEndedRef, (snapshot) => {setGameEnded(snapshot.val())});
      const gameStartedRef = ref(db, `${gameCode}/gameStarted`);
      onValue(gameStartedRef, (snapshot) => {setGameStarted(snapshot.val())});
      const playersRef = ref(db, `${gameCode}/players`);
      onValue(playersRef, (snapshot) => {setPlayers(snapshot.val())});
      const winningCardsRef = ref(db, `${gameCode}/winningCards`);
      onValue(winningCardsRef, (snapshot) => {setWinningCards(snapshot.val())});
    }
  },[gameJoined])
  
  return (
    <CluelessContext.Provider value={contextValue}>
      <Main/>
    </CluelessContext.Provider>
  );
}

export default App;
