import { useSyncExternalStore } from "react";

import {
  frequencyStore,
  detuneStore,
  qStore,
  gainStore,
  typeStore,
} from "../stores/biquadFilterNode";

export function useBiquadFilterFrequency(id: string) {
  const frequency = useSyncExternalStore(
    (listener) => frequencyStore.subscribeFrequency(id, listener),
    () => frequencyStore.getFrequency(id)
  );
  const setFrequency = (value: number) =>
    frequencyStore.setFrequency(id, value);

  return { frequency, setFrequency };
}

export function useBiquadFilterDetune(id: string) {
  const detune = useSyncExternalStore(
    (listener) => detuneStore.subscribeDetune(id, listener),
    () => detuneStore.getDetune(id)
  );
  const setDetune = (value: number) => detuneStore.setDetune(id, value);

  return { detune, setDetune };
}

export function useBiquadFilterQ(id: string) {
  const q = useSyncExternalStore(
    (listener) => qStore.subscribeQ(id, listener),
    () => qStore.getQ(id)
  );
  const setQ = (value: number) => qStore.setQ(id, value);
  const { type } = useBiquadFilterType(id);
  const control =
    type === "lowpass" ||
    type === "highpass" ||
    type === "bandpass" ||
    type === "peaking" ||
    type === "notch" ||
    type === "allpass";

  return { q, setQ, control };
}

export function useBiquadFilterGain(id: string) {
  const gain = useSyncExternalStore(
    (listener) => gainStore.subscribeGain(id, listener),
    () => gainStore.getGain(id)
  );
  const setGain = (value: number) => gainStore.setGain(id, value);
  const { type } = useBiquadFilterType(id);
  const control =
    type === "lowshelf" || type === "highshelf" || type === "peaking";

  return { gain, setGain, control };
}

export function useBiquadFilterType(id: string) {
  const type = useSyncExternalStore(
    (listener) => typeStore.subscribeType(id, listener),
    () => typeStore.getType(id)
  );
  const setType = (value: BiquadFilterType) => typeStore.setType(id, value);

  return { type, setType };
}
