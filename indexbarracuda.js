import * as THREE from 'three'; 
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; 
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; 

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);



const myDiv = document.getElementById('barracuda');

const camera = new THREE.PerspectiveCamera(90, myDiv.clientWidth / myDiv.clientHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(myDiv.clientWidth, myDiv.clientHeight);

myDiv.appendChild(renderer.domElement);

const loader = new GLTFLoader();

loader.load(
  'https://aestusastra.github.io/SwerveManual-0/models/barracuda.glb', 
  function (gltf) {
    const model = gltf.scene;

    /* To Center the model */
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);
    
    scene.add(model);
  },
  undefined,
  (error) => { console.error('GLTF Model not working', error); }
)

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
