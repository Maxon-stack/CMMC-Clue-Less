import { characterAliasMap, manageRooms } from '../../utils/constants'

export const calculateDisprover = (myCharacter,suspect,weapon,location,gameState) => {

    //list of character keys
    const characters = ["Green","Mustard","Peacock","Plum","Scarlet","White",]
    //remove our character from the list
    for(let i = 0; i<6; i++){
        if(characters[i] == myCharacter){
            characters.splice(i,1)
        }
    }
    //generate the order to look at the players
    const characterNamesInOrder = []
    const myTurn = gameState?.turnState?.playerTurnQueue[myCharacter].turnNumber
    for(let i = myTurn; i<=characters.length+myTurn; i++){
        for(let j = 0; j<characters.length; j++){
            if(gameState.turnState.playerTurnQueue[characters[j]].turnNumber == i+1 % 6){
                characterNamesInOrder.push(characters[j])
            }
        }
    }

    const playerDecks = gameState.playerDecks

    let disprover = ""
    for(let i = 0; i < characterNamesInOrder.length; i++){

        let notFound = true
        let currentCharacter = characterNamesInOrder[i]
        let characterDeck = playerDecks[currentCharacter].characterCards
        let weaponDeck = playerDecks[currentCharacter].weaponCards
        let locationDeck = playerDecks[currentCharacter].locationCards

        console.log("looking at "+currentCharacter)

        if(characterDeck && notFound){
            console.log("Looking at their character cards")
            for(let j = 0; j<characterDeck.length; j++){
                if(characterDeck[j] == suspect){
                    console.log("found "+suspect)
                    disprover = characterNamesInOrder[i]
                    notFound = false //leave loop
                }
            }
        }
        if(weaponDeck && notFound){
            console.log("Looking at their weapon cards")
            for(let j = 0; j<weaponDeck.length; j++){
                if(weaponDeck[j] == weapon){
                    console.log("found "+weapon)
                    disprover = characterNamesInOrder[i]
                    notFound = false //leave loop
                }
            }
        }
        if(locationDeck && notFound){
            console.log("Looking at their location cards")
            for(let j = 0; j<locationDeck.length; j++){
                if(locationDeck[j] == location){
                    console.log("found "+location)
                    disprover = characterNamesInOrder[i]
                    notFound = false //leave loop
                }
            }
        }

        if(!notFound){i = 6}
    }
    if(disprover == ""){
        return "Not Found"
    }else{
        return characterAliasMap[disprover]
    }

}