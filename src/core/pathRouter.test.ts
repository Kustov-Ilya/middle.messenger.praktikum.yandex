import { expect } from "chai";
import Router from "./pathRouter";
import Block from "./block";
import { ROUTER } from "../utils/consts";
import { describe } from "mocha";
import sinon from "sinon";

describe("Router", () => {
  let router: Router;

  const getContentFake = sinon.fake.returns(document.createElement("div"));
  const destroyFake = sinon.fake.returns(null);

  const BlockMock = class {
    getContent = getContentFake;
    destroy = destroyFake;
  } as unknown as typeof Block;

  beforeEach(() => {
    router = Router.Instance();
    router
      .use(ROUTER.LOGIN, BlockMock)
      .use(ROUTER.NOT_FOUND, BlockMock)
      .use(ROUTER.CHATS, BlockMock);
    router.go("/");
  });
  it("use() должен вернуть экземпляр Router'a", () => {
    const result = router.use("/", BlockMock);
    expect(result).to.eq(router);
  });

  it("start() должен подписаться на событие onpopstate", () => {
    expect(window.onpopstate).to.be.null;
    router.start();
    expect(window.onpopstate).not.to.be.null;
  });

  it("Без переходов должна быть начальная страница /", () => {
    expect(location.pathname).is.eq("/");
  });
  it("Перейти на страницу (go)", () => {
    router.go(ROUTER.CHATS);
    expect(location.pathname).is.eq(ROUTER.CHATS);
  });

  it("Перейти на страницу (go), вернуться(back), перейти вперед(forward)", () => {
    router.go(ROUTER.CHATS);
    router.back();
    router.forward();
    expect(location.pathname).is.eq(ROUTER.CHATS);
  });

  it("переход на несуществующую страницу. Редирект на /error/404", () => {
    router.go("unknown-url");
    expect(location.pathname).is.eq(ROUTER.NOT_FOUND);
  });
});
