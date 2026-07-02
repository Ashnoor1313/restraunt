import React, { useEffect, useRef } from 'react';

// Fixed luxury gold color palette
const GOLD = 0xD4AF37;
const PURPLE = 0x9333EA;

const BackgroundBlobs = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let active = true;
    let renderer, scene, camera, animationFrameId;
    let handleResize, handleMouseMove;
    let lines = [];
    let lineMaterial, particleGeometry, particleTexture, particleMaterial;
    let aurora1Geo, aurora2Geo, aurora3Geo, aurora1Mat, aurora2Mat, aurora3Mat, auroraTexture;
    
    const mountContainer = mountRef.current;

    // Dynamically import Three.js to keep it out of the main bundle
    import('three').then((THREE) => {
      if (!active) return;

      // 1. Scene Setup
      scene = new THREE.Scene();

      // 2. Camera Setup
      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        100
      );
      camera.position.z = 10;

      // 3. Renderer Setup with Alpha and Antialias
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      if (mountContainer) {
        mountContainer.appendChild(renderer.domElement);
      }

      // 4. Mouse Position Tracking Setup
      const mouse = new THREE.Vector2(0, 0);
      const targetMouse = new THREE.Vector2(0, 0);

      handleMouseMove = (event) => {
        targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener('mousemove', handleMouseMove);

      // 5. Create 3D Stripes (Flowing Line Ribbons)
      const lineCount = 12;
      const segmentsPerLine = 90;

      lineMaterial = new THREE.LineBasicMaterial({
        color: GOLD,
        transparent: true,
        opacity: 0.16,
      });

      for (let i = 0; i < lineCount; i++) {
        const points = [];
        for (let j = 0; j <= segmentsPerLine; j++) {
          const x = (j / segmentsPerLine) * 28 - 14;
          points.push(new THREE.Vector3(x, 0, 0));
        }
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, lineMaterial);
        scene.add(line);
        
        lines.push({
          line,
          initialY: (i - lineCount / 2) * 0.7,
        });
      }

      // 6. Create Bokeh Texture for Particles & Auroras
      const createBokehTexture = (isAurora = false) => {
        const canvas = document.createElement('canvas');
        canvas.width = isAurora ? 256 : 64;
        canvas.height = isAurora ? 256 : 64;
        const ctx = canvas.getContext('2d');
        
        const center = isAurora ? 128 : 32;
        const radius = isAurora ? 128 : 32;
        
        const gradient = ctx.createRadialGradient(center, center, 0, center, center, radius);
        if (isAurora) {
          gradient.addColorStop(0, 'rgba(212, 175, 55, 1)');
          gradient.addColorStop(0.35, 'rgba(212, 175, 55, 0.55)');
          gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
        } else {
          gradient.addColorStop(0, 'rgba(212, 175, 55, 0.45)');
          gradient.addColorStop(0.2, 'rgba(212, 175, 55, 0.18)');
          gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
        }
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        return new THREE.CanvasTexture(canvas);
      };

      particleTexture = createBokehTexture(false);
      auroraTexture = createBokehTexture(true);

      // 7. Floating Dust/Bokeh Particles Setup
      const particleCount = 70;
      particleGeometry = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);
      const particleSpeeds = [];
      const particleDrift = [];
      const originalPositions = [];

      for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * 24;
        const y = (Math.random() - 0.5) * 16;
        const z = (Math.random() - 0.5) * 8;
        
        particlePositions[i * 3] = x;
        particlePositions[i * 3 + 1] = y;
        particlePositions[i * 3 + 2] = z;
        
        originalPositions.push({ x, y, z });
        particleSpeeds.push(0.005 + Math.random() * 0.008);
        particleDrift.push(Math.random() * 100);
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

      particleMaterial = new THREE.PointsMaterial({
        size: 0.42,
        map: particleTexture,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particleSystem);

      // 8. Aurora Glowing Ambient Planes
      // Aurora 1 (gold, top left)
      aurora1Geo = new THREE.PlaneGeometry(18, 18);
      aurora1Mat = new THREE.MeshBasicMaterial({
        map: auroraTexture,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const aurora1 = new THREE.Mesh(aurora1Geo, aurora1Mat);
      aurora1.position.set(-6, 4, -8);
      scene.add(aurora1);

      // Aurora 2 (purple accent, bottom right)
      aurora2Geo = new THREE.PlaneGeometry(22, 22);
      aurora2Mat = new THREE.MeshBasicMaterial({
        map: auroraTexture,
        color: PURPLE,
        transparent: true,
        opacity: 0.10,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const aurora2 = new THREE.Mesh(aurora2Geo, aurora2Mat);
      aurora2.position.set(6, -4, -8);
      scene.add(aurora2);

      // Aurora 3 (gold, tracks the mouse smoothly)
      aurora3Geo = new THREE.PlaneGeometry(14, 14);
      aurora3Mat = new THREE.MeshBasicMaterial({
        map: auroraTexture,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const aurora3 = new THREE.Mesh(aurora3Geo, aurora3Mat);
      aurora3.position.set(0, 0, -6);
      scene.add(aurora3);

      // 9. Animation Loop
      const startTime = performance.now();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const time = (performance.now() - startTime) / 1000;

        // Smoothly lerp mouse coordinate tracker
        mouse.x += (targetMouse.x - mouse.x) * 0.055;
        mouse.y += (targetMouse.y - mouse.y) * 0.055;

        // Map normalized mouse position to ThreeJS viewport scale
        const mouse3DX = mouse.x * 12;
        const mouse3DY = mouse.y * 8;

        // Animate line ribbons + Mouse bending distortion
        lines.forEach(({ line, initialY }, lineIndex) => {
          const positions = line.geometry.attributes.position.array;
          
          for (let j = 0; j <= segmentsPerLine; j++) {
            const index = j * 3;
            const x = positions[index];
            
            const waveY = initialY + Math.sin(x * 0.22 + time + lineIndex * 0.14) * 0.65;
            const waveZ = Math.cos(x * 0.16 + time * 0.6 + lineIndex * 0.2) * 1.2;
            
            const dx = x - mouse3DX;
            const bendFactor = 1.0 / (1.0 + Math.abs(dx) * 0.18);
            const bendY = mouse3DY * 0.85 * bendFactor;
            const bendZ = mouse3DX * 1.25 * bendFactor;

            positions[index + 1] = waveY + bendY;
            positions[index + 2] = waveZ + bendZ;
          }
          
          line.geometry.attributes.position.needsUpdate = true;
        });

        // Animate particles + Mouse attraction
        const parts = particleGeometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          
          originalPositions[i].y += particleSpeeds[i];
          
          if (originalPositions[i].y > 8) {
            originalPositions[i].y = -8;
            originalPositions[i].x = (Math.random() - 0.5) * 24;
          }

          const driftX = originalPositions[i].x + Math.sin(time * 0.3 + particleDrift[i]) * 0.4;
          const driftY = originalPositions[i].y;
          
          const dx = mouse3DX - driftX;
          const dy = mouse3DY - driftY;
          const distSq = dx * dx + dy * dy;
          
          let targetX = driftX;
          let targetY = driftY;

          if (distSq < 20) {
            const dist = Math.sqrt(distSq);
            const pull = (1.0 - dist / 4.47) * 0.65;
            targetX += (dx / dist) * pull;
            targetY += (dy / dist) * pull * 0.6;
          }

          parts[idx] += (targetX - parts[idx]) * 0.08;
          parts[idx + 1] += (targetY - parts[idx + 1]) * 0.08;
          parts[idx + 2] += (originalPositions[i].z - parts[idx + 2]) * 0.05;
        }
        particleGeometry.attributes.position.needsUpdate = true;

        // Slow dynamic movement for background auroras
        aurora1.position.x = -6 + Math.sin(time * 0.22) * 1.5;
        aurora1.position.y = 4 + Math.cos(time * 0.16) * 1.0;
        
        aurora2.position.x = 6 + Math.cos(time * 0.18) * 1.8;
        aurora2.position.y = -4 + Math.sin(time * 0.25) * 1.2;

        // Aurora 3 tracks the mouse glow trail
        aurora3.position.x += (mouse3DX - aurora3.position.x) * 0.055;
        aurora3.position.y += (mouse3DY - aurora3.position.y) * 0.055;

        // Slow overall scene drift
        scene.rotation.y = Math.sin(time * 0.02) * 0.04;
        scene.rotation.x = Math.cos(time * 0.02) * 0.03;

        renderer.render(scene, camera);
      };

      animate();

      // 10. Resize Handler
      handleResize = () => {
        if (!camera || !renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);
    });

    return () => {
      active = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (handleResize) window.removeEventListener('resize', handleResize);
      if (handleMouseMove) window.removeEventListener('mousemove', handleMouseMove);
      
      if (mountContainer && renderer && renderer.domElement) {
        mountContainer.removeChild(renderer.domElement);
      }
      
      if (lines) {
        lines.forEach(({ line }) => {
          if (line && line.geometry) line.geometry.dispose();
        });
      }
      if (lineMaterial) lineMaterial.dispose();
      
      if (particleGeometry) particleGeometry.dispose();
      if (particleTexture) particleTexture.dispose();
      if (particleMaterial) particleMaterial.dispose();

      if (aurora1Geo) aurora1Geo.dispose();
      if (aurora2Geo) aurora2Geo.dispose();
      if (aurora3Geo) aurora3Geo.dispose();
      if (aurora1Mat) aurora1Mat.dispose();
      if (aurora2Mat) aurora2Mat.dispose();
      if (aurora3Mat) aurora3Mat.dispose();
      if (auroraTexture) auroraTexture.dispose();
      
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-transparent">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />
      
      {/* Luxury Soft Vignette Layer */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 30%, rgba(13, 13, 13, 0.75) 100%)',
        }}
      />
    </div>
  );
};

export default BackgroundBlobs;
