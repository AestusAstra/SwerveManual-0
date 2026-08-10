import * as THREE from 'three'; 
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; 
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const myDiv = document.getElementById('barracuda');

const camera = new THREE.PerspectiveCamera(90, myDiv.clientWidth / myDiv.clientHeight, 0.1, 1000); 
camera.position.set(0, 0, 0); 

const renderer = new THREE.WebGLRenderer({ antialias: true }); 
renderer.setSize(myDiv.clientWidth, myDiv.clientHeight); 
renderer.setPixelRatio(window.devicePixelRatio); 
renderer.outputColorSpace = THREE.SRGBColorSpace; 

myDiv.appendChild(renderer.domElement); 

const loader = new GLTFLoader(); 
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
gltfLoader.setDRACOLoader(dracoLoader);

loader.load(
  'https://achintyaakula.github.io/SwerveManual-0//models/barracuda.glb', 
  function (gltf) { 
    const model = gltf.scene; 
    scene.add(model); 

    // Centering the model onto the screen
    const box = new THREE.Box3().setFromObject(model); 
    const center = box.getCenter(new THREE.Vector3()); 
    const size = box.getSize(new THREE.Vector3()); 

    const maxDim = Math.max(size.x, size.y, size.z); 
    camera.position.set(center.x, center.y + (maxDim * 0.4), maxDim * 2.5); 
  }, 
  undefined,
  (error) => { 
    console.error('Cant load gltf: ', error); 
  }
); 

function animate() { 
    requestAnimationFrame(animate); 
    renderer.render(scene, camera); 
} 
animate(); 
