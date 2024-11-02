import { useSyncExternalStore } from "react";

import { graphNodeStore, graphEdgeStore } from "../stores/graph";

export function useGraph() {
  const nodes = useSyncExternalStore(
    graphNodeStore.subscribeNodes,
    graphNodeStore.getNodes
  );
  const edges = useSyncExternalStore(
    graphEdgeStore.subscribeEdges,
    graphEdgeStore.getEdges
  );
  return {
    nodes,
    edges,
    onNodesChange: graphNodeStore.onNodesChange,
    onEdgesChange: graphEdgeStore.onEdgesChange,
    onConnect: graphEdgeStore.onConnect,
  };
}
