import { Position } from "reactflow";
import { useShallow } from "zustand/react/shallow";
import { Slider } from "@/shadcn/app/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/app/ui/card";

import { useStore, type Store } from "../store";
import Handle from "../components/Handle";

type GainNodeData = {
  nodeType: "gainNode";
  gain: number;
};

const selector = (id: string) => (store: Store) => ({
  setGain: (gain: number) => store.updateNode(id, { gain }),
});

export function GainNode({ id, data }: { id: string; data: GainNodeData }) {
  const { setGain } = useStore(useShallow(selector(id)));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gain Node</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div>
          <div className="mb-2">Gain</div>
          <div className="flex items-center gap-2">
            <Slider
              className="nodrag w-48"
              name={"the slider"}
              step={0.01}
              min={0}
              max={1}
              value={[data.gain]}
              onValueChange={([v]) => setGain(v)}
            />
            <div className="w-10 font-mono">{data.gain.toFixed(2)}</div>
          </div>
        </div>
      </CardContent>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </Card>
  );
}
