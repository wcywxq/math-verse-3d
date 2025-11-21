import React, { useState, useEffect } from 'react';
import { Book, ChevronRight, FileText, Layers, PanelLeft } from 'lucide-react';
import { HELLO_ALGO_CONTENT } from '../../data/knowledge';
import { LatexText } from '../common/LatexText';

export const KnowledgeBase: React.FC = () => {
  const [activeChapterId, setActiveChapterId] = useState(HELLO_ALGO_CONTENT[0].id);
  const [activeSectionId, setActiveSectionId] = useState(HELLO_ALGO_CONTENT[0].sections[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Handle screen resize for responsive defaults
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Auto-close sidebar on mobile init, open on desktop
      if (mobile) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSectionClick = (sectionId: string) => {
    setActiveSectionId(sectionId);
    if (isMobile) setIsSidebarOpen(false); // Auto close on mobile after selection
  };

  // Find current section content
  const currentChapter = HELLO_ALGO_CONTENT.find(c => c.id === activeChapterId);
  const currentSection = currentChapter?.sections.find(s => s.id === activeSectionId);

  return (
    <div className="flex h-full bg-white w-full relative overflow-hidden">
      
      {/* Mobile Backdrop Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="absolute inset-0 bg-black/30 z-20 backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`
            flex-shrink-0 bg-white border-r border-gray-200 flex flex-col h-full
            transition-all duration-300 ease-in-out z-30
            ${isMobile 
                ? `absolute inset-y-0 left-0 shadow-2xl w-72 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`
                : `relative ${isSidebarOpen ? 'w-72 translate-x-0' : 'w-0 overflow-hidden border-none'}`
            }
        `}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between w-72">
            <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wider flex items-center gap-2">
                <Book size={16} />
                Hello Algo 知识库
            </h2>
            {isMobile && (
                <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <PanelLeft size={18} />
                </button>
            )}
        </div>
        
        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 w-72">
            {HELLO_ALGO_CONTENT.map((chapter) => (
                <div key={chapter.id} className="mb-2">
                    <button 
                        onClick={() => setActiveChapterId(chapter.id)}
                        className={`w-full text-left px-3 py-2 text-sm font-bold rounded-md flex items-center justify-between transition-colors ${
                            activeChapterId === chapter.id ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        <span className="flex items-center gap-2">
                            <Layers size={14} className="opacity-70" />
                            {chapter.title}
                        </span>
                        <ChevronRight size={14} className={`transform transition-transform ${activeChapterId === chapter.id ? 'rotate-90' : ''}`} />
                    </button>

                    {/* Sections Expansion */}
                    {activeChapterId === chapter.id && (
                        <div className="mt-1 ml-2 pl-2 border-l-2 border-indigo-100 space-y-0.5">
                            {chapter.sections.map(section => (
                                <button
                                    key={section.id}
                                    onClick={() => handleSectionClick(section.id)}
                                    className={`w-full text-left px-3 py-2 md:py-1.5 text-xs md:text-sm rounded-md transition-colors flex items-center gap-2 ${
                                        activeSectionId === section.id 
                                        ? 'bg-white text-indigo-600 shadow-sm border border-gray-100 font-medium' 
                                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'
                                    }`}
                                >
                                    <FileText size={12} className={activeSectionId === section.id ? 'text-indigo-500' : 'text-gray-300'} />
                                    <span className="truncate">{section.title}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 h-full overflow-y-auto bg-white relative w-full transition-all">
        {currentSection ? (
            <div className="max-w-4xl mx-auto px-4 py-6 md:px-8 md:py-10 min-h-full flex flex-col">
                {/* Breadcrumb & Toggle */}
                <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4 sticky top-0 bg-white/95 backdrop-blur z-10 md:static md:bg-transparent md:border-none md:pb-0">
                    {!isSidebarOpen && (
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-1.5 -ml-2 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
                            title="打开目录"
                        >
                            <PanelLeft size={20} />
                        </button>
                    )}
                    
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono overflow-hidden">
                        <span className="flex-shrink-0">Hello Algo</span>
                        <ChevronRight size={10} className="flex-shrink-0" />
                        <span className="truncate">{currentChapter?.title}</span>
                        <ChevronRight size={10} className="flex-shrink-0" />
                        <span className="text-indigo-600 font-medium truncate">{currentSection.title}</span>
                    </div>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100 leading-tight">
                    {currentSection.title}
                </h1>

                <div className="prose prose-indigo prose-sm md:prose-base max-w-none text-gray-700 leading-relaxed space-y-4 md:space-y-6 flex-1">
                    {currentSection.content.split('\n').map((line, idx) => {
                        const trimmed = line.trim();
                        if (!trimmed) return <br key={idx} />;
                        
                        if (trimmed.startsWith('### ')) {
                            return <h3 key={idx} className="text-lg md:text-xl font-bold text-gray-800 mt-6 mb-2">{trimmed.replace('### ', '')}</h3>;
                        }
                        if (trimmed.startsWith('1. ') || trimmed.startsWith('2. ') || trimmed.startsWith('3. ')) {
                            return (
                                <div key={idx} className="ml-4 text-sm md:text-base text-gray-700 mb-1">
                                    <LatexText text={trimmed} />
                                </div>
                            );
                        }
                        if (trimmed.startsWith('- ')) {
                            return (
                                <div key={idx} className="flex items-start gap-2 ml-4 mb-1">
                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                                    <span className="text-sm md:text-base text-gray-700"><LatexText text={trimmed.replace('- ', '')} /></span>
                                </div>
                            );
                        }
                        if (trimmed.startsWith('`') && trimmed.endsWith('`')) {
                             return <div key={idx} className="bg-gray-50 border border-gray-100 p-3 rounded-md font-mono text-xs md:text-sm text-indigo-900 my-2 overflow-x-auto">{trimmed.replace(/`/g, '')}</div>;
                        }

                        return <p key={idx} className="mb-2 text-sm md:text-base text-justify"><LatexText text={line} /></p>;
                    })}
                </div>

                {/* Footer */}
                <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between gap-2 text-xs text-gray-400">
                    <span>来源参考: Hello Algo (开源项目)</span>
                    <span>MathVerse 知识库模块 v1.0</span>
                </div>
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 p-4 text-center">
                <Book size={48} className="mb-4 opacity-20" />
                <p className="text-sm">请点击左侧菜单选择章节阅读</p>
                {!isSidebarOpen && (
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium"
                    >
                        打开目录
                    </button>
                )}
            </div>
        )}
      </div>
    </div>
  );
};