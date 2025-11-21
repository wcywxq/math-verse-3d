import React from 'react';
import { SceneType, ProblemData } from '../../types';

interface Props {
  problem: ProblemData;
  progress: number;
}

export const Scene2D: React.FC<Props> = ({ problem, progress }) => {
  const width = 1000;
  const height = 600; // Taller to accommodate info box
  const paddingX = 100;
  
  // If not a movement problem, show basic text
  if (problem.type !== SceneType.MOVEMENT || !problem.movementParams) {
      return (
          <div className="flex flex-col items-center justify-center text-gray-400">
              <div className="text-xl font-bold mb-2">暂无演示数据</div>
              <div className="text-sm">该题目类型暂不支持2D动画演示</div>
          </div>
      );
  }

  const params = problem.movementParams;
  
  // 1. Determine Representation (Train vs Point)
  // Heuristics: If name contains "火车" or "列车" or "桥", we treat it as an object with length
  const isTrainA = params.objectAName.includes('火车') || params.objectAName.includes('列车');
  const isBridgeA = params.objectAName.includes('桥') || params.objectAName.includes('隧道');
  const isTrainB = params.objectBName.includes('火车') || params.objectBName.includes('列车');
  const isBridgeB = params.objectBName.includes('桥') || params.objectBName.includes('隧道');
  // Check problem.title/question for '水' or '船'
  const isBoat = params.objectAName.includes('船') || params.objectBName.includes('船') || problem.title.includes('水') || problem.title.includes('船');

  // Detect Round Trip / Bouncing Scenario
  const roundTripKeywords = ['往返', '折返', '多次相遇', '返回', '来回'];
  const isRoundTrip = roundTripKeywords.some(k => 
      problem.title.includes(k) || 
      problem.question.includes(k) ||
      problem.analysis.includes(k)
  );

  // Dimensions
  const trainLength = 80; 
  const bridgeLength = 200;
  const pointRadius = 15;

  // 2. Calculate Scale
  // We need to map the logical distance to the screen width
  // For standard problems: Visual Span = InitialDistance + Buffer
  // For Round Trip: Visual Span is strictly the InitialDistance (Track Length)
  
  let totalVisualDist;
  if (isRoundTrip) {
     totalVisualDist = params.initialDistance * 1.2; // Slight buffer for edges
  } else {
     // Linear motion needs to accommodate where they end up
     totalVisualDist = Math.max(
         params.initialDistance * 1.5, 
         (params.speedA + params.speedB) * params.totalTime * 1.1
     );
  }
  
  // Prevent division by zero
  if (totalVisualDist === 0) totalVisualDist = 100;

  const scale = (width - paddingX * 2) / totalVisualDist;

  // 3. Calculate Positions Logic
  const currentTime = progress * params.totalTime;
  const trackLength = params.initialDistance;

  // Helper: Calculate position with optional Bouncing logic
  const calculatePosition = (startPos: number, speed: number, time: number, moveDirection: -1 | 1) => {
      const distTraveled = speed * time;
      
      if (isRoundTrip && trackLength > 0) {
          // Physics: Bouncing between 0 and trackLength
          // If starting at 0:
          if (startPos === 0) {
              const cycle = Math.floor(distTraveled / trackLength);
              const offset = distTraveled % trackLength;
              // Even cycle (0, 2...): Moving Right (0 -> L)
              // Odd cycle (1, 3...): Moving Left (L -> 0)
              return cycle % 2 === 0 ? offset : trackLength - offset;
          }
          // If starting at trackLength (L):
          if (startPos === trackLength) {
              // Effectively starting at L and moving "Left" first?
              // Or "Right" first? Depends on speed direction, but usually Opposite means L -> 0.
              // Let's assume standard Opposite start: B starts at L, moves Left.
              const cycle = Math.floor(distTraveled / trackLength);
              const offset = distTraveled % trackLength;
              // Even cycle: Moving Left (L -> 0) -> Position is L - offset
              // Odd cycle: Moving Right (0 -> L) -> Position is offset
              return cycle % 2 === 0 ? trackLength - offset : offset;
          }
      }

      // Standard Linear Logic
      return startPos + (speed * time * moveDirection);
  };

  // Determine logical start positions and directions
  // A always starts at 0.
  // B starts at initialDistance.
  // Direction 'OPPOSITE': A moves Right (+1), B moves Left (-1)
  // Direction 'SAME': A moves Right (+1), B moves Right (+1)

  const posA_logical = calculatePosition(0, params.speedA, currentTime, 1);
  
  let posB_logical;
  if (params.direction === 'OPPOSITE') {
      posB_logical = calculatePosition(trackLength, params.speedB, currentTime, -1);
  } else {
      // SAME direction (Chase), usually B starts ahead.
      // Note: If Round Trip + Same Direction, the logic above for Start=Length might need adjustment if B moves Right.
      // But usually Round Trip implies boundaries [0, L]. 
      // Let's assume linear chase if SAME unless specified. 
      // Actually, if isRoundTrip is true, let's assume bouncing inside 0-L.
      posB_logical = calculatePosition(trackLength, params.speedB, currentTime, 1);
  }

  // Screen Coordinates (Center Y axis)
  const centerY = height / 2 + 50;
  const screenX_A = paddingX + posA_logical * scale;
  const screenX_B = paddingX + posB_logical * scale;

  // --- Render Helpers ---

  const renderObject = (type: 'A' | 'B', screenX: number, name: string, speed: number, isTrain: boolean, isBridge: boolean, color: string) => {
    if (isBridge) {
        return (
            <g transform={`translate(${screenX}, ${centerY + 20})`}>
                <rect x="0" y="-10" width={bridgeLength} height="20" fill="#9ca3af" stroke="#4b5563" strokeWidth="2" />
                <line x1="0" y1="-10" x2="0" y2="-25" stroke="#4b5563" strokeWidth="2"/>
                <line x1={bridgeLength} y1="-10" x2={bridgeLength} y2="-25" stroke="#4b5563" strokeWidth="2"/>
                <text x={bridgeLength/2} y="40" textAnchor="middle" className="text-xs font-bold fill-gray-600">{name} ({params.initialDistance}m)</text>
            </g>
        );
    }
    
    if (isTrain) {
        const dirMultiplier = (type === 'B' && params.direction === 'OPPOSITE' && !isRoundTrip) ? 1 : -1; 
        
        return (
            <g transform={`translate(${screenX}, ${centerY})`}>
                <rect x={dirMultiplier === -1 ? -trainLength : 0} y="-15" width={trainLength} height="30" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="2" rx="4" />
                {/* Wheels */}
                <circle cx={dirMultiplier === -1 ? -10 : 10} cy="15" r="5" fill="#333" />
                <circle cx={dirMultiplier === -1 ? -trainLength + 10 : trainLength - 10} cy="15" r="5" fill="#333" />
                
                <text x={dirMultiplier === -1 ? -trainLength/2 : trainLength/2} y="-25" textAnchor="middle" className="text-sm font-bold font-sans" fill={color}>{name}</text>
                <text x={dirMultiplier === -1 ? -trainLength/2 : trainLength/2} y="35" textAnchor="middle" className="text-xs fill-gray-500">v={speed}</text>
            </g>
        );
    }

    // Default Point / Person / Car
    // Determine visual arrow direction.
    // If RoundTrip, we need to deduce direction from previous/next frame or logic.
    // Simplified: If pos increasing, arrow right.
    // We can infer from current cycle logic if we really wanted, but static arrow is safer for now or simple logic.
    // Let's show arrow based on 'intended' motion or simple Right/Left.
    
    let arrowDir = 1;
    if (type === 'B' && params.direction === 'OPPOSITE' && !isRoundTrip) arrowDir = -1;
    
    return (
        <g transform={`translate(${screenX}, ${centerY})`}>
            {/* Object Body */}
            <circle r={pointRadius} fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" />
            <circle r="4" fill={color} />
            
            {/* Label Above */}
            <text y="-25" textAnchor="middle" className="text-lg font-bold font-sans" fill={color}>{name}</text>
            
            {/* Speed Below */}
            <text y="30" textAnchor="middle" className="text-xs font-mono fill-gray-500 font-bold">v={speed}</text>
            
            {/* Velocity Vector Arrow */}
            {speed > 0 && (
                <g transform={`translate(0, 45)`}>
                    <line 
                        x1="0" y1="0" 
                        x2={30 * arrowDir} y2="0" 
                        stroke={color} strokeWidth="2" markerEnd={`url(#arrow-${type})`} 
                    />
                </g>
            )}
        </g>
    );
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-white/50 select-none">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full drop-shadow-xl rounded-xl bg-white border border-gray-100">
        
        {/* Definitions for Markers */}
        <defs>
            <marker id="arrow-A" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
            </marker>
            <marker id="arrow-B" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
            </marker>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
            </pattern>
        </defs>

        {/* Background Grid */}
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* 1. Info HUD Panel (Top Left) */}
        <g transform="translate(20, 20)">
            <rect width="280" height="160" rx="8" fill="white" stroke="#e5e7eb" strokeWidth="1" className="drop-shadow-md" />
            <rect width="280" height="4" rx="0" fill="#4f46e5" /> {/* Top accent bar */}
            
            <text x="20" y="35" className="text-sm font-bold fill-gray-800">题目信息面板</text>
            
            <g transform="translate(20, 65)">
                {/* Object A Info */}
                <circle r="4" fill="#3b82f6" />
                <text x="15" y="4" className="text-xs font-bold fill-gray-700">{params.objectAName}</text>
                <text x="100" y="4" className="text-xs font-mono fill-gray-500">速度: {params.speedA}</text>

                {/* Object B Info */}
                <g transform="translate(0, 25)">
                    <circle r="4" fill="#ef4444" />
                    <text x="15" y="4" className="text-xs font-bold fill-gray-700">{params.objectBName}</text>
                    <text x="100" y="4" className="text-xs font-mono fill-gray-500">速度: {params.speedB}</text>
                </g>

                {/* Global Info */}
                <g transform="translate(0, 55)">
                    <text x="0" y="0" className="text-xs font-bold fill-gray-500">初始距离:</text>
                    <text x="60" y="0" className="text-xs font-mono font-bold fill-indigo-600">{params.initialDistance}</text>
                    
                    <text x="130" y="0" className="text-xs font-bold fill-gray-500">类型:</text>
                    <text x="165" y="0" className="text-xs font-mono font-bold fill-indigo-600">
                        {isRoundTrip ? '往返/多次相遇' : (params.direction === 'OPPOSITE' ? '相向而行' : '同向追及')}
                    </text>
                </g>
            </g>
        </g>

        {/* 2. Track Visuals */}
        {/* Main Ground Line */}
        <line 
            x1={paddingX - 50} y1={centerY + pointRadius + 5} 
            x2={width - paddingX + 50} y2={centerY + pointRadius + 5} 
            stroke="#e5e7eb" strokeWidth="4" strokeLinecap="round" 
        />

        {/* Boundary Walls for Round Trip */}
        {isRoundTrip && (
            <>
                <line x1={paddingX} y1={centerY - 20} x2={paddingX} y2={centerY + 40} stroke="#94a3b8" strokeWidth="4" />
                <text x={paddingX} y={centerY - 30} textAnchor="middle" className="text-xs font-bold fill-gray-400">起点 A</text>
                
                <line x1={width - paddingX} y1={centerY - 20} x2={width - paddingX} y2={centerY + 40} stroke="#94a3b8" strokeWidth="4" />
                <text x={width - paddingX} y={centerY - 30} textAnchor="middle" className="text-xs font-bold fill-gray-400">终点 B</text>
            </>
        )}
        
        {/* River Effect if needed */}
        {isBoat && (
            <rect x={paddingX - 50} y={centerY + 20} width={width - paddingX * 2 + 100} height="40" fill="#e0f2fe" rx="4" />
        )}

        {/* 3. Render Objects */}
        {renderObject('B', screenX_B, params.objectBName, params.speedB, isTrainB, isBridgeB, '#ef4444')}
        {renderObject('A', screenX_A, params.objectAName, params.speedA, isTrainA, isBridgeA, '#3b82f6')}


        {/* 4. Dynamic Distance Markers */}
        <g transform={`translate(0, ${centerY - 80})`}>
            {/* Only draw line if they are somewhat apart to avoid clutter */}
            {Math.abs(screenX_A - screenX_B) > 40 && (
                <>
                <line 
                    x1={screenX_A} y1="0" 
                    x2={screenX_B} y2="0" 
                    stroke="#9ca3af" strokeWidth="1" strokeDasharray="4 4" 
                />
                <line x1={screenX_A} y1="-5" x2={screenX_A} y2="5" stroke="#9ca3af" strokeWidth="2" />
                <line x1={screenX_B} y1="-5" x2={screenX_B} y2="5" stroke="#9ca3af" strokeWidth="2" />
                
                <rect x={(screenX_A + screenX_B)/2 - 30} y="-10" width="60" height="20" fill="white" rx="4" fillOpacity="0.9" />
                <text x={(screenX_A + screenX_B)/2} y="4" textAnchor="middle" className="text-xs font-mono fill-gray-600 font-bold">
                    d = {Math.abs(posB_logical - posA_logical).toFixed(0)}
                </text>
                </>
            )}
        </g>

        {/* 5. Title in Bottom Right */}
        <text x={width - 20} y={height - 20} textAnchor="end" className="text-2xl font-bold fill-gray-100 select-none">{problem.title}</text>

      </svg>
    </div>
  );
};
