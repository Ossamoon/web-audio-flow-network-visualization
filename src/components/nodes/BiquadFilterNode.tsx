import { Label } from "@/shadcn/app/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/app/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/app/ui/card";

import { InputHandle, OutputHandle, ParamHandle } from "../Handle";
import { SliderProvider, AudioParamInput } from "../AudioParamInput";
import {
  useBiquadFilterFrequency,
  useBiquadFilterDetune,
  useBiquadFilterQ,
  useBiquadFilterGain,
  useBiquadFilterType,
} from "../../hooks/useBiquadFilterNode";

export function BiquadFilterNode({ id }: { id: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Biquad Filter Node</CardTitle>
      </CardHeader>

      <SliderProvider>
        <CardContent className="w-72 space-y-3">
          <FrequencyControl id={id} />
          <DetuneControl id={id} />
          <QControl id={id} />
          <GainControl id={id} />
          <FilterTypeSelect id={id} />
        </CardContent>
      </SliderProvider>

      <InputHandle index={0} />
      <OutputHandle index={0} />
    </Card>
  );
}

function FrequencyControl({ id }: { id: string }) {
  const { frequency, setFrequency } = useBiquadFilterFrequency(id);
  return (
    <div className="relative">
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
      />
      <ParamHandle paramName="frequency" />
    </div>
  );
}

function DetuneControl({ id }: { id: string }) {
  const { detune, setDetune } = useBiquadFilterDetune(id);
  return (
    <div className="relative">
      <Label htmlFor="detune">Detune (cents)</Label>
      <AudioParamInput
        name="detune"
        value={detune}
        setValue={setDetune}
        sliderOption={{
          step: 1,
          min: -200,
          max: 200,
        }}
      />
      <ParamHandle paramName="detune" />
    </div>
  );
}

function QControl({ id }: { id: string }) {
  const { q, setQ, control } = useBiquadFilterQ(id);
  return (
    <div className="relative">
      <div className={!control ? "opacity-50" : ""}>
        <Label htmlFor="q">Q</Label>
        <AudioParamInput
          name="q"
          value={q}
          setValue={setQ}
          sliderOption={{
            step: 0.01,
            min: 0.01,
            max: 20,
          }}
          disabled={!control}
        />
      </div>
      <ParamHandle paramName="q" />
    </div>
  );
}

function GainControl({ id }: { id: string }) {
  const { gain, setGain, control } = useBiquadFilterGain(id);
  return (
    <div className="relative">
      <div className={!control ? "opacity-50" : ""}>
        <Label htmlFor="gain">Gain (dB)</Label>
        <AudioParamInput
          name="gain"
          value={gain}
          setValue={setGain}
          sliderOption={{
            step: 0.01,
            min: -20,
            max: 20,
          }}
          disabled={!control}
        />
      </div>
      <ParamHandle paramName="gain" />
    </div>
  );
}

function FilterTypeSelect({ id }: { id: string }) {
  const { type, setType } = useBiquadFilterType(id);

  return (
    <div className="space-y-1">
      <Label>FilterType</Label>
      <Select
        value={type}
        onValueChange={(v) => setType(v as BiquadFilterType)}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="lowpass">lowpass</SelectItem>
          <SelectItem value="highpass">highpass</SelectItem>
          <SelectItem value="bandpass">bandpass</SelectItem>
          <SelectItem value="lowshelf">lowshelf</SelectItem>
          <SelectItem value="highshelf">highshelf</SelectItem>
          <SelectItem value="peaking">peaking</SelectItem>
          <SelectItem value="notch">notch</SelectItem>
          <SelectItem value="allpass">allpass</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
