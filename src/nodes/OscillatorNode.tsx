import { Handle, Position } from "reactflow";
import { useShallow } from "zustand/react/shallow";
import { Slider } from "@/shadcn/app/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/app/ui/select";
import { Label } from "@/shadcn/app/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/app/ui/card";

import { useStore, type Store } from "../store";

type WaveType = "sine" | "triangle" | "sawtooth" | "square";
type OscillatorNodeData = {
  nodeType: "oscillatorNode";
  frequency: number;
  type: WaveType;
};

const selector = (id: string) => (store: Store) => ({
  setFrequency: (frequency: number) => store.updateNode(id, { frequency }),
  setType: (type: OscillatorType) => store.updateNode(id, { type }),
});

export default function OscillatorNode({
  id,
  data,
}: {
  id: string;
  data: OscillatorNodeData;
}) {
  const { setFrequency, setType } = useStore(useShallow(selector(id)));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Oscillator Node</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Label>
          <div>Frequency</div>
          <div className="mt-2 flex items-center gap-2">
            <Slider
              className="nodrag"
              min={10}
              max={1000}
              value={[data.frequency]}
              onValueChange={(v) => setFrequency(Number(v.at(0)))}
            />
            <div>{data.frequency}Hz</div>
          </div>
        </Label>
        <Select
          value={data.type}
          onValueChange={(v) => setType(v as OscillatorType)}
        >
          <SelectTrigger className="nodrag w-[180px]">
            <SelectValue placeholder="Waveform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sine">sine</SelectItem>
            <SelectItem value="triangle">triangle</SelectItem>
            <SelectItem value="sawtooth">sawtooth</SelectItem>
            <SelectItem value="square">square</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>

      <Handle type="source" position={Position.Bottom} />
    </Card>
  );
}
