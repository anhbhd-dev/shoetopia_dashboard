import { OrderBy, SortBy } from "../enum/sort.enum";
import axiosInstance from "./axios-initial";

export type CategoryParamsType = {
  name?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  orderBy?: string;
};

const DEFAULT_CATEGORY_PARAMS: CategoryParamsType = {
  page: 1,
  limit: 5,
  sortBy: SortBy.CREATED_AT,
  orderBy: OrderBy.DESC,
};

export const fetchCategories = async (queryParams?: CategoryParamsType) => {
  try {
    const mergedParams = { ...DEFAULT_CATEGORY_PARAMS, ...queryParams };

    const response = await axiosInstance.get(
      `http://${
        import.meta.env.VITE_BASE_API_ENDPOINT
      }/api/v1/admin/categories`,
      { params: mergedParams }
    );
    return response.data;
  } catch (error) {
    // Xử lý lỗi
    console.error(error);
  }
};

export const createCategory = async (categoryName: string) => {
  const newCategory = {
    name: categoryName,
  };

  try {
    const response = await axiosInstance.post(
      `http://${
        import.meta.env.VITE_BASE_API_ENDPOINT
      }/api/v1/admin/categories`,
      newCategory
    );
    return response.data;
  } catch (error) {
    // Xử lý lỗi
    console.error(error);
  }
};
export type UpdateCategoryType = {
  _id: string;
  categoryName: string;
  isShowAtHomePage?: boolean;
};
export const updateCategory = async (data: UpdateCategoryType) => {
  const updatedData = {
    name: data.categoryName,
    isShowAtHomePage: data.isShowAtHomePage,
  };

  const response = await axiosInstance.put(
    `http://${import.meta.env.VITE_BASE_API_ENDPOINT}/api/v1/admin/categories/${
      data._id
    }`,
    updatedData
  );

  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to update category");
};

export const deleteCategory = async (id: string) => {
  const response = await axiosInstance.delete(
    `http://${
      import.meta.env.VITE_BASE_API_ENDPOINT
    }/api/v1/admin/categories/${id}`
  );

  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to delete category");
};
