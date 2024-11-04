import context from "./audioContext";
import { audioNodeStore } from "./audioNode";
import { graphNodeStore } from "./graph";
import { createStore, createParamControlStore } from "./utils";

function getGainNode(id: string) {
  return audioNodeStore.getNode(id) as GainNode;
}

function createGainNode() {
  const id = crypto.randomUUID();
  const node = context.createGain();
  audioNodeStore.addNode(id, node);
  graphNodeStore.addNode(id, "GainNode");
  return id;
}

function removeGainNode(id: string) {
  const node = getGainNode(id);
  node.disconnect();

  audioNodeStore.removeNode(id);
  graphNodeStore.removeNode(id);
}

const {
  emitChange: emitGainControlChange,
  get: getGainControl,
  subscribe: subscribeGainControl,
} = createParamControlStore("gain");

const { emitChange: emitGainChange, subscribe: subscribeGain } = createStore();

export function emitGainParamsControlChange(nodeId: string, paramName: string) {
  switch (paramName) {
    case "gain":
      emitGainControlChange(nodeId);
      break;
  }
}

function getGain(id: string) {
  const node = getGainNode(id);
  return node.gain.value;
}

function setGain(id: string, value: number) {
  const node = getGainNode(id);
  node.gain.value = value;
  emitGainChange(id);
}

export const gainNodeStore = {
  createGainNode,
  removeGainNode,
  getGainControl,
  subscribeGainControl,
  getGain,
  subscribeGain,
  setGain,
};
