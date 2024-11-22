import context from "./audioContext";
import { audioNodeStore } from "./audioNode";
import { graphNodeStore } from "./graph";
import { createParamStore } from "./utils";

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
  subscribeParamControl: subscribeOffsetControl,
  getParamControl: getOffsetControl,
  // setParamControl: setOffsetControl,
  subscribeParamValue: subscribeOffset,
  getParamValue: getOffset,
  setParamValue: setOffset,
} = createParamStore("offset", getConstantSourceNode);

export const offsetStore = {
  getOffsetControl,
  subscribeOffsetControl,
  getOffset,
  subscribeOffset,
  setOffset,
};
