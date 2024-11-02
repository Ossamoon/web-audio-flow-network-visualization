import context from "./audioContext";

const audioNodeMap = new Map<string, AudioNode>();

// Initial Setup
const oscillator = context.createOscillator();
oscillator.start();
const gain = context.createGain();
const destination = context.destination;
oscillator.connect(gain);
gain.connect(destination);
audioNodeMap.set("INIT_OSCILLATOR", oscillator);
audioNodeMap.set("INIT_GAIN", gain);
audioNodeMap.set("INIT_DESTINATION", destination);

function getNode(id: string) {
  const node = audioNodeMap.get(id);
  if (node === undefined) {
    throw new Error(`AudioNode not found: id=${id}`);
  }
  return node;
}

function addNode(id: string, node: AudioNode) {
  audioNodeMap.set(id, node);
}

function removeNode(id: string) {
  audioNodeMap.delete(id);
}

function connect(
  source: {
    nodeId: string;
    handleType: "output";
    index: number;
  },
  target:
    | {
        nodeId: string;
        handleType: "input";
        index: number;
      }
    | {
        nodeId: string;
        handleType: "param";
        paramName: string;
      }
) {
  const sourceNode = getNode(source.nodeId);
  const targetNode = getNode(target.nodeId);
  if (target.handleType === "input") {
    sourceNode.connect(targetNode, source.index, target.index);
    return;
  }

  const audioParam = targetNode[target.paramName as keyof AudioNode];
  if (audioParam instanceof AudioParam) {
    sourceNode.connect(audioParam, source.index);
    return;
  }
}

function disconnect(
  source: {
    nodeId: string;
    handleType: "output";
    index: number;
  },
  target:
    | {
        nodeId: string;
        handleType: "input";
        index: number;
      }
    | {
        nodeId: string;
        handleType: "param";
        paramName: string;
      }
) {
  const sourceNode = getNode(source.nodeId);
  const targetNode = getNode(target.nodeId);
  if (target.handleType === "input") {
    sourceNode.disconnect(targetNode, source.index, target.index);
    return;
  }

  const audioParam = targetNode[target.paramName as keyof AudioNode];
  if (audioParam instanceof AudioParam) {
    sourceNode.disconnect(audioParam, source.index);
    return;
  }
}

export const audioNodeStore = {
  getNode,
  addNode,
  removeNode,
  connect,
  disconnect,
};
