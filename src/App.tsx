import ReactFlow, { Background, SelectionMode } from "reactflow";
import { useShallow } from "zustand/react/shallow";

import { ThemeProvider } from "./shadcn/components/theme-provider";
import { ModeToggle } from "./shadcn/components/mode-toggle";
import { useStore, type Store } from "./store";
import OscillatorNode from "./nodes/OscillatorNode";

const selector = (store: Store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
});

const nodeTypes = {
  oscillatorNode: OscillatorNode,
};

export default function App() {
  const store = useStore(useShallow(selector));

  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <div className="w-screen h-screen bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100">
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={store.nodes}
          edges={store.edges}
          onNodesChange={store.onNodesChange}
          onEdgesChange={store.onEdgesChange}
          onConnect={store.addEdge}
          panOnScroll
          selectionOnDrag
          panOnDrag={[1, 2]}
          selectionMode={SelectionMode.Partial}
        >
          <Background />
        </ReactFlow>
        <div className="absolute top-2 right-2 z-10">
          <ModeToggle />
        </div>
      </div>
    </ThemeProvider>
  );
}
