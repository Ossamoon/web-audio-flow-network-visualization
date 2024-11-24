import { OscillatorNode as OscillatorNodeComponent } from "./components/nodes/OscillatorNode";
import { ConstantSourceNode as ConstantSourceNodeComponent } from "./components/nodes/ConstantSourceNode";
import { GainNode as GainNodeComponent } from "./components/nodes/GainNode";
import { AudioDestinationNode } from "./components/nodes/AudioDestinationNode";
import { BiquadFilterNode } from "./components/nodes/BiquadFilterNode";

export const nodeTypes = {
  OscillatorNode: OscillatorNodeComponent,
  ConstantSourceNode: ConstantSourceNodeComponent,
  GainNode: GainNodeComponent,
  BiquadFilterNode: BiquadFilterNode,
  //   DelayNode: DalayNode,
  //   AnalyserNode: AnalyserNode,
  AudioDestinationNode: AudioDestinationNode,
};

export type NodeType = keyof typeof nodeTypes;
