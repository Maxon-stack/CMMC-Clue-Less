import React from 'react'
import CluelessContext from '../../CluelessContext'
import Home from '../Home/Home'
import WaitingLobby from '../WaitingLobby/WaitingLobby'
import GameBoard from '../GameBoard/GameBoard'



const Main = () => {
  const {
    playerName,
    setPlayerName,
    showHome,
    setShowHome,
    showLobby,
    setShowLobby,
    showGame,
    setShowGame,
    gameOver,
    setGameOver,
  } = React.useContext(CluelessContext)
  return (
    <div>
      {showHome && (
        <Home />
      )}
      {showLobby && (
        <WaitingLobby />
      )}
      {showGame && (
        <GameBoard />
      )}
      {gameOver && (
        <h1>Game Over</h1>
      )}

    </div>
  )
}

export default Main