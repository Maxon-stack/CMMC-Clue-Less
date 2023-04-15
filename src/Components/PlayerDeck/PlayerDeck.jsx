import React, { useEffect, useState } from 'react'
import { set, get, ref, onValue } from 'firebase/database'
import { db } from '../../firebase'
import CluelessContext from '../../CluelessContext'
import './PlayerDeck.css'

//maybe move this into an assets folder or something
import mustardJpg from '../../Assets/Players/Mustard.jpg'
import plumJpg from '../../Assets/Players/Plum.jpg'
import greenJpg from '../../Assets/Players/Green.jpg'
import peacockJpg from '../../Assets/Players/Peacock.jpg'
import scarletJpg from '../../Assets/Players/Scarlet.jpg'
import whiteJpg from '../../Assets/Players/White.jpg'
import knifeJpg from '../../Assets/Weapons/Knife.jpg'
import candleJpg from '../../Assets/Weapons/Candle Stick.jpg'
import revolverJpg from '../../Assets/Weapons/Revolver.jpg'
import ropeJpg from '../../Assets/Weapons/Rope.jpg'
import leadJpg from '../../Assets/Weapons/Lead Pipe.jpg'
import wrenchJpg from '../../Assets/Weapons/Wrench.jpg'
import hallJpg from '../../Assets/Locations/Hall.jpg'
import loungeJpg from '../../Assets/Locations/Lounge.jpg'
import diningJpg from '../../Assets/Locations/Dining Room.jpg'
import kitchenJpg from '../../Assets/Locations/Kitchen.jpg'
import ballroomJpg from '../../Assets/Locations/Ballroom.jpg'
import conservatoryJpg from '../../Assets/Locations/Conservatory.jpg'
import billiardJpg from '../../Assets/Locations/Billiard Room.jpg'
import libraryJpg from '../../Assets/Locations/Library.jpg'
import studyJpg from '../../Assets/Locations/Study.jpg'

const PlayerDeck = () => {

  const images = {
    "Colonel Mustard" : mustardJpg,
    "Professor Plum" : plumJpg,
    "Reverend Green" : greenJpg,
    "Mrs. Peacock" : peacockJpg,
    "Miss Scarlet" : scarletJpg,
    "Mrs. White" : whiteJpg,
    "Knife" : knifeJpg,
    "Candle Stick" : candleJpg,
    "Revolver" : revolverJpg,
    "Rope" : ropeJpg,
    "Lead Pipe" : leadJpg,
    "Wrench" : wrenchJpg,
    "Hall" : hallJpg,
    "Lounge" : loungeJpg,
    "Dining Room" : diningJpg,
    "Kitchen" : kitchenJpg,
    "Ballroom" : ballroomJpg,
    "Conservatory" : conservatoryJpg,
    "Billiard Room" : billiardJpg,
    "Library" :libraryJpg,
    "Study" : studyJpg,
  }

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
      <div className='row'>
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
      <div className='row'>
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