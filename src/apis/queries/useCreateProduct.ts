import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../product-services";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Thêm sản phẩm thành công",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    },
    onError: (err) => {
      toast({
        title: "Đã xảy ra lỗi",
        description: err.message,
        status: "error",
        duration: 1500,
        isClosable: true,
      });
    },
  });
};
