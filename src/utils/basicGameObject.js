let dateCreated = new Date()
export const basicGameObject = {
    "gameStarted": false,
    "gameEnded": false,
    "dateCreated": "today",
    "BasicGameState": {
        "playerCount": 0,
        "playerDecks": {
            "Green": {
                "characterCards": [],
                "locationCards": [],
                "playerName": "",
                "weaponCards": []
            },
            "Mustard": {
                "characterCards": [],
                "locationCards": [],
                "playerName": "",
                "weaponCards": []
            },
            "Peacock": {
                "characterCards": [],
                "locationCards": [],
                "playerName": "",
                "weaponCards": []
            },
            "Plum": {
                "characterCards": [],
                "locationCards": [],
                "playerName": "",
                "weaponCards": []
            },
            "Scarlet": {
                "characterCards": [],
                "locationCards": [],
                "playerName": "",
                "weaponCards": []
            },
            "White": {
                "characterCards": [],
                "locationCards": [],
                "playerName": "",
                "weaponCards": []
            }
        },
        "playerLocations": {
            "Green": 14,
            "Mustard": 8,
            "Peacock": 10,
            "Plum": 6,
            "Scarlet": 4,
            "White": 16
        },
        "turnState": {
            "currentSuggestion": {
                "accepted": false,
                "character": "",
                "disprover": "",
                "disprovingCard": "",
                "location": "",
                "locationTitle": "",
                "submitted": false,
                "suggestor": "",
                "weapon": ""
            },
            "currentTurn": {
                "count": 0,
                "name": ""
            },
            "isWaiting": false,
            "playerTurnQueue": {
                "Green": {
                    "isFailAccuse": false,
                    "turnNumber": 0
                },
                "Mustard": {
                    "isFailAccuse": false,
                    "turnNumber": 0
                },
                "Peacock": {
                    "isFailAccuse": false,
                    "turnNumber": 0
                },
                "Plum": {
                    "isFailAccuse": false,
                    "turnNumber": 0
                },
                "Scarlet": {
                    "isFailAccuse": false,
                    "turnNumber": 0
                },
                "White": {
                    "isFailAccuse": false,
                    "turnNumber": 0
                }
            }
        },
        "winningCards": {
            "character": "",
            "location": "",
            "weapon": ""
        }
    },
    "players": {
        "Green": {
            "name": "",
            "uid": "",
            "turn": 0,
            "characterName": "Reverend Green"
        },
        "Mustard": {
            "name": "",
            "uid": "",
            "turn": 0,
            "characterName": "Colonel Mustard"
        },
        "Peacock": {
            "name": "",
            "uid": "",
            "turn": 0,
            "characterName": "Mrs. Peacock"
        },
        "Plum": {
            "name": "",
            "uid": "",
            "turn": 0,
            "characterName": "Professor Plum"
        },
        "Scarlet": {
            "name": "",
            "uid": "",
            "turn": 0,
            "characterName": "Miss Scarlet"
        },
        "White": {
            "name": "",
            "uid": "",
            "turn": 0,
            "characterName": "Mrs. White"
        }
    }
}