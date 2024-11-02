import type { Node, Edge, NodeChange, EdgeChange, Connection } from "reactflow";
import { applyNodeChanges, applyEdgeChanges, addEdge } from "reactflow";

import { NodeType } from "../nodeTypes";
import { onChangeOscillatorConnection } from "./oscillatorNode";
import { onChangeGainConnection } from "./gainNode";
import { audioNodeStore } from "./audioNode";

const initialNodes: Node<null, NodeType>[] = [
  {
    id: "INIT_OSCILLATOR",
    type: "OscillatorNode",
    position: { x: 50, y: 200 },
    data: null,
  },
  {
    id: "INIT_GAIN",
    type: "GainNode",
    position: { x: 400, y: 230 },
    data: null,
  },
  {
    id: "INIT_DESTINATION",
    type: "AudioDestinationNode",
    position: { x: 760, y: 250 },
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
  for (const change of changes) {
    console.log(change);
  }
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
  const { source, target } = convertEdge(connection);
  audioNodeStore.connect(source, target);
  switch (getNode(connection.target!)?.type) {
    case "OscillatorNode":
      onChangeOscillatorConnection(
        "add",
        connection.target!,
        connection.targetHandle
      );
      break;
    case "GainNode":
      onChangeGainConnection(
        "add",
        connection.target!,
        connection.targetHandle
      );
      break;
  }

  edges = addEdge(connection, edges);
  emitEdgesChange();
}

function onEdgesChange(changes: EdgeChange[]) {
  for (const change of changes) {
    if (change.type === "add") {
      const connection = {
        source: change.item.source,
        sourceHandle: change.item.sourceHandle ?? null,
        target: change.item.target,
        targetHandle: change.item.targetHandle ?? null,
      };
      onConnect(connection);
    }
    if (change.type === "remove") {
      const edge = getEdge(change.id);
      if (!edge) return;
      const { source, target } = convertEdge(edge);
      audioNodeStore.disconnect(source, target);
      switch (getNode(edge.target)?.type) {
        case "OscillatorNode":
          onChangeOscillatorConnection(
            change.type,
            edge.target,
            edge.targetHandle
          );
          break;
        case "GainNode":
          onChangeGainConnection(change.type, edge.target, edge.targetHandle);
          break;
      }
    }
  }

  edges = applyEdgeChanges(changes, edges);
  emitEdgesChange();
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

// util functions
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
