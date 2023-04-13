import React, { useEffect, useState } from 'react'
import CluelessContext from '../../CluelessContext'
import { manageRooms } from '../../utils/constants'

const PlayerActions = (game, locations) => {
  
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
  } = React.useContext(CluelessContext)

  const hallwayLocations = [2,4,6,7,8,10,12,14,15,16,18,20]

  useEffect(() => {
    
    console.log(game)
  

  }, [])
  

  const handleMove = () => {

  }
  const handleSuggest = () => {

  }
  const handleAccuse = () => {

  }

  return (
    <div>
      <div>
        Move Options
      </div>
      <div>
        <h3>
          Sugguest
        </h3>
        sugguest
      </div>
      <div>
        <button>
          Accuse Player
        </button>
        <button>
          Send move
        </button>
      </div>
    </div>
  )
}

export default PlayerActions