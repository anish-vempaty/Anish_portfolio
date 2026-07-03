import React, { useEffect, useState } from 'react';
import { AV_PRESETS, getAvConfig, setAvConfig, clearAvConfig, triggerAvGlitch } from '../avConfig';

// Hidden tuning panel for the background emblem + card translucency.
// Not visible to visitors: activate with Ctrl+Shift+X, or by adding ?debug to the URL.
// Values persist in localStorage ONLY when changed here, and override the
// defaults on this browser alone. With no overrides stored, the logo colors
// are a random preset per page load.
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

  // Apply translucency to CSS (persistence happens only in the change handlers)
  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty('--card-alpha', vals.alpha);
    root.setProperty('--card-blur', `${vals.blur}px`);
    root.setProperty('--av-opacity', vals.logo);
  }, [vals]);

  if (!enabled) return null;

  const set = (key) => (e) => {
    setVals((v) => {
      const next = { ...v, [key]: Number(e.target.value) };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const setLogo = (key, isNumber = true) => (e) => {
    const next = { ...av, [key]: isNumber ? Number(e.target.value) : e.target.value };
    setAv(next);
    setAvConfig(next);
  };

  const applyPreset = (preset) => {
    const next = { ...av, green: preset.green, purple: preset.purple };
    setAv(next);
    setAvConfig(next);
  };

  const resetAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    setVals(DEFAULTS);
    setAv(clearAvConfig()); // back to defaults + random preset per load
  };

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

          <h4 className="debug-section">Color presets</h4>
          <p className="debug-note">Visitors get a random preset each load; picking one here pins it.</p>
          <div className="debug-presets">
            {AV_PRESETS.map((p) => (
              <button
                key={p.name}
                className={av.green === p.green && av.purple === p.purple ? 'active' : ''}
                onClick={() => applyPreset(p)}
              >
                <span className="swatch" style={{ background: p.green }} />
                <span className="swatch" style={{ background: p.purple }} />
                {p.name}
              </button>
            ))}
          </div>

          <button className="debug-glitch" onClick={triggerAvGlitch}>
            ⚡ Trigger glitch
          </button>

          <button className="debug-reset" onClick={resetAll}>
            Reset to defaults (unpin)
          </button>
        </div>
      )}
    </>
  );
}
