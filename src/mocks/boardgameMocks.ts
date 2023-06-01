import { Types } from "mongoose";
import { type BoardgameDatabaseStructure } from "../types";

export const boardGameMock: BoardgameDatabaseStructure[] = [
  {
    _id: new Types.ObjectId(),
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
    user: new Types.ObjectId(),
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
    user: new Types.ObjectId(),
  },
];
