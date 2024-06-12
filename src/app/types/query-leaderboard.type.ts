import { Order } from "@/app/enums/Order.enum";

export type QueryLeaderboard = {
  order?: Order;
  page: number;
  take: number;
  orderTotalGame?: Order;
  orderTotalRounds?: Order;
  orderTotalTime?: Order;
  orderUsername?: Order;
};
