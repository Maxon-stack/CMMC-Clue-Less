export const calculateNextTurn = (localPlayer, players) => {  

  console.log('localPlayer')
  console.log(localPlayer)
  console.log('players')
  console.log(players)

  //list of character keys
  const characterKeys = Object.keys(players)
  const numPlayers = characterKeys.length

  let validPlayerFound = false //assumes there is no valid players
  let noOneReamins = false
  let newTurn = localPlayer.turn % numPlayers + 1 //assumes new turn will be the next turn
  //repeats until a valid player is found or we get back to my turn
  
  while(!validPlayerFound && !noOneReamins){ 
    for(let i = 0; i < numPlayers; i++){ //itterates through all players
      //triggers once the player with the matching turn is found AND they are still in the game
      if(players[characterKeys[i]]["turn"] == newTurn && players[characterKeys[i]]["isFailAccuse"] == false){
        validPlayerFound = true //signals a valid player was found
      }
    }
    //if a valid player was not found increment turn
    if(!validPlayerFound){
      newTurn = newTurn % numPlayers + 1
    }
    if(newTurn == localPlayer.turn && localPlayer.isFailAccuse == false){
      validPlayerFound = true
    }
    if(newTurn == localPlayer.turn && localPlayer.isFailAccuse == true){
      noOneReamins = true
    }
  
  }

  if(noOneReamins){newTurn = 0} //if no valid player found 0 is returned 

  return newTurn;

}