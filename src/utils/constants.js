import mustardJpg from '../Assets/Players/Mustard.jpg'
import plumJpg from '../Assets/Players/Plum.jpg'
import greenJpg from '../Assets/Players/Green.jpg'
import peacockJpg from '../Assets/Players/Peacock.jpg'
import scarletJpg from '../Assets/Players/Scarlet.jpg'
import whiteJpg from '../Assets/Players/White.jpg'

export const characterImages = {
  "Reverend Green": greenJpg,
  "Colonel Mustard": mustardJpg,
  "Mrs. Peacock": peacockJpg,
  "Professor Plum": plumJpg,
  "Miss Scarlet": scarletJpg,
  "Mrs. White": whiteJpg,
}

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
    roomTitle: "Ballroom",
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

export const roomNameToNum = {
  "Study": 1,
  "hall_1": 2,
  "Hall": 3,
  "hall_2": 4,
  "Lounge": 5,
  "hall_3": 6,
  "hall_4": 7,
  "hall_5": 8,
  "Library": 9,
  "hall_6": 10,
  "Billiard Room": 11,
  "hall_7": 12,
  "Dining Room": 13,
  "hall_8": 14,
  "hall_9": 15,
  "hall_10": 16,
  "Conservatory": 17,
  "hall_11": 18,
  "Ballroom": 19,
  "hall_12": 20,
  "Kitchen": 21
}

export const hallwayLocations = [2, 4, 6, 7, 8, 10, 12, 14, 15, 16, 18, 20]

export const roomLocations = [1, 3, 5, 9, 11, 13, 17, 19, 21]

//this is something I (Ryan) added so I can map the playingAs character key
//string like plum or peacock to the full character name i.e. Professor Plum 
//or Mrs. Peacock, just for display purposes
export const keyToCharacter = {
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