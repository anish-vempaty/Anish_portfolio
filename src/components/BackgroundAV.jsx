import { useEffect, useRef } from "react";
import * as THREE from "three";

// Interactive 3D "AV" emblem rendered behind the page content (OSIRIS-lab style).
// Geometry modeled after the hand-drawn logo: a slanted A with an extended
// crossbar, interlocked with a tall checkmark V, inside a double-line ring.
// The scene renders into a texture, then through a screen-space glitch shader
// that periodically shatters the image into displaced slices and blocks.
const GREEN = 0x00ff41;
const PURPLE = 0xd24dff;

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

    // Horizontal band tearing: random rows shear sideways
    float bandCount = mix(8.0, 28.0, rand(vec2(uSeed, 1.0)));
    float band = floor(uv.y * bandCount);
    float tear = step(0.55, rand(vec2(band, uSeed)));
    uv.x += tear * (rand(vec2(band, uSeed + 1.0)) - 0.5) * 0.4 * uIntensity;

    // Block displacement: coarse grid cells jump to offset positions
    vec2 cell = floor(uv * vec2(9.0, 6.0));
    float cellRand = rand(cell + uSeed);
    if (cellRand > 0.75) {
      uv += (vec2(rand(cell + uSeed + 1.0), rand(cell + uSeed + 2.0)) - 0.5) * 0.25 * uIntensity;
    }

    // Chromatic tearing: sample channels at split offsets
    float shift = 0.012 * uIntensity;
    vec4 cr = texture2D(tDiffuse, uv + vec2(shift, 0.0));
    vec4 cg = texture2D(tDiffuse, uv);
    vec4 cb = texture2D(tDiffuse, uv - vec2(shift, 0.0));
    vec4 col = vec4(cr.r, cg.g, cb.b, max(cg.a, max(cr.a, cb.a)));

    // Some blocks flip green<->purple for the corrupted-signal look
    if (cellRand > 0.85) {
      col.rgb = col.rgb.brg;
    }

    gl_FragColor = col;
  }
