import { useQuery } from "@tanstack/react-query";
import { ProductParamsType, fetchProducts } from "../product-services";

export const useProducts = (productQueryParams?: ProductParamsType) => {
  return useQuery({
    queryKey: ["products", productQueryParams],
    queryFn: () => fetchProducts(productQueryParams),
  });
};
