import HTTPTransport from "../core/httpTransport";

const httpTransport = new HTTPTransport();

export const resourceAPI = {
  async createResource(data: FormData) {
    return httpTransport.post("/resources", {
      data: data,
    });
  },
};
