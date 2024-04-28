import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVariation } from "../variation-service";
import { useToast } from "@chakra-ui/react";

export const useCreateVariation = (productId: string) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: createVariation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", productId] });
      toast({
        title: "Thêm thành công",
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
