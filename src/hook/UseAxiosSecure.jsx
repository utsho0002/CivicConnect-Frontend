import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const axiosSecure = axios.create({
  baseURL: "https://assignment11-mocha-kappa.vercel.app",
});

const UseAxiosSecure = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user.getIdToken();
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      }
    );

    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log("Axios Secure Error:", error.response?.status);
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user]);

  return axiosSecure;
};

export default UseAxiosSecure;
