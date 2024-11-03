import { Slider } from "@/shadcn/app/ui/slider";
import { Label } from "@/shadcn/app/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/app/ui/card";

import { InputHandle, OutputHandle, ParamHandle } from "../components/Handle";
import { useGain } from "../hooks/useGain";

export function GainNode({ id }: { id: string }) {
  const { gain, control, setGain } = useGain(id);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gain Node</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="relative">
          <div className={!control ? "opacity-50" : ""}>
            <Label htmlFor="gain">Gain</Label>
            <div className="flex items-center gap-2">
              <Slider
                className={`nodrag w-48`}
                id="gain"
                name="gain"
                step={0.01}
                min={0}
                max={1}
                value={[gain]}
                onValueChange={([v]) => setGain(v)}
                disabled={!control}
              />
              <div className={`w-10 font-mono`}>{gain.toFixed(2)}</div>
            </div>
          </div>
          <ParamHandle paramName="gain" />
        </div>
      </CardContent>

      <InputHandle index={0} />
      <OutputHandle index={0} />
    </Card>
  );
}
