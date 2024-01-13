import { Handle as BaseHandle, type HandleProps } from "reactflow";

export default function CustomHandle(props: HandleProps) {
  return (
    <BaseHandle {...props} className="w-4 h-4 rounded-full bg-stone-400" />
  );
}
