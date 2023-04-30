import React from 'react'
import CluelessContext from '../../CluelessContext'
import './GameOver.css'



const GameOver = () => {
  const {
    //context with info to display upon gameover
    winningCards,
  } = React.useContext(CluelessContext)

  const winningCharacterCard = winningCards.character
  const winningLocationCard = winningCards.location
  const winningWeaponCard = winningCards.weapon
  const winningPlayer = winningCards.player
  
  return (
    <div>
        <h1>Game Over</h1>
        <h2>{winningPlayer} wins</h2>
        <h3>{winningCharacterCard} did it in the {winningLocationCard} with the {winningWeaponCard}</h3>
    </div>
  )
}

export default GameOver