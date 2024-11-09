import ReactFlow, {
  ReactFlowProvider,
  Background,
  SelectionMode,
} from "reactflow";

import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeModeDropdown } from "./components/ThemeModeDropdown";
import { AddNodeDropdown } from "./components/AddNodeDropdown";
import { useGraph } from "./hooks/useGraph";
import { nodeTypes } from "./nodeTypes";

import "./reactflow.css";

export default function App() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useGraph();

  return (
    <ReactFlowProvider>
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
          <div className="absolute top-2 right-2 flex gap-3 z-10">
            <AddNodeDropdown />
            <ThemeModeDropdown />
          </div>
        </div>
      </ThemeProvider>
    </ReactFlowProvider>
  );
}
