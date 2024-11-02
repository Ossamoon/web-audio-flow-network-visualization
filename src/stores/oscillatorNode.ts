import type { EdgeChange } from "reactflow";
import context from "./audioContext";
import { audioNodeStore } from "./audioNode";
import { graphNodeStore, graphEdgeStore } from "./graph";

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

const oscilattorFrequencyControlListeners = new Map<string, Set<() => void>>();
const oscilattorFrequencyListeners = new Map<string, Set<() => void>>();
const oscilattorTypeListeners = new Map<string, Set<() => void>>();

function emitFrequencyControlChange(id: string) {
  for (const listener of oscilattorFrequencyControlListeners.get(id) ?? []) {
    listener();
  }
}

function emitFrequencyChange(id: string) {
  for (const listener of oscilattorFrequencyListeners.get(id) ?? []) {
    listener();
  }
}

function emitTypeChange(id: string) {
  for (const listener of oscilattorTypeListeners.get(id) ?? []) {
    listener();
  }
}

export function onChangeOscillatorConnection(
  changeType: EdgeChange["type"],
  targetId: string,
  targetHandle: string | null | undefined
) {
  if (changeType === "add" || changeType === "remove") {
    if (targetHandle === "frequency") {
      emitFrequencyControlChange(targetId);
    }
  }
}

function getOscillatorFrequencyControl(id: string) {
  const edges = graphEdgeStore.getEdges();
  for (const edge of edges.values()) {
    if (edge.target === id && edge.targetHandle === "frequency") {
      return false;
    }
  }
  return true;
}

function subscribeOscillatorFrequencyControl(id: string, listener: () => void) {
  const listeners = oscilattorFrequencyControlListeners.get(id) ?? new Set();
  listeners.add(listener);
  oscilattorFrequencyControlListeners.set(id, listeners);
  return () => {
    listeners.delete(listener);
  };
}

function getOscillatorFrequency(id: string) {
  return getOscillatorNode(id).frequency.value;
}

function subscribeOscillatorFrequency(id: string, listener: () => void) {
  const listeners = oscilattorFrequencyListeners.get(id) ?? new Set();
  listeners.add(listener);
  oscilattorFrequencyListeners.set(id, listeners);
  return () => {
    listeners.delete(listener);
  };
}

function setOscillatorFrequency(id: string, value: number) {
  if (getOscillatorFrequencyControl(id)) {
    getOscillatorNode(id).frequency.value = value;
    emitFrequencyChange(id);
  }
}

function getOscillatorType(id: string) {
  return getOscillatorNode(id).type;
}

function subscribeOscillatorType(id: string, listener: () => void) {
  const listeners = oscilattorTypeListeners.get(id) ?? new Set();
  listeners.add(listener);
  oscilattorTypeListeners.set(id, listeners);
  return () => {
    listeners.delete(listener);
  };
}

function setOscillatorType(id: string, value: OscillatorType) {
  getOscillatorNode(id).type = value;
  emitTypeChange(id);
}

export const oscillatorNodeStore = {
  getOscillatorNode,
  createOscillatorNode,
  removeOscillatorNode,
  getOscillatorFrequencyControl,
  subscribeOscillatorFrequencyControl,
  getOscillatorFrequency,
  subscribeOscillatorFrequency,
  setOscillatorFrequency,
  getOscillatorType,
  subscribeOscillatorType,
  setOscillatorType,
};
