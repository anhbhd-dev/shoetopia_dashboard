import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../category-services";

export const useDeleteCategories = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({
        title: "Xóa thành công",
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
