import { PageMeta } from "./page-meta.type";

export type Leaderboard = {
  userId: number;
  username: string;
  totalGames: number;
  totalRounds: number;
  totalTimeMinutes: number;
};

export type LeaderboardResponse = {
  data: Leaderboard[];
  meta: PageMeta;
};
