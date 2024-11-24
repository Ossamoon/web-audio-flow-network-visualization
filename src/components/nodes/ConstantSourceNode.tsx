import { Label } from "@/shadcn/app/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/app/ui/card";

import { OutputHandle, ParamHandle } from "../Handle";
import { AudioParamInput } from "../AudioParamInput";
import { useConstantSourceOffset } from "../../hooks/useConstantSource";

export function ConstantSourceNode({ id }: { id: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Constant Source Node</CardTitle>
      </CardHeader>

      <CardContent className="w-72">
        <OffsetControl id={id} />
      </CardContent>

      <OutputHandle index={0} />
    </Card>
  );
}

function OffsetControl({ id }: { id: string }) {
  const { offset, control, setOffset } = useConstantSourceOffset(id);
  return (
    <div className="relative">
      <div className={!control ? "opacity-50" : ""}>
        <Label htmlFor="offset">Offset</Label>
        <AudioParamInput
          name="offset"
          value={offset}
          setValue={setOffset}
          disabled={!control}
        />
      </div>
      <ParamHandle paramName="offset" />
    </div>
  );
}
