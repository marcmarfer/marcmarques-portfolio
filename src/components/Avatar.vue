<template>
    <div ref="avatarContainer" class="avatar-container">
        <div v-if="loading" class="loading-text">Loading model...</div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import avatarModel from '/src/assets/models/marc-model.glb';

const loading = ref(true);

async function loadModel() {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();

    loader.load(
      avatarModel,
      (gltf) => {
        resolve(gltf);
      },
      (xhr) => {
        const percentCompletion = Math.round((xhr.loaded / xhr.total) * 100);
        console.log(`Loading model... ${percentCompletion}%`);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

onMounted(async () => {
    try {
        // Setting up the scene
        const container = document.querySelector('.avatar-container');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(container.offsetWidth, container.offsetHeight);
        renderer.setClearColor(0x000000, 0);
        renderer.shadowMap.enabled = true;

        container.appendChild(renderer.domElement);

        // Setting up the lights
        const ambientLight = new THREE.AmbientLight(0x404040, 30);
        const spotlight = new THREE.SpotLight(0xffffff, 20, 10, 1);
        spotlight.penumbra = 0.5;
        spotlight.position.set(0, 3.5, 2.75);
        spotlight.castShadow = true;

        scene.add(ambientLight);
        scene.add(spotlight);

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

        camera.position.set(0.5, 1.75, 2.85);
        controls.target.set(0, 0.8, 0);
        controls.update();

        // Load the avatar model asynchronously
        const gltf = await loadModel();
        loading.value = false;

        const idleClip = gltf.animations.find(anim => anim.name === 'idleing');
        const waveClip = gltf.animations.find(anim => anim.name === 'waving');

        const mixer = new THREE.AnimationMixer(gltf.scene);

        scene.add(gltf.scene);

        // Adding a ground plane
        const groundGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.1, 64);
        const groundMaterial = new THREE.MeshStandardMaterial({ color: '#80f9e1' });
        const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
        groundMesh.position.y = -0.05;
        groundMesh.receiveShadow = true;
        scene.add(groundMesh);

        // Playing the idle animation
        const idleAction = mixer.clipAction(idleClip);
        const waveAction = mixer.clipAction(waveClip);

        idleAction.setLoop(THREE.LoopRepeat);
        idleAction.play();        

        window.addEventListener('contextmenu', () => {
            if (!waveAction.isRunning()) {
                waveAction.reset();
                waveAction.setLoop(THREE.LoopOnce);
                waveAction.play();

                idleAction.crossFadeTo(waveAction, 0.5, true);

                // Trigger back the idle transition before wave ends
                const waveDuration = waveAction.getClip().duration;

                setTimeout(() => {
                    if (waveAction.isRunning()) {
                        idleAction.reset().play();
                        idleAction.setLoop(THREE.LoopRepeat);

                        waveAction.crossFadeTo(idleAction, 0.5, true);
                    }
                }, (waveDuration - 0.5) * 1000); // Trigger 0.5 seconds before wave ends
            }
        });

        const clock = new THREE.Clock();

        // Resizing the canvas "drawingbuffer" size to fit the container without being blurry
        function resizeRendererToDisplaySize(renderer) {
            const canvas = renderer.domElement;

            const pixelRatio = 5;
            const width = Math.floor(canvas.clientWidth * pixelRatio);
            const height = Math.floor(canvas.clientHeight * pixelRatio);
            const needResize = canvas.width !== width || canvas.height !== height;

            if (needResize) {
                renderer.setSize(width, height, false);
            }
            return needResize;
        }

        function animate() {
            requestAnimationFrame(animate);

            const canvas = renderer.domElement;

            if (resizeRendererToDisplaySize(renderer)) {
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
            }

            mixer.update(clock.getDelta());
            controls.update();
            renderer.render(scene, camera);
        }
        animate();
    } catch (error) {
        console.error(error);
    }
});
</script>

<style scoped>
.avatar-container {
    width: 100%;
    height: 100%;
    position: relative;
}

.loading-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    color: white;
}
</style>
