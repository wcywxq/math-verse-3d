import React, { useState, useEffect } from 'react';
import { ProblemData, SceneType } from '../types';
import { Scene2D } from './scenes/Scene2D';
import { Play, Pause, RotateCcw, Maximize } from 'lucide-react';

interface Props {
  problem: ProblemData;
}

export const Visualizer3D: React.FC<Props> = ({ problem }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

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

      // Base duration: 10 seconds for the full simulation
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

  // Only show controls if we have valid movement parameters
  const hasControls = problem.type === SceneType.MOVEMENT && !!problem.movementParams;

  return (
    <div className="relative w-full h-full bg-slate-50 overflow-hidden flex flex-col border-l border-gray-200">
      
      {/* Header Label */}
      <div className="absolute top-4 left-4 z-20 bg-white/80 backdrop-blur border border-gray-200 px-3 py-1.5 rounded-md shadow-sm">
         <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-2">
            <Maximize size={14} />
            2D 全景演示视图
         </h3>
      </div>

      {/* Main Visualization Area */}
      <div className="flex-1 w-full h-full flex items-center justify-center p-4 relative">
          <Scene2D problem={problem} progress={progress} />
      </div>

      {/* Playback Controls */}
      {hasControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 px-8 shadow-[0_-4px_20px_rgba(0,0,0,0.02)] z-30">
            <div className="max-w-3xl mx-auto flex flex-col gap-3">
                {/* Progress Bar & Time */}
                <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-gray-500 w-12 text-right">
                        {(progress * (problem.movementParams!.totalTime)).toFixed(1)}s
                    </span>
                    <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.001"
                        value={progress}
                        onChange={handleSeek}
                        className="flex-1 h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-700"
                    />
                    <span className="text-xs font-mono text-gray-400 w-12">
                        {problem.movementParams!.totalTime}s
                    </span>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-md active:scale-95"
                        >
                            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                        </button>
                        <button 
                            onClick={() => { setProgress(0); setIsPlaying(false); }}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all active:scale-95"
                            title="重置"
                        >
                            <RotateCcw size={18} />
                        </button>
                    </div>

                    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                        {[0.5, 1, 2, 5].map((speed) => (
                            <button
                                key={speed}
                                onClick={() => setSpeedMultiplier(speed)}
                                className={`px-3 py-1 text-xs font-bold rounded transition-all ${speedMultiplier === speed ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                {speed}x
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
