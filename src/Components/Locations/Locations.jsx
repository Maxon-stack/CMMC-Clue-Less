import { set, get, ref, onValue } from 'firebase/database'
import React, { useState, useEffect } from 'react'
import { db } from '../../firebase'
import './Locations.css'
import { manageRooms } from '../../utils/constants'


const Locations = () => {
  const [playerLocations, setPlayerLocations] = useState({})
  useEffect(() => {
    const locationsRef = ref(db, '/game/BasicGameState/playerLocations');
    onValue(locationsRef, (snapshot) => {
      const data = snapshot.val();
      setPlayerLocations(data);
    });
  }, [])
  const checkIfPlayerBelongs = (base) => {
    const allLocations = Object.entries(playerLocations);
    var returnVal = allLocations.map((location) => {
      if (location[1] === base) {
        return `- ${location[0]} Is Here- `
      }
    })
    return returnVal
  }
  const firstRow = [1, 2, 3, 4, 5]
  const secondRow = [6, 22, 7, 22, 8]
  const thirdRow = [9, 10, 11, 12, 13]
  const forthRow = [14, 22, 15, 22, 16]
  const fithRow = [17, 18, 19, 20, 21]

  return (
    <div className='locationsContainer'>
      <div className="locationsRow">
        {
          firstRow.map((room) => (
            <div className='locationBoxes'>
              <h3>
                {manageRooms[room - 1].roomTitle}
              </h3>
              <p>
                {checkIfPlayerBelongs(room)}
              </p>
              <p>
                {room}
              </p>
            </div>
          ))
        }
      </div>

      <div className="HallwayRow">
        {
          secondRow.map((room) => (
            <div className='locationBoxes'>
              <h3>
                {manageRooms[room - 1].roomTitle}
              </h3>
              <p>
                {checkIfPlayerBelongs(room)}
              </p>
              {
                room - 1 != 21 ?
                  <p>
                    {room}
                  </p> :
                  <p></p>
              }

            </div>
          ))
        }
      </div>

      <div className="locationsRow">
        {
          thirdRow.map((room) => (
            <div className='locationBoxes'>
              <h3>
                {manageRooms[room - 1].roomTitle}
              </h3>
              <p>
                {checkIfPlayerBelongs(room)}
              </p>
              <p>
                {room}
              </p>
            </div>
          ))
        }
      </div>

      <div className="HallwayRow">
        {
          forthRow.map((room) => (
            <div className='locationBoxes'>
              <h3>
                {manageRooms[room - 1].roomTitle}
              </h3>
              <p>
                {checkIfPlayerBelongs(room)}
              </p>
              {
                room - 1 != 21 ?
                  <p>
                    {room}
                  </p> :
                  <p></p>
              }

            </div>
          ))
        }
      </div>
      <div className="locationsRow">
        {
          fithRow.map((room) => (
            <div className='locationBoxes'>
              <h3>
                {manageRooms[room - 1].roomTitle}
              </h3>
              <p>
                {checkIfPlayerBelongs(room)}
              </p>
              <p>
                {room}
              </p>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Locations