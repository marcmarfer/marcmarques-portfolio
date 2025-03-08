<template>
    <div ref="avatarContainer" class="w-full h-full relative flex items-center justify-center">
        <div v-if="loading" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
            <div class="w-16 h-16 border-4 border-t-4 border-[#fbf060] border-t-transparent rounded-full animate-spin mb-4"></div>
            <div class="text-xl text-white">{{ loadingProgress }}%</div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import avatarModel from '/src/assets/models/marc-model.glb';

// Reactive state
const loading = ref(true);
const loadingProgress = ref(0);
const avatarContainer = ref(null);

// Three.js variables
let renderer, camera, scene, controls, mixer, clock;
let preloadedModel = null;

// Start preloading the model immediately
preloadModel();

// Model loading functions
async function preloadModel() {
  try {
    const loader = new GLTFLoader();
    
    await new Promise((resolve, reject) => {
      loader.load(
        avatarModel,
        (gltf) => {
          preloadedModel = gltf;
          resolve(gltf);
        },
        (xhr) => {
          const percentCompletion = Math.round((xhr.loaded / xhr.total) * 100);
          loadingProgress.value = percentCompletion;
          console.log(`Preloading model... ${percentCompletion}%`);
        },
        (error) => {
          console.error('Error preloading model:', error);
          reject(error);
        }
      );
    });
    
    console.log('Model preloaded successfully');
  } catch (error) {
    console.error('Failed to preload model:', error);
  }
}

async function loadModel() {
  if (preloadedModel) {
    console.log('Using preloaded model');
    return preloadedModel;
  }
  
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      avatarModel,
      (gltf) => {
        resolve(gltf);
      },
      (xhr) => {
        const percentCompletion = Math.round((xhr.loaded / xhr.total) * 100);
        loadingProgress.value = percentCompletion;
        console.log(`Loading model... ${percentCompletion}%`);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

// Setup functions
function setupRenderer(container) {
  // Simple renderer configuration for all browsers
  renderer = new THREE.WebGLRenderer({ 
    alpha: true, 
    antialias: true,
    powerPreference: 'high-performance',
    precision: 'highp'
  });
  
  // Set pixel ratio with a balanced value for all browsers (GPU friendly)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  
  container.appendChild(renderer.domElement);
  
  return renderer;
}

function setupCamera(container) {
  // Setting up the camera
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0.5, 1.75, 2.95);
  return camera;
}

function setupLights(scene) {
  // Setting up the lights
  const ambientLight = new THREE.AmbientLight(0x404040, 20);
  
  // Main spotlight with adjusted settings
  const spotlight = new THREE.SpotLight(0xffffff, 15, 10, 1);
  spotlight.penumbra = 0.7;
  spotlight.position.set(0, 3.5, 2.75);
  spotlight.castShadow = true;
  
  // Optimize shadow map settings
  spotlight.shadow.mapSize.width = 1024;
  spotlight.shadow.mapSize.height = 1024;
  spotlight.shadow.bias = -0.001;
  
  // Softer fill light with much lower intensity and repositioned
  const fillLight = new THREE.DirectionalLight(0xffffff, 3);
  fillLight.position.set(-0.5, 0.5, -0.5);
  
  // Add a subtle rim light to maintain definition without harsh lighting
  const rimLight = new THREE.DirectionalLight(0xffffff, 2);
  rimLight.position.set(1, 0.5, -0.5);
  
  scene.add(ambientLight); // Ambient light for overall scene illumination
  scene.add(spotlight); // Main spotlight with adjusted settings
  scene.add(fillLight); // Softer fill light in the opposite direction of the spotlight
  scene.add(rimLight); // Rim light to separate the avatar from the background
}

function setupControls(camera, renderer) {
  // Setting up the camera controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.enableRotate = true;

  controls.minPolarAngle = 0;
  controls.maxPolarAngle = Math.PI;
  controls.minDistance = 2;
  controls.maxDistance = 4;

  controls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: null,
  };
  
  controls.target.set(0, 0.8, 0);
  controls.update();
  
  return controls;
}

function createGround(scene) {
  // Create a ground mesh for the avatar
  const groundGeometry = new THREE.BoxGeometry(1, 0.1, 1);
  
  const textureLoader = new THREE.TextureLoader();
  const jsLogoTexture = textureLoader.load('/src/assets/images/js-logo.png');
  
  jsLogoTexture.center = new THREE.Vector2(0.5, 0.5);
  jsLogoTexture.repeat.set(1, 1);
  jsLogoTexture.wrapS = THREE.RepeatWrapping;
  jsLogoTexture.wrapT = THREE.RepeatWrapping;
  
  const jsYellow = 0xfbf060;
  
  const materials = [
    new THREE.MeshBasicMaterial({ color: jsYellow }),
    new THREE.MeshBasicMaterial({ color: jsYellow }),
    new THREE.MeshBasicMaterial({ map: jsLogoTexture }),
    new THREE.MeshBasicMaterial({ color: jsYellow }),
    new THREE.MeshBasicMaterial({ color: jsYellow }),
    new THREE.MeshBasicMaterial({ color: jsYellow })
  ];
  
  const groundMesh = new THREE.Mesh(groundGeometry, materials);
  groundMesh.position.y = -0.05;
  groundMesh.receiveShadow = true;
  
  scene.add(groundMesh);
}

