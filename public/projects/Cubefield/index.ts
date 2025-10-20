/*
 * ========================
 * IMPORTANT COPYRIGHT DISCLAIMER
 *
 * Copyright (c) 2021 Johannes Bauer
 * *ALL RIGHTS RESERVED*
 *
 * Even though this StackBlitz project is publicly accessible,
 * you have no rights to redistribute this game or parts of its
 * source-code without explict written permission from the project
 * author.
 * 
 * 3rd-party open source licenses can be found inside the licenses
 * directory
 * ========================
 */

import './style.css';

import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';
import LexendJSON from './font_lexend_medium.json';
import confetti from 'canvas-confetti';

const BACKGROUND_COLOR = new THREE.Color(0x222324);

// ====
// Render Setup
// ====
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.domElement.classList.add('renderer');
document.body.appendChild(renderer.domElement);

// Bloom and antialiasing
const renderPass = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1,
  0.3,
  0.8
);
const smaaPass = new SMAAPass(window.innerWidth, window.innerHeight);

const effectComposer = new EffectComposer(renderer);
effectComposer.setPixelRatio(window.devicePixelRatio);
effectComposer.addPass(renderPass);
effectComposer.addPass(bloomPass);
effectComposer.addPass(smaaPass);

// Window resize handler
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  effectComposer.setSize(window.innerWidth, window.innerHeight);

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  effectComposer.render();
}
onWindowResize();
window.onresize = onWindowResize;

scene.fog = new THREE.Fog(BACKGROUND_COLOR, 15, 25);
scene.background = BACKGROUND_COLOR;

// ====
// Control Group
// ====
const control = new THREE.Group();

camera.position.set(0, 2, -5);
camera.lookAt(0, 0, 0);
camera.position.setZ(-2);
control.add(camera);

// Create grid texture
const groundCanvas = document.createElement('canvas');
groundCanvas.width = 256;
groundCanvas.height = 256;

const groundCtx = groundCanvas.getContext('2d');
groundCtx.fillStyle = '#' + BACKGROUND_COLOR.getHexString();
groundCtx.fillRect(0, 0, 256, 256);

groundCtx.strokeStyle = '#f0f0f0';
groundCtx.lineWidth = 7;
groundCtx.strokeRect(0, 0, 256, 256);

groundCtx.lineWidth = 4;
groundCtx.beginPath();
groundCtx.moveTo(128, 0);
groundCtx.lineTo(128, 256);
groundCtx.stroke();

groundCtx.beginPath();
groundCtx.moveTo(0, 128);
groundCtx.lineTo(256, 128);
groundCtx.stroke();

// Convert grid canvas to THREE texture
const groundTexture = new THREE.CanvasTexture(groundCanvas);
groundTexture.wrapS = THREE.RepeatWrapping;
groundTexture.wrapT = THREE.RepeatWrapping;

groundTexture.repeat.set(50, 50);

// Create ground plane mesh
const groundGeometry = new THREE.PlaneGeometry(100, 100);
groundGeometry.rotateX(THREE.MathUtils.degToRad(90));
const groundMaterial = new THREE.MeshBasicMaterial({
  map: groundTexture,
  side: THREE.DoubleSide
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.receiveShadow = true;
scene.add(ground);

// Generate player arrow shape
const playerShape = new THREE.Shape();
playerShape.moveTo(0, 0.3);
playerShape.lineTo(0.25, -0.3);
playerShape.lineTo(0, -0.1);
playerShape.lineTo(-0.25, -0.3);
playerShape.closePath();

// Convert player shape to mesh
const playerGeometry = new THREE.ExtrudeGeometry(playerShape, {
  depth: 0.15,
  bevelEnabled: false
});
playerGeometry.rotateX(THREE.MathUtils.degToRad(90));
const playerMaterial = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  emissive: 2
});
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.setY(0.6);
control.add(player);

// Add camera lighting
const cameraLight = new THREE.PointLight(-1, 1);
cameraLight.position.set(0, 4, -1);
cameraLight.distance = 50;

control.add(cameraLight);

scene.add(control);

// Rickroll
(document.querySelector('.btn-revive') as HTMLButtonElement).onclick = () => {
  window.open('https://youtu.be/dQw4w9WgXcQ', 'blank');
};

// ====
// Obsticles
// ====
const obsticleGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
obsticleGeometry.translate(0, 0.5, 0);
const obsticleMaterial = new THREE.MeshPhongMaterial({
  color: 0xff0000
});
const obsticleMesh = new THREE.InstancedMesh(
  obsticleGeometry,
  obsticleMaterial,
  2000
);
obsticleMesh.castShadow = true;
const dummy = new THREE.Object3D();
scene.add(obsticleMesh);

const obsticleColors = [
  'red',
  'blue',
  'green',
  'orange',
  'pink',
  'yellow',
  'brown',
  'purple',
  'black'
].map(c => new THREE.Color(c));

const obsticleData: Map<number, number[]> = new Map();

