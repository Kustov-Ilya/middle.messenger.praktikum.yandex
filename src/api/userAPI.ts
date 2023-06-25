import HTTPTransport from "../core/httpTransport";
import {
  SearchUserReqData,
  UpdatePasswordReqData,
  UserDataType,
} from "../utils/types";

const httpTransport = new HTTPTransport();

export const userAPI = {
  async updatePassword(data: UpdatePasswordReqData) {
    return httpTransport.put(`/user/password`, {
      headers: {
        "content-type": "application/json",
      },
      data: data,
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async updateProfileAvatar(data: any) {
    return httpTransport.put(`/user/profile/avatar`, {
      headers: {
        "content-type": "application/json",
      },
      data: data as Record<string, string>,
    });
  },
  async updateProfile(data: UserDataType) {
    return httpTransport.put(`/user/profile`, {
      headers: {
        "content-type": "application/json",
      },
      data: data,
    });
  },
  async getUser(id: string) {
    return httpTransport.get(`/user/${id}`, {
      headers: {
        "content-type": "application/json",
      },
    });
  },
  async searchUser(data: SearchUserReqData) {
    return httpTransport.get(`/user/search`, {
      headers: {
        "content-type": "application/json",
      },
      data: data,
    });
  },
  async updateAvatar(data: FormData) {
    return httpTransport.put("user/profile/avatar", {
      data,
    });
  },
};
