import HTTPTransport from "../core/httpTransport";
import {
  CreateChatReqData,
  DeleteChatReqData,
  UsersChatReq,
} from "../utils/types";

const httpTransport = new HTTPTransport();

export const chatAPI = {
  async getChats() {
    return httpTransport.get(`/chats`, {
      headers: {
        "content-type": "application/json",
      },
    });
  },
  async createChat(data: CreateChatReqData) {
    return httpTransport.post(`/chats`, {
      headers: {
        "content-type": "application/json",
      },
      data: data,
    });
  },
  async deleteChat(data: DeleteChatReqData) {
    return httpTransport.delete(`/chats`, {
      headers: {
        "content-type": "application/json",
      },
      data: data,
    });
  },
  async addUsers(data: UsersChatReq) {
    return httpTransport.put(`/chats/users`, {
      headers: {
        "content-type": "application/json",
      },
      data: data,
    });
  },
  async deleteUsers(data: UsersChatReq) {
    return httpTransport.delete(`/chats/users`, {
      headers: {
        "content-type": "application/json",
      },
      data: data,
    });
  },
  async getChatToken(id: string) {
    return httpTransport.post(`/chats/token/${id}`, {
      headers: {
        "content-type": "application/json",
      },
    });
  },
  async addAvatar(data: FormData) {
    return httpTransport.put(`/chats/avatar`, {
      data: data,
    });
  },
};
