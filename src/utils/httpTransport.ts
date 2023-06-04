import { METHODS } from "./consts";
import queryStringify from "./queryStringify";
import { HTTPMethod, RequestOptions } from "./types";

export default class HTTPTransport {
  get: HTTPMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  };
  post: HTTPMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  };
  put: HTTPMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  };
  delete: HTTPMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  };

  request = (
    url: string,
    options: RequestOptions,
    timeout = 5000
  ): Promise<XMLHttpRequest> => {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject();
        return;
      }
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      if (headers) {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.timeout = timeout;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      switch (method) {
        case METHODS.GET:
          xhr.open(method, `${url}${queryStringify(data)}`);
          xhr.send();
          break;
        case METHODS.POST:
          xhr.send(JSON.stringify(data));
          break;
        case METHODS.PUT:
          xhr.send(JSON.stringify(data));
          break;
        case METHODS.DELETE:
          xhr.send();
          break;
        default:
          throw new Error("No method");
      }
    });
  };
}
