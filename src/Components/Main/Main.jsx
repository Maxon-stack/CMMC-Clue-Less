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
    setShowGame
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

    </div>
  )
}

export default Main