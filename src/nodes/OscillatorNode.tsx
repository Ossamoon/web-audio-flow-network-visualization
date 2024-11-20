import { useState } from "react";
import { Slider } from "@/shadcn/app/ui/slider";
import { Label } from "@/shadcn/app/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/app/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/app/ui/card";
import { Input } from "@/shadcn/app/ui/input";
import { Switch } from "@/shadcn/app/ui/switch";

import { OutputHandle, ParamHandle } from "../components/Handle";
import {
  useOsciillatorFrequency,
  useOsciillatorDetune,
  useOsciillatorType,
} from "../hooks/useOcillator";

export function OscillatorNode({ id }: { id: string }) {
  const [slider, setSlider] = useState(true);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Oscillator Node</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 w-80">
        <FrequencyControl id={id} slider={slider} />
        <DetuneControl id={id} slider={slider} />
        <WaveTypeSelect id={id} />
      </CardContent>
      <div className="absolute top-7 right-6 flex items-center gap-1 opacity-90">
        <Label>Slider</Label>
        <Switch
          checked={slider}
          onCheckedChange={(checked) => setSlider(checked)}
        />
      </div>
      <OutputHandle index={0} />
    </Card>
  );
}

function FrequencyControl({ id, slider }: { id: string; slider: boolean }) {
  const { frequency, setFrequency, control } = useOsciillatorFrequency(id);
  return (
    <div className="relative">
      <div className={!control ? "opacity-50" : ""}>
        <Label htmlFor="frequency">Frequency (Hz)</Label>

        {slider ? (
          <div className="flex items-center gap-2">
            <Slider
              className="nodrag w-48"
              id="frequency"
              name="frequency"
              step={0.01}
              min={Math.log10(20)}
              max={Math.log10(10000)}
              value={[Math.log10(frequency)]}
              onValueChange={([v]) => setFrequency(Math.floor(10 ** v))}
              disabled={!control}
            />
            <div className={`w-10 font-mono`}>{frequency}</div>
          </div>
        ) : (
          <Input
            className="w-52"
            id="frequency"
            name="frequency"
            defaultValue={frequency.toFixed(2)}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (isNaN(value)) return;
              setFrequency(value > 0 ? value : 0);
            }}
            disabled={!control}
          />
        )}
      </div>
      <ParamHandle paramName="frequency" />
    </div>
  );
}

function DetuneControl({ id, slider }: { id: string; slider: boolean }) {
  const { detune, setDetune, control } = useOsciillatorDetune(id);
  return (
    <div className="relative">
      <Label htmlFor="detune">Detune (cent)</Label>
      {slider ? (
        <div className="flex items-center gap-2">
          <Slider
            className="nodrag w-48"
            id="detune"
            name="detune"
            step={1}
            min={-100}
            max={100}
            value={[detune]}
            onValueChange={([v]) => setDetune(v)}
            disabled={!control}
          />
          <div className="w-10 font-mono">{detune}</div>
        </div>
      ) : (
        <Input
          className="w-52"
          id="detune"
          name="detune"
          defaultValue={detune.toFixed(2)}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (isNaN(value)) return;
            setDetune(value);
          }}
          disabled={!control}
        />
      )}
      <ParamHandle paramName="detune" />
    </div>
  );
}

function WaveTypeSelect({ id }: { id: string }) {
  const [type, setType] = useOsciillatorType(id);
  return (
    <div className="space-y-1">
      <Label>WaveType</Label>
      <Select value={type} onValueChange={(v) => setType(v as OscillatorType)}>
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
  );
}
