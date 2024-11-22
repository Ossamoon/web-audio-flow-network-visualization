export const createStore = () => {
  const listenersMap = new Map<string, Set<() => void>>();

  function emitChange(id: string) {
    for (const listener of listenersMap.get(id) ?? []) {
      listener();
    }
  }

  function subscribe(id: string, listener: () => void) {
    const listeners = listenersMap.get(id) ?? new Set();
    listeners.add(listener);
    listenersMap.set(id, listeners);
    return () => {
      listeners.delete(listener);
    };
  }

  return {
    emitChange,
    subscribe,
  };
};

export const createParamStore = <T extends AudioNode>(
  paramName: string,
  getNode: (id: string) => T
) => {
  const controlMap = new Map<string, boolean>(); // ユーザーがAudioParamを操作できるかどうか

  const {
    emitChange: emitChangeParamControl,
    subscribe: subscribeParamControl,
  } = createStore();
  const { emitChange: emitChangeParamValue, subscribe: subscribeParamValue } =
    createStore();

  const getParamControl = (id: string) => {
    const control = controlMap.get(id) ?? true;
    return control;
  };
  const setParamControl = (id: string, value: boolean) => {
    controlMap.set(id, value);
    emitChangeParamControl(id);
  };

  const getParamValue = (id: string) => {
    const audioNode = getNode(id);
    const audioParam = audioNode[paramName as keyof T] as AudioParam;
    return audioParam.value;
  };
  const setParamValue = (id: string, value: number) => {
    if (getParamControl(id)) {
      const audioNode = getNode(id);
      const audioParam = audioNode[paramName as keyof T] as AudioParam;
      audioParam.value = value;
      emitChangeParamValue(id);
    }
  };

  return {
    emitChangeParamControl,
    subscribeParamControl,
    getParamControl,
    setParamControl,
    emitChangeParamValue,
    subscribeParamValue,
    getParamValue,
    setParamValue,
  };
};
