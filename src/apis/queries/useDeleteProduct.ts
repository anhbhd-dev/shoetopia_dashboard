import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../product-services";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Xóa sản phẩm thành công",
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
