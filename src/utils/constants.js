export const locationCards = [
  "Study",
  "Hall",
  "Lounge",
  "Libary",
  "Billiard Room",
  "Dining Room",
  "Conservatory",
  "Ballroom",
  "Kitchen"
]
export const characterCards = [
  "Miss Scarlet",
  "Col. Mustard",
  "Mrs. White",
  "Mr. Green",
  "Mrs. Peacock",
  "Prof. Plum",
]
export const weaponCards = [
  "knife",
  "Candle Stick",
  "Reolver",
  "Rope",
  "Lead Pipe",
  "Wrench",
]
export const manageRooms = [
  {
    id: 1,
    roomTitle: 'Study',
    options: [2, 6, 21]
  },
  {
    id: 2,
    roomTitle: 'hall_1',
    options: [1, 3]
  },
  {
    id: 3,
    roomTitle: 'Hall',
    options: [2, 7, 4]
  },
  {
    id: 4,
    roomTitle: 'hall_2',
    options: [3, 5]
  },
  {
    id: 5,
    roomTitle: 'Lounge',
    options: [4, 17, 8]
  },
  {
    id: 6,
    roomTitle: 'hall_3',
    options: [1, 9]
  },
  {
    id: 7,
    roomTitle: 'hall_4',
    options: [3, 11]
  },
  {
    id: 8,
    roomTitle: 'hall_5',
    options: [5, 13]
  },
  {
    id: 9,
    roomTitle: 'Library',
    options: [6, 10, 14]
  },
  {
    id: 10,
    roomTitle: 'hall_6',
    options: [9, 11]
  },
  {
    id: 11,
    roomTitle: 'Billiard Room',
    options: [7, 10, 12, 15]
  },
  {
    id: 12,
    roomTitle: 'hall_7',
    options: [11, 13]
  },
  {
    id: 13,
    roomTitle: 'Dining Room',
    options: [8, 12, 16]
  },
  {
    id: 14,
    roomTitle: 'hall_8',
    options: [9, 17]
  },
  {
    id: 15,
    roomTitle: 'hall_9',
    options: [11, 19]
  },
  {
    id: 16,
    roomTitle: 'hall_10',
    options: [13, 21]
  },
  {
    id: 17,
    roomTitle: 'Conservatory',
    options: [14, 5, 18]
  },
  {
    id: 18,
    roomTitle: 'hall_11',
    options: [17, 19]
  },
  {
    id: 19,
    roomTitle: 'Ball',
    options: [18, 15, 20]
  },
  {
    id: 20,
    roomTitle: 'hall_12',
    options: [19, 21]
  },
  {
    id: 21,
    roomTitle: 'Kitchen',
    options: [20, 16, 1]
  },
  {
    id: 22,
    roomTitle: '',
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
		weapon: ""
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



// get a random card 