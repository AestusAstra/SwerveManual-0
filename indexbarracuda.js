import * as THREE from 'three'; 
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; 
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const light = new THREE.AmbientLight( 0xFFFFFF );
scene.add( light );

const myDiv = document.getElementById('barracuda');

const camera = new THREE.PerspectiveCamera(60, myDiv.clientWidth / myDiv.clientHeight, 0.05, 1000); 
camera.position.set(0, 0, 0); 

const renderer = new THREE.WebGLRenderer({ antialias: true }); 
renderer.setSize(myDiv.clientWidth, myDiv.clientHeight); 
renderer.setPixelRatio(window.devicePixelRatio); 
renderer.outputColorSpace = THREE.SRGBColorSpace; 

myDiv.appendChild(renderer.domElement); 

const controls = new OrbitControls(camera, renderer.domElement);
window.control = controls
controls.enableDamping = true; // Adds smooth momentum when dragging
controls.dampingFactor = 0.05;
controls.enablePanning = false;
controls.minPolarAngle = 0.929855121374234
controls.maxPolarAngle = 2.051244850464312

const loader = new GLTFLoader(); 
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
loader.setDRACOLoader(dracoLoader);

loader.load(
  './models/barracuda.glb', 
  function (gltf) { 
    const model = gltf.scene; 
    scene.add(model); 

    // Centering the model onto the screen
    const box = new THREE.Box3().setFromObject(model); 
    const center = box.getCenter(new THREE.Vector3()); 
    const size = box.getSize(new THREE.Vector3()); 

    const maxDim = Math.max(size.x, size.y, size.z); 
    camera.position.set(center.x, center.y + (maxDim * 0.4), maxDim * 2.5); 

    controls.target.copy(center);
    controls.update();
  }, 
  undefined,
  (error) => { 
    console.error('Cant load gltf: ', error); 
  }
); 

function animate() { 
    requestAnimationFrame(animate); 
    controls.update()
    renderer.render(scene, camera); 
} 
animate(); 
