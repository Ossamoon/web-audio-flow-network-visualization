import context from "./audioContext";
import { audioNodeStore } from "./audioNode";
import { graphNodeStore } from "./graph";
import { createStore, createParamStore } from "./utils";

function getOscillatorNode(id: string) {
  return audioNodeStore.getNode(id) as OscillatorNode;
}

function createOscillatorNode() {
  const id = crypto.randomUUID();
  const node = context.createOscillator();
  audioNodeStore.addNode(id, node);
  graphNodeStore.addNode(id, "OscillatorNode");
  node.start();
  return id;
}

function removeOscillatorNode(id: string) {
  const node = getOscillatorNode(id);
  node.stop();
  node.disconnect();

  audioNodeStore.removeNode(id);
  graphNodeStore.removeNode(id);
}

export const oscillatorNodeStore = {
  getOscillatorNode,
  createOscillatorNode,
  removeOscillatorNode,
};

const {
  subscribeParamControl: subscribeFrequencyControl,
  getParamControl: getFrequencyControl,
  // setParamControl: setFreqencyControl,
  subscribeParamValue: subscribeFrequency,
  getParamValue: getFrequency,
  setParamValue: setFrequency,
} = createParamStore("frequency", getOscillatorNode);

const {
  subscribeParamControl: subscribeDetuneControl,
  getParamControl: getDetuneControl,
  // setParamControl: setDetuneControl,
  subscribeParamValue: subscribeDetune,
  getParamValue: getDetune,
  setParamValue: setDetune,
} = createParamStore("detune", getOscillatorNode);

const { emitChange: emitTypeChange, subscribe: subscribeType } = createStore();

function getType(id: string) {
  return getOscillatorNode(id).type;
}

function setType(id: string, value: OscillatorType) {
  getOscillatorNode(id).type = value;
  emitTypeChange(id);
}

export const frequencyStore = {
  getFrequencyControl,
  subscribeFrequencyControl,
  getFrequency,
  subscribeFrequency,
  setFrequency,
};

export const detuneStore = {
  getDetuneControl,
  subscribeDetuneControl,
  getDetune,
  subscribeDetune,
  setDetune,
};

export const typeStore = {
  getType,
  subscribeType,
  setType,
};
