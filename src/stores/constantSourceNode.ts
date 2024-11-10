import context from "./audioContext";
import { audioNodeStore } from "./audioNode";
import { graphNodeStore } from "./graph";
import { createParamControlStore, createStore } from "./utils";

function getConstantSourceNode(id: string) {
  return audioNodeStore.getNode(id) as ConstantSourceNode;
}

function createConstantSourceNode() {
  const id = crypto.randomUUID();
  const node = context.createConstantSource();
  audioNodeStore.addNode(id, node);
  graphNodeStore.addNode(id, "ConstantSourceNode");
  node.start();
  return id;
}

function removeConstantSourceNode(id: string) {
  const node = getConstantSourceNode(id);
  node.stop();
  node.disconnect();

  audioNodeStore.removeNode(id);
  graphNodeStore.removeNode(id);
}

export const constantSourceNodeStore = {
  getConstantSourceNode,
  createConstantSourceNode,
  removeConstantSourceNode,
};

const {
  emitChange: emitOffsetControlChange,
  get: getOffsetControl,
  subscribe: subscribeOffsetControl,
} = createParamControlStore("offset");

const { emitChange: emitOffsetChange, subscribe: subscribeOffset } =
  createStore();

export function emitConstantSourceParamsControlChange(
  nodeId: string,
  paramName: string
) {
  switch (paramName) {
    case "offset":
      emitOffsetControlChange(nodeId);
      break;
  }
}

function getOffset(id: string) {
  const node = getConstantSourceNode(id);
  return node.offset.value;
}

function setOffset(id: string, value: number) {
  if (getOffsetControl(id)) {
    getConstantSourceNode(id).offset.value = value;
    emitOffsetChange(id);
  }
}

export const offsetStore = {
  getOffsetControl,
  subscribeOffsetControl,
  getOffset,
  subscribeOffset,
  setOffset,
};
