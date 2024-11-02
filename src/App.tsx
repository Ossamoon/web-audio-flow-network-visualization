import ReactFlow, { Background, SelectionMode } from "reactflow";

import { ThemeProvider } from "./shadcn/components/theme-provider";
import { ModeToggle } from "./shadcn/components/mode-toggle";
import { useGraph } from "./hooks/useGraph";
import { nodeTypes } from "./nodeTypes";

import "./reactflow.css";

export default function App() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useGraph();

  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <div className="w-screen h-screen bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100">
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
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
