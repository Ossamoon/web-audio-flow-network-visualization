import { useSyncExternalStore } from "react";

import { gainNodeStore } from "../stores/gainNode";

export function useGain(id: string) {
  const control = useSyncExternalStore(
    (listener) => gainNodeStore.subscribeGainControl(id, listener),
    () => gainNodeStore.getGainControl(id)
  );
  const gain = useSyncExternalStore(
    (listener) => gainNodeStore.subscribeGain(id, listener),
    () => gainNodeStore.getGain(id)
  );
  const setGain = (value: number) => gainNodeStore.setGain(id, value);

  return { gain, setGain, control };
}