function addObsticles(z: number) {
  const obsticles = [];
  let start = -40;
  while (start <= 40) {
    start += Math.random() * 6;
    obsticles.push(control.position.x + start);
    start += 0.5;
  }
  obsticleData.set(z, obsticles);
}

function addConnectingObsticles(z: number) {
  obsticleData.set(z, [transitionX - 5, transitionX + 5]);
  obsticleData.set(z - 2, [transitionX - 5, transitionX + 5]);
}

function updateObsticleInstances() {
  let index = -1;
  obsticleData.forEach((obsticles, z) => {
    dummy.position.setZ(z);
    obsticles.forEach(x => {
      dummy.position.setX(x);
      dummy.updateMatrix();
      obsticleMesh.setMatrixAt(++index, dummy.matrix);
    });
  });

  obsticleMesh.instanceMatrix.needsUpdate = true;
}

let dead = false;
let currentLevel = -2;
let levelSigns = new THREE.Group();
scene.add(levelSigns);

function start() {
  levelSigns.clear();
  confetti.reset();
  control.position.z = -15;
  control.position.x = 0;
  obsticleData.clear();
  for (let i = 0; i < 30; i += 4) {
    addObsticles(i);
  }
  updateObsticleInstances();
  obsticleMaterial.color = obsticleColors[0];
  obsticleMaterial.needsUpdate = true;
  document.body.classList.add('show-tutorial');
  document.body.classList.remove('show-score');
  document.body.classList.remove('show-death-screen');
  player.rotation.z = 0;
  currentLevel = -2;
  dead = false;
}
start();

let keyMovement = 0;
let forworldMovement = 0;

window.onkeydown = event => {
  document.body.classList.remove('show-touch-controls');

  if (event.key === 'ArrowRight') {
    keyMovement = -1;
    forworldMovement = 1;
  } else if (event.key === 'ArrowLeft') {
    keyMovement = 1;
    forworldMovement = 1;
  }
};

window.onkeyup = event => {
  if (event.key === 'ArrowRight' && keyMovement === -1) keyMovement = 0;
  else if (event.key === 'ArrowLeft' && keyMovement == 1) keyMovement = 0;
};

const controls = [];
function addControl(side, value) {
  const element: HTMLElement = document.querySelector(
    '.touch-controls .' + side
  );
  const { x, y, radius } = getPosition(element);
  controls.push({
    element,
    value,
    x,
    y,
    radius
  });
}
addControl('left', 1);
addControl('right', -1);

function handleTouch(event: TouchEvent) {
  keyMovement = 0;
  Array.from(event.touches).forEach(touch => {
    controls.forEach(control => {
      const distance = Math.sqrt(
        Math.pow(touch.clientX - control.x, 2) +
          Math.pow(touch.clientY - control.y, 2)
      );
      if (distance <= control.radius) {
        keyMovement += control.value;
        forworldMovement = 1;
      }
    });
  });
}

window.ontouchstart = handleTouch;
window.ontouchend = handleTouch;
window.ontouchmove = handleTouch;
window.ontouchcancel = handleTouch;

window.addEventListener('resize', () => {
  controls.forEach(control => {
    const { x, y, radius } = getPosition(control.element);
    control.x = x;
    control.y = y;
    control.radius = radius;
  });
});

// Fullscreen
(document.querySelector('.btn-fullscreen') as HTMLElement).onclick = event => {
  console.log('clicked');
  event.preventDefault();
  document.body.requestFullscreen().catch(console.error);
  screen.orientation.lock('landscape-primary');
};

document.body.onfullscreenchange = event => {
  if (document.fullscreenElement) {
    document.body.classList.remove('show-fullscreen-button');
  } else {
    document.body.classList.add('show-fullscreen-button');
  }
};

function getPosition(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return {
    x: (rect.left + rect.right) / 2,
    y: (rect.top + rect.bottom) / 2,
    radius: rect.width / 2
  };
}

scene.add(new THREE.AmbientLight(-1, 0.2));

let highScore = +(localStorage.getItem('cf_hs') || -1);
const deathScore = document.querySelector('.death-score');
const deathHighScore = document.querySelector('.death-highscore');
function onDeath() {
  document.body.classList.add('show-death-screen');
  document.body.classList.remove('show-score');

  const score = Math.round(control.position.z * 5);
  deathScore.textContent = score.toString();
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('cf_hs', highScore.toString());
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
  deathHighScore.textContent = highScore.toString();
}

(document.querySelector(
  '.btn-try-again'
) as HTMLButtonElement).onclick = () => {
  start();
};

const scoreElement: HTMLDivElement = document.querySelector('.score');

function doLinesIntersect(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  x4: number,
  y4: number
) {
  const uA =
    ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) /
    ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
  const uB =
    ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) /
    ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
  return uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1;
}

function doesPointIntersectObsticle(pX, pZ, oX, oZ) {
  return (
    pX >= oX - 0.5 &&
    pX <= oX + 0.5 &&
    pZ + 0.3 >= oZ - 0.5 &&
    pZ + 0.3 <= oZ + 0.5
  );
}

