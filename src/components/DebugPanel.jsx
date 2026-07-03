import React, { useEffect, useState } from 'react';

// Hidden tuning panel for card translucency vs. background-logo visibility.
// Not visible to visitors: activate with Ctrl+Shift+X, or by adding ?debug to the URL.
// Values persist in localStorage and override the CSS defaults on this browser only.
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

  if (!enabled) return null;

  const set = (key) => (e) => setVals((v) => ({ ...v, [key]: Number(e.target.value) }));

  return (
    <>
      <button
        className="debug-toggle"
        onClick={() => setOpen(!open)}
        title="Translucency debug panel"
        aria-label="Toggle translucency debug panel"
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

          <button className="debug-reset" onClick={() => setVals(DEFAULTS)}>
            Reset to defaults
          </button>
        </div>
      )}
    </>
  );
}
