import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { SceneType, ProblemData } from '../types';
import { MovementScene } from './scenes/MovementScene';
import { GeometryScene } from './scenes/GeometryScene';
import { Scene2D } from './scenes/Scene2D';
import { Play, Pause, RotateCcw, Maximize, Box, LayoutTemplate } from 'lucide-react';

interface Props {
  problem: ProblemData;
}

export const Visualizer3D: React.FC<Props> = ({ problem }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [viewMode, setViewMode] = useState<'3D' | '2D'>('3D');

  // Reset when problem changes
  useEffect(() => {
    setProgress(0);
    setIsPlaying(false);
  }, [problem.id]);

  // Animation loop logic
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      if (!isPlaying) {
        lastTime = time;
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const delta = (time - lastTime) / 1000; // seconds
      lastTime = time;

      // If movement problem, progress is time / totalTime
      // Let's say the total animation cycle takes 10 real seconds by default for full progress
      const animationDuration = 10 / speedMultiplier; 
      
      setProgress((prev) => {
        const next = prev + delta / animationDuration;
        if (next >= 1) {
            setIsPlaying(false);
            return 1;
        }
        return next;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, speedMultiplier]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(parseFloat(e.target.value));
    setIsPlaying(false);
  };

  const render3DScene = () => {
    if (problem.type === SceneType.MOVEMENT && problem.movementParams) {
      return (
        <MovementScene 
            params={problem.movementParams} 
            progress={progress} 
            isPlaying={isPlaying} 
        />
      );
    }
    if (problem.type === SceneType.GEOMETRY && problem.geometryParams) {
      return <GeometryScene params={problem.geometryParams} />;
    }
    return null;
  };

  // Helper to check if we have valid movement params to show controls
  const hasMovementParams = problem.type === SceneType.MOVEMENT && !!problem.movementParams;
  // Helper to check if we have valid geometry params for legend
  const hasGeometryParams = problem.type === SceneType.GEOMETRY && !!problem.geometryParams;

  return (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden flex flex-col">
      {/* View Mode Toggle */}
      <div className="absolute top-4 right-4 z-20 flex bg-white/10 backdrop-blur-md rounded-lg p-1 border border-white/20">
         <button 
            onClick={() => setViewMode('3D')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-colors ${viewMode === '3D' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-300 hover:bg-white/10'}`}
         >
            <Box size={14} /> 3D 视图
         </button>
         <button 
            onClick={() => setViewMode('2D')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-colors ${viewMode === '2D' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-300 hover:bg-white/10'}`}
         >
            <LayoutTemplate size={14} /> 2D 平面
         </button>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 relative h-full w-full">
        {viewMode === '3D' ? (
            <Suspense fallback={<div className="flex items-center justify-center h-full text-white">Loading 3D Model...</div>}>
                <Canvas shadows camera={{ position: [0, 5, 12], fov: 50 }}>
                    {render3DScene()}
                </Canvas>
            </Suspense>
        ) : (
            <div className="w-full h-full bg-slate-100 p-4 flex items-center justify-center">
                 <Scene2D problem={problem} progress={progress} />
            </div>
        )}

        {/* Overlay Controls for Movement (Shared for both 3D and 2D) */}
        {hasMovementParams && (
            <div className="absolute bottom-6 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-2xl flex flex-col gap-2 z-10 max-w-2xl mx-auto">
                <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
                    <span>T = {(progress * (problem.movementParams!.totalTime)).toFixed(1)}s</span>
                    <span>Total: {problem.movementParams!.totalTime}s</span>
                </div>
                
                <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.001"
                    value={progress}
                    onChange={handleSeek}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />

                <div className="flex items-center justify-between mt-2">
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                        >
                            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
                        </button>
                        <button 
                            onClick={() => { setProgress(0); setIsPlaying(false); }}
                            className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                        >
                            <RotateCcw size={20} />
                        </button>
                    </div>

                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                        {[0.5, 1, 2].map((speed) => (
                            <button
                                key={speed}
                                onClick={() => setSpeedMultiplier(speed)}
                                className={`px-2 py-1 text-xs font-bold rounded ${speedMultiplier === speed ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}
                            >
                                {speed}x
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        )}
        
        {/* Legend for Geometry 3D only */}
        {hasGeometryParams && viewMode === '3D' && (
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg text-sm text-gray-700 font-medium flex items-center gap-2 pointer-events-none select-none">
                <Maximize size={16} />
                <span>拖动鼠标旋转视角 · 滚轮缩放</span>
             </div>
        )}
      </div>
    </div>
  );
};