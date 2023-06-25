import { METHODS } from "../utils/consts";
import { HTTPMethod, RequestOptions } from "../utils/types";
import { API_ENDPOINT } from "../utils/consts";
import queryStringify from "../utils/supportFuncs";

export default class HTTPTransport {
  private static apiEndpoint: string = API_ENDPOINT;

  private getFullUrl(url: string) {
    return `${HTTPTransport.apiEndpoint}/${url}`;
  }
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
    const fullUrl = this.getFullUrl(url);

    return new Promise((resolve, reject) => {
      if (!method) {
        reject();
        return;
      }
      const xhr = new XMLHttpRequest();
      xhr.open(method, fullUrl);
      if (headers) {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      xhr.onload = function () {
        resolve(xhr);
      };
      xhr.withCredentials = true;
      xhr.timeout = timeout;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      switch (method) {
        case METHODS.GET:
          xhr.open(
            method,
            `${fullUrl}${queryStringify(data as Record<string, unknown>)}`
          );
          xhr.send();
          break;
        default:
          if (!data) {
            xhr.send();
          } else if (data!.constructor === FormData) {
            xhr.send(data as FormData);
          } else {
            xhr.send(JSON.stringify(data));
          }
          break;
      }
    });
  };
}
