import context from "./audioContext";
import { audioNodeStore } from "./audioNode";
import { graphNodeStore } from "./graph";
import { createStore, createParamStore } from "./utils";

function getBiquadFilterNode(id: string) {
  return audioNodeStore.getNode(id) as BiquadFilterNode;
}

function createBiquadFilterNode() {
  const id = crypto.randomUUID();
  const node = context.createBiquadFilter();
  audioNodeStore.addNode(id, node);
  graphNodeStore.addNode(id, "BiquadFilterNode");
  return id;
}

function removeBiquadFilterNode(id: string) {
  const node = getBiquadFilterNode(id);
  node.disconnect();

  audioNodeStore.removeNode(id);
  graphNodeStore.removeNode(id);
}

export const biquadFilterNodeStore = {
  getBiquadFilterNode,
  createBiquadFilterNode,
  removeBiquadFilterNode,
};

const {
  subscribeParamControl: subscribeFrequencyControl,
  //   getParamControl: getFrequencyControl,
  //   setParamControl: setFreqencyControl,
  subscribeParamValue: subscribeFrequency,
  getParamValue: getFrequency,
  setParamValue: setFrequency,
} = createParamStore("frequency", getBiquadFilterNode);

const {
  subscribeParamControl: subscribeDetuneControl,
  //   getParamControl: getDetuneControl,
  //   setParamControl: setDetuneControl,
  subscribeParamValue: subscribeDetune,
  getParamValue: getDetune,
  setParamValue: setDetune,
} = createParamStore("detune", getBiquadFilterNode);

const {
  subscribeParamControl: subscribeQControl,
  //   getParamControl: getQControl,
  //   setParamControl: setQControl,
  subscribeParamValue: subscribeQ,
  getParamValue: getQ,
  setParamValue: setQ,
} = createParamStore("Q", getBiquadFilterNode);

const {
  subscribeParamControl: subscribeGainControl,
  //   getParamControl: getGainControl,
  //   setParamControl: setGainControl,
  subscribeParamValue: subscribeGain,
  getParamValue: getGain,
  setParamValue: setGain,
} = createParamStore("gain", getBiquadFilterNode);

const { emitChange: emitTypeChange, subscribe: subscribeType } = createStore();

function getType(id: string) {
  return getBiquadFilterNode(id).type;
}

function setType(id: string, value: BiquadFilterType) {
  getBiquadFilterNode(id).type = value;
  emitTypeChange(id);
}

export const frequencyStore = {
  subscribeFrequencyControl,
  getFrequency,
  subscribeFrequency,
  setFrequency,
};

export const detuneStore = {
  subscribeDetuneControl,
  getDetune,
  subscribeDetune,
  setDetune,
};

export const qStore = {
  subscribeQControl,
  getQ,
  subscribeQ,
  setQ,
};

export const gainStore = {
  subscribeGainControl,
  getGain,
  subscribeGain,
  setGain,
};

export const typeStore = {
  getType,
  subscribeType,
  setType,
};
