import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ProblemData, SceneType } from '../types';
import { Scroll, Search, Inbox, FileText, ChevronLeft, ChevronRight, Award, PenTool, Tag, X, Filter, Check } from 'lucide-react';
import { HighlightText } from './common/HighlightText';

interface Props {
  problems: ProblemData[];
  currentId: string;
  onSelect: (problem: ProblemData) => void;
}

// Define available tags and their matching logic
const TAG_FILTERS = [
  { label: '行程问题', key: 'movement', match: (p: ProblemData) => p.type === SceneType.MOVEMENT },
  { label: '几何问题', key: 'geometry', match: (p: ProblemData) => p.type === SceneType.GEOMETRY },
  { label: '工程问题', key: 'work', match: (p: ProblemData) => p.type === SceneType.WORK },
  { label: '利润/经济', key: 'profit', match: (p: ProblemData) => /利润|成本|经济|打折/.test(p.title + p.question + p.analysis) },
  { label: '相遇问题', key: 'meet', match: (p: ProblemData) => /相遇/.test(p.title + p.question) },
  { label: '追及问题', key: 'chase', match: (p: ProblemData) => /追/.test(p.title + p.question) },
  { label: '流水行船', key: 'boat', match: (p: ProblemData) => /流水|船|漂流/.test(p.title + p.question) },
];

export const ProblemList: React.FC<Props> = ({ problems, currentId, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<'all' | 'real' | 'mock'>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeTab, selectedTags]);

  const toggleTag = (key: string) => {
    setSelectedTags(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const filteredProblems = useMemo(() => {
    let result = problems;

    // 1. Filter by Source Category (Tab)
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

    // 2. Filter by Tags (OR Logic - Match any selected tag)
    if (selectedTags.length > 0) {
        result = result.filter(p => {
            return selectedTags.some(tagKey => {
                const filter = TAG_FILTERS.find(f => f.key === tagKey);
                return filter ? filter.match(p) : false;
            });
        });
    }

    // 3. Filter by Search Term
    if (!searchTerm.trim()) return result;
    
    const lowerTerm = searchTerm.toLowerCase();
    return result.filter(problem => {
        const matchTitle = problem.title.toLowerCase().includes(lowerTerm);
        const matchSource = problem.source?.toLowerCase().includes(lowerTerm) || false;
        const matchQuestion = problem.question.toLowerCase().includes(lowerTerm);
        const matchType = (problem.type === SceneType.MOVEMENT ? '行程' : '几何').includes(lowerTerm);
        
        return matchTitle || matchSource || matchQuestion || matchType;
    });
  }, [problems, searchTerm, activeTab, selectedTags]);

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
      <div className="p-4 border-b border-gray-100 bg-gray-50 space-y-3 relative z-20">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
          <Scroll size={16} />
          题库列表 (2020-2025)
        </h2>
        
        {/* Search Bar & Filter Dropdown */}
        <div className="relative">
            <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
            <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索题目内容..." 
                className="w-full pl-9 pr-16 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder-gray-400"
            />
            
            {/* Right side actions inside search bar */}
            <div className="absolute right-1.5 top-1.5 flex items-center gap-1">
                {searchTerm && (
                    <button 
                        onClick={() => setSearchTerm('')}
                        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={14} />
                    </button>
                )}
                <div className="h-4 w-[1px] bg-gray-200 mx-0.5"></div>
                <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className={`p-1 rounded-md transition-all flex items-center gap-1 ${
                        isFilterOpen || selectedTags.length > 0 
                        ? 'text-indigo-600 bg-indigo-50' 
                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                    }`}
                    title="筛选标签"
                >
                    <Filter size={14} />
                </button>
            </div>

            {/* Dropdown Menu */}
            {isFilterOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 shadow-xl rounded-lg p-1.5 z-50 animate-fade-in">
                    <div className="text-[10px] font-bold text-gray-400 px-2 py-1 mb-1 uppercase tracking-wider">
                        选择标签 ({selectedTags.length})
                    </div>
                    <div className="max-h-60 overflow-y-auto space-y-0.5">
                        {TAG_FILTERS.map(tag => {
                            const isSelected = selectedTags.includes(tag.key);
                            return (
                                <button
                                    key={tag.key}
                                    onClick={() => toggleTag(tag.key)}
                                    className={`w-full flex items-center justify-between px-2 py-1.5 text-xs rounded-md transition-colors ${
                                        isSelected 
                                        ? 'bg-indigo-50 text-indigo-700 font-medium' 
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <span>{tag.label}</span>
                                    {isSelected && <Check size={12} className="text-indigo-600" />}
                                </button>
                            );
                        })}
                    </div>
                    {selectedTags.length > 0 && (
                        <button 
                            onClick={() => setSelectedTags([])}
                            className="w-full mt-1.5 pt-1.5 border-t border-gray-100 text-center text-xs text-red-500 hover:text-red-600 py-1 hover:bg-red-50 rounded-b-md transition-colors"
                        >
                            清除所有筛选
                        </button>
                    )}
                </div>
            )}
        </div>

        {/* Selected Tags Chips */}
        {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 animate-fade-in">
                {selectedTags.map(tagKey => {
                    const tag = TAG_FILTERS.find(t => t.key === tagKey);
                    if (!tag) return null;
                    return (
                        <span 
                            key={tagKey} 
                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-100 text-indigo-700 border border-indigo-200 text-[10px] font-medium rounded-full"
                        >
                            {tag.label}
                            <button 
                                onClick={() => toggleTag(tagKey)}
                                className="hover:text-indigo-900 focus:outline-none"
                            >
                                <X size={10} />
                            </button>
                        </span>
                    );
                })}
            </div>
        )}

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

      {/* Problem List */}
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
                    {selectedTags.length > 0 ? '请尝试减少选中的标签' : '尝试更换关键词或重置筛选'}
                </p>
            </div>
        )}
      </div>
      
      {/* Pagination Controls */}
      <div className="p-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between flex-shrink-0">
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