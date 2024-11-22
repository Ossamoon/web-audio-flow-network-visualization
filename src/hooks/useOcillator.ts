import { useSyncExternalStore } from "react";

import {
  frequencyStore,
  detuneStore,
  typeStore,
} from "../stores/oscillatorNode";

export function useOsciillatorFrequency(id: string) {
  const control = useSyncExternalStore(
    (listener) => frequencyStore.subscribeFrequencyControl(id, listener),
    () => frequencyStore.getFrequencyControl(id)
  );
  const frequency = useSyncExternalStore(
    (listener) => frequencyStore.subscribeFrequency(id, listener),
    () => frequencyStore.getFrequency(id)
  );
  const setFrequency = (value: number) =>
    frequencyStore.setFrequency(id, value);

  return { frequency, setFrequency, control };
}

export function useOsciillatorDetune(id: string) {
  const control = useSyncExternalStore(
    (listener) => detuneStore.subscribeDetuneControl(id, listener),
    () => detuneStore.getDetuneControl(id)
  );
  const detune = useSyncExternalStore(
    (listener) => detuneStore.subscribeDetune(id, listener),
    () => detuneStore.getDetune(id)
  );
  const setDetune = (value: number) => detuneStore.setDetune(id, value);

  return { detune, setDetune, control };
}

export function useOsciillatorType(
  id: string
): [OscillatorType, (value: OscillatorType) => void] {
  const type = useSyncExternalStore(
    (listener) => typeStore.subscribeType(id, listener),
    () => typeStore.getType(id)
  );
  const setType = (value: OscillatorType) => typeStore.setType(id, value);

  return [type, setType];
}
