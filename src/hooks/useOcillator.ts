import { useSyncExternalStore } from "react";

import {
  frequencyStore,
  detuneStore,
  typeStore,
} from "../stores/oscillatorNode";

export function useOsciillatorFrequency(id: string) {
  const control = useSyncExternalStore(
    (listener) =>
      frequencyStore.subscribeOscillatorFrequencyControl(id, listener),
    () => frequencyStore.getOscillatorFrequencyControl(id)
  );
  const frequency = useSyncExternalStore(
    (listener) => frequencyStore.subscribeOscillatorFrequency(id, listener),
    () => frequencyStore.getOscillatorFrequency(id)
  );
  const setFrequency = (value: number) =>
    frequencyStore.setOscillatorFrequency(id, value);

  return { frequency, setFrequency, control };
}

export function useOsciillatorDetune(id: string) {
  const control = useSyncExternalStore(
    (listener) => detuneStore.subscribeOscillatorDetuneControl(id, listener),
    () => detuneStore.getOscillatorDetuneControl(id)
  );
  const detune = useSyncExternalStore(
    (listener) => detuneStore.subscribeOscillatorDetune(id, listener),
    () => detuneStore.getOscillatorDetune(id)
  );
  const setDetune = (value: number) =>
    detuneStore.setOscillatorDetune(id, value);

  return { detune, setDetune, control };
}

export function useOsciillatorType(
  id: string
): [OscillatorType, (value: OscillatorType) => void] {
  const type = useSyncExternalStore(
    (listener) => typeStore.subscribeOscillatorType(id, listener),
    () => typeStore.getOscillatorType(id)
  );
  const setType = (value: OscillatorType) =>
    typeStore.setOscillatorType(id, value);

  return [type, setType];
}
