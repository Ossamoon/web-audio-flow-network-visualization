import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/app/ui/card";
import { Volume2, VolumeX } from "lucide-react";

import { InputHandle } from "../Handle";
import { Toggle } from "@/shadcn/app/ui/toggle";
import { useAudioContextState } from "../../hooks/useAudioContext";

export function AudioDestinationNode() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Audio Destination Node</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <PlayerToggleButton />
      </CardContent>
      <InputHandle index={0} />
    </Card>
  );
}

function PlayerToggleButton() {
  const { state, toggle } = useAudioContextState();
  const isRunning = state === "running";
  return (
    <Toggle
      variant="outline"
      pressed={isRunning}
      onPressedChange={() => toggle()}
    >
      {isRunning ? (
        <Volume2 className="w-8 h-8" />
      ) : (
        <VolumeX className="w-8 h-8" />
      )}
      <span className="ml-3 text-lg">{isRunning ? "Playing" : "Stopped"}</span>
    </Toggle>
  );
}
