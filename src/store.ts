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
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  addEdge: (data: Connection) => void;
};

export const useStore = create<Store>((set, get) => ({
  nodes: [
    { id: "a", data: { label: "oscillator" }, position: { x: 0, y: 0 } },
    { id: "b", data: { label: "gain" }, position: { x: 50, y: 50 } },
    { id: "c", data: { label: "output" }, position: { x: -50, y: 100 } },
  ],
  edges: [],

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
