import React, { useState, useMemo, useEffect } from 'react';
import { ProblemData, SceneType } from '../types';
import { Scroll, Search, Inbox, FileText, ChevronLeft, ChevronRight, Award, PenTool } from 'lucide-react';
import { HighlightText } from './common/HighlightText';

interface Props {
  problems: ProblemData[];
  currentId: string;
  onSelect: (problem: ProblemData) => void;
}

export const ProblemList: React.FC<Props> = ({ problems, currentId, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<'all' | 'real' | 'mock'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Reset to page 1 when search or tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeTab]);

  const filteredProblems = useMemo(() => {
    let result = problems;

    // 1. Filter by Category (Tab)
    if (activeTab === 'real') {
        result = result.filter(p => {
            const source = p.source || '';
            return !source.includes('模考') && !source.includes('模拟');
        });
    } else if (activeTab === 'mock') {
        result = result.filter(p => {
            const source = p.source || '';
            return source.includes('模考') || source.includes('模拟');
        });
    }

    // 2. Filter by Search Term
    if (!searchTerm.trim()) return result;
    
    const lowerTerm = searchTerm.toLowerCase();
    return result.filter(problem => {
        const matchTitle = problem.title.toLowerCase().includes(lowerTerm);
        const matchSource = problem.source?.toLowerCase().includes(lowerTerm) || false;
        const matchQuestion = problem.question.toLowerCase().includes(lowerTerm);
        const matchType = (problem.type === SceneType.MOVEMENT ? '行程' : '几何').includes(lowerTerm);
        
        return matchTitle || matchSource || matchQuestion || matchType;
    });
  }, [problems, searchTerm, activeTab]);

  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  
  const paginatedProblems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProblems.slice(start, start + itemsPerPage);
  }, [filteredProblems, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 w-80 flex-shrink-0">
      <div className="p-4 border-b border-gray-100 bg-gray-50 space-y-3">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
          <Scroll size={16} />
          题库列表 (2020-2025)
        </h2>
        
        {/* Search Bar */}
        <div className="relative">
            <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
            <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索..." 
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder-gray-400"
            />
        </div>

        {/* Category Tabs */}
        <div className="flex p-1 bg-gray-200/60 rounded-lg">
            <button 
                onClick={() => setActiveTab('all')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                    activeTab === 'all' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
            >
                全部
            </button>
            <button 
                onClick={() => setActiveTab('real')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-1 ${
                    activeTab === 'real' ? 'bg-white text-amber-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
            >
                <Award size={12} /> 真题
            </button>
            <button 
                onClick={() => setActiveTab('mock')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-1 ${
                    activeTab === 'mock' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
            >
                <PenTool size={12} /> 模考
            </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {paginatedProblems.length > 0 ? (
            paginatedProblems.map((problem) => (
            <button
                key={problem.id}
                onClick={() => onSelect(problem)}
                className={`w-full text-left p-4 border-b border-gray-50 hover:bg-gray-50 transition-all relative group ${
                currentId === problem.id ? 'bg-indigo-50/60' : 'bg-white'
                }`}
            >
                {currentId === problem.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600" />
                )}
                
                <div className="flex items-start justify-between mb-1.5">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-tight ${
                        problem.type === SceneType.MOVEMENT 
                        ? 'bg-blue-50 text-blue-600 border-blue-100' 
                        : (problem.type === SceneType.GEOMETRY 
                            ? 'bg-purple-50 text-purple-600 border-purple-100'
                            : 'bg-green-50 text-green-600 border-green-100')
                    }`}>
                        <HighlightText 
                          text={problem.type === SceneType.MOVEMENT ? '行程' : (problem.type === SceneType.GEOMETRY ? '几何' : '其他')} 
                          highlight={searchTerm} 
                        />
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono truncate max-w-[120px] text-right">
                       {problem.source ? (
                         <HighlightText text={problem.source} highlight={searchTerm} />
                       ) : ''}
                    </span>
                </div>

                <h3 className={`text-sm font-semibold mb-1.5 leading-snug ${
                    currentId === problem.id ? 'text-indigo-900' : 'text-gray-800 group-hover:text-indigo-700'
                }`}>
                    <HighlightText text={problem.title} highlight={searchTerm} />
                </h3>
                
                {/* Question Snippet */}
                <div className="flex items-start gap-1.5 text-gray-500 mt-1">
                   <FileText size={12} className="mt-0.5 flex-shrink-0 opacity-60" />
                   <p className="text-xs leading-relaxed line-clamp-2 opacity-80">
                       <HighlightText text={problem.question} highlight={searchTerm} />
                   </p>
                </div>

            </button>
            ))
        ) : (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400 px-6 text-center">
                <Inbox size={32} className="mb-2 opacity-50" />
                <p className="text-sm">未找到相关题目</p>
                <p className="text-xs mt-1">
                    {activeTab === 'mock' ? '当前分类下没有模考题目' : '尝试更换关键词或重置筛选'}
                </p>
            </div>
        )}
      </div>
      
      {/* Pagination Controls */}
      <div className="p-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <button 
                onClick={handlePrevPage} 
                disabled={currentPage === 1}
                className="p-1.5 rounded-md hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
                <ChevronLeft size={16} className="text-gray-600" />
            </button>
            
            <span className="text-xs font-medium text-gray-500">
                {filteredProblems.length > 0 ? `${currentPage} / ${totalPages}` : '0 / 0'}
            </span>

            <button 
                onClick={handleNextPage} 
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-1.5 rounded-md hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
                <ChevronRight size={16} className="text-gray-600" />
            </button>
      </div>
    </div>
  );
};