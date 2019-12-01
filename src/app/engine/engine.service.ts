import * as THREE from 'three';
import { Injectable, ElementRef, OnDestroy, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EngineService implements OnDestroy {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private light: THREE.AmbientLight;

  private text: THREE.Mesh;

  private frameId: number = null;

  public constructor(private ngZone: NgZone) {}

  public ngOnDestroy() {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  // createScene(canvas: ElementRef<HTMLCanvasElement>): void {
  //   // The first step is to get the reference of the canvas element from our HTML document
  //   this.canvas = canvas.nativeElement;

  //   this.renderer = new THREE.WebGLRenderer({
  //     canvas: this.canvas,
  //     alpha: true,    // transparent background
  //     antialias: true // smooth edges
  //   });
  //   this.renderer.setSize(window.innerWidth, window.innerHeight);

  //   // create the scene
  //   this.scene = new THREE.Scene();

  //   this.camera = new THREE.PerspectiveCamera(
  //     75, window.innerWidth / window.innerHeight, 0.1, 1000
  //   );
  //   this.camera.position.z = 5;
  //   this.scene.add(this.camera);

  //   // soft white light
  //   this.light = new THREE.AmbientLight( 0x404040 );
  //   this.light.position.z = 10;
  //   this.scene.add(this.light);

  //   const geometry = new THREE.BoxGeometry(1, 1, 1);
  //   const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  //   this.cube = new THREE.Mesh( geometry, material );
  //   this.scene.add(this.cube);

  // }

  createScene(canvas : ElementRef<HTMLCanvasElement>, text : string) : void {
    this.canvas = canvas.nativeElement;

    this.renderer = new THREE.WebGLRenderer({
      canvas    : this.canvas,
      // alpha     : true,
      antialias : true
    })
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.01, 1000
    )
    this.camera.position.z = 5
    this.scene.add(this.camera)

    this.light = new THREE.AmbientLight('#404040')
    this.light.position.z = 10
    this.scene.add(this.light)

    let geometry : THREE.TextGeometry

    new THREE.FontLoader()
    .load('../assets/fonts/helvetiker_regular.typeface.json',(font) => {
      const geometry = new THREE.TextGeometry(text, {
        font          : font,
        size          : 1.2,
        height        : 0.1,
        curveSegments : 20,
        bevelEnabled  : false
      })

      const material = new THREE.MeshBasicMaterial({color : 0x00ff00})
      this.text = new THREE.Mesh(geometry, material)
      this.scene.add(this.text)

    })

  }

  animate(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.render();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.render();
        });
      }

      window.addEventListener('resize', () => {
        this.resize();
      });
    });
  }

  render() {
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });

    // this.text.rotation.x += 0.01;
    // this.text.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( width, height );
  }
}
