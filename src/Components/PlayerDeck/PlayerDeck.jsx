import React, { useEffect, useState } from 'react'
import { set, get, ref, onValue } from 'firebase/database'
import { db } from '../../firebase'
import CluelessContext from '../../CluelessContext'
import { images } from '../../utils/cards'
import { characterToKey } from '../../utils/constants'
import './PlayerDeck.css'

const PlayerDeck = () => {

  const {
    //useStates to track firebase real-time database (FBRTDB)
    players,
    //useState to track my specific player
    localPlayer
  } = React.useContext(CluelessContext)

  const [deck, setDeck] = useState([])
  useEffect(() => {
    setDeck(players[characterToKey[localPlayer.characterName]]['deck'])
  },[localPlayer])

  return (
    <div className='playerDeckMain playerDeckContainer'>
      <h2 className='playerDeck'>Player Deck</h2>
      <div className='row'>
        {localPlayer.playerName && 
          <h3 className='playerName'>
            {localPlayer.playerName}: You are playing as {localPlayer.characterName}
          </h3>
        }
        {localPlayer.playerName == undefined && 
          <h3 className='playerName'>
            You are a spectator
          </h3>
        }
      </div>
      <div className='row'>
        {deck != [] > 0 &&
        <div>
          {Object.keys(deck).map( (card) => {
              return <label className='card' key={card+"label"}>{deck[card]}</label>
            })
          }
          </div>
        }
      </div>
      <div className='bottomRow'>
        {deck != [] > 0 &&
          <div>
            {Object.keys(deck).map( (card) => {
                return <img className='card' src = {images[deck[card]]} alt = "Card not found" key={card+"img"}></img>
              })
            }
          </div>
        }
      </div>
    </div>
  )
}

export default PlayerDeck