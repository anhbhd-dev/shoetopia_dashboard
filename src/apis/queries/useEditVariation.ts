import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVariation } from "../variation-service";

export const useEditVariation = (productId: string) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: updateVariation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [productId] });
      toast({
        title: "Cập nhật thành công",
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
