import type { Node, Edge, NodeChange, EdgeChange, Connection } from "reactflow";
import { applyNodeChanges, applyEdgeChanges, addEdge } from "reactflow";

import { NodeType } from "../nodeTypes";
import { audioNodeStore } from "./audioNode";

const initialNodes: Node<null, NodeType>[] = [
  {
    id: "INIT_OSCILLATOR",
    type: "OscillatorNode",
    position: { x: 100, y: 200 },
    data: null,
  },
  {
    id: "INIT_GAIN",
    type: "GainNode",
    position: { x: 450, y: 200 },
    data: null,
  },
  {
    id: "INIT_DESTINATION",
    type: "AudioDestinationNode",
    position: { x: 800, y: 200 },
    data: null,
  },
];

const initialEdges: Edge<null>[] = [
  {
    id: "INIT_OSCILLATOR_GAIN",
    source: "INIT_OSCILLATOR",
    sourceHandle: "output-0",
    target: "INIT_GAIN",
    targetHandle: "input-0",
    data: null,
  },
  {
    id: "INIT_GAIN_DESTINATION",
    source: "INIT_GAIN",
    sourceHandle: "output-0",
    target: "INIT_DESTINATION",
    targetHandle: "input-0",
    data: null,
  },
];

let nodes: Node<null, NodeType>[] = initialNodes;
let edges: Edge<null>[] = initialEdges;

const nodesLiteners = new Set<() => void>();
const edgesLiteners = new Set<() => void>();

function emitNodesChange() {
  for (const listener of nodesLiteners) {
    listener();
  }
}

function emitEdgesChange() {
  for (const listener of edgesLiteners) {
    listener();
  }
}

function getNodes() {
  return nodes;
}

function getNode(id: string) {
  return nodes.find((node) => node.id === id);
}

function subscribeNodes(listener: () => void) {
  nodesLiteners.add(listener);
  return () => {
    nodesLiteners.delete(listener);
  };
}

function addNode(
  id: string,
  type: NodeType,
  position: { x: number; y: number } = { x: 0, y: 0 }
) {
  nodes = [...nodes, { id, type, position, data: null }];
  emitNodesChange();
}

function removeNode(id: string) {
  nodes = nodes.filter((node) => node.id !== id);
  emitNodesChange();
}

function onNodesChange(changes: NodeChange[]) {
  nodes = applyNodeChanges(changes, nodes) as Node<null, NodeType>[];
  emitNodesChange();
}

function getEdges() {
  return edges;
}

function getEdge(id: string) {
  return edges.find((edge) => edge.id === id);
}

function subscribeEdges(listener: () => void) {
  edgesLiteners.add(listener);
  return () => {
    edgesLiteners.delete(listener);
  };
}

function onConnect(connection: Connection) {
  edges = addEdge(connection, edges);
  emitEdgesChange();

  const { source, target } = convertEdge(connection);
  audioNodeStore.connect(source, target);
}

function onEdgesChange(changes: EdgeChange[]) {
  const oldEdges = edges;
  edges = applyEdgeChanges(changes, edges);
  emitEdgesChange();

  for (const change of changes) {
    if (change.type === "remove") {
      const edge = oldEdges.find((edge) => edge.id === change.id);
      if (!edge) return;

      const { source, target } = convertEdge(edge);
      audioNodeStore.disconnect(source, target);
    }
  }
}

export const graphNodeStore = {
  getNodes,
  getNode,
  subscribeNodes,
  addNode,
  removeNode,
  onNodesChange,
};

export const graphEdgeStore = {
  getEdges,
  getEdge,
  subscribeEdges,
  onConnect,
  onEdgesChange,
};

function convertEdge(edge: Edge | Connection) {
  const source = {
    nodeId: edge.source!,
    handleType: "output" as const,
    index: Number(edge.sourceHandle?.split("-").at(1)),
  };
  const targetHandle = edge.targetHandle?.split("-").at(0);
  const target =
    targetHandle === "input"
      ? {
          nodeId: edge.target!,
          handleType: "input" as const,
          index: Number(edge.targetHandle?.split("-").at(1)),
        }
      : {
          nodeId: edge.target!,
          handleType: "param" as const,
          paramName: targetHandle ?? "",
        };
  return { source, target };
}
