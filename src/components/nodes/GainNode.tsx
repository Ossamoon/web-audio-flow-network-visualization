import { Label } from "@/shadcn/app/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/app/ui/card";

import { InputHandle, OutputHandle, ParamHandle } from "../Handle";
import { AudioParamInput, SliderProvider } from "../AudioParamInput";
import { useGain } from "../../hooks/useGain";

export function GainNode({ id }: { id: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gain Node</CardTitle>
      </CardHeader>

      <SliderProvider>
        <CardContent className="w-72">
          <GainControl id={id} />
        </CardContent>
      </SliderProvider>

      <InputHandle index={0} />
      <OutputHandle index={0} />
    </Card>
  );
}

function GainControl({ id }: { id: string }) {
  const { gain, control, setGain } = useGain(id);
  return (
    <div className="relative">
      <div className={!control ? "opacity-50" : ""}>
        <Label htmlFor="gain">Gain</Label>
        <AudioParamInput
          name="gain"
          value={gain}
          setValue={setGain}
          sliderOption={{
            step: 0.01,
            min: 0,
            max: 1,
          }}
          nonNegative={true}
          disabled={!control}
        />
      </div>
      <ParamHandle paramName="gain" />
    </div>
  );
}
