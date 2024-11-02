import { useSyncExternalStore } from "react";

import { audioContextStore } from "../stores/audioContext";

export function useAudioContextState() {
  const state = useSyncExternalStore(
    audioContextStore.subscribeState,
    audioContextStore.getState
  );
  const toggle =
    state === "running" ? audioContextStore.suspend : audioContextStore.resume;

  return { state, toggle };
}
