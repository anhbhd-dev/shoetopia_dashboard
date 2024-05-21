import { useQuery } from "@tanstack/react-query";
import { fetchItemsSaleReport } from "../product-services";

export const useItemSaleReport = () => {
  return useQuery({
    queryKey: ["itemsSaleReport"],
    queryFn: () => fetchItemsSaleReport(),
  });
};
