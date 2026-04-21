import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function MyceliumLines() {
  const group = useRef();
  const { mouse } = useThree(); 
  
  const lines = useMemo(() => {
    return Array.from({ length: 40 }, () => {
      const points = Array.from({ length: 5 }, () => 
        new THREE.Vector3(
          (Math.random() - 0.5) * 12, 
          (Math.random() - 0.5) * 12, 
          (Math.random() - 0.5) * 10
        )
      );
      return new THREE.CatmullRomCurve3(points);
    });
  }, []);

  useFrame((state) => {
    // R3F's internal clock is the modern standard (handles the Timer update internally)
    const time = state.clock.getElapsedTime();
    
    if (group.current) {
      // 1. Idle rotation (Constant base movement)
      const baseRotation = time * 0.05;
      
      // 2. Interactive tilt (Lerping for smoothness)
      // We target the tilt relative to the base rotation
      const targetX = mouse.y * 0.3;
      const targetY = (mouse.x * 0.3) + baseRotation;

      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.05);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.05);
    }
  });

  return (
    <group ref={group}>
      {lines.map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 64, 0.003, 8, false]} />
          <meshBasicMaterial 
            color="#06b6d4" 
            transparent 
            opacity={0.15} 
            blending={THREE.AdditiveBlending}
            depthWrite={false} // Prevents "boxing" artifacts when lines overlap
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#020617]">
      <Canvas 
        camera={{ position: [0, 0, 7], fov: 60 }} 
        dpr={[1, 2]} 
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#06b6d4" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#083344" />
        
        <MyceliumLines />
        
        {/* The Central "Core" */}
        <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
          <Sphere args={[1, 100, 100]} scale={1.8}>
            <MeshDistortMaterial 
              color="#083344" 
              speed={4} 
              distort={0.4} 
              roughness={0.1}
              metalness={0.9}
              emissive="#06b6d4"
              emissiveIntensity={0.05}
            />
          </Sphere>
        </Float>
      </Canvas>
    </div>
  );
}