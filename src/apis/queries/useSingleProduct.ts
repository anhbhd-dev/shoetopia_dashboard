import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../product-services";

export const useSingleProduct = (productId: string) => {
  return useQuery({
    queryKey: [productId],
    queryFn: () => fetchProductById(productId),
  });
};
