// 3D skeuomorphic tempo dashboard: brushed-aluminium panel, knurled tempo knob,
// and a glowing beat lamp. Talks to the app through the global updateBPM()/bpm
// from index.html, and exposes window.triggerVisualBeat / window.setDashboardBPM.
(function () {
  const container = document.getElementById('canvas-container');
  if (!container || !window.THREE) return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true });
  } catch (err) {
    console.warn('[dashboard3d] WebGL unavailable, keeping 2D slider:', err);
    return;
  }

  const MIN_BPM = 20, MAX_BPM = 240;
  const SWEEP = (270 * Math.PI) / 180;
  const bpmToAngle = b => SWEEP / 2 - ((b - MIN_BPM) / (MAX_BPM - MIN_BPM)) * SWEEP;
  const currentBpm = () => (typeof bpm === 'number' ? bpm : 120);

  // ── Renderer / scene / camera ──
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap; // PCFSoft ignores shadow.radius in r128
  const canvas = renderer.domElement;
  container.appendChild(canvas);

  const scene = new THREE.Scene();
  const FOV = 30;
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);

  // Metals look black without something to reflect, so build a soft studio
  // environment from a canvas (bright softboxes over a dark room).
  function studioEnvironment() {
    const c = document.createElement('canvas');
    c.width = 512; c.height = 256;
    const g = c.getContext('2d');
    const sky = g.createLinearGradient(0, 0, 0, 256);
    sky.addColorStop(0, '#9a968e');
    sky.addColorStop(0.5, '#5c5a56');
    sky.addColorStop(1, '#1c1c1c');
    g.fillStyle = sky;
    g.fillRect(0, 0, 512, 256);
    g.fillStyle = '#fff6ea';
    for (let x = 0; x < 512; x += 128) g.fillRect(x + 20, 50, 70, 60);
    g.fillStyle = '#d8e0ea';
    g.fillRect(0, 118, 512, 14);
    const tex = new THREE.CanvasTexture(c);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    tex.encoding = THREE.sRGBEncoding;
    const pmrem = new THREE.PMREMGenerator(renderer);
    const env = pmrem.fromEquirectangular(tex).texture;
    tex.dispose();
    pmrem.dispose();
    return env;
  }
  scene.environment = studioEnvironment();

  // ── Lights ──
  scene.add(new THREE.AmbientLight(0xfff1e0, 0.35));
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(5, 10, 7);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 1, far: 30 });
  key.shadow.bias = -0.0005;
  key.shadow.radius = 6;
  scene.add(key);

  // ── Brushed aluminium chassis ──
  function brushedTexture() {
    const c = document.createElement('canvas');
    c.width = c.height = 512;
    const g = c.getContext('2d');
    g.fillStyle = '#a4a4a2';
    g.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 900; i++) {
      const y = Math.random() * 512;
      g.strokeStyle = Math.random() < 0.5
        ? `rgba(255,255,255,${0.015 + Math.random() * 0.035})`
        : `rgba(0,0,0,${0.01 + Math.random() * 0.03})`;
      g.lineWidth = 0.5 + Math.random();
      g.beginPath();
      g.moveTo(0, y);
      g.lineTo(512, y + (Math.random() - 0.5) * 2);
      g.stroke();
    }
    const tex = new THREE.CanvasTexture(c);
    tex.encoding = THREE.sRGBEncoding;
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 2);
    return tex;
  }
  const panel = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 20),
    new THREE.MeshStandardMaterial({ map: brushedTexture(), metalness: 0.8, roughness: 0.3 })
  );
  panel.receiveShadow = true;
  scene.add(panel);

  const KNOB_CENTER = new THREE.Vector3(0.4, -0.1, 0);

  // ── Engraved dial scale (ticks + numbers) ──
  function dialScaleTexture() {
    const size = 1024, c = document.createElement('canvas');
    c.width = c.height = size;
    const g = c.getContext('2d');
    const unitsAcross = 4.6, px = size / unitsAcross, cx = size / 2, cy = size / 2;
    g.strokeStyle = g.fillStyle = '#1c1c1c';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.font = `500 ${0.2 * px}px "DM Mono", monospace`;
    for (let b = MIN_BPM; b <= MAX_BPM; b += 10) {
      const a = bpmToAngle(b), dx = -Math.sin(a), dy = Math.cos(a);
      const major = (b - MIN_BPM) % 40 === 0;
      const r1 = 1.36 * px, r2 = (major ? 1.6 : 1.5) * px;
      g.lineWidth = major ? 6 : 3;
      g.beginPath();
      g.moveTo(cx + dx * r1, cy - dy * r1);
      g.lineTo(cx + dx * r2, cy - dy * r2);
      g.stroke();
      if (major) g.fillText(String(b), cx + dx * 1.88 * px, cy - dy * 1.88 * px);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.encoding = THREE.sRGBEncoding;
    return { tex, unitsAcross };
  }
  const scale = dialScaleTexture();
  const scalePlane = new THREE.Mesh(
    new THREE.PlaneGeometry(scale.unitsAcross, scale.unitsAcross),
    new THREE.MeshStandardMaterial({ map: scale.tex, transparent: true, metalness: 0.2, roughness: 0.6 })
  );
  scalePlane.position.copy(KNOB_CENTER).setZ(0.005);
  scene.add(scalePlane);

  // ── Knurled tempo knob ──
  const knob = new THREE.Group();
  knob.position.copy(KNOB_CENTER);
  scene.add(knob);

  const KNOB_DEPTH = 0.55;
  const knurlShape = new THREE.Shape();
  const RIDGES = 64;
  for (let i = 0; i <= RIDGES * 2; i++) {
    const a = (i / (RIDGES * 2)) * Math.PI * 2;
    const r = i % 2 === 0 ? 1.12 : 1.06;
    if (i === 0) knurlShape.moveTo(Math.cos(a) * r, Math.sin(a) * r);
    else knurlShape.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  const knurl = new THREE.Mesh(
    new THREE.ExtrudeGeometry(knurlShape, {
      depth: KNOB_DEPTH, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.03, bevelSegments: 2,
    }),
    new THREE.MeshStandardMaterial({ color: 0x1d1d1d, metalness: 0.9, roughness: 0.35 })
  );
  knurl.castShadow = true;
  knob.add(knurl);

  function machinedCapTexture() {
    const c = document.createElement('canvas');
    c.width = c.height = 512;
    const g = c.getContext('2d');
    g.fillStyle = '#c9c9c9';
    g.fillRect(0, 0, 512, 512);
    for (let r = 4; r < 256; r += 2.5) {
      g.strokeStyle = `rgba(${Math.random() < 0.5 ? '255,255,255' : '0,0,0'},${0.05 + Math.random() * 0.08})`;
      g.lineWidth = 1.2;
      g.beginPath();
      g.arc(256, 256, r, 0, Math.PI * 2);
      g.stroke();
    }
    const tex = new THREE.CanvasTexture(c);
    tex.encoding = THREE.sRGBEncoding;
    return tex;
  }
  const capMaterial = new THREE.MeshStandardMaterial({ map: machinedCapTexture(), metalness: 0.85, roughness: 0.25 });
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.84, 0.88, 0.12, 64), capMaterial);
  cap.rotation.x = Math.PI / 2;
  cap.position.z = KNOB_DEPTH + 0.1;
  cap.castShadow = true;
  knob.add(cap);

  const pointer = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.52, 0.03),
    new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.2, roughness: 0.6 })
  );
  pointer.position.set(0, 0.5, KNOB_DEPTH + 0.17);
  // White index dot on the knurled skirt, readable even when the cap is in shadow
  const indexDot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.02, 16),
    new THREE.MeshStandardMaterial({ color: 0xf2f2f2, emissive: 0x666666, roughness: 0.4 })
  );
  indexDot.rotation.x = Math.PI / 2;
  indexDot.position.set(0, 0.97, KNOB_DEPTH + 0.05);
  knob.add(indexDot);
  knob.add(pointer);

  // ── Beat lamp: jewel lens in a chrome bezel ──
  const LAMP_POS = new THREE.Vector3(-2.6, 1.55, 0);
  const LAMP_REST = 0.25, LAMP_PEAK = 2.6, LAMP_ACCENT_PEAK = 4.2, LAMP_DECAY = 7;
  const bezel = new THREE.Mesh(
    new THREE.TorusGeometry(0.27, 0.06, 16, 48),
    new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 1, roughness: 0.15 })
  );
  bezel.position.copy(LAMP_POS).setZ(0.05);
  bezel.castShadow = true;
  scene.add(bezel);

  const lensMaterial = new THREE.MeshStandardMaterial({
    color: 0x3a1a05, emissive: 0xff9a2e, emissiveIntensity: LAMP_REST, metalness: 0, roughness: 0.15,
  });
  const lens = new THREE.Mesh(new THREE.SphereGeometry(0.24, 32, 16), lensMaterial);
  lens.scale.z = 0.6;
  lens.position.copy(LAMP_POS).setZ(0.04);
  scene.add(lens);

  const lampGlow = new THREE.PointLight(0xffa040, 0, 3.2, 2);
  lampGlow.position.copy(LAMP_POS).setZ(0.6);
  scene.add(lampGlow);

  // ── On-demand render loop ──
  let lampLevel = LAMP_REST;
  let targetAngle = bpmToAngle(currentBpm());
  knob.rotation.z = targetAngle;
  let rafId = 0, lastTime = 0;

  function applyLamp() {
    lensMaterial.emissiveIntensity = lampLevel;
    lampGlow.intensity = Math.max(0, lampLevel - LAMP_REST) * 0.9;
  }

  function frame(now) {
    const dt = Math.min(0.1, (now - lastTime) / 1000);
    lastTime = now;
    let animating = false;

    if (lampLevel > LAMP_REST + 0.002) {
      lampLevel += (LAMP_REST - lampLevel) * Math.min(1, dt * LAMP_DECAY);
      animating = true;
    } else {
      lampLevel = LAMP_REST;
    }
    applyLamp();

    const diff = targetAngle - knob.rotation.z;
    if (Math.abs(diff) > 0.0005) {
      knob.rotation.z += diff * Math.min(1, dt * 20);
      animating = true;
    } else {
      knob.rotation.z = targetAngle;
    }

    renderer.render(scene, camera);
    rafId = animating ? requestAnimationFrame(frame) : 0;
  }

  function requestRender() {
    if (rafId) return;
    lastTime = performance.now();
    rafId = requestAnimationFrame(frame);
  }

  // ── Sizing ──
  function resize() {
    const w = container.clientWidth, h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const halfTan = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    const dist = Math.max(2.6 / halfTan, 3.3 / (halfTan * camera.aspect));
    camera.position.set(0, 0, dist);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    requestRender();
  }
  new ResizeObserver(resize).observe(container);

  // ── Accessibility: the canvas acts as the tempo slider ──
  canvas.tabIndex = 0;
  canvas.setAttribute('role', 'slider');
  canvas.setAttribute('aria-label', 'Tempo in beats per minute');
  canvas.setAttribute('aria-valuemin', String(MIN_BPM));
  canvas.setAttribute('aria-valuemax', String(MAX_BPM));
  function syncAria(b) {
    canvas.setAttribute('aria-valuenow', String(b));
    canvas.setAttribute('aria-valuetext', b + ' BPM');
  }
  syncAria(currentBpm());

  // ── Knob interaction ──
  const raycaster = new THREE.Raycaster();
  const facePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const ndc = new THREE.Vector2();
  const hit = new THREE.Vector3();

  function pointOnPanel(e) {
    const rect = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    return raycaster.ray.intersectPlane(facePlane, hit) ? hit.clone().sub(KNOB_CENTER) : null;
  }

  // Grabbing near the rim turns the knob by angle; grabbing the centre cap
  // drags vertically, like a plugin knob.
  let drag = null;
  const BPM_PER_RADIAN = (MAX_BPM - MIN_BPM) / SWEEP;
  const BPM_PER_PIXEL = 0.6;

  canvas.addEventListener('pointerdown', e => {
    const p = pointOnPanel(e);
    if (!p || p.length() > 2.0) return;
    e.preventDefault();
    canvas.setPointerCapture(e.pointerId);
    canvas.focus({ preventScroll: true });
    canvas.style.cursor = 'grabbing';
    drag = {
      id: e.pointerId,
      mode: p.length() > 0.6 ? 'rotate' : 'vertical',
      lastAngle: Math.atan2(p.y, p.x),
      lastY: e.clientY,
      value: currentBpm(),
    };
  });

  canvas.addEventListener('pointermove', e => {
    if (!drag || e.pointerId !== drag.id) return;
    if (drag.mode === 'rotate') {
      const p = pointOnPanel(e);
      if (!p) return;
      const a = Math.atan2(p.y, p.x);
      let d = a - drag.lastAngle;
      if (d > Math.PI) d -= Math.PI * 2;
      if (d < -Math.PI) d += Math.PI * 2;
      drag.lastAngle = a;
      drag.value -= d * BPM_PER_RADIAN; // clockwise = faster
    } else {
      drag.value += (drag.lastY - e.clientY) * BPM_PER_PIXEL;
      drag.lastY = e.clientY;
    }
    drag.value = Math.max(MIN_BPM, Math.min(MAX_BPM, drag.value));
    const rounded = Math.round(drag.value);
    if (rounded !== currentBpm()) updateBPM(rounded);
    knob.rotation.z = targetAngle = bpmToAngle(drag.value);
    requestRender();
  });

  function endDrag(e) {
    if (!drag || e.pointerId !== drag.id) return;
    drag = null;
    canvas.style.cursor = '';
    targetAngle = bpmToAngle(currentBpm());
    requestRender();
  }
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);

  canvas.addEventListener('wheel', e => {
    e.preventDefault();
    updateBPM(currentBpm() + (e.deltaY < 0 ? 1 : -1), true);
  }, { passive: false });

  canvas.addEventListener('keydown', e => {
    const steps = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1, PageUp: 10, PageDown: -10 };
    let next = null;
    if (e.key in steps) next = currentBpm() + steps[e.key];
    else if (e.key === 'Home') next = MIN_BPM;
    else if (e.key === 'End') next = MAX_BPM;
    if (next === null) return;
    e.preventDefault();
    e.stopPropagation(); // the document-level arrow shortcut would also fire
    updateBPM(next, true);
  });

  // ── Public hooks used by index.html ──
  window.setDashboardBPM = b => {
    syncAria(b);
    if (!drag) targetAngle = bpmToAngle(b);
    requestRender();
  };

  window.triggerVisualBeat = accent => {
    lampLevel = accent ? LAMP_ACCENT_PEAK : LAMP_PEAK;
    applyLamp();
    requestRender();
  };

  container.parentElement.classList.add('has-3d');
  resize();
})();
