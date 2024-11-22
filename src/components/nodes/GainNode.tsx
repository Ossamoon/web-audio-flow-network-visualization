import { useState } from "react";
import { Slider } from "@/shadcn/app/ui/slider";
import { Label } from "@/shadcn/app/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/app/ui/card";
import { Input } from "@/shadcn/app/ui/input";
import { Switch } from "@/shadcn/app/ui/switch";

import { InputHandle, OutputHandle, ParamHandle } from "../Handle";
import { useGain } from "../../hooks/useGain";

export function GainNode({ id }: { id: string }) {
  const [slider, setSlider] = useState(true);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gain Node</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 w-72">
        <GainControl id={id} slider={slider} />
      </CardContent>
      <div className="absolute top-7 right-6 flex items-center gap-1 opacity-90">
        <Label>Slider</Label>
        <Switch
          checked={slider}
          onCheckedChange={(checked) => setSlider(checked)}
        />
      </div>
      <InputHandle index={0} />
      <OutputHandle index={0} />
    </Card>
  );
}

function GainControl({ id, slider }: { id: string; slider: boolean }) {
  const { gain, control, setGain } = useGain(id);
  return (
    <div className="relative">
      <div className={!control ? "opacity-50" : ""}>
        <Label htmlFor="gain">Gain</Label>
        {slider ? (
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
        ) : (
          <Input
            className="w-52"
            id="gain"
            name="gain"
            defaultValue={gain.toFixed(2)}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (isNaN(value)) return;
              setGain(value > 0 ? value : 0);
            }}
            disabled={!control}
          />
        )}
      </div>
      <ParamHandle paramName="gain" />
    </div>
  );
}
