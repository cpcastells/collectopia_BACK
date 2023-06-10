import { type Request } from "express";
import { type Types } from "mongoose";

export interface UserCredentials {
  username: string;
  password: string;
}
export interface UserCredentialsDatabaseStructure extends UserCredentials {
  _id: string;
}

export interface UserDatabaseData extends UserCredentials {
  _id: Types.ObjectId;
}

export type UserCredentialsRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;

export interface CustomRequest extends Request {
  userId: string;
  params: {
    boardgameId: string;
  };
  body: BoardgameStructure;
  query: {
    limit?: string;
    filter?: string;
  };
}

export interface BoardgameDatabaseStructure {
  _id: Types.ObjectId;
  title: string;
  image: string;
  category: string;
  mechanics: string;
  players: {
    min: number;
    max?: number;
  };
  duration: number;
  briefDescription: string;
  price?: number;
  author?: string;
  releaseYear?: number;
  user: Types.ObjectId;
}

export interface BoardgameStructure {
  title: string;
  image: string;
  category: string;
  mechanics: string;
  players: {
    min: number;
    max?: number;
  };
  duration: number;
  briefDescription: string;
  price?: number;
  author?: string;
  releaseYear?: number;
}
