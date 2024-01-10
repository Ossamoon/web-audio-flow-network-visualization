import { Position } from "reactflow";
import { useShallow } from "zustand/react/shallow";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/app/ui/card";
import { Volume2, VolumeX } from "lucide-react";

import { useStore, type Store } from "../store";
import Handle from "../components/Handle";
import { Toggle } from "@/shadcn/app/ui/toggle";

const selector = (store: Store) => ({
  isRunning: store.isRunning,
  toggleAudio: store.toggleAudio,
});

export default function AudioDestinationNode() {
  const { isRunning, toggleAudio } = useStore(useShallow(selector));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Audio Destination Node</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Toggle
          variant="outline"
          pressed={isRunning}
          onPressedChange={toggleAudio}
        >
          {isRunning ? (
            <Volume2 className="w-8 h-8" />
          ) : (
            <VolumeX className="w-8 h-8" />
          )}
          <span className="ml-3 text-lg">
            {isRunning ? "Playing" : "Stopped"}
          </span>
        </Toggle>
      </CardContent>
      <Handle type="target" position={Position.Top} />
    </Card>
  );
}
