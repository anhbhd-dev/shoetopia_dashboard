import { useQuery } from "@tanstack/react-query";
import { CategoryParamsType, fetchCategories } from "../category-services";

export const useCategories = (queryCategoryParams?: CategoryParamsType) => {
  return useQuery({
    queryKey: ["categories", queryCategoryParams],
    queryFn: () => fetchCategories(queryCategoryParams),
  });
};
