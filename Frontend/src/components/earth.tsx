"use client";
import React, { useRef, useEffect, MutableRefObject } from "react";
import * as THREE from "three";

const Earth3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let frameId: number;
    let renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera;
    let earthDay: THREE.Mesh, earthNight: THREE.Mesh, clouds: THREE.Mesh, clouds2: THREE.Mesh;

    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      45,
      (mountRef.current?.clientWidth || 1) / (mountRef.current?.clientHeight || 1),
      0.1,
      1000
    );
    camera.position.z = 3;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current?.clientWidth || 1, mountRef.current?.clientHeight || 1);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Xóa mọi phần tử con cũ trước khi thêm canvas mới
    if (mountRef.current) {
      while (mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
      mountRef.current.appendChild(renderer.domElement);
    }

    // Texture loader
    const loader = new THREE.TextureLoader();
    const earthTexture = loader.load("/earthmap1k.jpg");
    const bumpTexture = loader.load("/earthbump1k.jpg");
    const specularTexture = loader.load("/earthspec1k.jpg");
    const nightTexture = loader.load("/earthlights1k.jpg");
    const cloudTexture = loader.load("/earthcloudmaptrans.jpg");
    const cloudTextureSolid = loader.load("/earthcloudmap.jpg");

    // Earth geometry & material (day)
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const materialDay = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.05,
      specularMap: specularTexture,
      specular: new THREE.Color("grey"),
      shininess: 10,
    });
    earthDay = new THREE.Mesh(geometry, materialDay);
    scene.add(earthDay);

    // Earth night lights overlay (blend with AdditiveBlending)
    const materialNight = new THREE.MeshBasicMaterial({
      map: nightTexture,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.7,
    });
    earthNight = new THREE.Mesh(geometry, materialNight);
    scene.add(earthNight);

    // Clouds (transparent)
    const cloudGeometry = new THREE.SphereGeometry(1.012, 64, 64);
    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
    });
    clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(clouds);

    // Clouds (solid, subtle)
    const cloudGeometry2 = new THREE.SphereGeometry(1.015, 64, 64);
    const cloudMaterial2 = new THREE.MeshPhongMaterial({
      map: cloudTextureSolid,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.08,
      depthWrite: false,
    });
    clouds2 = new THREE.Mesh(cloudGeometry2, cloudMaterial2);
    scene.add(clouds2);

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      earthDay.rotation.y += 0.003;
      earthNight.rotation.y += 0.003;
      clouds.rotation.y += 0.004;
      clouds2.rotation.y += 0.0035;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (mountRef.current) {
        if (renderer.domElement.parentNode === mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "350px", background: "transparent" }}
    />
  );
};

export default Earth3D;