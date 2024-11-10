import { useReactFlow } from "reactflow";

import { graphNodeStore } from "../stores/graph";
import { oscillatorNodeStore } from "../stores/oscillatorNode";
import { constantSourceNodeStore } from "@/stores/constantSourceNode";
import { gainNodeStore } from "../stores/gainNode";
import type { NodeType } from "../nodeTypes";

const createNode = (type: NodeType) => {
  switch (type) {
    case "OscillatorNode":
      return oscillatorNodeStore.createOscillatorNode();
    case "ConstantSourceNode":
      return constantSourceNodeStore.createConstantSourceNode();
    case "GainNode":
      return gainNodeStore.createGainNode();
    case "AudioDestinationNode":
      throw new Error("Cannot create AudioDestinationNode");
  }
};

export const useAddNode = () => {
  const { getViewport } = useReactFlow();
  return (type: NodeType) => {
    const id = createNode(type);
    const { x, y, zoom } = getViewport();
    const position = {
      x: (100 - x) / zoom,
      y: (100 - y) / zoom,
    };
    graphNodeStore.addNode(id, type, position);
  };
};