`;

export default function BackgroundAV() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

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

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.5);
    keyLight.position.set(0, 5, 10);
    scene.add(keyLight);

    // Green set (A + ring outer), purple set (V + ring inner)
    const greenFace = new THREE.MeshLambertMaterial({ color: 0x0e2415 });
    const greenSide = new THREE.MeshLambertMaterial({ color: 0x06120a });
    const purpleFace = new THREE.MeshLambertMaterial({ color: 0x1a0b22 });
    const purpleSide = new THREE.MeshLambertMaterial({ color: 0x0d0512 });
    const greenEdge = new THREE.LineBasicMaterial({ color: GREEN, transparent: true, opacity: 0.9 });
    const purpleEdge = new THREE.LineBasicMaterial({ color: PURPLE, transparent: true, opacity: 0.9 });
    const allMats = [greenFace, greenSide, purpleFace, purpleSide, greenEdge, purpleEdge];

    const shapeFrom = (pts) => {
      const s = new THREE.Shape();
      s.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) s.lineTo(pts[i][0], pts[i][1]);
      s.closePath();
      return s;
    };

    // "Λ" of the A — two slanted legs meeting at the apex
    const lambdaShape = shapeFrom([
      [-3.6, 7.5], [-1.4, 7.5], [3.2, -6.5], [1.0, -6.5],
      [-2.5, 3.9], [-6.0, -6.5], [-8.2, -6.5],
    ]);

    // Crossbar of the A, extending right past the leg toward the V
    const barShape = shapeFrom([
      [-6.9, -1.6], [4.8, -1.6], [4.8, -3.6], [-6.9, -3.6],
    ]);

    // Checkmark V — short stroke down, long stroke sweeping up to the ring
    const vShape = shapeFrom([
      [0.6, 0.2], [2.8, 1.2], [5.5, -5.2], [8.6, 8.2],
      [10.8, 8.8], [5.4, -8.3],
    ]);

    // Surrounding ring
    const RING_OUTER = 15;
    const RING_INNER = 13.2;
    const ringShape = new THREE.Shape();
    ringShape.absarc(0, 0, RING_OUTER, 0, Math.PI * 2, false);
    const ringHole = new THREE.Path();
    ringHole.absarc(0, 0, RING_INNER, 0, Math.PI * 2, true);
    ringShape.holes.push(ringHole);

    // Shear the extrusion down-left for the isometric look
    const shearMatrix = new THREE.Matrix4().set(
      1, 0, -0.6, 0,
      0, 1, -0.5, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    );

    const extrudeLetter = { depth: 4, bevelEnabled: false };
    const geos = {
      lambda: new THREE.ExtrudeGeometry(lambdaShape, extrudeLetter),
      bar: new THREE.ExtrudeGeometry(barShape, extrudeLetter),
      v: new THREE.ExtrudeGeometry(vShape, extrudeLetter),
      ring: new THREE.ExtrudeGeometry(ringShape, { depth: 2.5, bevelEnabled: false, curveSegments: 64 }),
    };
    Object.values(geos).forEach((g) => g.applyMatrix4(shearMatrix));

    const logoGroup = new THREE.Group();
    const disposables = Object.values(geos);

    // Letters: mesh + hard edge lines, nudged so the monogram centers in the ring
    const letters = new THREE.Group();
    letters.position.x = -1.3;
    const addLetter = (geo, faceM, sideM, edgeM) => {
      letters.add(new THREE.Mesh(geo, [faceM, sideM]));
      const edges = new THREE.EdgesGeometry(geo, 20);
      disposables.push(edges);
      letters.add(new THREE.LineSegments(edges, edgeM));
    };
    addLetter(geos.lambda, greenFace, greenSide, greenEdge);
    addLetter(geos.bar, greenFace, greenSide, greenEdge);
    addLetter(geos.v, purpleFace, purpleSide, purpleEdge);
    logoGroup.add(letters);

    // Ring: mesh + four clean circle outlines (EdgesGeometry is too noisy on curves).
    // Outer circles green, inner circles purple for the two-tone look.
    logoGroup.add(new THREE.Mesh(geos.ring, [greenFace, greenSide]));
    const circleLine = (r, z, mat) => {
      const pts = [];
      for (let i = 0; i <= 96; i++) {
        const a = (i / 96) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, z));
      }
      const g = new THREE.BufferGeometry().setFromPoints(pts);
      g.applyMatrix4(shearMatrix);
      disposables.push(g);
      return new THREE.Line(g, mat);
    };
    [0, 2.5].forEach((z) => {
      logoGroup.add(circleLine(RING_OUTER, z, greenEdge));
      logoGroup.add(circleLine(RING_INNER, z, purpleEdge));
    });

    const BASE_SCALE = 1.1; // ring nearly fills the viewport height
    logoGroup.scale.setScalar(BASE_SCALE);
    scene.add(logoGroup);

    // --- Glitch post-processing: scene -> texture -> glitch shader -> screen ---
    const renderTarget = new THREE.WebGLRenderTarget(
      window.innerWidth * pixelRatio,
      window.innerHeight * pixelRatio
    );
    renderTarget.samples = 4; // MSAA in the render target (WebGL2)
    disposables.push(renderTarget);

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
    const postGeo = new THREE.PlaneGeometry(2, 2);
    disposables.push(postGeo);
    allMats.push(postMaterial);
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
    let glitchUntil = 0;
    let nextGlitchAt = 2.5;
    let nextReseedAt = 0;

    const clock = new THREE.Clock();
    let rafId;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // The model itself stays calm — mouse tracking + idle wobble only
      const targetX = mouseY * 0.25 + Math.sin(t * 0.5) * 0.1;
      const targetY = mouseX * 0.25 + Math.cos(t * 0.35) * 0.14;
      logoGroup.rotation.x += (targetX - logoGroup.rotation.x) * 0.06;
      logoGroup.rotation.y += (targetY - logoGroup.rotation.y) * 0.06;

      if (t >= nextGlitchAt) {
        glitchUntil = t + 0.3 + Math.random() * 0.3;
        nextGlitchAt = t + 3 + Math.random() * 4.5;
      }
      if (t < glitchUntil) {
        if (t >= nextReseedAt) {
          glitchUniforms.uSeed.value = Math.random() * 100;
          glitchUniforms.uIntensity.value = 0.4 + Math.random() * 0.6;
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
    document.addEventListener("visibilitychange", onVisibility);
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibility);
      disposables.forEach((g) => g.dispose());
      allMats.forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="background-av" aria-hidden="true" />;
}
