import './NotYourTurn.css'
import CluelessContext from '../../CluelessContext'
import React, { useEffect, useState } from 'react'
import { images } from '../../utils/cards'
import { characterToKey } from '../../utils/constants'
import { manageRooms } from '../../utils/constants'


const NotYourTurn = () => {

    const {
    //the database which is used when we call get(ref(db,pathToVariable)) to get a specific variable
    //and a ref to the database used when we call update(dbRef,updates) where updates has absolute
    //paths to the variable as well as what to change to (key value pair), from firebase.js import
    db, dbRef,
    //useStates to track firebase real-time database (FBRTDB)
    suggestion, setSuggestion,
    currentTurn, setCurrentTurn,
    gameEnded, setGameEnded,
    gameStarted, setGameStarted,
    players, setPlayers,
    winningCards, setWinningCards,
    //useState to track my specific player
    localPlayer, setLocalPlayer,
    //useState to control what is shown
    showHome, setShowHome,
    showLobby, setShowLobby,
    showGame, setShowGame,
    gameOver, setGameOver,
    //useState so we access the right game in the FBRTDB
    gameCode, setGameCode,
    gameJoined, setGameJoined
    } = React.useContext(CluelessContext)

    //old players used for
    const [oldCurrentPlayer, setOldCurrentPlayer] = useState({})
    const [currentPlayerKey, setCurrentPlayerKey] = useState("")
    //flags to control what is seen
    const [moved, setMoved] = useState(false)
    const [suggested, setSuggested] = useState(false)
    const [suggestedCharacter, setSuggestedCharacter] = useState("")
    const [suggestedWeapon, setSuggestedWeapon] = useState("")
    const [suggestedLocation, setSuggestedLocation] = useState("")
    const [accused, setAccused] = useState(false)

    useEffect( () => {
        if(suggestion.disprover){ //there is a disrpover it is a suggestion
            setSuggested(true)
            setSuggestedCharacter(suggestion.character)
            setSuggestedWeapon(suggestion.weapon)
            setSuggestedLocation(suggestion.location)
        }
        //there is not a disprover but there is a character so it is an accuse
        //I KNOW it should be its own object but i am lazy
        if(!suggestion.disprover && suggestion.character){ 
            setAccused(true)
        }
    },[suggestion])

    useEffect( () => {
        let playersRemaining = 0
        Object.keys(players).map( (player) => {
            if(players[player]['isFailAccuse'] == false){playersRemaining++}
        })
        if(playersRemaining == 1){ //if only one player is left reset screen
            setMoved(false)
            setSuggested(false)
            setAccused(false)
        }
        if(currentPlayerKey){
            if(players[currentPlayerKey]['location'] != oldCurrentPlayer['location']){
                setMoved(true)
            }
        }
    }, [players])

    useEffect( () => {
        setOldCurrentPlayer(players)
        Object.keys(players).map( (player) => {
            if(players[player]['turn'] == currentTurn){
                setCurrentPlayerKey(player)
                setOldCurrentPlayer(players[player])
            }
        })
        setMoved(false)
        setSuggested(false)
        setAccused(false)
    }, [currentTurn])

    return (
    <div className="border-solid border-2 border-black text-center text-sm">
        <h2 className="text-sm text-red-600 font-medium">It is not Your turn yet</h2>
        <p className="text-sm font-medium" >It is {oldCurrentPlayer.playerName}'s turn as {oldCurrentPlayer.characterName}</p>
        <img className='card' src = {images[oldCurrentPlayer.characterName]} alt = "Card not found"></img>
        {moved && 
            <div>
                <p>{oldCurrentPlayer.playerName} moved from the {manageRooms[oldCurrentPlayer.location-1]['roomTitle']} to the {manageRooms[players[currentPlayerKey]['location']-1]['roomTitle']}</p>
            </div>
        }
        {suggested &&
            <div>
                <p>{oldCurrentPlayer.playerName} suggested that {suggestedCharacter} did it with the {suggestedWeapon} in the {suggestedLocation}</p>
            </div>
        }
        {accused &&
            <div>
                <p>{oldCurrentPlayer.playerName} accused {suggestion.character} of doing it with the {suggestion.weapon} in the {suggestion.location}</p>
            </div>
        }
    </div>
    )
}

export default NotYourTurn