import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config) => {
    // Lấy accessToken từ localStorage
    const accessToken = localStorage.getItem("adminAccessToken");

    // Nếu có accessToken, đính kèm vào header Authorization
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm một interceptor response
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("adminRefreshToken");
    // Nếu lỗi 403 (Forbidden)
    if (
      (error.response.status === 403 || error.response.status === 401) &&
      refreshToken &&
      !originalRequest._retry
    ) {
      console.log("run");
      originalRequest._retry = true;

      try {
        // Lấy refreshToken từ localStorage

        // Gửi refreshToken để lấy accessToken và refreshToken mới
        const response = await axios.post("/auth/admin/refresh", {
          refreshToken,
        });

        // Lưu accessToken và refreshToken mới vào localStorage
        localStorage.setItem("adminAccessToken", response.data.accessToken);
        localStorage.setItem("adminRefreshToken", response.data.refreshToken);

        // Gửi lại request ban đầu với accessToken mới
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        // Nếu refreshToken cũng hết hạn, đăng xuất và đăng nhập lại
        throw new Error("Refresh token is expired. Please log in again.");
        // Xử lý đăng xuất ở đây (ví dụ: chuyển hướng trang đăng nhập, xóa localStorage, ...)
      }
    }

    // Trả về lỗi nếu không thể xử lý
    return Promise.reject(error);
  }
);

export default axiosInstance;
