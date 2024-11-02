import { Slider } from "@/shadcn/app/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/app/ui/card";

import { InputHandle, OutputHandle } from "../components/Handle";
import { useGain } from "../hooks/useGain";

export function GainNode({ id }: { id: string }) {
  const { gain, control, setGain } = useGain(id);
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
              value={[gain]}
              onValueChange={([v]) => setGain(v)}
              disabled={!control}
            />
            <div className="w-10 font-mono">{gain.toFixed(2)}</div>
          </div>
        </div>
      </CardContent>

      <InputHandle index={0} />
      <OutputHandle index={0} />
    </Card>
  );
}
