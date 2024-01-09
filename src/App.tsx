import ReactFlow, { Background, SelectionMode } from "reactflow";

import { useStore } from "./store";

export default function App() {
  const store = useStore();

  return (
    <ReactFlow
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
  );
}
