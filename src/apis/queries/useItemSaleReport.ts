import { useQuery } from "@tanstack/react-query";
import { fetchItemsSaleReport } from "../product-services";
import { countOrders, countRevenue } from "../order-services";

export const useItemSaleReport = (
  currentPage = 1,
  startDate?: string,
  endDate?: string
) => {
  return useQuery({
    queryKey: ["itemsSaleReport", startDate, endDate],
    queryFn: () => fetchItemsSaleReport(currentPage, startDate, endDate),
  });
};
export const useRevenue = (startDate?: string, endDate?: string) => {
  return useQuery({
    queryKey: ["revenue", startDate, endDate],
    queryFn: () => countRevenue(startDate, endDate),
  });
};
export const useCountOrderToday = () => {
  return useQuery({
    queryKey: ["orderToday"],
    queryFn: () => countOrders(),
  });
};
