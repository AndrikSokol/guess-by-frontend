import { useQuery } from "@tanstack/react-query";
import { Api } from "../api/api";

export const useGameQuery = (link: string) =>
  useQuery({
    queryKey: ["game"],
    queryFn: () => Api.getGameByLink(link),
    retry: 0
  });
