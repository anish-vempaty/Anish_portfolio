import { useEffect, useRef } from "react";
import * as THREE from "three";
import { getAvConfig } from "../avConfig";

// Interactive 3D "AV" emblem rendered behind the page content (OSIRIS-lab style).
// Geometry and defaults come from logo-playground.html (2026-07-03 redesign):
// the A's left leg bends into the crossbar, the checkmark V climbs to the ring.
// The scene renders into a texture, then through a screen-space glitch shader.
// Live-tunable via the hidden DebugPanel ("av-config" / "av-glitch" events).

// Face/side colors for the default strokes (hand-tuned in the playground);
// other stroke colors fall back to derived darkening.
const DEFAULT_FACES = {
  "#00ff41": [0x051a09, 0x010702],
  "#d24dff": [0x14041c, 0x050107],
};

const darken = (hex, ratio) => {
  const c = parseInt(hex.slice(1), 16);
  const r = Math.floor(((c >> 16) & 255) * ratio);
  const g = Math.floor(((c >> 8) & 255) * ratio);
  const b = Math.floor((c & 255) * ratio);
  return (r << 16) | (g << 8) | b;
};

// 2D outlines in logo units (origin = ring center, +y up), extruded to 3D.
// Uniform 1.5-unit stroke thickness with matched slopes.

// Triangular apex "Λ" at the top of the A
const LAMBDA_POINTS = [
  [-3.0, 7.5], [-2.0, 7.5],
  [1.0, 1.5], [-0.5, 1.5],
  [-2.5, 5.5],
  [-4.5, 1.5], [-6.0, 1.5],
];

// Left sloping leg bending into the horizontal crossbar of the A
const BAR_POINTS = [
  [-7.0, -0.5], [3.5, -0.5],
  [3.5, -2.5], [-6.5, -2.5],
  [-9.0, -7.5], [-10.5, -7.5],
];

// Stylized V — starts under the crossbar's right tip, climbs to the ring
const V_POINTS = [
  [2.0, -3.5], [3.5, -3.5],
  [4.5, -5.5],
  [11.5, 8.5], [13.0, 8.5],
  [4.5, -8.5],
];

const LETTERS_X_OFFSET = -1.25;
const RING_OUTER = 15;
const RING_INNER = 13.2;

const GLITCH_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const GLITCH_FRAG = /* glsl */ `
  uniform sampler2D tDiffuse;
  uniform float uIntensity;
  uniform float uSeed;
  varying vec2 vUv;

  float rand(vec2 co) {
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    if (uIntensity < 0.001) {
      gl_FragColor = texture2D(tDiffuse, vUv);
      return;
    }

    vec2 uv = vUv;

    // Band tearing displacement
    float bandCount = mix(8.0, 32.0, rand(vec2(uSeed, 1.0)));
    float band = floor(uv.y * bandCount);
    float tear = step(0.6, rand(vec2(band, uSeed)));
    uv.x += tear * (rand(vec2(band, uSeed + 1.2)) - 0.5) * 0.3 * uIntensity;

    // Fine grid/block fragmentation
    vec2 cell = floor(uv * vec2(12.0, 8.0));
    float cellRand = rand(cell + uSeed);
    if (cellRand > 0.8) {
      uv += (vec2(rand(cell + uSeed + 1.0), rand(cell + uSeed + 2.0)) - 0.5) * 0.2 * uIntensity;
    }

    // Chromatic split
    float shift = 0.015 * uIntensity;
    vec4 cr = texture2D(tDiffuse, uv + vec2(shift, 0.0));
    vec4 cg = texture2D(tDiffuse, uv);
    vec4 cb = texture2D(tDiffuse, uv - vec2(shift, 0.0));
    vec4 col = vec4(cr.r, cg.g, cb.b, max(cg.a, max(cr.a, cb.a)));

    if (cellRand > 0.9) {
      col.rgb = col.rgb.gbr;
    }

    gl_FragColor = col;
  }
`;

