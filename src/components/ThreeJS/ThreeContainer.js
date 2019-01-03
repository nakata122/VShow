import React from 'react';
import * as THREE from 'three';
import * as OBJLoader from 'three-obj-loader';
import { OrbitControls } from 'three-orbitcontrols';
import obj from '../../resources/models/room2.obj';
OBJLoader(THREE);

class ThreeContainer extends React.Component{
  constructor(params){
    super(params);
    this.loadObj = this.loadObj.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

componentDidMount(){
    document.addEventListener('mousemove', this.onMouseMove, false);

    this.THREE = THREE;
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    //ADD SCENE
    let scene = new THREE.Scene();
    this.scene = scene;
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      3000
    );
    this.camera.position.z = 1500;
    //ADD CONTROLS
    this.controls = new this.THREE.OrbitControls( this.camera );
    //ADD Raycaster
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor('rgb(0,0,0)');
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);
    // instantiate a loader
    this.loader = new this.THREE.OBJLoader();
    //ADD OBJ
    this.loader.load(
      obj,
      // called when resource is loaded
      this.loadObj,
      // called when loading is in progresses
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded' );
      },
      // called when loading has errors
      function (error) {
        console.log( 'An error happened' + error);
      }
    );

    //ADD Box
    let geometry = new THREE.BoxGeometry( 100, 100, 0.1 );
    let material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    this.sphere = new THREE.Mesh( geometry, material );
    this.scene.add( this.sphere );

    //ADD Light
    let light = new THREE.PointLight( 'rgb(255,255,255)', 1, 2000 );
    light.position.set( 60, 60, 60 );
    this.scene.add( light );
    let light2 = new THREE.AmbientLight( 'rgb(255,255,255)', 0.2, 2000 );
    light.position.set( 60,60,60 );
    this.scene.add( light2 );
    this.start();
}
componentWillUnmount(){
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
}
start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
}
stop() {
    cancelAnimationFrame(this.frameId);
}
animate() {
   this.controls.update();
   this.raycaster.setFromCamera( this.mouse, this.camera );

   // calculate objects intersecting the picking ray
   if(this.scene.children[3] != undefined){
    let intersects = this.raycaster.intersectObjects( this.scene.children[3].children );

    if(intersects.length>=1) {
      this.sphere.position.set(intersects[0].point.x, intersects[0].point.y, intersects[0].point.z+10);
    }
   }
   

   this.renderScene();
   this.frameId = window.requestAnimationFrame(this.animate);
}
renderScene() {
  this.renderer.render(this.scene, this.camera);
}
loadObj(object) {
  const material = new THREE.MeshLambertMaterial({ color: 'rgb(255,255,255)'});
  object.traverse( function ( child ) {

    if ( child instanceof THREE.Mesh ) {

        child.material = material;

    }

  } );
  this.scene.add(object);
  console.log( this.scene.children[2].children ); 
}

onMouseMove = (e) => {
  this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
  this.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
}

render(){
    return(
      <div
        style={{ width: '100%', height: '100vh' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}
export default ThreeContainer