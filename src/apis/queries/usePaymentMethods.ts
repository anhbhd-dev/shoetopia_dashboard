import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchPaymentMethodByName,
  fetchPaymentMethods,
  updatePaymentMethod,
} from "../payment-method-service";

export const usePaymentMethods = () => {
  return useQuery({
    queryKey: ["paymentMethods"],
    queryFn: () => fetchPaymentMethods(),
  });
};
export const useSinglePaymentMethod = (name: string) => {
  return useQuery({
    queryKey: [name],
    queryFn: () => fetchPaymentMethodByName(name),
  });
};

export const useUpdatePaymentMethodStatus = (name: string) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: updatePaymentMethod,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [name] });
      return toast({
        title: "Cập nhật thành công",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    },
    onError: (err) => {
      return toast({
        title: "Đã xảy ra lỗi",
        description: err.message,
        status: "error",
        duration: 1500,
        isClosable: true,
      });
    },
  });
};
