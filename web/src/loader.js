import { writable, get } from 'svelte/store';

const config = window.LOADINGSCREEN_CONFIG || {};
export const serverName = config.serverName || 'serveren';
export const brand = config.brand === 'name' ? 'name' : 'logo';
export const keybind = config.keybind !== false;
const connecting = `Forbinder til ${serverName}…`;

export const status = writable('Initialiserer…');
export const progress = writable(0);
export const joinReady = writable(false);
export const joining = writable(false);

let real = 0;
let joined = false;

function setReal(value) {
  const next = Math.min(1, Math.max(0, Number(value)));
  if (Number.isNaN(next) || next <= real) return;
  real = next;
  progress.set(next);
}

function setText(text) {
  const trimmed = String(text ?? '').trim();
  if (trimmed) status.set(trimmed);
}

function showJoin() {
  if (get(joinReady)) return;
  joinReady.set(true);
  setReal(1);
  setText('Klar til at joine.');
  if (!keybind) join();
}

function join() {
  if (!get(joinReady) || joined) return;
  joined = true;
  joining.set(true);
  setText(connecting);
  fetch(`https://${GetParentResourceName()}/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{}',
  });
}

export function onKey(event) {
  if (event.key === 'Enter') join();
}

export function onMessage(event) {
  const data = event.data;
  if (!data || typeof data.eventName !== 'string') return;

  if (data.eventName === 'joinReady') {
    showJoin();
    return;
  }
  if (get(joinReady)) return;

  switch (data.eventName) {
    case 'loadProgress':
      setReal(data.loadFraction);
      break;
    case 'onLogLine':
      setText(data.message);
      break;
    case 'startDataFileEntries':
      setText(`Indlæser ${data.count} datafiler…`);
      break;
    case 'onDataFileEntry':
      setText(`Indlæser ${data.name}…`);
      break;
    case 'performMapLoadFunction':
      setText(`Indlæser kortsektion ${data.idx + 1}…`);
      break;
    case 'startInitFunction':
      setText(`Initialiserer ${data.type.toLowerCase()}…`);
      break;
    case 'startInitFunctionOrder':
      setText(`Initialiserer ${data.type.toLowerCase()} (${Number(data.order) + 1})…`);
      break;
    case 'initFunctionInvoking':
      setText(`Indlæser ${data.name}…`);
      break;
    case 'initFunctionInvoked':
      setText(`Indlæst ${data.name}`);
      break;
    case 'endDataFileEntries':
      setText('Datafiler indlæst');
      break;
    case 'endInitFunction':
      setText(`Indlæst ${data.type}`);
      break;
    case 'onLoadingScreenShutdown':
    case 'loadingScreenShutdown':
      setReal(1);
      setText(connecting);
      break;
    case 'fullyLoaded':
      setReal(1);
      setText('Velkommen til byen.');
      break;
  }
}
