import { AuthService } from "./../Services/authService";
import axios from "axios";

const baseUrl = "https://localhost:44381";

export const mainService = axios.create({
  baseURL: baseUrl,
});

mainService.interceptors.request.use(
  (request) => {
    if (request.headers !== undefined) {
      request.headers["Authorization"] = AuthService.getInst().getEncoded();
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
