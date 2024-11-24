const context = new AudioContext();
context.suspend();

export default context;

const audioContextStateListners = new Set<() => void>();

function emitStateChange() {
  for (const listener of audioContextStateListners) {
    listener();
  }
}

function getState() {
  return context.state;
}

function subscribeState(listener: () => void) {
  audioContextStateListners.add(listener);
  return () => {
    audioContextStateListners.delete(listener);
  };
}

async function resume() {
  return context.resume().then(() => emitStateChange());
}

async function suspend() {
  return context.suspend().then(() => emitStateChange());
}

async function close() {
  return context.close().then(() => emitStateChange());
}

export const audioContextStore = {
  getState,
  subscribeState,
  resume,
  suspend,
  close,
};
