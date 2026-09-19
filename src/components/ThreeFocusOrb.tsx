import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeFocusOrb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // transparent to blend with clean white brutalist container

    const width = container.clientWidth || 340;
    const height = container.clientHeight || 340;

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // Group for mouse interaction
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Chrome Sphere
    const sphereGeo = new THREE.SphereGeometry(1.35, 64, 64);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#f0f4f8'),
      metalness: 0.95,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
      envMapIntensity: 1.5,
    });
    const chromeSphere = new THREE.Mesh(sphereGeo, sphereMat);
    mainGroup.add(chromeSphere);

    // 2. Transparent Glass Cube surrounding the orb
    const cubeGeo = new THREE.BoxGeometry(3.1, 3.1, 3.1);
    const cubeMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#ffffff'),
      transmission: 0.6,
      opacity: 0.35,
      transparent: true,
      roughness: 0.05,
      ior: 1.5,
      reflectivity: 0.5,
    });
    const glassCube = new THREE.Mesh(cubeGeo, cubeMat);
    mainGroup.add(glassCube);

    // Wireframe edges for brutalist clarity
    const edgesGeo = new THREE.EdgesGeometry(cubeGeo);
    const edgesMat = new THREE.LineBasicMaterial({
      color: 0x111111,
      linewidth: 2,
    });
    const cubeEdges = new THREE.LineSegments(edgesGeo, edgesMat);
    mainGroup.add(cubeEdges);

    // 3. Floating Geometric Rings (Torus)
    const ring1Geo = new THREE.TorusGeometry(2.3, 0.04, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#111111'),
      metalness: 0.8,
      roughness: 0.2,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.6, 0.035, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2457FF'), // Bauhaus Blue
      metalness: 0.5,
      roughness: 0.3,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    mainGroup.add(ring2);

    // 4. Bauhaus Floating Shapes
    // Red Tetrahedron / Pyramid
    const tetraGeo = new THREE.TetrahedronGeometry(0.38);
    const tetraMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FF3B30'), // Signal Red
      roughness: 0.3,
      metalness: 0.1,
    });
    const redTetra = new THREE.Mesh(tetraGeo, tetraMat);
    redTetra.position.set(2.2, 1.2, 0.6);
    mainGroup.add(redTetra);

    // Yellow Disc / Cylinder
    const cylGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.12, 32);
    const yellowMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FFD600'), // Solar Yellow
      roughness: 0.3,
      metalness: 0.1,
    });
    const yellowDisc = new THREE.Mesh(cylGeo, yellowMat);
    yellowDisc.position.set(-2.2, -1.1, 0.5);
    yellowDisc.rotation.x = Math.PI / 3;
    mainGroup.add(yellowDisc);

    // Blue Small Cube
    const smallCubeGeo = new THREE.BoxGeometry(0.42, 0.42, 0.42);
    const blueMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0047FF'), // Bauhaus Blue
      roughness: 0.2,
      metalness: 0.2,
    });
    const blueCube = new THREE.Mesh(smallCubeGeo, blueMat);
    blueCube.position.set(-1.6, 1.8, -0.4);
    mainGroup.add(blueCube);

    // Acid Green sphere
    const greenGeo = new THREE.SphereGeometry(0.24, 16, 16);
    const greenMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#B6FF00'), // Acid Green
      roughness: 0.2,
      metalness: 0.3,
    });
    const greenSphere = new THREE.Mesh(greenGeo, greenMat);
    greenSphere.position.set(1.7, -1.8, -0.3);
    mainGroup.add(greenSphere);

    // 5. Subtle Stardust / Iridescent Particles
    const particlesCount = 75;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      const radius = 2.4 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = radius * Math.cos(phi);
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.05,
      color: new THREE.Color('#FF3CAC'), // Hot Pink Psychedelic
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    mainGroup.add(particles);

    // Lighting setup for rich metallic reflections
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 5, 6);
    scene.add(keyLight);

    const pinkFillLight = new THREE.PointLight(0xff3cac, 3, 10);
    pinkFillLight.position.set(-4, 3, 2);
    scene.add(pinkFillLight);

    const blueBackLight = new THREE.PointLight(0x2457ff, 3.5, 10);
    blueBackLight.position.set(3, -4, -2);
    scene.add(blueBackLight);

    const acidRimLight = new THREE.PointLight(0xb6ff00, 2, 8);
    acidRimLight.position.set(0, -3, 3);
    scene.add(acidRimLight);

    // Mouse Tracking
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.45;
      targetRotX = -y * 0.45;
    };

    const handleMouseLeave = () => {
      targetRotX = 0;
      targetRotY = 0;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      currentRotX += (targetRotX - currentRotX) * 0.06;
      currentRotY += (targetRotY - currentRotY) * 0.06;

      mainGroup.rotation.x = currentRotX + Math.sin(elapsedTime * 0.4) * 0.08;
      mainGroup.rotation.y = currentRotY + elapsedTime * 0.25;

      // Spin internal elements subtly
      chromeSphere.rotation.y = -elapsedTime * 0.3;
      glassCube.rotation.x = elapsedTime * 0.15;
      glassCube.rotation.y = elapsedTime * 0.2;
      cubeEdges.rotation.x = glassCube.rotation.x;
      cubeEdges.rotation.y = glassCube.rotation.y;

      ring1.rotation.z = elapsedTime * 0.35;
      ring2.rotation.z = -elapsedTime * 0.3;

      // Orbit Bauhaus shapes
      redTetra.rotation.x = elapsedTime * 0.8;
      redTetra.rotation.y = elapsedTime * 0.9;
      yellowDisc.rotation.y = elapsedTime * 0.7;
      blueCube.rotation.x = -elapsedTime * 0.6;
      blueCube.rotation.z = elapsedTime * 0.5;

      particles.rotation.y = -elapsedTime * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });

    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      cubeGeo.dispose();
      cubeMat.dispose();
      edgesGeo.dispose();
      edgesMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      tetraGeo.dispose();
      tetraMat.dispose();
      cylGeo.dispose();
      yellowMat.dispose();
      smallCubeGeo.dispose();
      blueMat.dispose();
      greenGeo.dispose();
      greenMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
    };
  }, []);

  return (
    <div
      id="three-focus-orb-container"
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[300px] sm:h-[340px] md:h-[380px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
    >
      {/* Bauhaus Decorative Framing Elements */}
      <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10 pointer-events-none">
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#FF3B30] border border-[#111111]" />
        <span className="inline-block w-2.5 h-2.5 bg-[#FFD600] border border-[#111111]" />
        <span className="inline-block w-2.5 h-2.5 bg-[#0047FF] border border-[#111111]" />
        <span className="font-mono-tech text-[10px] font-bold tracking-wider text-[#111111]/70 ml-1">
          ORB.SYS // RENDER: 3D
        </span>
      </div>

      <div className="absolute bottom-2 right-2 z-10 pointer-events-none">
        <span className="font-mono-tech text-[10px] px-1.5 py-0.5 bg-[#111111] text-[#B6FF00] font-semibold border border-[#111111]">
          {isHovered ? 'INTERACT // TILT ACTIVE' : '3D // THREE.JS LIVE'}
        </span>
      </div>

      {/* Subtle Bauhaus grid marks in corners */}
      <div className="absolute top-2 right-2 font-mono-tech text-[9px] text-[#111111]/40 pointer-events-none">
        + 45.19° // ROT
      </div>
      <div className="absolute bottom-2 left-2 font-mono-tech text-[9px] text-[#111111]/40 pointer-events-none">
        MAT: CHROME + GLASS
      </div>
    </div>
  );
}
