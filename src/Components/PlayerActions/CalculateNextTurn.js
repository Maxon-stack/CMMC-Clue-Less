export const calculateNextTurn = (localPlayer, players) => {  

  //list of character keys
  const characterKeys = Object.keys(players)
  const numPlayers = characterKeys.length

  let validPlayer = false //assumes there is no valid players
  let newTurn = localPlayer.turn % numPlayers + 1 //assumes new turn will be the next turn
  //repeats until a valid player is found or we get back to my turn
  while(validPlayer == false && newTurn != localPlayer.turn){ 
    for(let i = 0; i < numPlayers; i++){ //itterates through all players
      //triggers once the player with the matching turn is found AND they are still in the game
      if(players[characterKeys[i]]["turn"] == newTurn && players[characterKeys[i]]["isFailAccuse"] == false){
        validPlayer = true //signals a valid player was found
      }
    }
    //if a valid player was not found increment turn
    if(validPlayer == false){newTurn = newTurn % numPlayers + 1}
  }

  if(validPlayer == false){newTurn = 0} //if no valid player found 0 is returned 

  return newTurn;

}