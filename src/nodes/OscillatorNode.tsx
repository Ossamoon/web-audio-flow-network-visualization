import { Slider } from "@/shadcn/app/ui/slider";
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
  useOsciillatorType,
} from "@/hooks/useOcillator";

export function OscillatorNode({ id }: { id: string }) {
  const { frequency, setFrequency, control } = useOsciillatorFrequency(id);
  const [type, setType] = useOsciillatorType(id);
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
              value={[Math.log10(frequency)]}
              onValueChange={([v]) => setFrequency(10 ** v)}
              disabled={!control}
            />
            <div className="w-10 font-mono">{Math.round(frequency)}</div>
          </div>
        </div>
        <div>
          <div className="mb-2">WaveType</div>
          <Select
            value={type}
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

      <ParamHandle paramName="frequency" />
      <OutputHandle index={0} />
    </Card>
  );
}
