import {
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type Connection,
} from "reactflow";
import { nanoid } from "nanoid";
import { create } from "zustand";

export type Store = {
  nodes: Node[];
  edges: Edge[];
  isRunning: boolean;
  toggleAudio: () => void;
  updateNode: (id: string, data: object) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  addEdge: (data: Connection) => void;
};

export const useStore = create<Store>((set, get) => ({
  nodes: [
    {
      type: "oscillatorNode",
      id: "a",
      data: { frequency: 440, type: "square" },
      position: { x: 50, y: 50 },
    },
    {
      type: "gainNode",
      id: "b",
      data: { gain: 0.5 },
      position: { x: 150, y: 350 },
    },
    {
      type: "audioDestinationNode",
      id: "destination",
      data: {},
      position: { x: 250, y: 550 },
    },
  ],
  edges: [],
  isRunning: false,

  toggleAudio() {
    set({ isRunning: !get().isRunning });
  },

  updateNode(id, data) {
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    });
  },

  onNodesChange(changes) {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange(changes) {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  addEdge(data) {
    if (data.source == null || data.target == null) {
      console.log("Error in addEdge(): source or target is null");
      return;
    }
    const edge: Edge = {
      ...data,
      source: data.source,
      target: data.target,
      id: nanoid(8),
    };

    set({ edges: [edge, ...get().edges] });
  },
}));
