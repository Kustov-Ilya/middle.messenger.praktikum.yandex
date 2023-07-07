import { expect } from "chai";
import sinon from "sinon";
import HTTPTransport from "./httpTransport";
import { METHODS } from "../utils/consts";

describe("HTTPTransport", () => {
  let fakeXMLHttpRequest: sinon.SinonFakeXMLHttpRequestStatic;
  let httpTransport: HTTPTransport;
  let requests: sinon.SinonFakeXMLHttpRequest[];

  before(() => {
    requests = [];
    httpTransport = new HTTPTransport();
    fakeXMLHttpRequest = sinon.useFakeXMLHttpRequest();
    //@ts-ignore
    global.XMLHttpRequest = fakeXMLHttpRequest;

    fakeXMLHttpRequest.onCreate = (request) => {
      requests.push(request);
    };
  });

  afterEach(() => {
    requests = [];
  });

  it("Отправляется GET запрос", () => {
    httpTransport.get("test");
    const request = requests[0];
    expect(request.method).to.eq(METHODS.GET);
  });

  it("Отправляется POST запрос", () => {
    httpTransport.post("test");
    const request = requests[0];
    expect(request.method).to.eq(METHODS.POST);
  });

  it("Отправляется PUT запрос", () => {
    httpTransport.put("test");
    const request = requests[0];
    expect(request.method).to.eq(METHODS.PUT);
  });

  it("Отправляется DELETE запрос", () => {
    httpTransport.delete("test");
    const request = requests[0];
    expect(request.method).to.eq(METHODS.DELETE);
  });

  it("Отправляется по правильному URL", () => {
    const mockurl = "https://ya-praktikum.tech/api/v2/test";
    httpTransport.get("test");
    const request = requests[0];
    expect(request.url).to.eq(mockurl);
  });

  it("Get отправляется по правильному URL c параметрами", () => {
    const mockurl = "https://ya-praktikum.tech/api/v2/test?a=1&b=2";
    httpTransport.get("test", { data: { a: 1, b: 2 } });
    const request = requests[0];
    expect(request.url).to.eq(mockurl);
  });
});
