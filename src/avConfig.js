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

const STORAGE_KEY = 'debug-av-logo';

export function getAvConfig() {
  try {
    return { ...AV_DEFAULTS, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') };
  } catch {
    return { ...AV_DEFAULTS };
  }
}

export function setAvConfig(partial) {
  const next = { ...getAvConfig(), ...partial };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent('av-config', { detail: next }));
  return next;
}

export function triggerAvGlitch() {
  window.dispatchEvent(new Event('av-glitch'));
}
