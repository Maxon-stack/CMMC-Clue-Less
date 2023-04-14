import React, { useEffect, useState } from 'react'
import { set, get, ref, onValue } from 'firebase/database'
import { db } from '../../firebase'
import './Clipboard.css'

const ClipBoard = () => {

  const [players, setPlayers] = useState({})

  useEffect(() => {
    const playersRef = ref(db, '/game/players');
    onValue(playersRef, (snapshot) => {
      const data = snapshot.val();
      setPlayers(data);
    });
  }, [])

  return (
    <div>
      <h2>Inocence Clipboard</h2>

      <div className='row'>
        <div className="col0">
          <label className="col0">Character Name</label>
        </div>
        <div className="col1-6">
          <label className="col1-6">Col. Mustard</label>
          <label className="col1-6">Prof. Plum</label>
          <label className="col1-6">Rev. Green</label>
          <label className="col1-6">Mrs. Peacock</label>
          <label className="col1-6">Miss Scarlet</label>
          <label className="col1-6">Mrs. White</label>
        </div>
      </div>

      <div className='row'>
        <div className="col0">
          <label className="col0">Player Name</label>
        </div>
        <div className="col1-6">
          <label className="col1-6">{players.Mustard.name}</label>
          <label className="col1-6">{players.Plum.name}</label>
          <label className="col1-6">{players.Green.name}</label>
          <label className="col1-6">{players.Peacock.name}</label>
          <label className="col1-6">{players.Scarlet.name}</label>
          <label className="col1-6">{players.White.name}</label>
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