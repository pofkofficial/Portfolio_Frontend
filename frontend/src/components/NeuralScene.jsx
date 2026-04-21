import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function RootNetwork() {
  const group = useRef();
  // We use our own independent counters
  const internalTime = useRef(0);
  const rotationY = useRef(0);

  const paths = useMemo(() => {
    const tempPaths = [];
    for (let i = 0; i < 40; i++) {
      const points = [];
      for (let j = 0; j < 5; j++) {
        points.push(new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        ));
      }
      tempPaths.push(new THREE.CatmullRomCurve3(points));
    }
    return tempPaths;
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;

    // Use the delta to increment our own time trackers
    // This bypasses state.clock entirely
    internalTime.current += delta;
    rotationY.current += delta * 0.08;

    const { x, y } = state.mouse;

    const autoRotationX = Math.sin(internalTime.current * 0.4) * 0.05;
    const mouseTargetX = -y * 0.3;
    const mouseTargetY = x * 0.3;

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      autoRotationX + mouseTargetX,
      0.05
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      rotationY.current + mouseTargetY,
      0.05
    );
  });

  return (
    <group ref={group}>
      {paths.map((path, i) => (
        <mesh key={i}>
          <tubeGeometry args={[path, 64, 0.01, 8, false]} />
          <meshBasicMaterial
            color="#00f2ff"
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function NeuralScene() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#020617] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        // Removed the hacky clock prop. 
        // We handle the time logic inside the component hooks instead.
        eventSource={typeof document !== 'undefined' ? document.body : null}
        eventPrefix="client"
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={2.5} color="#00f2ff" />
        
        <RootNetwork />
        
        <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.5}>
          <Sphere args={[1.2, 64, 64]}>
            <MeshDistortMaterial
              color="#011627"
              speed={4}
              distort={0.4}
              roughness={0.2}
              metalness={0.9}
              emissive="#00f2ff"
              emissiveIntensity={0.15}
            />
          </Sphere>
        </Float>
      </Canvas>
    </div>
  );
}