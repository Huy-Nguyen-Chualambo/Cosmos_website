"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Uranus3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let frameId: number;
    let renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera;
    let mars: THREE.Mesh;

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

    // Xóa canvas cũ nếu có
    if (mountRef.current) {
      while (mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
      mountRef.current.appendChild(renderer.domElement);
    }

    // Texture Mars
    const loader = new THREE.TextureLoader();
    const marsTexture = loader.load("/uranus.jpg"); // Đặt file mars.jpg vào public

    // Mars geometry & material
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshPhongMaterial({
      map: marsTexture,
    });
    mars = new THREE.Mesh(geometry, material);
    scene.add(mars);

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      mars.rotation.y += 0.003;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // Resize
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
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
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

export default Uranus3D;