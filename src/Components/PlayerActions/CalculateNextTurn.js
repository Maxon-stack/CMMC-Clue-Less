import { characterAliasMap, manageRooms } from '../../utils/constants'

export const calculateNextTurn = (myCharacter, gameState) => {  

  const playersObject = gameState?.turnState?.playerTurnQueue
  //list of character keys
  const characters = ["Green", "Mustard", "Peacock", "Plum", "Scarlet", "White",]
  //remove our character from the list
  for (let i = 0; i < 6; i++) {
    if (characters[i] == myCharacter) {
      characters.splice(i, 1)
    }
  }
  //generate the order to look at the players
  const characterNamesInOrder = []
  const myTurn = gameState?.turnState?.playerTurnQueue[myCharacter]?.turnNumber
  for (let i = myTurn; i <= characters.length + myTurn; i++) {
    for (let j = 0; j < characters.length; j++) {
      if (gameState?.turnState?.playerTurnQueue[characters[j]]?.turnNumber == i + 1 % 6) {
        characterNamesInOrder.push(characters[j])
      }
    }
  }

  //get next player with eligible turn
  //todo: decide what happens if everyone has failed to accuse
  let newCurrentTurn  
  for(let i = 0; i<= characterNamesInOrder.length; i++){
    if(playersObject[characterNamesInOrder[i]].isFailAccuse === false){
      newCurrentTurn = {
        name: characterNamesInOrder[i],
        count: playersObject[characterNamesInOrder[i]].turnNumber
      }
      break
    }
  }

  return newCurrentTurn;

}