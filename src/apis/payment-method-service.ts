import axiosInstance from "./axios-initial";

export type PaymentMethodParamsType = {
  name?: string;
};

export const fetchPaymentMethods = async () => {
  try {
    const response = await axiosInstance.get(
      `http://${import.meta.env.VITE_BASE_API_ENDPOINT}/api/v1/payment-methods`
    );
    return response.data;
  } catch (error) {
    // Xử lý lỗi
    throw new Error(error as string);
  }
};

export interface PaymentMethod {
  _id: string;
  name: string;
  isEnabled: boolean;
}

export const fetchPaymentMethodByName = async (
  name: string
): Promise<PaymentMethod> => {
  try {
    const response = await axiosInstance.get(
      `http://${
        import.meta.env.VITE_BASE_API_ENDPOINT
      }/api/v1/payment-methods/${name}`
    );
    return response.data;
  } catch (error) {
    // Xử lý lỗi
    throw new Error(error as string);
  }
};

export type UpdatePaymentMethodType = {
  name: string;
  isEnabled: boolean;
};
export const updatePaymentMethod = async (data: UpdatePaymentMethodType) => {
  const response = await axiosInstance.put(
    `http://${import.meta.env.VITE_BASE_API_ENDPOINT}/api/v1/payment-methods`,
    data
  );

  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to update payment method");
};
