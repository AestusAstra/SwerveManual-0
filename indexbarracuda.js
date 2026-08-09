import * as THREE from 'three'; 
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; 
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; 

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);



const myDiv = document.getElementById('three')

const camera = new THREE.PerspectiveCamera(90, myDiv.clientWidth / myDiv.clientHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(myDiv.clientWidth, myDiv.clientHeight)

myDiv.appendChild(renderer.domElement) 

const loader = new GLTFLoader()

loader.load('https://aestusastra.github.io/SwerveManual-0/models/barracuda.glb', function (gltf) {
  const model = gltf.scene;
  scene.add(model)
}
)

renderer.render(scene, camera)