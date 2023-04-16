import React, { useEffect, useState } from 'react'
import CluelessContext from '../../CluelessContext'
import { set, get, ref, onValue, getDatabase, update } from 'firebase/database'
import { manageRooms} from '../../utils/constants'
import { characterAliasMap } from '../../utils/constants'
import { db } from '../../firebase'
import { calculateDisprover } from './CalculateDisprover'
import './PlayerActions.css'

const PlayerActions = () => {

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
    gameState,
    setGameState

  } = React.useContext(CluelessContext)

  const characterCards = [
    "Miss Scarlet",
    "Colonel Mustard",
    "Mrs. White",
    "Reverend Green",
    "Mrs. Peacock",
    "Professor Plum",
  ]
  const weaponCards = [
    "Knife",
    "Candle Stick",
    "Revolver",
    "Rope",
    "Lead Pipe",
    "Wrench",
  ]

  const hallwayLocations = [2, 4, 6, 7, 8, 10, 12, 14, 15, 16, 18, 20]
  const roomLocations = [1, 3, 5, 9, 11, 13, 17, 19, 21]
  const [isHallway, setIsHallway] = useState();
  const [moveOptions, setMoveOptions] = useState()
  const [suggestedWeapon, setSuggestedWeapon] = useState()
  const [suggestedCharacter, setSuggestedCharacter] = useState()
  const [isMoved, setIsMoved] = useState(false)
  const [newLocation, setNewLocation] = useState()


  const getMoveOptions = (playerLocation) => {
    let finalOptions = []
    let optionsObject = manageRooms[playerLocation - 1]
    optionsObject.options.forEach((item) => {
      let tempRoom = manageRooms[item - 1]
      finalOptions.push([tempRoom.id, tempRoom.roomTitle])
    });
    return finalOptions
  }

  const handleMoveSelect = (value) => {
    if (value !== 'placeholder') {
      setIsMoved(true);
      setNewLocation(value)
    }
    else {
      setIsMoved(false);
    }
  }

  useEffect(() => {
    const currentPlayerLocation = gameState.playerLocations[localPlayerObj.playingAs]
    if (hallwayLocations.includes(currentPlayerLocation)) {
      setIsHallway(true)
      //const PlayerOptions = manageRooms[];
      setMoveOptions(getMoveOptions(currentPlayerLocation))
    }
    else {
      setIsHallway(false)
    }
  }, [])

  const handleHallwayScenario = () => {
    const dbRef = ref(getDatabase());
    const finalSuggestion = {
      character: suggestedCharacter,
      location: parseInt(newLocation),
      locationTitle: manageRooms[parseInt(newLocation)-1].roomTitle,
      weapon: suggestedWeapon,
      //TODO: This needs logic to be set
      disprover: calculateDisprover( 
                                      localPlayerObj.playingAs,
                                      suggestedCharacter,
                                      suggestedWeapon,
                                      manageRooms[parseInt(newLocation)-1].roomTitle,
                                      gameState),
      suggestor: characterAliasMap[localPlayerObj.playingAs],
      disprovingCard: "",
      accepted: false,
      submitted: false,
    }

    const characterValue = finalSuggestion.character.split(' ')
    // Set is waiting to true on database
    const updates = {};
    updates[`game/BasicGameState/turnState/isWaiting`] = true;
    updates[`/game/BasicGameState/turnState/currentSuggestion`] = finalSuggestion;
    updates[`/game/BasicGameState/playerLocations/${localPlayerObj.playingAs}`] = finalSuggestion.location;
    updates[`/game/BasicGameState/playerLocations/${characterValue[1]}`] = finalSuggestion.location;
    update(dbRef, updates);
    //get other character -if needed- and change the location
    //update current player location
    //calculate players that can disprove
    //

  }
  const handleSuggest = () => {

  }
  const handleAccuse = () => {

  }

  return (
    <div className='actionsContainer'>
      <div>
        <p>
          Move to:
        </p>
        <select name="locations" id="PlayerMoveToOption" onChange={e => handleMoveSelect(e.target.value)}>
          <option value='placeholder'>--Please choose an option--</option>
          {
            moveOptions?.map((optionList, index) => (
              <option value={optionList[0]}>
                {optionList[1]}
              </option>
            ))
          }
        </select>
      </div>
      {
        isMoved ? (
          <div className='suggestionContainer'>
            <h2>
              Suggestion
            </h2>
            <h3>
              Who did it?
            </h3>
            <select name="" id="" onChange={e => setSuggestedCharacter(e.target.value)}>
              <option value='placeholder'>--Please choose an option--</option>
              {
                characterCards.map((card, index) => (
                  <option value={card}>
                    {card}
                  </option>
                ))
              }
            </select>
            <h3>
              With what weapon?
            </h3>
            <select name="" id="" onChange={e => setSuggestedWeapon(e.target.value)} >
              <option value='placeholder'>--Please choose an option--</option>
              {
                weaponCards.map((card, index) => (
                  <option value={card}>
                    {card}
                  </option>
                ))
              }
            </select>
            <h3>
              Location: {manageRooms[newLocation - 1].roomTitle}
            </h3>
            <div>
              <button onClick={handleHallwayScenario}>
                Send move
              </button>
            </div>
          </div>
        )
          :
          <p>
            select Your next location first
          </p>
      }
    </div>
  )
}

export default PlayerActions