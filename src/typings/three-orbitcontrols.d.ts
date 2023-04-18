declare module 'three-orbitcontrols' {
  import { Camera, EventDispatcher, MOUSE, Object3D, Vector3 } from 'three';

  export class OrbitControls extends EventDispatcher {
    constructor(object: Camera, domElement?: HTMLElement);

    object: Camera;
    domElement: HTMLElement | Document;

    // API
    enabled: boolean;
    target: Vector3;

    // deprecated
    center: Vector3;

    enableZoom: boolean;
    zoomSpeed: number;
    minDistance: number;
    maxDistance: number;

    enableRotate: boolean;
    rotateSpeed: number;

    enablePan: boolean;
    keyPanSpeed: number;
    autoRotate: boolean;
    autoRotateSpeed: number;

    minPolarAngle: number;
    maxPolarAngle: number;

    minAzimuthAngle: number;
    maxAzimuthAngle: number;

    enableKeys: boolean;
    keys: { LEFT: number; UP: number; RIGHT: number; BOTTOM: number };
    mouseButtons: { ORBIT: MOUSE; ZOOM: MOUSE; PAN: MOUSE };

    enableDamping: boolean;
    dampingFactor: number;

    target0: Vector3;
    position0: Vector3;
    zoom0: number;

    getPolarAngle(): number;

    getAzimuthalAngle(): number;

    saveState(): void;

    reset(): void;

    update(): void;

    dispose(): void;
  }
}
