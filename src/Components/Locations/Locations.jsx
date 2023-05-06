import './Locations.css'
import CluelessContext from '../../CluelessContext'
import React, { useState, useEffect } from 'react'
import { keyToCharacter } from '../../utils/constants'
import { ref, onValue } from 'firebase/database'
import { db } from '../../firebase'
import { manageRooms } from '../../utils/constants'
import { FaMapPin } from 'react-icons/fa';


const Locations = () => {
  const {
    //useStates to track firebase real-time database (FBRTDB)
    players
  } = React.useContext(CluelessContext)
  const [playerLocations, setPlayerLocations] = useState({})
  useEffect(() => {
    let newPlayerLocations = {}
    Object.keys(players).map((player) => {
      newPlayerLocations[player] = players[player]['location']
    })
    setPlayerLocations(newPlayerLocations)
  }, [players])
  const checkIfPlayerBelongs = (base) => {
    const allLocations = Object.entries(playerLocations);
    var returnVal = allLocations.map((location) => {
      if (location[1] === base) {
        return (
          <div className='flex flex-col justify-center  content-center mt-1'>
            <FaMapPin className={`pt-1 content-center self-center text-center text-3xl ${location[0]}`}/>
            <p className='text-center text-xm'>
            {location[0]}
            </p>
          </div>
        )
      }
    })
    return returnVal
  }
  const hallways = {
    2: 1,
    4: 2,
    6: 3,
    7: 4,
    8: 5,
    10: 6,
    12: 7,
    14: 8,
    15: 9,
    16: 10,
    18: 11,
    20: 12,


  }
  const firstRow = [1, 2, 3, 4, 5]
  const secondRow = [6, 7, 8]
  const thirdRow = [9, 10, 11, 12, 13]
  const forthRow = [14, 15, 16]
  const fithRow = [17, 18, 19, 20, 21]
  return (
    <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-[100%] flex justify-center items-center overflow-hidden'>
      <div className="flex flex-col  min-w-[650px] min-h-[700px] overflow-hidden p-2 bg-gradient-to-r ">
        <div className="flex flex-row justify-between items-center w-[100%]">
          {
            firstRow.map((room, id) => (
              room % 2 == 0 ? (
                <div className='flex flex-wrap content-center w-[100px] h-[120px] text-center ' key={room + id + "div" + "firstRow"}>
                  <div className="flex flex-col content-center items-center w-[100%] h-4/6 center bg-white border border-black box-border border-t-2 border-b-2">
                  <p className='text-sm border-b-2 border-black'>hallway {hallways[room]}</p>
                    <div className="flex items-center justify-center self-center w-[100%] h-[100%]" key={room + "p1"}>
                      {checkIfPlayerBelongs(room)}
                    </div>
                  </div>
                </div>
              )
                : (
                  <div className="flex justify-center items-center w-[180px] h-[180px] bg-yellow-600 border-2 border-black box-border">
                    <div className='flex flex-col  w-[130px] h-[140px] bg-white border-2 border-black box-border'>
                      <h3 className='place-self-center pb-1 text-m border-b-2 border-black mb-2' key={room + "h3"}>
                        {manageRooms[room - 1].roomTitle}
                      </h3>
                      <div className="grid grid-cols-2 mt-1 gap-2 h-[100%] w-[100%] overflow-x-auto whitespace-nowrap scrollbar">
                        {checkIfPlayerBelongs(room)}
                      </div>
                    </div>

                  </div>
                )
            ))
          }
        </div>
        <div className="flex flex-row justify-around content-center items-center w-[100%]">
          {
            secondRow.map((room, id) => (
              <div className='flex flex-wrap content-center w-[95] h-[85px] bg-white' key={room + id + "div" + "secondRow"}>
                <div className='w-[100%] h-[100%] center border border-l-2 border-t-0 border-black box-border border-r-2 p-3'>
                <p className='text-sm border-b-2 border-black'>hallway {hallways[room]}</p>
                  <div>
                    {checkIfPlayerBelongs(room)}
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <div className="flex flex-row justify-between items-center w-[100%]">
          {
            thirdRow.map((room, id) => (
              room % 2 == 0 ? (
                <div className='flex flex-wrap content-center w-[100px] h-[120px] text-center ' key={room + id + "div" + "thirdRow"}>
                  <div className="flex flex-col content-center items-center w-[100%] h-4/6 center bg-white border border-black box-border border-t-2 border-b-2">
                  <p className='text-sm border-b-2 border-black'>hallway {hallways[room]}</p>
                    <div className="flex items-center justify-center self-center w-[100%] h-[100%]" key={room + "p1"}>
                      {checkIfPlayerBelongs(room)}
                    </div>
                  </div>
                </div>
              )
                : (
                  <div className="flex justify-center items-center w-[180px] h-[180px] bg-yellow-600 border-2 border-black box-border">
                    <div className='flex flex-col  w-[130px] h-[140px] bg-white border-2 border-black box-border'>
                      <h3 className='place-self-center pb-1 text-m border-b-2 border-black mb-2' key={room + "h3"}>
                        {manageRooms[room - 1].roomTitle}
                      </h3>
                      <div className="grid grid-cols-2 mt-1 gap-2 h-[100%] w-[100%] overflow-x-auto whitespace-nowrap scrollbar">
                        {checkIfPlayerBelongs(room)}
                      </div>
                    </div>

                  </div>
                )
            ))
          }
        </div>
        <div className="flex flex-row justify-around content-center items-center w-[100%]">
          {
            forthRow.map((room, id) => (
              <div className='flex flex-wrap content-center w-[95] h-[85px] bg-white' key={room + id + "div" + "forthRow"}>
                <div className='w-[100%] h-[100%] center border border-l-2 border-t-0 border-black box-border border-r-2 p-3'>
                <p className='text-sm border-b-2 border-black'>hallway {hallways[room]}</p>
                  <div>
                    {checkIfPlayerBelongs(room)}
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <div className="flex flex-row justify-between items-center w-[100%]">
          {
            fithRow.map((room, id) => (
              room % 2 == 0 ? (
                <div className='flex flex-wrap content-center w-[100px] h-[120px] text-center ' key={room + id + "div" + "fithRow"}>
                  <div className="flex flex-col content-center items-center w-[100%] h-4/6 center bg-white border border-black box-border border-t-2 border-b-2">
                  <p className='text-sm border-b-2 border-black'>hallway {hallways[room]}</p>
                    <div className="flex items-center justify-center self-center w-[100%] h-[100%]" key={room + "p1"}>
                      {checkIfPlayerBelongs(room)}
                    </div>
                  </div>
                </div>
              )
                : (
                  <div className="flex justify-center items-center w-[180px] h-[180px] bg-yellow-600 border-2 border-black box-border">
                    <div className='flex flex-col  w-[130px] h-[140px] bg-white border-2 border-black box-border'>
                      <h3 className='place-self-center pb-1 text-m border-b-2 border-black mb-2' key={room + "h3"}>
                        {manageRooms[room - 1].roomTitle}
                      </h3>
                      <div className="grid grid-cols-2 mt-1 gap-2 h-[100%] w-[100%] overflow-x-auto whitespace-nowrap scrollbar">
                        {checkIfPlayerBelongs(room)}
                      </div>
                    </div>

                  </div>
                )
            ))
          }
        </div>

      </div>
    </div>
  )
}

export default Locations