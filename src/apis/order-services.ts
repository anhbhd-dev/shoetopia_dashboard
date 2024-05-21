import { OrderStatus } from "../enum/order";
import { OrderBy, SortBy } from "../enum/sort.enum";
import { Order } from "../types/order.type";
import { ProductFormType } from "../types/product.type";
import axiosInstance from "./axios-initial";

export type OrderParamsType = {
  orderStatus?: OrderStatus;
  orderCode?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  orderBy?: string;
};

const DEFAULT_CATEGORY_PARAMS: OrderParamsType = {
  page: 1,
  limit: 5,
  orderStatus: OrderStatus.PENDING,
  sortBy: SortBy.CREATED_AT,
  orderBy: OrderBy.DESC,
};

export const fetchOrders = async (queryParams?: OrderParamsType) => {
  try {
    const mergedParams = { ...DEFAULT_CATEGORY_PARAMS, ...queryParams };

    const response = await axiosInstance.get(
      `http://${import.meta.env.VITE_BASE_API_ENDPOINT}/api/v1/admin/orders`,
      { params: mergedParams }
    );
    return response.data;
  } catch (error) {
    // Xử lý lỗi
    throw new Error(error as string);
  }
};
export const countRevenue = async () => {
  try {
    const response = await axiosInstance.get(
      `http://${
        import.meta.env.VITE_BASE_API_ENDPOINT
      }/api/v1/admin/orders/statistics/total-revenue`
    );
    return response.data;
  } catch (error) {
    // Xử lý lỗi
    throw new Error(error as string);
  }
};
export const countOrders = async () => {
  try {
    const response = await axiosInstance.get(
      `http://${
        import.meta.env.VITE_BASE_API_ENDPOINT
      }/api/v1/admin/orders/statistics/order-today`
    );
    return response.data;
  } catch (error) {
    // Xử lý lỗi
    throw new Error(error as string);
  }
};

export const fetchOrderById = async (id: string): Promise<Order> => {
  try {
    const response = await axiosInstance.get(
      `http://${
        import.meta.env.VITE_BASE_API_ENDPOINT
      }/api/v1/admin/orders/${id}`
    );
    return response.data;
  } catch (error) {
    // Xử lý lỗi
    throw new Error(error as string);
  }
};

export const createProduct = async (productData: ProductFormType) => {
  try {
    const response = await axiosInstance.post(
      `http://${import.meta.env.VITE_BASE_API_ENDPOINT}/api/v1/admin/products`,
      productData
    );
    return response.data;
  } catch (error) {
    // Xử lý lỗi
    throw new Error(error as string);
  }
};

export type UpdateOrderDto = {
  orderId: string;
  orderStatus?: OrderStatus;
  shippingAddress?: string;
  phoneNumber?: string;
};

export const updateOrder = async (data: UpdateOrderDto) => {
  const response = await axiosInstance.put(
    `http://${import.meta.env.VITE_BASE_API_ENDPOINT}/api/v1/admin/orders/${
      data.orderId
    }`,
    data
  );

  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to update category");
};

export const deleteProduct = async (id: string) => {
  const response = await axiosInstance.delete(
    `http://${
      import.meta.env.VITE_BASE_API_ENDPOINT
    }/api/v1/admin/products/${id}`
  );

  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to delete product");
};
