import { set, get, ref, onValue } from 'firebase/database'
import React, { useState, useEffect } from 'react'
import CluelessContext from '../../CluelessContext'
import './GameBoard.css'
import Clipboard from '../../Components/Clipboard/Clipboard'
import Locations from '../Locations/Locations'
import PlayerDeck from '../PlayerDeck/PlayerDeck'
import PlayerActions from '../PlayerActions/PlayerActions'
import { db } from '../../firebase'


const GameBoard = () => {
  const {
    playerName,
    setPlayerName,
    showHome,
    setShowHome,
    showLobby,
    setShowLobby,
    showGame,
    setShowGame,
    localPlayerObj, 
    gameState, 
    setGameState
  } = React.useContext(CluelessContext)

  useEffect(() => {
    const stateRef = ref(db, '/game/BasicGameState');
    onValue(stateRef, (snapshot) => {
      const data = snapshot.val();
      setGameState(data);
    });
  }, [])


  
  return (
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
        <div className="actions">
          {
            gameState?.turnState?.currentTurn?.name === localPlayerObj.playingAs ? (
              <PlayerActions />
            ):
            <p>
              It is not Your turn yet
            </p>
          }
        
        </div>
        <div className="deck">
          <PlayerDeck />
        </div>
        <div className="reveal">
          <h1>
            ShowCard
          </h1>
        </div>
      </div>

    </div>
  )
}

export default GameBoard