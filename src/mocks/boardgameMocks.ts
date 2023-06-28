import { Types } from "mongoose";
import {
  type BoardgameStructure,
  type BoardgameDatabaseStructure,
} from "../types";

export const boardGamesMock: BoardgameDatabaseStructure[] = [
  {
    _id: new Types.ObjectId("6478dd2fe3e61710d8baa049"),
    title: "Terraforming Mars",
    image: "terraforming_mars_image_url",
    category: "Strategy",
    mechanics: "Card Drafting",
    players: {
      min: 1,
      max: 5,
    },
    duration: 150,
    briefDescription:
      "Terraforming Mars is a science fiction board game where players act as corporations to transform Mars into a habitable planet.",
    price: 70,
    author: "Jacob Fryxelius",
    releaseYear: 2016,
    user: new Types.ObjectId("646f7e585189305e28a57d55"),
  },
  {
    _id: new Types.ObjectId(),
    title: "Brass: Lancashire",
    image: "brass_lancashire_image_url",
    category: "Strategy",
    mechanics: "Route/Network Building",
    players: {
      min: 2,
      max: 4,
    },
    duration: 160,
    briefDescription:
      "Brass: Lancashire is a game of economic strategy, set during the industrial revolution in Lancashire.",
    price: 60,
    author: "Martin Wallace",
    releaseYear: 2007,
    user: new Types.ObjectId("646f7e585189305e28a57d55"),
  },
];

export const newBoardgameMock: BoardgameStructure = {
  title: "Hive Pocket",
  image:
    "https://media.discordapp.net/attachments/1114204200885301331/1114467463279681656/hive.webp?width=583&height=588",
  category: "Strategy",
  mechanics: "Route/Network Building",
  players: {
    min: 2,
    max: 4,
  },
  duration: 160,
  briefDescription:
    "Brass: Lancashire is a game of economic strategy, set during the industrial revolution in Lancashire.",
  price: 60,
  author: "Martin Wallace",
  releaseYear: 2007,
};

export const boardgameByIdMock = {
  title: "Terraforming Mars",
  image: "terraforming_mars_image_url",
  category: "Strategy",
  mechanics: "Card Drafting",
  players: {
    min: 1,
    max: 5,
  },
  duration: 150,
  briefDescription:
    "Terraforming Mars is a science fiction board game where players act as corporations to transform Mars into a habitable planet.",
  price: 70,
  author: "Jacob Fryxelius",
  releaseYear: 2016,
  user: "646f7e585189305e28a57d55",
};

export const boardgameCardMock = {
  title: "Terraforming Mars",
  image: "terraforming_mars_image_url",
  category: "Strategy",
  mechanics: "Card Drafting",
  players: {
    min: 1,
    max: 5,
  },
  duration: 150,
  briefDescription:
    "Terraforming Mars is a science fiction board game where players act as corporations to transform Mars into a habitable planet.",
  price: 70,
  author: "Jacob Fryxelius",
  releaseYear: 2016,
  user: "646f7e585189305e28a57d55",
  id: "6478dd2fe3e61710d8baa049",
};
