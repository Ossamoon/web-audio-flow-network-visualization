import context from "./audioContext";
import { audioNodeStore } from "./audioNode";
import { graphNodeStore, graphEdgeStore } from "./graph";

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

const gainControlListeners = new Map<string, Set<() => void>>();
const gainListeners = new Map<string, Set<() => void>>();

function emitGainControlChange(id: string) {
  for (const listener of gainControlListeners.get(id) ?? []) {
    listener();
  }
}

function emitGainChange(id: string) {
  for (const listener of gainListeners.get(id) ?? []) {
    listener();
  }
}

export function emitGainParamsControlChange(nodeId: string, paramName: string) {
  switch (paramName) {
    case "gain":
      emitGainControlChange(nodeId);
      break;
  }
}

function getGainControl(id: string) {
  const edges = graphEdgeStore.getEdges();
  for (const edge of edges.values()) {
    if (edge.target === id && edge.targetHandle === "gain") {
      return false;
    }
  }
  return true;
}

function subscribeGainControl(id: string, listener: () => void) {
  const listeners = gainControlListeners.get(id) ?? new Set();
  listeners.add(listener);
  gainControlListeners.set(id, listeners);
  return () => {
    listeners.delete(listener);
  };
}

function getGain(id: string) {
  const node = getGainNode(id);
  return node.gain.value;
}

function subscribeGain(id: string, listener: () => void) {
  const listeners = gainListeners.get(id) ?? new Set();
  listeners.add(listener);
  gainListeners.set(id, listeners);
  return () => {
    listeners.delete(listener);
  };
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
