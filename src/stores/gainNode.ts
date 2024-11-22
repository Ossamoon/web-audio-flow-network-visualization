import context from "./audioContext";
import { audioNodeStore } from "./audioNode";
import { graphNodeStore } from "./graph";
import { createParamStore } from "./utils";

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

export const gainNodeStore = {
  getGainNode,
  createGainNode,
  removeGainNode,
};

const {
  subscribeParamControl: subscribeGainControl,
  getParamControl: getGainControl,
  // setParamControl: setGainControl,
  subscribeParamValue: subscribeGain,
  getParamValue: getGain,
  setParamValue: setGain,
} = createParamStore("gain", getGainNode);

export const gainStore = {
  getGainControl,
  subscribeGainControl,
  getGain,
  subscribeGain,
  setGain,
};
