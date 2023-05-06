import { set, get, ref, onValue } from 'firebase/database'
import React, { useState, useEffect } from 'react'
import CluelessContext from '../../CluelessContext'
import './GameBoard.css'
import Clipboard from '../../Components/Clipboard/Clipboard'
import Locations from '../Locations/Locations'
import PlayerDeck from '../PlayerDeck/PlayerDeck'
import { characterToKey } from '../../utils/constants'
import PlayerActions from '../PlayerActions/PlayerActions'
import NotYourTurn from '../NotYourTurn/NotYourTurn'
import Disprove from '../Disprove/Disprove'
import { db } from '../../firebase'


const GameBoard = () => {
  const {
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
  } = React.useContext(CluelessContext)

  const [haveDeck, setHaveDeck] = useState(false)

  useEffect(() => {
    const gameRef = ref(db, `${gameCode}/gameEnded`);
    onValue(gameRef, (snapshot) => {
      if(snapshot.val()){
        setGameOver(true)
        setShowGame(false)
      }
    });
  }, [])

  useEffect(() => {
    if(Object.keys(Object.values(players)[0]).includes("deck")){
      setLocalPlayer(players[characterToKey[localPlayer.characterName]])
      setHaveDeck(true)
    }
  },[players])

  useEffect(() => {
    setHaveDeck(true)
  },[localPlayer])
  
  return (
    <div>
      {haveDeck &&
        <div className='GameBoardContainer'>
          <div className="boardAndClip">
            <div className="board">
              <Locations />
            </div>
            <div className="clipBoard">
              <Clipboard />
            </div>
          </div>
          <div className="containerLower">
            <div className="actions space-y-4 space-x-4" >
              {currentTurn === localPlayer.turn ? (<PlayerActions />):<NotYourTurn />}
            </div>
            <div className="deck">
              <PlayerDeck />
            </div>
            <div className="reveal">
              <Disprove />
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default GameBoard