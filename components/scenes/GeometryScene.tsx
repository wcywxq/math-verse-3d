import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { GeometryParams } from '../../types';

interface Props {
  params: GeometryParams;
}

export const GeometryScene: React.FC<Props> = ({ params }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  const renderShape = () => {
    switch (params.shape) {
      case 'CUBE':
        return <boxGeometry args={[3, 3, 3]} />;
      case 'CYLINDER':
        return <cylinderGeometry args={[1.5, 1.5, 3, 32]} />;
      case 'SPHERE':
        return <sphereGeometry args={[2, 32, 32]} />;
      default:
        return <boxGeometry args={[2, 2, 2]} />;
    }
  };

  return (
    <group>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[-10, 10, 5]} angle={0.3} />

      <mesh ref={meshRef} position={[0, 0, 0]}>
        {renderShape()}
        <meshPhysicalMaterial 
          color="#6366f1" 
          metalness={0.1} 
          roughness={0.2} 
          transparent 
          opacity={0.9} 
          transmission={0.2}
        />
        
        <Html position={[2, 1, 0]}>
           <div className="bg-white/80 backdrop-blur p-2 rounded shadow-lg w-48 text-sm pointer-events-none select-none">
              <h4 className="font-bold text-indigo-900">{params.label}</h4>
              <p className="text-gray-600 mt-1">{params.description}</p>
              <div className="mt-2 border-t pt-1 text-xs text-gray-500">
                  Param A: {params.dimensionA}<br/>
                  {params.dimensionB && <>Param B: {params.dimensionB}</>}
              </div>
           </div>
        </Html>
      </mesh>

      <gridHelper args={[20, 20, 0xcccccc, 0xe5e7eb]} position={[0, -2, 0]} />
      <OrbitControls enableZoom={true} autoRotate={false} />
    </group>
  );
};
