// Shared config for the 3D AV background emblem.
// Defaults are the values chosen in logo-playground.html on 2026-07-03.
// The hidden DebugPanel writes overrides here; BackgroundAV reads + listens.
export const AV_DEFAULTS = {
  scale: 1.1,
  letterDepth: 3.4,
  ringDepth: 3.6,
  tilt: 0.35,
  green: '#00ff41',
  purple: '#d24dff',
};

// Color presets from the playground. Every page load picks one at random
// unless the owner has pinned explicit values via the debug panel.
export const AV_PRESETS = [
  { name: 'Sketch Classic', green: '#00ff41', purple: '#d24dff' },
  { name: 'Toxic Mint', green: '#00f6ff', purple: '#00ff73' },
  { name: 'Retro Grid', green: '#ff0055', purple: '#00f6ff' },
  { name: 'Carbon & White', green: '#ffffff', purple: '#6e6e6e' },
];

// Chosen once per page load so every reader of getAvConfig() agrees.
const SESSION_PRESET = AV_PRESETS[Math.floor(Math.random() * AV_PRESETS.length)];

const STORAGE_KEY = 'debug-av-logo';

export function getAvConfig() {
  const base = { ...AV_DEFAULTS, green: SESSION_PRESET.green, purple: SESSION_PRESET.purple };
  try {
    return { ...base, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') };
  } catch {
    return base;
  }
}

export function setAvConfig(partial) {
  const next = { ...getAvConfig(), ...partial };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent('av-config', { detail: next }));
  return next;
}

// Remove pinned overrides: back to defaults + per-load random preset.
export function clearAvConfig() {
  localStorage.removeItem(STORAGE_KEY);
  const cfg = getAvConfig();
  window.dispatchEvent(new CustomEvent('av-config', { detail: cfg }));
  return cfg;
}

export function triggerAvGlitch() {
  window.dispatchEvent(new Event('av-glitch'));
}
