import { OscillatorNode } from "./nodes/OscillatorNode";
import { GainNode } from "./nodes/GainNode";
import { AudioDestinationNode } from "./nodes/AudioDestinationNode";

export const nodeTypes = {
  OscillatorNode: OscillatorNode,
  GainNode: GainNode,
  //   DelayNode: DalayNode,
  //   AnalyserNode: AnalyserNode,
  AudioDestinationNode: AudioDestinationNode,
};

export type NodeType = keyof typeof nodeTypes;
