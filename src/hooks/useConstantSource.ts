import { useSyncExternalStore } from "react";

import { offsetStore } from "../stores/constantSourceNode";

export function useConstantSourceOffset(id: string) {
  const control = useSyncExternalStore(
    (listener) => offsetStore.subscribeOffsetControl(id, listener),
    () => offsetStore.getOffsetControl(id)
  );
  const offset = useSyncExternalStore(
    (listener) => offsetStore.subscribeOffset(id, listener),
    () => offsetStore.getOffset(id)
  );
  const setOffset = (value: number) => offsetStore.setOffset(id, value);

  return { offset, setOffset, control };
}
