import CluelessContext from '../../CluelessContext'
import React from 'react'
import Home from '../Home/Home'
import WaitingLobby from '../WaitingLobby/WaitingLobby'
import GameBoard from '../GameBoard/GameBoard'
import GameOver from '../GameOver/GameOver'

const Main = () => {
  const {
    //contexts to control what to show
    showHome, showLobby, showGame, gameOver,
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
        <GameOver />
      )}

    </div>
  )
}

export default Main