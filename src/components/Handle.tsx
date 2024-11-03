import { Handle, Position } from "reactflow";

export function InputHandle({ index }: { index: number }) {
  return (
    <Handle
      type="target"
      position={Position.Left}
      id={`input-${index}`}
      className="w-4 h-4 rounded-full bg-blue-400 top-9"
    />
  );
}

export function OutputHandle({ index }: { index: number }) {
  return (
    <Handle
      type="source"
      position={Position.Right}
      id={`output-${index}`}
      className="w-4 h-4 rounded-full bg-blue-400 top-9"
    />
  );
}

export function ParamHandle({ paramName }: { paramName: string }) {
  return (
    <Handle
      type="target"
      position={Position.Left}
      id={paramName}
      className="w-4 h-4 rounded-full bg-slate-400 top-1/2 -left-8"
    />
  );
}
