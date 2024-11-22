import { OscillatorNode as OscillatorNodeComponent } from "./components/nodes/OscillatorNode";
import { ConstantSourceNode as ConstantSourceNodeComponent } from "./components/nodes/ConstantSourceNode";
import { GainNode as GainNodeComponent } from "./components/nodes/GainNode";
import { AudioDestinationNode } from "./components/nodes/AudioDestinationNode";

const MAX_FLOAT32 = 3.4028234663852886e38;
const MIN_FLOAT32 = -3.4028234663852886e38;

export const audioNodeTypesMetadata = {
  version: "0.1.0",
  data: [
    {
      name: "OscillatorNode",
      component: OscillatorNodeComponent,
      constructor: OscillatorNode,
      numberOfInputs: 0,
      numberOfOutputs: 1,
      channelCountMode: "max",
      channleCount: 2, // not used in the default count mode
      channelInterpretation: "speakers",
      audioParams: [
        {
          name: "frequency",
          automationRate: "a-rate",
          defaultValue: 440,
          minValue: MIN_FLOAT32,
          maxValue: MAX_FLOAT32,
        },
        {
          name: "detune",
          automationRate: "a-rate",
          defaultValue: 0,
          minValue: MIN_FLOAT32,
          maxValue: MAX_FLOAT32,
        },
      ],
      properties: [
        {
          name: "type",
          defaultValue: "sine",
          options: ["sine", "square", "sawtooth", "triangle", "custom"],
        },
      ],
    },
  ],
} as const;

export const nodeTypes = {
  OscillatorNode: OscillatorNodeComponent,
  ConstantSourceNode: ConstantSourceNodeComponent,
  GainNode: GainNodeComponent,
  //   DelayNode: DalayNode,
  //   AnalyserNode: AnalyserNode,
  AudioDestinationNode: AudioDestinationNode,
};

export type NodeType = keyof typeof nodeTypes;
