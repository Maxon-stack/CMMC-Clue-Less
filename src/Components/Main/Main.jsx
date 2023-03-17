import React from 'react'
import CluelessContext from '../../CluelessContext'
import Home from '../Home/Home'
import WaitingLobby from '../WaitingLobby/WaitingLobby'



const Main = () => {
  const {
    playerName,
    setPlayerName,
    showHome,
    setShowHome,
    showLobby,
    setShowLobby,
  } = React.useContext(CluelessContext)
  return (
    <div>
      {showHome && (
        <Home />
      )}
      {showLobby && (
        <WaitingLobby />
      )}

    </div>
  )
}

export default Main