import React from 'react';
import { MovementParams, GeometryParams, SceneType, ProblemData } from '../../types';

interface Props {
  problem: ProblemData;
  progress: number;
}

export const Scene2D: React.FC<Props> = ({ problem, progress }) => {
  const width = 800;
  const height = 400;
  const padding = 50;

  if (problem.type === SceneType.MOVEMENT && problem.movementParams) {
    const params = problem.movementParams;
    const totalDistance = Math.max(params.initialDistance, (params.speedA + params.speedB) * params.totalTime * 1.2);
    const scale = (width - padding * 2) / totalDistance;

    // Calculate positions (0 start)
    const currentTime = progress * params.totalTime;
    
    // Default: Opposite direction meeting model
    // A starts at 0, moves Right. B starts at Distance, moves Left.
    let posA = params.speedA * currentTime * scale;
    let posB = (params.initialDistance - params.speedB * currentTime) * scale;
    
    let startXA = padding;
    let startXB = padding + params.initialDistance * scale;

    // Adjust for "SAME" direction (Chasing)
    // A starts at 0, moves Right. B starts at InitialDistance, moves Right.
    if (params.direction === 'SAME') {
       posA = params.speedA * currentTime * scale;
       posB = (params.initialDistance + params.speedB * currentTime) * scale;
       startXB = padding + params.initialDistance * scale;
    }

    return (
      <div className="w-full h-full flex items-center justify-center bg-white rounded-lg shadow-inner overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full max-w-4xl select-none">
            {/* Grid/Background */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Title */}
            <text x={width/2} y={40} textAnchor="middle" className="text-lg font-bold fill-gray-400 uppercase">2D 示意图</text>

            {/* Track Line */}
            <line 
                x1={padding} y1={height/2} 
                x2={width - padding} y2={height/2} 
                stroke="#e5e7eb" strokeWidth="4" strokeLinecap="round" 
            />
            
            {/* Start/End Markers */}
            <line x1={padding} y1={height/2 - 10} x2={padding} y2={height/2 + 10} stroke="#9ca3af" strokeWidth="2" />
            <text x={padding} y={height/2 + 30} textAnchor="middle" className="text-xs fill-gray-500">0</text>

            {/* Object A */}
            <g transform={`translate(${startXA + posA}, ${height/2})`}>
                <circle r="15" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
                <circle r="4" fill="#3b82f6" />
                <text y="-25" textAnchor="middle" className="text-sm font-bold fill-blue-600">{params.objectAName}</text>
                <text y="35" textAnchor="middle" className="text-xs fill-gray-500">v={params.speedA}</text>
            </g>

            {/* Object B */}
            <g transform={`translate(${params.direction === 'OPPOSITE' ? padding + posB : padding + posB}, ${height/2})`}>
                <circle r="15" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="2" />
                <circle r="4" fill="#ef4444" />
                <text y="-25" textAnchor="middle" className="text-sm font-bold fill-red-600">{params.objectBName}</text>
                <text y="35" textAnchor="middle" className="text-xs fill-gray-500">v={params.speedB}</text>
            </g>

            {/* Distance Marker if Opposite */}
            {params.direction === 'OPPOSITE' && progress === 0 && (
                <g>
                    <line x1={padding} y1={height/2 - 40} x2={startXB} y2={height/2 - 40} stroke="#9ca3af" strokeWidth="1" strokeDasharray="4 4" />
                    <rect x={width/2 - 40} y={height/2 - 50} width="80" height="20" fill="white" />
                    <text x={width/2} y={height/2 - 36} textAnchor="middle" className="text-xs fill-gray-500">距离: {params.initialDistance}</text>
                </g>
            )}
        </svg>
      </div>
    );
  }

  if (problem.type === SceneType.GEOMETRY && problem.geometryParams) {
    const params = problem.geometryParams;
    
    return (
        <div className="w-full h-full flex items-center justify-center bg-white rounded-lg shadow-inner">
           <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full max-w-2xl">
             <text x={width/2} y={40} textAnchor="middle" className="text-lg font-bold fill-gray-400 uppercase">2D 剖面图 / 展开图</text>
             
             <g transform={`translate(${width/2}, ${height/2})`}>
                {params.shape === 'CUBE' && (
                    <g>
                        <rect x="-100" y="-100" width="200" height="200" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="3" />
                        <text y="0" textAnchor="middle" className="text-xl font-bold fill-indigo-900">正方形 (面)</text>
                        <text y="25" textAnchor="middle" className="text-sm fill-indigo-700">边长: {params.dimensionA}</text>
                    </g>
                )}
                {params.shape === 'SPHERE' && (
                    <g>
                        <circle r="100" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="3" />
                         <line x1="0" y1="0" x2="100" y2="0" stroke="#4f46e5" strokeWidth="2" strokeDasharray="4 4" />
                        <text y="0" textAnchor="middle" className="text-xl font-bold fill-indigo-900">圆形 (剖面)</text>
                        <text x="50" y="-10" textAnchor="middle" className="text-sm fill-indigo-700">r: {params.dimensionA}</text>
                    </g>
                )}
                {params.shape === 'CYLINDER' && (
                    <g>
                        <rect x="-60" y="-100" width="120" height="200" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="3" />
                         <line x1="0" y1="-120" x2="0" y2="120" stroke="#4f46e5" strokeWidth="1" strokeDasharray="5 5" opacity="0.5" />
                        <text y="140" textAnchor="middle" className="text-xl font-bold fill-indigo-900">矩形 (轴截面)</text>
                        <text x="80" y="0" className="text-sm fill-indigo-700">h: {params.dimensionB}</text>
                        <text x="0" y="115" className="text-sm fill-indigo-700">r: {params.dimensionA}</text>
                    </g>
                )}
             </g>
           </svg>
        </div>
    );
  }

  return <div>No 2D View Available</div>;
};