function leftIntersection(oX, oZ) {
  const { x: pX, z: _, z: pZ } = control.position;

  if (
    doLinesIntersect(
      oX - 0.5,
      oZ + 0.5,
      oX - 0.5,
      oZ - 0.5,
      pX,
      pZ + 0.3,
      pX + 0.25,
      pZ + 0.3
    )
  )
    return true;

  if (doesPointIntersectObsticle(pX, pZ, oX, oZ)) return true;

  return false;
}

function rightIntersection(oX, oZ) {
  const { x: pX, z: _, z: pZ } = control.position;

  if (
    doLinesIntersect(
      oX + 0.5,
      oZ + 0.5,
      oX + 0.5,
      oZ - 0.5,
      pX,
      pZ + 0.3,
      pX - 0.25,
      pZ + 0.3
    )
  )
    return true;

  if (doesPointIntersectObsticle(pX, pZ, oX, oZ)) return true;

  return false;
}

const font = new THREE.Font(LexendJSON);
function addText(
  text: string,
  x: number,
  z: number,
  group: THREE.Object3D = scene
) {
  const geometry = new THREE.TextBufferGeometry(text, {
    font: font,
    height: 0.3,
    size: 2
  });
  geometry.computeBoundingBox();
  const width = geometry.boundingBox.max.clone().sub(geometry.boundingBox.min)
    .x;
  geometry.translate(width / -2, 5, 0);
  geometry.rotateY(Math.PI);
  const textMesh = new THREE.Mesh(geometry, obsticleMaterial);
  textMesh.position.set(x, 0, z);
  group.add(textMesh);
  return textMesh;
}
addText('CUBEFIELD', 0, 0);

let lastTime = 0;
let transitionX = 0;
function animate(time) {
  requestAnimationFrame(animate);
  // Limit maximal delta time to avoid bugs
  const deltaTime = Math.min(0.5, (time - lastTime) / 1000); // in seconds
  lastTime = time;

  if (dead) return;

  control.position.x += keyMovement * deltaTime * 7;
  control.position.z +=
    forworldMovement * deltaTime * (10 + currentLevel * 1.5);
  const score = Math.max(0, Math.round(control.position.z * 5));
  scoreElement.textContent = score.toString();
  groundTexture.offset.set(control.position.x / 2, control.position.z / 2);
  ground.position.set(control.position.x, 0, control.position.z);

  if (
    control.position.z > 0 &&
    !document.body.classList.contains('show-score')
  ) {
    document.body.classList.add('show-score');
  }

  if (
    forworldMovement > 0 &&
    document.body.classList.contains('show-tutorial')
  ) {
    document.body.classList.remove('show-tutorial');
  }

  let rotation = THREE.MathUtils.radToDeg(control.rotation.z);
  const rotationFactor = 30;
  if (keyMovement !== 0) {
    rotation -= keyMovement * deltaTime * rotationFactor;
  } else if (rotation !== 0) {
    let factor = rotation / Math.abs(rotation);
    rotation -= factor * deltaTime * rotationFactor;
    if (rotation / Math.abs(rotation) !== factor) {
      rotation = 0;
    }
  }
  rotation = Math.max(-10, Math.min(rotation, 10));
  control.rotation.z = THREE.MathUtils.degToRad(rotation);

  let update = false;
  obsticleData.forEach((_, z) => {
    if (z < control.position.z - 2) {
      obsticleData.delete(z);
      const newZ = z + 32;
      if ((newZ % 200) - 180 >= 0) {
        if ((newZ % 200) - 180 == 0) {
          transitionX = control.position.x;
        }
        addConnectingObsticles(newZ);
      } else if (z % 4 == 0) {
        addObsticles(newZ);
      }
      if (newZ % 200 == 0) {
        addText(`LEVEL ${currentLevel + 2}`, transitionX, newZ, levelSigns);
      }
      update = true;
    }
  });

  if (update) updateObsticleInstances();

  const z = Array.from(obsticleData.keys())[0];
  const obsticles = obsticleData.get(z);
  const rightIndex = obsticles.findIndex(x => x > control.position.x);
  const rightObsticle = obsticles[rightIndex - 1];
  const leftObsticle = obsticles[rightIndex];

  const collision =
    leftIntersection(leftObsticle, z) || rightIntersection(rightObsticle, z);

  if (collision && !dead) {
    dead = true;
    onDeath();
  }

  const level = Math.floor(score / 1000);

  if (level > currentLevel) {
    obsticleMaterial.color = obsticleColors[
      level % obsticleColors.length
    ].clone();
    obsticleMaterial.needsUpdate = true;
    currentLevel = level;
  }

  const colorProgress = ((score % 1000) - 900) / 100;
  if (colorProgress >= 0) {
    const currentColor = obsticleColors[
      currentLevel % obsticleColors.length
    ].clone();
    const nextColor = obsticleColors[
      (currentLevel + 1) % obsticleColors.length
    ].clone();
    obsticleMaterial.color = currentColor.lerp(nextColor, colorProgress);
  }

  effectComposer.render();
}

animate(0);
