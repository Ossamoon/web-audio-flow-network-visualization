import context from "./audioContext";
import { audioNodeStore } from "./audioNode";
import { graphNodeStore } from "./graph";
import { createStore, createParamControlStore } from "./utils";

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
  emitChange: emitFrequencyControlChange,
  get: getOscillatorFrequencyControl,
  subscribe: subscribeOscillatorFrequencyControl,
} = createParamControlStore("frequency");

const {
  emitChange: emitDetuneControlChange,
  get: getOscillatorDetuneControl,
  subscribe: subscribeOscillatorDetuneControl,
} = createParamControlStore("detune");

const {
  emitChange: emitFrequencyChange,
  subscribe: subscribeOscillatorFrequency,
} = createStore();

const { emitChange: emitDetuneChange, subscribe: subscribeOscillatorDetune } =
  createStore();

const { emitChange: emitTypeChange, subscribe: subscribeOscillatorType } =
  createStore();

export function emitOscillatorParamsControlChange(
  nodeId: string,
  paramName: string
) {
  switch (paramName) {
    case "frequency":
      emitFrequencyControlChange(nodeId);
      break;
    case "detune":
      emitDetuneControlChange(nodeId);
      break;
  }
}

function getOscillatorFrequency(id: string) {
  return getOscillatorNode(id).frequency.value;
}

function setOscillatorFrequency(id: string, value: number) {
  if (getOscillatorFrequencyControl(id)) {
    getOscillatorNode(id).frequency.value = value;
    emitFrequencyChange(id);
  }
}

function getOscillatorDetune(id: string) {
  return getOscillatorNode(id).detune.value;
}

function setOscillatorDetune(id: string, value: number) {
  if (getOscillatorDetuneControl(id)) {
    getOscillatorNode(id).detune.value = value;
    emitDetuneChange(id);
  }
}

function getOscillatorType(id: string) {
  return getOscillatorNode(id).type;
}

function setOscillatorType(id: string, value: OscillatorType) {
  getOscillatorNode(id).type = value;
  emitTypeChange(id);
}

export const frequencyStore = {
  getOscillatorFrequencyControl,
  subscribeOscillatorFrequencyControl,
  getOscillatorFrequency,
  subscribeOscillatorFrequency,
  setOscillatorFrequency,
};

export const detuneStore = {
  getOscillatorDetuneControl,
  subscribeOscillatorDetuneControl,
  getOscillatorDetune,
  subscribeOscillatorDetune,
  setOscillatorDetune,
};

export const typeStore = {
  getOscillatorType,
  subscribeOscillatorType,
  setOscillatorType,
};
