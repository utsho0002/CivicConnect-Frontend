
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://assignment11-mocha-kappa.vercel.app'
});



const useAxios = () => {
    return axiosInstance;
};

export default useAxios;
