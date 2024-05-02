import { User } from "../types/order.type";
import axiosInstance from "./axios-initial";

export const fetchUserProfile = async (): Promise<User | undefined> => {
  try {
    const response = await axiosInstance.get(
      `http://${
        import.meta.env.VITE_BASE_API_ENDPOINT
      }/api/v1/admin/users/profile`
    );
    return response.data;
  } catch (error) {
    // Xử lý lỗi
    throw Error(error as string);
  }
};

export type UserLoginFormType = {
  email: string;
  password: string;
};
export const login = async (loginData: UserLoginFormType) => {
  const response = await axiosInstance.post(
    `http://${import.meta.env.VITE_BASE_API_ENDPOINT}/api/v1/auth/admin/login`,
    loginData
  );
  return response.data;
};
export type updatePasswordType = {
  password: string;
  newPassword: string;
  _id: string;
};

export const updateUserPassword = async (data: updatePasswordType) => {
  const response = await axiosInstance.put(
    `http://${
      import.meta.env.VITE_BASE_API_ENDPOINT
    }/api/v1/admin/users/password/${data._id}`,
    data
  );

  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DeleteVariationPayloadType = {
  id: string;
  productId: string;
};
export const deleteVariation = async (payload: DeleteVariationPayloadType) => {
  const response = await axiosInstance.delete(
    `http://${import.meta.env.VITE_BASE_API_ENDPOINT}/api/v1/admin/variations/${
      payload.id
    }`,
    { data: { productId: payload.productId } }
  );

  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to delete product");
};
