import React, { useEffect, useState } from 'react'
import { set, get, ref, onValue } from 'firebase/database'
import { db } from '../../firebase'
import CluelessContext from '../../CluelessContext'
import './PlayerDeck.css'

const PlayerDeck = () => {

  const {
    localPlayerObj, 
    setLocalPlayerObj,
  } = React.useContext(CluelessContext)

  const [characterCards, setCharacterCards] = useState([])
  const [weaponCards, setWeaponCards] = useState([])
  const [locationCards, setLocationCards] = useState([])

  useEffect(() => {
    const playersRef = ref(db, `/game/BasicGameState/playerDecks/${localPlayerObj.playingAs}/characterCards`);
    onValue(playersRef, (snapshot) => {
      const data = snapshot.val();
      if(data){setCharacterCards(data);}else{setCharacterCards([]);}
    });
  }, [])

  useEffect(() => {
    const playersRef = ref(db, `/game/BasicGameState/playerDecks/${localPlayerObj.playingAs}/weaponCards`);
    onValue(playersRef, (snapshot) => {
      const data = snapshot.val();
      if(data){setWeaponCards(data);}else{setWeaponCards([]);}
    });
  }, [])

  useEffect(() => {
    const playersRef = ref(db, `/game/BasicGameState/playerDecks/${localPlayerObj.playingAs}/locationCards`);
    onValue(playersRef, (snapshot) => {
      const data = snapshot.val();
      if(data){setLocationCards(data);}else{setLocationCards([]);}
    });
  }, [])

  return (
    <div>
      <h2 className='playerDeck'>Player Deck</h2>
      {localPlayerObj.playingAs && 
        <h3 className='playerName'>
          {localPlayerObj.name}: You are playing as {localPlayerObj.playingAs}
        </h3>
      }
      {localPlayerObj.playingAs == undefined && 
        <h3 className='playerName'>
          You are a spectator
        </h3>
      }
      <div>
      {characterCards.map(
          (card) => {
            if(characterCards){
              return <p>{card}</p>
            }
          }
        )
      }
      </div>
      <div>
      {weaponCards.map(
          (card) => {
            if(weaponCards){
              return <p>{card}</p>
            }
          }
        )
      }
      </div>
      <div>
      {locationCards.map(
          (card) => {
            if(locationCards){
              return <p>{card}</p>
            }
          }
        )
      }
      </div>
    </div>
  )
}

export default PlayerDeck