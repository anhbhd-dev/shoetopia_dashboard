import { useQuery } from "@tanstack/react-query";
import { OrderParamsType, fetchOrders } from "../order-services";

export const useOrders = (orderQueryParams?: OrderParamsType) => {
  return useQuery({
    queryKey: ["orders", orderQueryParams],
    queryFn: () => fetchOrders(orderQueryParams),
  });
};
