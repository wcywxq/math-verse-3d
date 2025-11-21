import React, { useState } from 'react';
import { ProblemPanel } from './components/ProblemPanel';
import { Visualizer3D } from './components/Visualizer3D';
import { ProblemList } from './components/ProblemList';
import { Header } from './components/layout/Header';
import { KnowledgeBase } from './components/knowledge/KnowledgeBase';
import { generateMathProblem } from './services/geminiService';
import { PRESET_PROBLEMS } from './data/presets';
import { ProblemData, SceneType, AppModule } from './types';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<AppModule>('PRACTICE');
  const [currentProblem, setCurrentProblem] = useState<ProblemData>(PRESET_PROBLEMS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTopic, setLoadingTopic] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleGenerate = async (topic: string) => {
    setIsLoading(true);
    setLoadingTopic(topic);
    setIsMobileMenuOpen(false); 
    
    try {
      const problem = await generateMathProblem(topic);
      problem.source = "AI 实时生成 (Gemini 2.5 Flash)"; 
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
  const hasVisuals = (
    (currentProblem.type === SceneType.MOVEMENT && !!currentProblem.movementParams) || 
    (currentProblem.type === SceneType.GEOMETRY && !!currentProblem.geometryParams)
  );

  const showRightPanel = hasVisuals || isLoading;

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans text-gray-900 overflow-hidden">
      <Header 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isLoading={isLoading}
        onGenerate={handleGenerate}
        currentModule={currentModule}
        onModuleChange={setCurrentModule}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden relative">
        
        {currentModule === 'PRACTICE' ? (
            <>
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
            </>
        ) : (
            /* Knowledge Base Module */
            <div className="w-full h-full overflow-hidden">
                <KnowledgeBase />
            </div>
        )}
      </main>
    </div>
  );
};

export default App;