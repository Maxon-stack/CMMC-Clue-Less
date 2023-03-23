import React from 'react'
import CluelessContext from '../../CluelessContext'
import './GameBoard.css'

const GameBoard = () => {
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
    <div className='GameContainer'>

      <div className="boardAndClip">
        <div className="board">
          <div className="study">
            Study
          </div>
          <div className="Hall">
            Hall
          </div>
          <div className="Lounge">
            Lounge
          </div>

          <div className="Library">
            Library
          </div>
          <div className="Billiard">
            Billiard Room
          </div>
          <div className="Dining">
            Dining Room
          </div>

          <div className="Conservatory">
            Conservatory
          </div>
          <div className="ball">
            Ball-room
          </div>
          <div className="Kitchen">
            Kitchen
          </div>
        </div>
        <div className="clipBoard">
          <h1>player clipBoard</h1>
        </div>
      </div>


      <div className="containerLower">
        <div className="actions">
          <h1>
            actions
          </h1>
        </div>
        <div className="deck">
          <h1>
            player deck
          </h1>
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