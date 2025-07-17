import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Text3D, Float, Environment } from '@react-three/drei';
import { motion } from 'framer-motion-3d';

const RotatingHeart = ({ position }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
      meshRef.current.scale.setScalar(hovered ? 1.2 : 1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          color={hovered ? "#ff6b6b" : "#4ecdc4"}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const DNAHelix = () => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  const helixPoints = [];
  for (let i = 0; i < 50; i++) {
    const angle = (i / 50) * Math.PI * 4;
    const y = (i / 50) * 10 - 5;
    helixPoints.push([
      Math.cos(angle) * 2,
      y,
      Math.sin(angle) * 2
    ]);
  }

  return (
    <group ref={groupRef}>
      {helixPoints.map((point, index) => (
        <Sphere key={index} position={point} args={[0.1]}>
          <meshStandardMaterial color={index % 2 === 0 ? "#45b7d1" : "#96ceb4"} />
        </Sphere>
      ))}
    </group>
  );
};

const Medical3DScene = () => {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} />
        
        <RotatingHeart position={[-3, 0, 0]} />
        <RotatingHeart position={[3, 0, 0]} />
        <DNAHelix />
        
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.5}
            height={0.1}
            position={[0, 3, 0]}
          >
            PREMIER HEALTHCARE
            <meshStandardMaterial color="#ffffff" />
          </Text3D>
        </Float>
        
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default Medical3DScene;