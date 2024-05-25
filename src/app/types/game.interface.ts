export enum StatusGame {
  FINISHED = "finished",
  STARTED = "started"
}

export interface IScore {
  id: number;
  gameId: number;
  round: number;
  score: number;
  userId: number;
  createdAt: Date;
}

export interface IGame {
  id: number;
  roomId: number;
  round: number;
  totalRounds: number;
  link: string;
  status: StatusGame;
  scores: IScore[];
  createdAt: Date;
  updatedAt: Date;
}
