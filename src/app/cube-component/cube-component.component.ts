import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';


@Component({
  selector: 'app-cube-component',
  templateUrl: './cube-component.component.html',
  styleUrls: ['./cube-component.component.css']
})
export class CubeComponentComponent implements AfterViewInit{
  @ViewChild('rendererContainer', { static: false}) rendererContainer: ElementRef | undefined;
  renderer =  new THREE.WebGLRenderer();
  scene!: THREE.Scene;
  camera!: THREE.Camera;
  cube!: THREE.Mesh;
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();


  ngAfterViewInit() {
    console.log('ngAfterViewInit called');
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xffffff);
    if (this.rendererContainer && this.rendererContainer.nativeElement) {
      this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
      console.log('rendererContainer found');
    }


    const geometry = new THREE.BoxGeometry();
    const loader = new THREE.TextureLoader();
    const materials = [
      new THREE.MeshBasicMaterial({ map: loader.load('assets/face-1.jpg') }),
      new THREE.MeshBasicMaterial({ map: loader.load('assets/face-2.jpg') }),
      new THREE.MeshBasicMaterial({ map: loader.load('assets/face-3.jpg') }),
      new THREE.MeshBasicMaterial({ map: loader.load('assets/face-4.jpg') }),
      new THREE.MeshBasicMaterial({ map: loader.load('assets/face-5.jpg') }),
      new THREE.MeshBasicMaterial({ map: loader.load('assets/face-6.jpg') }),
    ];

    this.cube = new THREE.Mesh(geometry, materials);
    this.scene.add(this.cube);

    this.camera.position.z = 5;

    this.animate();

    this.createClickableFace(0, new THREE.Vector3(0.5, 0, 0), new THREE.Euler(0, Math.PI / 2, 0));
    this.createClickableFace(1, new THREE.Vector3(-0.5, 0, 0), new THREE.Euler(0, -Math.PI / 2, 0));
    this.createClickableFace(2, new THREE.Vector3(0, 0.5, 0), new THREE.Euler(Math.PI / 2, 0, 0));
    this.createClickableFace(3, new THREE.Vector3(0, -0.5, 0), new THREE.Euler(-Math.PI / 2, 0, 0));

    this.renderer.domElement.addEventListener('mousedown', (event) => this.onDocumentMouseDown(event), false);

  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    TWEEN.update(); // Add this line
    this.renderer.render(this.scene, this.camera);
  }

  createClickableFace(faceIndex: number, position: THREE.Vector3, rotation: THREE.Euler) {
    console.log(`createClickableFace called with faceIndex: ${faceIndex}`);
    const geometry = new THREE.PlaneGeometry(0.2, 0.2);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.5 });
    const plane = new THREE.Mesh(geometry, material);

    plane.position.copy(position);
    plane.rotation.copy(rotation);
    plane.userData['faceIndex'] = faceIndex;

    this.scene.add(plane);
  }

  onDocumentMouseDown(event: MouseEvent) {
    event.preventDefault();

    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);

    const intersects = raycaster.intersectObjects(this.scene.children, true);
    console.log('intersects:', intersects);

    if (intersects.length > 0) {
      const selectedObject = intersects[0].object;

      if (selectedObject.userData['faceIndex'] !== undefined) {
        console.log(`Clicked on face: ${selectedObject.userData['faceIndex']}`);
        this.rotateCubeToFace(selectedObject.userData['faceIndex']);
      }
    }
  }

  rotateCubeToFace(faceIndex: number) {
    console.log(`rotateCubeToFace called with faceIndex: ${faceIndex}`);
    const targetRotation = new THREE.Euler();

    switch (faceIndex) {
      case 0:
        targetRotation.set(0, Math.PI / 2, 0);
        break;
      case 1:
        targetRotation.set(0, -Math.PI / 2, 0);
        break;
      case 2:
        targetRotation.set(-Math.PI / 2, 0, 0);
        break;
      case 3:
        targetRotation.set(Math.PI / 2, 0, 0);
        break;
      default:
        console.error("Invalid face index");
        return;
    }

    targetRotation.order = 'XYZ';

    console.log('targetRotation:', targetRotation);

    const currentRotation = this.cube.quaternion.clone(); // Use quaternion instead of Euler angles
    const targetQuaternion = new THREE.Quaternion().setFromEuler(targetRotation);
    const rotationDifference = new THREE.Quaternion().multiplyQuaternions(targetQuaternion, currentRotation.clone());

    const tween = new TWEEN.Tween({ t: 0 })
      .to({ t: 1 }, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate((obj) => {
        this.cube.quaternion.copy(currentRotation).multiply(rotationDifference.clone().slerp(new THREE.Quaternion(), obj.t));
      })
      .onComplete(() => {
        console.log('Cube rotation complete');
      })
      .start();
  }






}


