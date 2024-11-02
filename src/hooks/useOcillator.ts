import { useSyncExternalStore } from "react";

import { oscillatorNodeStore } from "../stores/oscillatorNode";

export function useOsciillatorFrequency(id: string) {
  const control = useSyncExternalStore(
    (listener) =>
      oscillatorNodeStore.subscribeOscillatorFrequencyControl(id, listener),
    () => oscillatorNodeStore.getOscillatorFrequencyControl(id)
  );
  const frequency = useSyncExternalStore(
    (listener) =>
      oscillatorNodeStore.subscribeOscillatorFrequency(id, listener),
    () => oscillatorNodeStore.getOscillatorFrequency(id)
  );
  const setFrequency = (value: number) =>
    oscillatorNodeStore.setOscillatorFrequency(id, value);

  return { frequency, setFrequency, control };
}

export function useOsciillatorType(
  id: string
): [OscillatorType, (value: OscillatorType) => void] {
  const type = useSyncExternalStore(
    (listener) => oscillatorNodeStore.subscribeOscillatorType(id, listener),
    () => oscillatorNodeStore.getOscillatorType(id)
  );
  const setType = (value: OscillatorType) =>
    oscillatorNodeStore.setOscillatorType(id, value);

  return [type, setType];
}
