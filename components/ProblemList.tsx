import React, { useState, useMemo } from 'react';
import { ProblemData, SceneType } from '../types';
import { Scroll, Search, Inbox, FileText } from 'lucide-react';

interface Props {
  problems: ProblemData[];
  currentId: string;
  onSelect: (problem: ProblemData) => void;
}

// Utility to escape regex special characters
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Helper component to highlight matched text
const HighlightText: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
  if (!highlight.trim()) {
    return <>{text}</>;
  }

  // Create a regex that matches the highlight string case-insensitively
  const regex = new RegExp(`(${escapeRegExp(highlight)})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        // Check if this part matches the highlight (case-insensitive check)
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={index} className="text-red-700 bg-yellow-300 rounded-sm px-0.5 font-extrabold shadow-sm">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
};

export const ProblemList: React.FC<Props> = ({ problems, currentId, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProblems = useMemo(() => {
    if (!searchTerm.trim()) return problems;
    
    const lowerTerm = searchTerm.toLowerCase();
    return problems.filter(problem => {
        const matchTitle = problem.title.toLowerCase().includes(lowerTerm);
        const matchSource = problem.source?.toLowerCase().includes(lowerTerm) || false;
        const matchQuestion = problem.question.toLowerCase().includes(lowerTerm);
        const matchType = (problem.type === SceneType.MOVEMENT ? '行程' : '几何').includes(lowerTerm);
        
        return matchTitle || matchSource || matchQuestion || matchType;
    });
  }, [problems, searchTerm]);

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 w-80 flex-shrink-0">
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2 mb-3">
          <Scroll size={16} />
          真题题库 (2020-2025)
        </h2>
        <div className="relative">
            <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
            <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索题目、年份或类型..." 
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder-gray-400"
            />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredProblems.length > 0 ? (
            filteredProblems.map((problem) => (
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
                        : 'bg-purple-50 text-purple-600 border-purple-100'
                    }`}>
                        <HighlightText 
                          text={problem.type === SceneType.MOVEMENT ? '行程' : '几何'} 
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
                <p className="text-xs mt-1">尝试搜索 "行程", "2024", 或具体题干关键词</p>
            </div>
        )}
        
        {filteredProblems.length > 0 && (
            <div className="p-4 text-center border-t border-gray-50 mt-auto">
                <p className="text-[10px] text-gray-400 font-medium">
                   显示 {filteredProblems.length} 道 / 共 {problems.length} 道
                </p>
            </div>
        )}
      </div>
    </div>
  );
};