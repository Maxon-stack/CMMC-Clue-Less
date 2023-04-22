export const locationCards = [
  "Study",
  "Hall",
  "Lounge",
  "Library",
  "Billiard Room",
  "Dining Room",
  "Conservatory",
  "Ballroom",
  "Kitchen"
]
export const characterCards = [
  "Miss Scarlet",
  "Colonel Mustard",
  "Mrs. White",
  "Reverend Green",
  "Mrs. Peacock",
  "Professor Plum",
]
export const weaponCards = [
  "Knife",
  "Candle Stick",
  "Revolver",
  "Rope",
  "Lead Pipe",
  "Wrench",
]
export const weaponsObject = [
  {
    id: 1,
    weaponTitle: "Knife"
  },
  {
    id: 2,
    weaponTitle: "Candle Stick"
  },
  {
    id: 3,
    weaponTitle: "Revolver"
  },
  {
    id: 4,
    weaponTitle: "Rope"
  },
  {
    id: 5,
    weaponTitle: "Lead Pipe"
  },
  {
    id: 6,
    weaponTitle: "Wrench"
  },
]
export const manageRooms = [
  {
    id: 1,
    roomTitle: "Study",
    options: [2, 6, 21]
  },
  {
    id: 2,
    roomTitle: "hall_1",
    options: [1, 3]
  },
  {
    id: 3,
    roomTitle: "Hall",
    options: [2, 7, 4]
  },
  {
    id: 4,
    roomTitle: "hall_2",
    options: [3, 5]
  },
  {
    id: 5,
    roomTitle: "Lounge",
    options: [4, 17, 8]
  },
  {
    id: 6,
    roomTitle: "hall_3",
    options: [1, 9]
  },
  {
    id: 7,
    roomTitle: "hall_4",
    options: [3, 11]
  },
  {
    id: 8,
    roomTitle: "hall_5",
    options: [5, 13]
  },
  {
    id: 9,
    roomTitle: "Library",
    options: [6, 10, 14]
  },
  {
    id: 10,
    roomTitle: "hall_6",
    options: [9, 11]
  },
  {
    id: 11,
    roomTitle: "Billiard Room",
    options: [7, 10, 12, 15]
  },
  {
    id: 12,
    roomTitle: "hall_7",
    options: [11, 13]
  },
  {
    id: 13,
    roomTitle: "Dining Room",
    options: [8, 12, 16]
  },
  {
    id: 14,
    roomTitle: "hall_8",
    options: [9, 17]
  },
  {
    id: 15,
    roomTitle: "hall_9",
    options: [11, 19]
  },
  {
    id: 16,
    roomTitle: "hall_10",
    options: [13, 21]
  },
  {
    id: 17,
    roomTitle: "Conservatory",
    options: [14, 5, 18]
  },
  {
    id: 18,
    roomTitle: "hall_11",
    options: [17, 19]
  },
  {
    id: 19,
    roomTitle: "Ball",
    options: [18, 15, 20]
  },
  {
    id: 20,
    roomTitle: "hall_12",
    options: [19, 21]
  },
  {
    id: 21,
    roomTitle: "Kitchen",
    options: [20, 16, 1]
  },
  {
    id: 22,
    roomTitle: "",
    options: []
  },

]

export const turnState = {
	currentTurn: {
    count: 1,
    name: "Scarlet",
  },
	isWaiting: false,
	currentSuggestion: {
		character: "",
		location: "",
    locationTitle: "",
		weapon: "",
    suggestor: "",
    disprover: "",
    disprovingCard: "",
    accepted: false,
    submitted: false,
  },
  whoCanDisprove: {
    weapon: "",
    character: "",
    location: ""
  },
	playerTurnQueue: {
		Scarlet: {
			turnNumber: 1,
			isFailAccuse: false
		},
		Mustard: {
			turnNumber: 2,
			isFailAccuse: false
		},
		White: {
			turnNumber: 3,
			isFailAccuse: false
		},
		Green: {
			turnNumber: 4,
			isFailAccuse: false
		},
		Peacock: {
			turnNumber: 5,
			isFailAccuse: false
		},
		Plum: {
			turnNumber: 6,
			isFailAccuse: false
		}
	}
}

//this is something I (Ryan) added so I can map the playingAs character key
//string like plum or peacock to the full character name i.e. Professor Plum 
//or Mrs. Peacock, just for display purposes
export const characterAliasMap = {
  "Green": "Reverend Green",
  "Mustard": "Colonel Mustard",
  "Peacock": "Mrs. Peacock",
  "Plum": "Professor Plum",
  "Scarlet": "Miss Scarlet",
  "White": "Mrs. White",
  "Rev. Green": "Reverend Green",
  "Mr. Green": "Reverend Green",
  "Col. Mustard": "Colonel Mustard",
  "Prof. Plum": "Professor Plum",
}

export const characterToKey = {
  "Reverend Green": "Green",
  "Colonel Mustard": "Mustard",
  "Mrs. Peacock" : "Peacock",
  "Professor Plum": "Plum",
  "Miss Scarlet": "Scarlet",
  "Mrs. White": "White",
}

// get a random card 