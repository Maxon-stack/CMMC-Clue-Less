import React, { useState, useEffect } from 'react'
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
    gameState,
    gameOver,
    setGameOver,
  } = React.useContext(CluelessContext)

  const [winningCharacterCard, setWinningCharacterCard] = useState("")
  const [winningLocationCard, setWinningLocationCard] = useState("")
  const [winningWeaponCard, setWinningWeaponCard] = useState("")
  const [winningPlayer, setWinningPlayer] = useState("")
  useEffect(() => {
    if(gameState != null){
      setWinningCharacterCard(gameState?.winningCards?.character)
      setWinningLocationCard(gameState?.winningCards?.location)
      setWinningWeaponCard(gameState?.winningCards?.weapon)
      setWinningPlayer(gameState?.turnState?.currentTurn?.name)
    }
  }, [gameOver])

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
        <div>
          <h1>Game Over</h1>
          <h2>{winningPlayer} wins</h2>
          <h3>{winningCharacterCard} did it in the {winningLocationCard} with the {winningWeaponCard}</h3>
        </div>
      )}

    </div>
  )
}

export default Main