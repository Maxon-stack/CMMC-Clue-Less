import './Clipboard.css'
import CluelessContext from '../../CluelessContext'
import React, { useEffect, useState } from 'react'

const ClipBoard = () => {

  const {
    //useStates to track firebase real-time database (FBRTDB)
    players, localPlayer
  } = React.useContext(CluelessContext)

  const [playerRow, setPlayerRow] = useState({
    "Green": "",
    "Mustard": "",
    "Peacock": "",
    "Plum": "",
    "Scarlet": "",
    "White": "",
  })
  useEffect( () => {
    let newPlayerRow = playerRow
    Object.keys(players).map( (player) =>{
      newPlayerRow[player] = players[player]["playerName"]
    })
    setPlayerRow(newPlayerRow)
  }, [players])

  //the order from left to right is the order as it appears in Firebase because
  //because the player names are pulled out in that order (maybe we should 
  //standarize the order) 
  return (
    <div className='clipboardMain'>
      <table
          class="min-w-full border text-center text-sm font-light dark:border-neutral-500">
          <thead class="border-b font-medium dark:border-neutral-500">
           <tr>
              <th
                colspan="7"
                scope="col"
                class = "bg-indigo-500 text-white border-solid border-4 border-black  px-6 py-2 text-center dark:border-neutral-50 text-sm  ">
                Innocence Clipboard
              </th>
            </tr>
            <tr class="bg-yellow-500 text-white border-solid border-2 border-black text-center text-sm">
              <th
                scope="col"
                class="border-r dark:border-black">
                Character Name
              </th>
              <th
                scope="col"
                class="border-r dark:border-black">
                Rev. Green
              </th>
              <th
                scope="col"
                class="border-r dark:border-black">
                Col. Mustard
              </th>
               <th
                scope="col"
                class="border-r dark:border-black">
                Mrs. Peacock
              </th>
              <th
                scope="col"
                class="border-r dark:border-black">
                Prof. Plum
              </th>
              <th
                scope="col"
                class="border-r dark:border-black">
                Miss Scarlet
              </th>
              <th
                scope="col"
                class="border-r dark:border-black">
                Mrs. White
              </th>
            </tr>
            <tr class="bg-yellow-500 text-white border-solid border-2 border-black text-center text-sm" >
              <th
                scope="col" class="border-r dark:border-black">
                Player Name
              </th>
                {Object.keys(playerRow).map( (player) => {
              return( <th
                scope="col"
                class="border-r dark:border-black"><label  key={player}>{playerRow[player]}</label></th>)
            }
          )}             
            </tr>
          </thead>
          <tbody>
          <tr class="border-b dark:border-neutral-500">
              <td
                colspan="7" class = "bg-indigo-500 text-white border-solid border-4 border-black text-center font-medium dark:border-neutral-50 text-sm">
                Suspects
              </td>
              </tr>
          <tr class="border-2 dark:border-black text-xs">
              <td class="border-r font-medium dark:border-black">
                Colonel Mustard
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
            </tr>
            <tr class="border-2 dark:border-black text-xs">
              <td
                class="border-r font-medium dark:border-black">
                Professor Plum
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
            </tr>
            <tr class="border-2 dark:border-black text-xs">
              <td class="border-r font-medium dark:border-black">
              Reverend Green
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
            </tr>
            <tr class="border-2 dark:border-black text-xs">
              <td
                class="border-r font-medium dark:border-black">
                Mr. Peacock
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
            </tr>
            <tr class="border-2 dark:border-black text-xs">
              <td
                class="border-r font-medium dark:border-black">
                Miss Scarlet
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
            </tr>
            <tr class="border-2 dark:border-black text-xs">
              <td
                class="border-r font-medium dark:border-black">
                Mrs. White
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
            </tr>
             <tr class="border-b dark:border-neutral-500">
              <td
                 colspan="7" class = "bg-indigo-500 text-white border-solid border-4 border-black text-center font-medium dark:border-neutral-50 text-sm">
                Weapons
              </td>
              </tr>
              <tr class="border-2 dark:border-black text-xs">
              <td
                class="border-r font-medium dark:border-black">
                Knife
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
            </tr>
            <tr class="border-2 dark:border-black text-xs">
              <td
                class="border-r font-medium dark:border-black">
                Candle Stick
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
            </tr>
            <tr class="border-2 dark:border-black text-xs">
              <td
                class="border-r font-medium dark:border-black">
                Revolver
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
            </tr>
            <tr class="border-2 dark:border-black text-xs">
              <td
                class="border-r font-medium dark:border-black">
                Rope
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
            </tr>
            <tr class="border-2 dark:border-black text-xs">
              <td
                class="border-r font-medium dark:border-black">
                Lead Pipe
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
            </tr>
            <tr class="border-2 dark:border-black text-xs">
              <td
                class="border-r font-medium dark:border-black">
                Wrench
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
            </tr>
            <tr class="border-b dark:border-neutral-500">
              <td
                colspan="7" class = "bg-indigo-500 text-white border-solid border-4 border-black text-center font-medium dark:border-neutral-50 text-sm">
                Rooms
              </td>
              </tr>
              <tr class="border-2 dark:border-black text-xs">
              <td
                class="border-r font-medium dark:border-black">
                Hall
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
            </tr>
            <tr class="border-2 dark:border-black text-xs">
              <td
                class="border-r font-medium dark:border-black">
                Lounge
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
            </tr>
            <tr class="border-2 dark:border-black text-xs">
              <td
                class="border-r font-medium dark:border-black">
                Dining Room
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
            </tr>
            <tr class="border-2 dark:border-black text-xs">
              <td
                class="border-r font-medium dark:border-black">
                Kitchen
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
            </tr>
            <tr class="border-2 dark:border-black text-xs">
              <td
                class="border-r font-medium dark:border-black">
                Ballroom
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
            </tr>
            <tr class="border-2 dark:border-black text-xs">
              <td
                class="border-r font-medium dark:border-black">
                Conservatory
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
            </tr>
            <tr class="border-2 dark:border-black text-xs">
              <td
                class="border-r font-medium dark:border-black">
                Billiard Room
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
            </tr>
            <tr class="border-2 dark:border-black text-xs">
              <td
                class="border-r font-medium dark:border-black">
                Library
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
            </tr>
            <tr class="border-2 dark:border-black text-xs">
              <td
                class="border-r font-medium dark:border-black">
                Study
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
              <td class="border-r font-medium dark:border-black">
                <input type="checkbox" className="col1-6"></input>
              </td>
            </tr>
          </tbody>
          </table>
    </div>
    )
}

export default ClipBoard