function optimizeMaterials(gltf, renderer) {
  // Improve material quality for all meshes in the model
  gltf.scene.traverse((node) => {
    if (!node.isMesh) return;
    
    // Handle materials
    if (node.material) {
      const materials = Array.isArray(node.material) ? node.material : [node.material];
      
      materials.forEach(material => {
        material.precision = 'highp';
        material.flatShading = false;
        material.side = THREE.FrontSide;
        material.needsUpdate = true;
        
        if (material.normalMap) {
          material.normalScale.set(1, 1);
        }
        
        if (material.map) {
          material.map.anisotropy = renderer.capabilities.getMaxAnisotropy();
          material.map.minFilter = THREE.LinearFilter;
          material.map.needsUpdate = true;
        }
      });
    }
    
    // Compute normal vectors if needed
    if (node.geometry && !node.geometry.attributes.normal) {
      node.geometry.computeVertexNormals();
      node.geometry.attributes.normal.needsUpdate = true;
    }
    
    // Enable shadows
    node.castShadow = true;
    node.receiveShadow = true;
  });
}

function setupAnimations(gltf, scene) {
  // Find the idle and wave animations
  const mixer = new THREE.AnimationMixer(gltf.scene);
  
  const idleClip = gltf.animations.find(anim => anim.name === 'idleing');
  const waveClip = gltf.animations.find(anim => anim.name === 'waving');
  
  const idleAction = mixer.clipAction(idleClip);
  const waveAction = mixer.clipAction(waveClip);
  
  idleAction.setLoop(THREE.LoopRepeat);
  idleAction.play();
  
  // Handling event for animation switching
  renderer.domElement.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    
    if (!waveAction.isRunning()) {
      waveAction.reset();
      waveAction.setLoop(THREE.LoopOnce);
      waveAction.play();
      
      idleAction.crossFadeTo(waveAction, 0.5, true);
      
      const waveDuration = waveAction.getClip().duration;
      
      setTimeout(() => {
        if (waveAction.isRunning()) {
          idleAction.reset().play();
          idleAction.setLoop(THREE.LoopRepeat);
          waveAction.crossFadeTo(idleAction, 0.5, true);
        }
      }, (waveDuration - 0.5) * 1000);
    }
  });
  
  scene.add(gltf.scene);
  
  return mixer;
}

function updateRendererSize() {
  // Update the renderer size
  const container = avatarContainer.value;
  if (!container || !renderer || !camera) return;
  
  const width = container.clientWidth;
  const height = container.clientHeight;
  
  let canvasWidth, canvasHeight;
  
  const isSmallScreen = width < 600;
  
  if (isSmallScreen) {
    const aspectRatio = 0.6;
    
    if (width / height > aspectRatio) {
      canvasWidth = height * aspectRatio;
      canvasHeight = height;
    } else {
      canvasWidth = width;
      canvasHeight = width / aspectRatio;
    }
  } else {
    canvasWidth = width;
    canvasHeight = height;
  }
  
  renderer.setSize(canvasWidth, canvasHeight, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  camera.aspect = canvasWidth / canvasHeight;
  camera.updateProjectionMatrix();
  
  const canvas = renderer.domElement;
  if (canvas) {
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    
    canvas.style.position = 'absolute';
    canvas.style.left = '50%';
    canvas.style.top = '50%';
    canvas.style.transform = 'translate(-50%, -50%)';
    
    canvas.style.maxWidth = '100%';
    canvas.style.maxHeight = '100%';
  }
}

function animate() {
  if (!renderer || !scene || !camera) return;
  
  requestAnimationFrame(animate);
  
  if (mixer) {
    mixer.update(clock.getDelta());
  }
  
  if (controls) {
    controls.update();
  }
  
  renderer.render(scene, camera);
}

// Main setup
onMounted(async () => {
  try {
    await nextTick();
    const container = avatarContainer.value;
    
    // Set up the scene
    scene = new THREE.Scene();
    
    // Setup components
    camera = setupCamera(container);
    renderer = setupRenderer(container);
    setupLights(scene);
    controls = setupControls(camera, renderer);
    
    // Start the animation loop immediately with an empty scene
    clock = new THREE.Clock();
    animate();
    
    // Update size initially
    updateRendererSize();
    
    // Resize observer for the container
    const resizeObserver = new ResizeObserver(() => {
      updateRendererSize();
    });
    
    resizeObserver.observe(container);

    const handleResize = () => {
      updateRendererSize();
    };

    window.addEventListener('resize', handleResize);
    
    // Load the avatar model asynchronously
    const gltf = await loadModel();
    optimizeMaterials(gltf, renderer);
    mixer = setupAnimations(gltf, scene);
    createGround(scene);
    
    // Hide loading indicator
    loading.value = false;
    
    // Cleanup on unmount
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      
      if (renderer) {
        renderer.dispose();
        
        const canvas = renderer.domElement;
        if (canvas && canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
      }
      
      if (controls) {
        controls.dispose();
      }
    });
  } catch (error) {
    console.error('Error setting up 3D avatar:', error);
    loading.value = false;
  }
});
</script>