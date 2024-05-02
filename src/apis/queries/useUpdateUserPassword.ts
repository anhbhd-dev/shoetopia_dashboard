import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserPassword } from "../user.services";

export const useUpdatePassword = (userId: string) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: updateUserPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [userId] });
      toast({
        title: "Cập nhật mật khẩu thành công",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    },
    onError: (err) => {
      toast({
        title: "Thất bại",
        description: "Cập nhật thất bại do mật khẩu hiện tại không đúng",
        status: "error",
        duration: 1500,
        isClosable: true,
      });
      console.log(err);
    },
  });
};
