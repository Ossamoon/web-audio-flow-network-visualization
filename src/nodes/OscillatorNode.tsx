import { Position } from "reactflow";
import { useShallow } from "zustand/react/shallow";
import { Slider } from "@/shadcn/app/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/app/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/app/ui/card";

import { useStore, type Store } from "../store";
import Handle from "../components/Handle";

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

export function OscillatorNode({
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
      <CardContent className="flex flex-col gap-3">
        <div>
          <div className="mb-2">Frequency (Hz)</div>
          <div className="flex items-center gap-2">
            <Slider
              className="nodrag w-48"
              name={"the slider"}
              step={0.001}
              min={Math.log10(80)}
              max={Math.log10(2560)}
              value={[Math.log10(data.frequency)]}
              onValueChange={([v]) => setFrequency(10 ** v)}
            />
            <div className="w-10 font-mono">{Math.round(data.frequency)}</div>
          </div>
        </div>
        <div>
          <div className="mb-2">WaveType</div>
          <Select
            value={data.type}
            onValueChange={(v) => setType(v as OscillatorType)}
          >
            <SelectTrigger className="nodrag w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sine">sine</SelectItem>
              <SelectItem value="triangle">triangle</SelectItem>
              <SelectItem value="sawtooth">sawtooth</SelectItem>
              <SelectItem value="square">square</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>

      <Handle type="source" position={Position.Bottom} />
    </Card>
  );
}
