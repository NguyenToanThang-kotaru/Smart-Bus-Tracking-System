// axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3700/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// interceptor: thêm accessToken vào mỗi request
axiosClient.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// interceptor: xử lý lỗi response
axiosClient.interceptors.response.use(
  (response) => response, // nếu OK thì trả về luôn
  async (error) => {
    const originalRequest = error.config;

    // nếu token hết hạn và chưa thử refresh lần nào
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true; // tránh lặp vô hạn
      console.log("loadrftoke...")
      try {
        const res = await axios.post("http://localhost:3700/api/auth/refresh", {},{ withCredentials: true } );
        const newAccessToken = res.data.accessToken;
        sessionStorage.setItem("accessToken", newAccessToken);

        // gắn token mới rồi gọi lại request cũ
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (err) {
        console.log(err)
        sessionStorage.clear();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
