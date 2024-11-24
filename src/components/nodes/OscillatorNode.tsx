import { Label } from "@/shadcn/app/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/app/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/app/ui/card";

import { OutputHandle, ParamHandle } from "../Handle";
import { SliderProvider, AudioParamInput } from "../AudioParamInput";
import {
  useOsciillatorFrequency,
  useOsciillatorDetune,
  useOsciillatorType,
} from "../../hooks/useOcillator";

export function OscillatorNode({ id }: { id: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Oscillator Node</CardTitle>
      </CardHeader>

      <SliderProvider>
        <CardContent className="w-72 space-y-3">
          <FrequencyControl id={id} />
          <DetuneControl id={id} />
          <WaveTypeSelect id={id} />
        </CardContent>
      </SliderProvider>

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
        <AudioParamInput
          name="frequency"
          value={frequency}
          setValue={setFrequency}
          sliderOption={{
            step: 0.01,
            min: Math.log10(20),
            max: Math.log10(10000),
            logarithm: true,
          }}
          nonNegative={true}
          disabled={!control}
        />
      </div>
      <ParamHandle paramName="frequency" />
    </div>
  );
}

function DetuneControl({ id }: { id: string }) {
  const { detune, setDetune, control } = useOsciillatorDetune(id);
  return (
    <div className="relative">
      <div className={!control ? "opacity-50" : ""}>
        <Label htmlFor="detune">Detune (cent)</Label>
        <AudioParamInput
          name="detune"
          value={detune}
          setValue={setDetune}
          sliderOption={{
            step: 1,
            min: -200,
            max: 200,
          }}
          disabled={!control}
        />
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
