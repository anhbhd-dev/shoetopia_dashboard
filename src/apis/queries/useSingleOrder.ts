import { useQuery } from "@tanstack/react-query";
import { fetchOrderById } from "../order-services";

export const useSingleOrder = (orderId: string) => {
  return useQuery({
    queryKey: [orderId],
    queryFn: () => fetchOrderById(orderId),
  });
};