export default function BackgroundAV() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    let cfg = getAvConfig();

    const scene = new THREE.Scene();
    const frustumSize = 40;
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2, (frustumSize * aspect) / 2,
      frustumSize / 2, frustumSize / -2, 0.1, 1000
    );
    camera.position.z = 50;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      return undefined; // No WebGL available — page works fine without the backdrop
    }
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.5);
    keyLight.position.set(0, 5, 10);
    scene.add(keyLight);

    const greenFace = new THREE.MeshLambertMaterial();
    const greenSide = new THREE.MeshLambertMaterial();
    const purpleFace = new THREE.MeshLambertMaterial();
    const purpleSide = new THREE.MeshLambertMaterial();
    const greenEdge = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.9 });
    const purpleEdge = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.9 });
    const allMats = [greenFace, greenSide, purpleFace, purpleSide, greenEdge, purpleEdge];

    const applyStroke = (hex, edgeMat, faceMat, sideMat) => {
      edgeMat.color.set(hex);
      const preset = DEFAULT_FACES[hex.toLowerCase()];
      faceMat.color.setHex(preset ? preset[0] : darken(hex, 0.08));
      sideMat.color.setHex(preset ? preset[1] : darken(hex, 0.02));
    };
    const applyColors = () => {
      applyStroke(cfg.green, greenEdge, greenFace, greenSide);
      applyStroke(cfg.purple, purpleEdge, purpleFace, purpleSide);
    };
    applyColors();

    const shapeFrom = (pts) => {
      const s = new THREE.Shape();
      s.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) s.lineTo(pts[i][0], pts[i][1]);
      s.closePath();
      return s;
    };

    // Shear the extrusion down-left for the isometric look
    const shearMatrix = new THREE.Matrix4().set(
      1, 0, -0.6, 0,
      0, 1, -0.5, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    );

    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    // Geometry is rebuilt when extrusion depths change in the debug panel
    let buildGeos = [];
    const rebuildLogo = () => {
      while (logoGroup.children.length > 0) logoGroup.remove(logoGroup.children[0]);
      buildGeos.forEach((g) => g.dispose());
      buildGeos = [];

      const extrudeLetter = { depth: cfg.letterDepth, bevelEnabled: false };
      const letterGeos = [LAMBDA_POINTS, BAR_POINTS, V_POINTS].map((pts) =>
        new THREE.ExtrudeGeometry(shapeFrom(pts), extrudeLetter)
      );

      const ringShape = new THREE.Shape();
      ringShape.absarc(0, 0, RING_OUTER, 0, Math.PI * 2, false);
      const ringHole = new THREE.Path();
      ringHole.absarc(0, 0, RING_INNER, 0, Math.PI * 2, true);
      ringShape.holes.push(ringHole);
      const ringGeo = new THREE.ExtrudeGeometry(ringShape, {
        depth: cfg.ringDepth, bevelEnabled: false, curveSegments: 64,
      });

      [...letterGeos, ringGeo].forEach((g) => {
        g.applyMatrix4(shearMatrix);
        buildGeos.push(g);
      });

      const letters = new THREE.Group();
      letters.position.x = LETTERS_X_OFFSET;
      const letterMats = [
        [greenFace, greenSide, greenEdge],
        [greenFace, greenSide, greenEdge],
        [purpleFace, purpleSide, purpleEdge],
      ];
      letterGeos.forEach((geo, i) => {
        const [faceM, sideM, edgeM] = letterMats[i];
        letters.add(new THREE.Mesh(geo, [faceM, sideM]));
        const edges = new THREE.EdgesGeometry(geo, 20);
        buildGeos.push(edges);
        letters.add(new THREE.LineSegments(edges, edgeM));
      });
      logoGroup.add(letters);

      // Ring: mesh + four clean circle outlines (EdgesGeometry is too noisy on curves)
      logoGroup.add(new THREE.Mesh(ringGeo, [greenFace, greenSide]));
      const circleLine = (r, z, mat) => {
        const pts = [];
        for (let i = 0; i <= 96; i++) {
          const a = (i / 96) * Math.PI * 2;
          pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, z));
        }
        const g = new THREE.BufferGeometry().setFromPoints(pts);
        g.applyMatrix4(shearMatrix);
        buildGeos.push(g);
        return new THREE.Line(g, mat);
      };
      [0, cfg.ringDepth].forEach((z) => {
        logoGroup.add(circleLine(RING_OUTER, z, greenEdge));
        logoGroup.add(circleLine(RING_INNER, z, purpleEdge));
      });

      logoGroup.scale.setScalar(cfg.scale);
    };
    rebuildLogo();

    // --- Glitch post-processing: scene -> texture -> glitch shader -> screen ---
    const renderTarget = new THREE.WebGLRenderTarget(
      window.innerWidth * pixelRatio,
      window.innerHeight * pixelRatio
    );
    renderTarget.samples = 4; // MSAA in the render target (WebGL2)

    const glitchUniforms = {
      tDiffuse: { value: renderTarget.texture },
      uIntensity: { value: 0 },
      uSeed: { value: 0 },
    };
    const postMaterial = new THREE.ShaderMaterial({
      uniforms: glitchUniforms,
      vertexShader: GLITCH_VERT,
      fragmentShader: GLITCH_FRAG,
      depthTest: false,
      depthWrite: false,
      blending: THREE.NoBlending,
      transparent: true,
    });
    allMats.push(postMaterial);
    const postGeo = new THREE.PlaneGeometry(2, 2);
    const postScene = new THREE.Scene();
    postScene.add(new THREE.Mesh(postGeo, postMaterial));
    const postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Glitch bursts: every few seconds the image shatters for ~0.3-0.6s,
    // re-randomizing the slice pattern every few frames while it lasts.
    const GLITCH = { minInterval: 4, maxInterval: 8.5, minDuration: 0.3, maxDuration: 0.6, minIntensity: 0.4, maxIntensity: 1.0 };
    let glitchUntil = 0;
    let nextGlitchAt = 2.5;
    let nextReseedAt = 0;
    const clock = new THREE.Clock();

    const startBurst = (t) => {
      glitchUntil = t + GLITCH.minDuration + Math.random() * (GLITCH.maxDuration - GLITCH.minDuration);
      nextGlitchAt = t + GLITCH.minInterval + Math.random() * (GLITCH.maxInterval - GLITCH.minInterval);
    };

    // Live updates from the hidden debug panel
    const onConfig = (e) => {
      const next = e.detail;
      const needsRebuild = next.letterDepth !== cfg.letterDepth || next.ringDepth !== cfg.ringDepth;
      cfg = next;
      applyColors();
      logoGroup.scale.setScalar(cfg.scale);
      if (needsRebuild) rebuildLogo();
    };
    const onGlitchEvent = () => startBurst(clock.getElapsedTime());

    let rafId;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // The model itself stays calm — mouse tracking + idle wobble only
      const targetX = mouseY * cfg.tilt + Math.sin(t * 0.5) * 0.1;
      const targetY = mouseX * cfg.tilt + Math.cos(t * 0.35) * 0.14;
      logoGroup.rotation.x += (targetX - logoGroup.rotation.x) * 0.06;
      logoGroup.rotation.y += (targetY - logoGroup.rotation.y) * 0.06;

      if (t >= nextGlitchAt) startBurst(t);
      if (t < glitchUntil) {
        if (t >= nextReseedAt) {
          glitchUniforms.uSeed.value = Math.random() * 100;
          glitchUniforms.uIntensity.value = GLITCH.minIntensity + Math.random() * (GLITCH.maxIntensity - GLITCH.minIntensity);
          nextReseedAt = t + 0.05 + Math.random() * 0.07;
        }
      } else {
        glitchUniforms.uIntensity.value = 0;
      }

      renderer.setRenderTarget(renderTarget);
      renderer.render(scene, camera);
      renderer.setRenderTarget(null);
      renderer.render(postScene, postCamera);
    };

    const onVisibility = () => {
      cancelAnimationFrame(rafId); // avoid doubled loops
      if (!document.hidden) animate();
    };

    const onResize = () => {
      const newAspect = window.innerWidth / window.innerHeight;
      camera.left = (-frustumSize * newAspect) / 2;
      camera.right = (frustumSize * newAspect) / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderTarget.setSize(window.innerWidth * pixelRatio, window.innerHeight * pixelRatio);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("av-config", onConfig);
    window.addEventListener("av-glitch", onGlitchEvent);
    document.addEventListener("visibilitychange", onVisibility);
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("av-config", onConfig);
      window.removeEventListener("av-glitch", onGlitchEvent);
      document.removeEventListener("visibilitychange", onVisibility);
      buildGeos.forEach((g) => g.dispose());
      postGeo.dispose();
      renderTarget.dispose();
      allMats.forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="background-av" aria-hidden="true" />;
}
