import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shadcn/app/ui/dropdown-menu";
import { Button } from "@/shadcn/app/ui/button";
import { useAddNode } from "../hooks/useAddNode";

export function AddNodeDropdown() {
  const addNode = useAddNode();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Add Node</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => addNode("OscillatorNode")}>
          OscillatorNode
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => addNode("ConstantSourceNode")}>
          ConstantSourceNode
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => addNode("GainNode")}>
          GainNode
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
