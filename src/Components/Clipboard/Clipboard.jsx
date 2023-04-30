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
      <h2 className='Title'>Inocence Clipboard</h2>

      <div className='row'>
        <div className="col0">
          <label className="col0">Character Name</label>
        </div>
        <div className="col1-6">
          <label className="col1-6">Rev. Green</label>
          <label className="col1-6">Col. Mustard</label>
          <label className="col1-6">Mrs. Peacock</label>
          <label className="col1-6">Prof. Plum</label>
          <label className="col1-6">Miss Scarlet</label>
          <label className="col1-6">Mrs. White</label>
        </div>
      </div>

      <div className='row'>
        <div className="col0">
          <label className="col0">Player Name</label>   
        </div>
        <div className="col1-6">
          {Object.keys(playerRow).map( (player) => {
              return(<label className="col1-6" key={player}>{playerRow[player]}</label>)
            }
          )}
        </div>
      </div>

      <h3 className="cardType">Suspect</h3>

      <div className="row">
        <div className="col0">
          <label className="col0">Colonel Mustard</label>
        </div>
        <div className="col1-6">
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
        </div>
      </div>

      <div className="row">
        <div className="col0">
          <label className="col0">Professor Plum</label>
        </div>
        <div className="col1-6">
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
        </div>
      </div>

      <div className="row">
        <div className="col0">
          <label className="col0">Reverend Green</label>
        </div>
        <div className="col1-6">
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
        </div>
      </div>

      <div className="row">
        <div className="col0">
          <label className="col0">Mr. Peacock</label>
        </div>
        <div className="col1-6">
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
        </div>
      </div>

      <div className="row">
        <div className="col0">
          <label className="col0">Miss Scarlet</label>
        </div>
        <div className="col1-6">
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
        </div>
      </div>

      <div className="row">
        <div className="col0">
          <label className="col0">Mrs. White</label>
        </div>
        <div className="col1-6">
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
        </div>
      </div>

      <h3 className="cardType">Weapons</h3>

      <div className="row">
        <div className="col0">
          <label className="col0">Knife</label>
        </div>
        <div className="col1-6">
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
        </div>
      </div>

      <div className="row">
        <div className="col0">
          <label className="col0">Candle Stick</label>
        </div>
        <div className="col1-6">
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
        </div>
      </div>

      <div className="row">
        <div className="col0">
          <label className="col0">Revolver</label>
        </div>
        <div className="col1-6">
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
        </div>
      </div>

      <div className="row">
        <div className="col0">
          <label className="col0">Rope</label>
        </div>
        <div className="col1-6">
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
        </div>
      </div>

      <div className="row">
        <div className="col0">
          <label className="col0">Lead Pipe</label>
        </div>
        <div className="col1-6">
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
        </div>
      </div>

      <div className="row">
        <div className="col0">
          <label className="col0">Wrench</label>
        </div>
        <div className="col1-6">
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
        </div>
      </div>

      <h3 className="cardType">Rooms</h3>

      <div className="row">
        <div className="col0">
          <label className="col0">Hall</label>
        </div>
        <div className="col1-6">
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
        </div>
      </div>

      <div className="row">
        <div className="col0">
          <label className="col0">Lounge</label>
        </div>
        <div className="col1-6">
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
        </div>
      </div>

      <div className="row">
        <div className="col0">
          <label className="col0">Dining Room</label>
        </div>
        <div className="col1-6">
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
        </div>
      </div>

      <div className="row">
        <div className="col0">
          <label className="col0">Kitchen</label>
        </div>
        <div className="col1-6">
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
        </div>
      </div>

      <div className="row">
        <div className="col0">
          <label className="col0">Ballroom</label>
        </div>
        <div className="col1-6">
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
        </div>
      </div>

      <div className="row">
        <div className="col0">
          <label className="col0">Conservatory</label>
        </div>
        <div className="col1-6">
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
        </div>
      </div>

      <div className="row">
        <div className="col0">
          <label className="col0">Billiard Room</label>
        </div>
        <div className="col1-6">
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
        </div>
      </div>

      <div className="row">
        <div className="col0">
          <label className="col0">Library</label>
        </div>
        <div className="col1-6">
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
        </div>
      </div>

      <div className="row">
        <div className="col0">
          <label className="col0">Study</label>
        </div>
        <div className="col1-6">
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
          <input type="checkbox" className="col1-6"></input>
        </div>
      </div>
    </div>
    )
}

export default ClipBoard