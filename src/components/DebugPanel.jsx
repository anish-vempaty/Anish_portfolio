import React, { useEffect, useState } from 'react';
import { AV_DEFAULTS, getAvConfig, setAvConfig, triggerAvGlitch } from '../avConfig';

// Hidden tuning panel for the background emblem + card translucency.
// Not visible to visitors: activate with Ctrl+Shift+X, or by adding ?debug to the URL.
// Values persist in localStorage and override the defaults on this browser only.
const DEFAULTS = { alpha: 0.4, blur: 2, logo: 0.9 };
const STORAGE_KEY = 'debug-translucency';

export default function DebugPanel() {
  const [enabled, setEnabled] = useState(
    () => new URLSearchParams(window.location.search).has('debug')
  );
  const [open, setOpen] = useState(false);
  const [vals, setVals] = useState(() => {
    try {
      return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') };
    } catch {
      return DEFAULTS;
    }
  });
  const [av, setAv] = useState(getAvConfig);

  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey && e.shiftKey && e.code === 'KeyX') {
        e.preventDefault();
        setEnabled((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty('--card-alpha', vals.alpha);
    root.setProperty('--card-blur', `${vals.blur}px`);
    root.setProperty('--av-opacity', vals.logo);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vals));
  }, [vals]);

  useEffect(() => {
    setAvConfig(av);
  }, [av]);

  if (!enabled) return null;

  const set = (key) => (e) => setVals((v) => ({ ...v, [key]: Number(e.target.value) }));
  const setLogo = (key, isNumber = true) => (e) =>
    setAv((v) => ({ ...v, [key]: isNumber ? Number(e.target.value) : e.target.value }));

  return (
    <>
      <button
        className="debug-toggle"
        onClick={() => setOpen(!open)}
        title="Debug panel"
        aria-label="Toggle debug panel"
      >
        {open ? '✕' : '🎛'}
      </button>
      {open && (
        <div className="debug-panel">
          <h4>Translucency</h4>

          <label htmlFor="dbg-alpha">Card opacity: {vals.alpha.toFixed(2)}</label>
          <input
            id="dbg-alpha" type="range" min="0.1" max="1" step="0.05"
            value={vals.alpha} onChange={set('alpha')}
          />

          <label htmlFor="dbg-blur">Card blur: {vals.blur}px</label>
          <input
            id="dbg-blur" type="range" min="0" max="20" step="1"
            value={vals.blur} onChange={set('blur')}
          />

          <label htmlFor="dbg-logo">Logo brightness: {vals.logo.toFixed(2)}</label>
          <input
            id="dbg-logo" type="range" min="0.1" max="1" step="0.05"
            value={vals.logo} onChange={set('logo')}
          />

          <h4 className="debug-section">Logo design</h4>

          <label htmlFor="dbg-scale">Emblem scale: {av.scale.toFixed(2)}</label>
          <input
            id="dbg-scale" type="range" min="0.5" max="1.6" step="0.05"
            value={av.scale} onChange={setLogo('scale')}
          />

          <label htmlFor="dbg-letter-depth">Letter depth: {av.letterDepth.toFixed(1)}</label>
          <input
            id="dbg-letter-depth" type="range" min="1" max="8" step="0.2"
            value={av.letterDepth} onChange={setLogo('letterDepth')}
          />

          <label htmlFor="dbg-ring-depth">Ring depth: {av.ringDepth.toFixed(1)}</label>
          <input
            id="dbg-ring-depth" type="range" min="0.5" max="6" step="0.1"
            value={av.ringDepth} onChange={setLogo('ringDepth')}
          />

          <label htmlFor="dbg-tilt">Tilt sensitivity: {av.tilt.toFixed(2)}</label>
          <input
            id="dbg-tilt" type="range" min="0" max="0.8" step="0.05"
            value={av.tilt} onChange={setLogo('tilt')}
          />

          <div className="debug-colors">
            <label htmlFor="dbg-green">
              A stroke
              <input id="dbg-green" type="color" value={av.green} onChange={setLogo('green', false)} />
            </label>
            <label htmlFor="dbg-purple">
              V stroke
              <input id="dbg-purple" type="color" value={av.purple} onChange={setLogo('purple', false)} />
            </label>
          </div>

          <button className="debug-glitch" onClick={triggerAvGlitch}>
            ⚡ Trigger glitch
          </button>

          <button
            className="debug-reset"
            onClick={() => { setVals(DEFAULTS); setAv({ ...AV_DEFAULTS }); }}
          >
            Reset to defaults
          </button>
        </div>
      )}
    </>
  );
}
