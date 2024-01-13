const context = new AudioContext();
const nodes = new Map();

const osc = context.createOscillator();
osc.frequency.value = 440;
osc.type = "square";
osc.start();

const amp = context.createGain();
amp.gain.value = 0.5;

const out = context.destination;

nodes.set("a", osc);
nodes.set("b", amp);
nodes.set("destination", out);

export function updateAudioNode(id: string, data: object) {
  const node = nodes.get(id);

  for (const [key, value] of Object.entries(data)) {
    if (node[key] instanceof AudioParam) {
      node[key].value = value;
    } else {
      node[key] = value;
    }
  }
}

export function removeAudioNode(id: string) {
  const node = nodes.get(id) as AudioNode;

  node.disconnect();
  if (node instanceof AudioScheduledSourceNode) {
    node.stop();
  }

  nodes.delete(id);
}

export function connect(sourceId: string, targetId: string) {
  const source = nodes.get(sourceId);
  const target = nodes.get(targetId);

  source.connect(target);
}

export function disconnect(sourceId: string, targetId: string) {
  const source = nodes.get(sourceId);
  const target = nodes.get(targetId);

  source.disconnect(target);
}

export function isRunning() {
  return context.state === "running";
}

export function toggleAudio() {
  return isRunning() ? context.suspend() : context.resume();
}

export function createOscillatorNode(id: string) {
  const node = context.createOscillator();
  node.frequency.value = 440;
  node.type = "sine";
  node.start();

  nodes.set(id, node);
}

export function createGainNode(id: string) {
  const node = context.createGain();
  node.gain.value = 0.5;

  nodes.set(id, node);
}
