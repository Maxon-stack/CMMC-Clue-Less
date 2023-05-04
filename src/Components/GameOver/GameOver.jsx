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
        <h1 class = "bg-indigo-600 text-white border-solid border-4 border-black text-center text-4xl">Game Over!!</h1>
        <h2 class="bg-yellow-500 text-white border-solid border-2 border-black text-center text-2xl ">{winningPlayer} wins</h2>
        <h3 class="bg-yellow-500 text-white border-solid border-2 border-black text-center text-2xl ">{winningCharacterCard} did it in the {winningLocationCard} with the {winningWeaponCard}</h3>
    </div>
  )
}

export default GameOver