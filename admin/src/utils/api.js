import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error);
        const message = error.response?.data?.message || "Something went wrong. Please try again later.";
        toast.error(message);
        return Promise.reject(error);
    }
);

export default api;
