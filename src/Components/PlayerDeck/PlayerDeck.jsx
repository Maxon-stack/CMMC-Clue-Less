import React, { useEffect, useState } from 'react'
import { set, get, ref, onValue } from 'firebase/database'
import { db } from '../../firebase'
import CluelessContext from '../../CluelessContext'
import { images } from '../../utils/cards'
import { characterAliasMap } from '../../utils/constants'
import './PlayerDeck.css'

const PlayerDeck = () => {

  const {
    localPlayerObj, 
    setLocalPlayerObj,
    gameCode,
  } = React.useContext(CluelessContext)

  const [characterCards, setCharacterCards] = useState([])
  const [weaponCards, setWeaponCards] = useState([])
  const [locationCards, setLocationCards] = useState([])

  useEffect(() => {
    const playersRef = ref(db, `${gameCode}/BasicGameState/playerDecks/${localPlayerObj.playingAs}/characterCards`);
    onValue(playersRef, (snapshot) => {
      const data = snapshot.val();
      if(data){setCharacterCards(data);}else{setCharacterCards([]);}
    });
  }, [])

  useEffect(() => {
    const playersRef = ref(db, `${gameCode}/BasicGameState/playerDecks/${localPlayerObj.playingAs}/weaponCards`);
    onValue(playersRef, (snapshot) => {
      const data = snapshot.val();
      if(data){setWeaponCards(data);}else{setWeaponCards([]);}
    });
  }, [])

  useEffect(() => {
    const playersRef = ref(db, `${gameCode}/BasicGameState/playerDecks/${localPlayerObj.playingAs}/locationCards`);
    onValue(playersRef, (snapshot) => {
      const data = snapshot.val();
      if(data){setLocationCards(data);}else{setLocationCards([]);}
    });
  }, [])

  return (
    <div className='playerDeckMain playerDeckContainer'>
      <h2 className='playerDeck'>Player Deck</h2>
      <div className='row'>
        {localPlayerObj.playingAs && 
          <h3 className='playerName'>
            {localPlayerObj.name}: You are playing as {characterAliasMap[localPlayerObj.playingAs]}
          </h3>
        }
        {localPlayerObj.playingAs == undefined && 
          <h3 className='playerName'>
            You are a spectator
          </h3>
        }
      </div>
      <div className='row'>
        {characterCards.map(
            (card) => {
              if(characterCards){
                return <label className='card'>{card}</label>
              }
            }
          )
        }
        {weaponCards.map(
            (card) => {
              if(weaponCards){
                return <label className='card'>{card}</label>
              }
            }
          )
        }
        {locationCards.map(
            (card) => {
              if(locationCards){
                return <label className='card'>{card}</label>
              }
            }
          )
        }
      </div>
      <div className='bottomRow'>
        {characterCards.map(
            (card) => {
              if(characterCards){
                return <img className='card' src = {images[card]} alt = "Card not found"></img>
              }
            }
          )
        }
        {weaponCards.map(
            (card) => {
              if(weaponCards){
                return <img className='card' src = {images[card]} alt = "Card not found"></img>
              }
            }
          )
        }
        {locationCards.map(
            (card) => {
              if(locationCards){
                return <img className='card' src = {images[card]} alt = "Card not found"></img>
              }
            }
          )
        }
      </div>
    </div>
  )
}

export default PlayerDeck