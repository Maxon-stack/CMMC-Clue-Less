import { keyToCharacter, characterToKey,manageRooms } from '../../utils/constants'

export const calculateDisprover = (localPlayer,suspect,weapon,location,players) => {

    //list of character keys
    const characterKeys = Object.keys(players)
    const numPlayers = characterKeys.length
    //remove our character from the list
    for(let i = 0; i<characterKeys.length; i++){
        if(characterKeys[i] == characterToKey[localPlayer.characterName]){
            characterKeys.splice(i,1)
        }
    }
    //generate the order to look at the players
    const characterKeysInOrder = []
    const myTurn = localPlayer.turn
    for(let i = myTurn; i < numPlayers - 1 + myTurn; i++){ //checks 
        const turnToCheck = i % numPlayers + 1
        for(let j = 0; j < numPlayers - 1; j++){
            if(players[characterKeys[j]].turn == turnToCheck){
                characterKeysInOrder.push(characterKeys[j])
            }
        }
    }

    let disprover = ""
    for(let i = 0; i < characterKeysInOrder.length; i++){
        let found = false
        let currentPlayerDeck = players[characterKeysInOrder[i]]["deck"]
        let currentPlayerName = players[characterKeysInOrder[i]]["playerName"]
        if(!found){
            if(currentPlayerDeck.includes(suspect)){disprover=currentPlayerName;found=true;}
            if(currentPlayerDeck.includes(weapon)){disprover=currentPlayerName;found=true;}
            if(currentPlayerDeck.includes(location)){disprover=currentPlayerName;found=true;}
        }
    }
    if(disprover == ""){
        return "Not Found"
    }else{
        return disprover
    }

}