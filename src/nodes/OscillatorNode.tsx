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

import { OutputHandle, ParamHandle } from "../components/Handle";
import {
  useOsciillatorFrequency,
  useOsciillatorDetune,
  useOsciillatorType,
} from "../hooks/useOcillator";

export function OscillatorNode({ id }: { id: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Oscillator Node</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <FrequencyControl id={id} />
        <DetuneControl id={id} />
        <WaveTypeSelect id={id} />
      </CardContent>
      <OutputHandle index={0} />
    </Card>
  );
}

function FrequencyControl({ id }: { id: string }) {
  const { frequency, setFrequency, control } = useOsciillatorFrequency(id);
  return (
    <div className="relative">
      <div className={!control ? "opacity-50" : ""}>
        <Label htmlFor="frequency">Frequency (Hz)</Label>
        <div className="flex items-center gap-2">
          <Slider
            className="nodrag w-48"
            id="frequency"
            name="frequency"
            step={0.001}
            min={Math.log10(80)}
            max={Math.log10(2560)}
            value={[Math.log10(frequency)]}
            onValueChange={([v]) => setFrequency(10 ** v)}
            disabled={!control}
          />
          <div className="w-10 font-mono">{Math.round(frequency)}</div>
        </div>
      </div>
      <ParamHandle paramName="frequency" />
    </div>
  );
}

function DetuneControl({ id }: { id: string }) {
  const { detune, setDetune, control } = useOsciillatorDetune(id);
  return (
    <div className="relative">
      <Label htmlFor="detune">Detune (cent)</Label>
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
        <div className="w-10 font-mono">{Math.round(detune)}</div>
      </div>
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
