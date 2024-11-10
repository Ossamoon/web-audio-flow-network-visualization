import { Input } from "@/shadcn/app/ui/input";
import { Label } from "@/shadcn/app/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/app/ui/card";

import { OutputHandle, ParamHandle } from "../components/Handle";
import { useConstantSourceOffset } from "@/hooks/useConstantSource";

export function ConstantSourceNode({ id }: { id: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Constant Source Node</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
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
        <div className="flex items-center gap-2">
          <Input
            className={`w-40`}
            id="offset"
            name="offset"
            type="number"
            value={offset}
            onChange={(e) => setOffset(parseFloat(e.target.value))}
            disabled={!control}
          />
        </div>
      </div>
      <ParamHandle paramName="offset" />
    </div>
  );
}
