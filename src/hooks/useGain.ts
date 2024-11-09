import { useSyncExternalStore } from "react";

import { gainStore } from "../stores/gainNode";

export function useGain(id: string) {
  const control = useSyncExternalStore(
    (listener) => gainStore.subscribeGainControl(id, listener),
    () => gainStore.getGainControl(id)
  );
  const gain = useSyncExternalStore(
    (listener) => gainStore.subscribeGain(id, listener),
    () => gainStore.getGain(id)
  );
  const setGain = (value: number) => gainStore.setGain(id, value);

  return { gain, setGain, control };
}
