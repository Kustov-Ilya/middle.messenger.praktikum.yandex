import HTTPTransport from "../core/httpTransport";
import { LoginReqData, RegisterReqData } from "../utils/types";


const httpTransport = new HTTPTransport();

export const authAPI = {
  async login(data: LoginReqData) {
    return httpTransport.post(`/auth/signin`, {
      headers: {
        "content-type": "application/json",
      },
      data: data,
    });
  },
  async register(data: RegisterReqData) {
    return httpTransport.post(`/auth/signup`, {
      headers: {
        "content-type": "application/json",
      },
      data: data,
    });
  },
  async getUserData() {
    return httpTransport.get(`/auth/user`, {
      headers: {
        "content-type": "application/json",
      },
    });
  },
  async logout() {
    return httpTransport.post(`/auth/logout`, {
      headers: {
        "content-type": "application/json",
      },
    });
  },
};
