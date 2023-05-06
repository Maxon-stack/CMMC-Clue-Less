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
      <h2 class = "bg-indigo-500 text-white border-solid border-4 border-black text-center text-base">Player Deck</h2>
      <div>
        {localPlayer.playerName && 
          <h3 className="bg-yellow-500 text-white border-solid border-2 border-black text-center text-sm">
            {localPlayer.playerName}: You are playing as {localPlayer.characterName}
          </h3>
        }
        {localPlayer.playerName == undefined && 
          <h3 className='playerName'>
            You are a spectator
          </h3>
        }
      </div>
      <div className="space-y-10 space-x-4">
        {deck != [] > 0 &&
        <div className="flex flex-row flex-wrap flex gap-3">
          {Object.keys(deck).map( (card) => {
              return <label className="bg-green-600 border-gray border-solid border-2 text-white text-sm font-bold text-center pl-2 pr-2 rounded-full"  key={card+"label"}>{deck[card]}</label>
            })
          }
          </div>
        }
      </div>
      <div className='bottomRow' >
        {deck != [] > 0 &&
          <div className="flex flex-row flex-wrap flex gap-3">
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