import { useQuery } from "@tanstack/react-query";
import { Api } from "../api/api";
import { QueryLeaderboard } from "../types/query-leaderboard.type";

export const useLeaderboardQuery = (query: QueryLeaderboard) =>
  useQuery({
    queryKey: ["leaderboard", query],
    queryFn: () => Api.getUsersGames(query),
    retry: 0
  });
