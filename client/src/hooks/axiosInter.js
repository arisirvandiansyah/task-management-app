import axios from "axios";

const axiosJWT = axios.create({
  withCredentials: true,
  credentials: "include",
});

axiosJWT.interceptors.request.use(
  async (config) => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/auth/token`,
      {
        withCredentials: true,
        credentials: "include",
      }
    );
    if (response) {
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosJWT;
