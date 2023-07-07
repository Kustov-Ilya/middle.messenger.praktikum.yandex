/* eslint-disable max-classes-per-file,no-unused-expressions,no-new */
import proxyquire from "proxyquire";
import sinon from "sinon";
import { describe } from "mocha";
import { expect } from "chai";
import { EVENTS } from "../utils/consts";

let eventBusMock = {
  on: sinon.spy(),
  emit: sinon.spy(),
};

const { default: Block } = proxyquire("./block.ts", {
  "./eventBus.ts": {
    default: class {
      emit = eventBusMock.emit;

      on = eventBusMock.on;
    },
  },
});

class BlockMock extends Block {
  constructor(prop = {}) {
    super("div", prop);
  }
}

describe("Block", () => {
  let block: BlockMock;
  beforeEach(() => {
    eventBusMock = {
      on: sinon.fake(),
      emit: sinon.fake(),
    };
    block = new BlockMock();
  });

  it("Должен вызывать init при создании", () => {
    expect(eventBusMock.emit.calledWith(EVENTS.INIT)).to.be.true;
  });

  it("Должен вызывать flow:render после инициализации", () => {
    block._init();

    expect(eventBusMock.emit.calledWith(EVENTS.FLOW_RENDER)).to.be.true;
  });

  it("Должен вызывать flow:component-did-mount при вызове dispatchComponentDidMount", () => {
    block.dispatchComponentDidMount();

    expect(eventBusMock.emit.calledWith(EVENTS.FLOW_CDM)).to.be.true;
  });

  it("Должен вызывать flow:component-did-update при обновлении пропсов", () => {
    block.setProps({ a: "test" });

    expect(eventBusMock.emit.calledWith(EVENTS.FLOW_CDU)).to.be.true;
  });
});
