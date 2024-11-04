import { graphEdgeStore } from "./graph";

export const createStore = () => {
  const listenersMap = new Map<string, Set<() => void>>();

  function emitChange(id: string) {
    for (const listener of listenersMap.get(id) ?? []) {
      listener();
    }
  }

  function subscribe(id: string, listener: () => void) {
    const listeners = listenersMap.get(id) ?? new Set();
    listeners.add(listener);
    listenersMap.set(id, listeners);
    return () => {
      listeners.delete(listener);
    };
  }

  return {
    emitChange,
    subscribe,
  };
};

export const createParamControlStore = (paramName: string) => {
  const { emitChange, subscribe } = createStore();

  function get(id: string) {
    const edges = graphEdgeStore.getEdges();
    for (const edge of edges.values()) {
      if (edge.target === id && edge.targetHandle === paramName) {
        return false;
      }
    }
    return true;
  }

  return {
    emitChange,
    get,
    subscribe,
  };
};
