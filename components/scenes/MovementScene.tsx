import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { MovementParams } from '../../types';

interface Props {
  params: MovementParams;
  progress: number; // 0 to 1
  isPlaying: boolean;
}

const Car: React.FC<{ 
  position: [number, number, number]; 
  color: string; 
  label: string;
  speed: number;
}> = ({ position, color, label, speed }) => {
  return (
    <group position={position}>
      {/* Body */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.2, 0.6, 0.8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Wheels */}
      <mesh position={[-0.4, 0.2, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0.4, 0.2, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
       <mesh position={[-0.4, 0.2, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0.4, 0.2, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Label */}
      <Html position={[0, 1.5, 0]} center>
        <div className="bg-white/90 backdrop-blur px-2 py-1 rounded shadow-lg text-xs font-bold text-gray-800 whitespace-nowrap">
          {label} <br/>
          v={speed}
        </div>
      </Html>
    </group>
  );
};

const Flag: React.FC<{ position: [number, number, number]; label: string }> = ({ position, label }) => (
   <group position={position}>
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 2]} />
        <meshStandardMaterial color="#aaa" />
      </mesh>
      <mesh position={[0.3, 1.7, 0]}>
        <boxGeometry args={[0.6, 0.4, 0.05]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <Html position={[0, 2.2, 0]} center>
         <div className="text-xs font-bold text-gray-500">{label}</div>
      </Html>
   </group>
);

export const MovementScene: React.FC<Props> = ({ params, progress }) => {
  // Normalize distances for visualization to fit on screen
  // We assume a stage width of roughly 20 units (-10 to 10)
  const scaleFactor = 15 / Math.max(params.initialDistance, (params.speedA + params.speedB) * params.totalTime);
  
  const currentTime = progress * params.totalTime;

  // Calculate positions based on physics
  // Assume A starts at -distance/2 (scaled) and B starts at +distance/2 or 0 depending on type
  
  let posA = 0;
  let posB = 0;
  const startX_A = -(params.initialDistance * scaleFactor) / 2;
  const startX_B = (params.initialDistance * scaleFactor) / 2;

  if (params.direction === 'OPPOSITE') {
    // Meeting problem: A moves Right, B moves Left
    posA = startX_A + (params.speedA * currentTime * scaleFactor);
    posB = startX_B - (params.speedB * currentTime * scaleFactor);
  } else {
    // Chasing problem: Both move Right. A starts behind B.
    // Re-adjust start points for chasing to fit screen better
    // A is at -5, B is ahead by scaled distance
    const chaseStartA = -8;
    const chaseStartB = -8 + (params.initialDistance * scaleFactor);
    
    posA = chaseStartA + (params.speedA * currentTime * scaleFactor);
    posB = chaseStartB + (params.speedB * currentTime * scaleFactor);
  }

  // Meeting Point Marker
  let meetingX = 0;
  let showMeeting = false;
  
  if (params.meetingTime && currentTime >= params.meetingTime) {
     showMeeting = true;
     if (params.direction === 'OPPOSITE') {
        meetingX = startX_A + (params.speedA * params.meetingTime * scaleFactor);
     } else {
        meetingX = -8 + (params.speedA * params.meetingTime * scaleFactor);
     }
  }

  return (
    <group>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      
      {/* Ground / Road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[100, 4]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>
      
      {/* Road Markings */}
      <gridHelper args={[100, 100, 0xffffff, 0xffffff]} position={[0, 0, 0]} rotation={[0, 0, 0]} />

      <Car 
        position={[posA, 0, 1]} 
        color="#3b82f6" 
        label={params.objectAName} 
        speed={params.speedA}
      />
      
      <Car 
        position={[posB, 0, -1]} 
        color="#ef4444" 
        label={params.objectBName} 
        speed={params.speedB}
      />

      {showMeeting && (
          <Flag position={[meetingX, 0, 0]} label="相遇/追上点" />
      )}

      {/* Distance Line Helper */}
      {params.direction === 'OPPOSITE' && progress === 0 && (
        <group position={[0, 0.1, 0]}>
           <mesh position={[0, 0, 0]} rotation={[0,0,Math.PI/2]}>
             <cylinderGeometry args={[0.02, 0.02, params.initialDistance * scaleFactor]} />
             <meshBasicMaterial color="#888" />
           </mesh>
           <Html position={[0, 0.5, 0]} center>
             <span className="text-xs bg-white px-1 rounded border">距离: {params.initialDistance}</span>
           </Html>
        </group>
      )}
    </group>
  );
};
