import './Locations.css'
import CluelessContext from '../../CluelessContext'
import React, { useState, useEffect } from 'react'
import { ref, onValue } from 'firebase/database'
import { db } from '../../firebase'
import { manageRooms } from '../../utils/constants'


const Locations = () => {

  const {
    //useStates to track firebase real-time database (FBRTDB)
    players
  } = React.useContext(CluelessContext)

  const [playerLocations, setPlayerLocations] = useState({})
  useEffect(() => {
    let newPlayerLocations = {}
    Object.keys(players).map( (player) => {
      newPlayerLocations[player] = players[player]['location']
    })
    setPlayerLocations(newPlayerLocations)
  }, [players])

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
          firstRow.map((room, id) => (
            <div className='locationBoxes' key={room+id+"div"+"firstRow"}>
              <h3 key={room+"h3"}>
                {manageRooms[room - 1].roomTitle}
              </h3>
              <p className="text-white" key={room+"p1"}>
                {checkIfPlayerBelongs(room)}
              </p>
              <p key={room+"p2"}>
                {room}
              </p>
            </div>
          ))
        }
      </div>

      <div className="HallwayRow">
        {
          secondRow.map((room,id) => (
            <div className='locationBoxes' key={room+id+"div"+"secondRow"}>
              <h3 key={room+"h3"+"secondRow"}>
                {manageRooms[room - 1].roomTitle}
              </h3>
              <p className="text-white" key={room+"p1"+"secondRow"}>
                {checkIfPlayerBelongs(room)}
              </p>
              {
                room - 1 != 21 ?
                  <p key={room+"p2"+"secondRow"}>
                    {room}
                  </p> :
                  <p key={room+"p3"+"secondRow"}></p>
              }

            </div>
          ))
        }
      </div>

      <div className="locationsRow">
        {
          thirdRow.map((room,id) => (
            <div className='locationBoxes' key={room+id+"div"+"thirdRow"}>
              <h3 key={room+"h3"+"thirdRow"}>
                {manageRooms[room - 1].roomTitle}
              </h3>
              <p className="text-white" key={room+"p1"+"thirdRow"}>
                {checkIfPlayerBelongs(room)}
              </p>
              <p key={room+"p2"+"thirdRow"}>
                {room}
              </p>
            </div>
          ))
        }
      </div>

      <div className="HallwayRow">
        {
          forthRow.map((room,id) => (
            <div className='locationBoxes' key={room+id+"div"+"fourthRow"}>
              <h3 key={room+"h3"+"fourthRow"}>
                {manageRooms[room - 1].roomTitle}
              </h3>
              <p className="text-white" key={room+"p1"+"fourthRow"}>
                {checkIfPlayerBelongs(room)}
              </p>
              {
                room - 1 != 21 ?
                  <p key={room+"p2"+"fourthRow"}>
                    {room}
                  </p> :
                  <p key={room+"p3"+"fourthRow"}></p>
              }

            </div>
          ))
        }
      </div>
      <div className="locationsRow">
        {
          fithRow.map((room,id) => (
            <div className='locationBoxes' key={room+id+"div"+"fifthRow"}>
              <h3 key={room+"h3"+"fifthRow"}>
                {manageRooms[room - 1].roomTitle}
              </h3>
              <p className="text-white" key={room+"p1"+"fifthRow"}>
                {checkIfPlayerBelongs(room)}
              </p>
              <p key={room+"p2"+"fifthRow"}>
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