import { Schema, Types, model } from "mongoose";

const boardgameSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  mechanics: {
    type: String,
    required: true,
  },

  players: {
    min: {
      type: Number,
      required: true,
    },

    max: Number,
  },

  duration: {
    type: Number,
    required: true,
  },

  briefDescription: {
    type: String,
    required: true,
  },

  price: Number,

  author: String,

  releaseYear: Number,

  user: {
    type: Types.ObjectId,
    ref: "User",
  },
});

const Boardgame = model("Boardgame", boardgameSchema, "boardgames");

export default Boardgame;
