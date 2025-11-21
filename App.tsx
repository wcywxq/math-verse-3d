import React, { useState } from 'react';
import { ProblemPanel } from './components/ProblemPanel';
import { Visualizer3D } from './components/Visualizer3D'; // Now essentially 2D Panel
import { ProblemList } from './components/ProblemList';
import { generateMathProblem } from './services/geminiService';
import { PRESET_PROBLEMS } from './data/presets';
import { ProblemData, SceneType } from './types';
import { Box, Loader2, Menu, X } from 'lucide-react';

const App: React.FC = () => {
  // Default to the first preset problem
  const [currentProblem, setCurrentProblem] = useState<ProblemData>(PRESET_PROBLEMS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTopic, setLoadingTopic] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleGenerate = async (topic: string) => {
    setIsLoading(true);
    setLoadingTopic(topic);
    // Close menu on mobile if open
    setIsMobileMenuOpen(false); 
    
    try {
      const problem = await generateMathProblem(topic);
      problem.source = "AI 实时生成 (Gemini 2.5 Flash)"; // Add a dynamic source tag
      setCurrentProblem(problem);
    } catch (error) {
      alert("生成题目失败，请重试 (Failed to generate problem. Please check API Key or try again).");
    } finally {
      setIsLoading(false);
      setLoadingTopic("");
    }
  };

  const handleSelectPreset = (problem: ProblemData) => {
      setCurrentProblem(problem);
      setIsMobileMenuOpen(false);
  };

  // Check if the current problem has the necessary parameters for visualization
  // Note: We strictly focus on MOVEMENT now as Geometry 2D is less prioritized but still works if data exists.
  const hasVisuals = (
    (currentProblem.type === SceneType.MOVEMENT && !!currentProblem.movementParams) || 
    (currentProblem.type === SceneType.GEOMETRY && !!currentProblem.geometryParams)
  );

  // We show the right panel if there are visuals OR if we are loading (to show the loader overlay)
  const showRightPanel = hasVisuals || isLoading;

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans text-gray-900 overflow-hidden">
      {/* Header */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 flex-shrink-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
           {/* Mobile Menu Toggle */}
           <button 
              className="md:hidden text-gray-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
           >
               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
           </button>

          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <Box size={18} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-gray-900">MathVerse 2D</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
             <button 
                onClick={() => handleGenerate("公考数量关系，行程问题")}
                disabled={isLoading}
                className="hidden md:flex items-center px-3 py-1.5 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors"
             >
                ✨ AI 生成新题目
             </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden relative">
        
        {/* Sidebar (Desktop: Static, Mobile: Absolute Overlay) */}
        <div className={`
            fixed inset-y-0 left-0 z-20 transform transition-transform duration-300 ease-in-out bg-white md:translate-x-0 md:static md:inset-auto
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
           <ProblemList 
              problems={PRESET_PROBLEMS}
              currentId={currentProblem.id}
              onSelect={handleSelectPreset}
           />
        </div>

        {/* Right Panel: Problem Details & Visuals */}
        <div className="flex-1 flex flex-col md:flex-row relative transition-all duration-300 ease-in-out">
            
            {/* Detail Panel */}
            <div className={`
                flex-1 h-full overflow-hidden transition-all duration-500
                ${showRightPanel ? 'w-full md:w-1/3 lg:w-5/12 border-r border-gray-200' : 'w-full'}
            `}>
                <div className="h-full overflow-y-auto">
                    <ProblemPanel problem={currentProblem} />
                </div>
            </div>

            {/* Visual Panel (Conditional) */}
            {showRightPanel && (
                <div className="flex-1 h-full bg-slate-50 relative animate-fade-in">
                     {isLoading && (
                        <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center text-indigo-600">
                            <Loader2 size={40} className="animate-spin mb-4" />
                            <p className="font-medium">正在生成题目...</p>
                            <p className="text-sm text-gray-500 mt-2">主题: {loadingTopic}</p>
                        </div>
                     )}
                     <Visualizer3D problem={currentProblem} />
                </div>
            )}

        </div>
      </main>
    </div>
  );
};

export default App;