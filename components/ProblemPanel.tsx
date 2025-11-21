import React, { useState } from 'react';
import { ProblemData } from '../types';
import { ChevronDown, ChevronUp, Calculator, BookOpen, Lightbulb, Tag } from 'lucide-react';
import { LatexText } from './common/LatexText';

interface Props {
  problem: ProblemData;
}

export const ProblemPanel: React.FC<Props> = ({ problem }) => {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="h-full overflow-y-auto p-6 bg-white shadow-sm">
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="flex items-center gap-1.5 text-indigo-600 bg-indigo-50 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
                <BookOpen size={14} />
                <span>{problem.type === 'MOVEMENT' ? '行程问题' : '几何问题'}</span>
            </div>
            {problem.source && (
                <div className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-2 py-1 rounded text-xs font-bold">
                    <Tag size={14} />
                    <LatexText text={problem.source} />
                </div>
            )}
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-4">
            <LatexText text={problem.title} />
        </h1>
      </div>

      <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 mb-8 text-lg text-gray-800 leading-relaxed shadow-inner font-serif">
        <LatexText text={problem.question} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-amber-600 font-semibold">
             <Lightbulb size={20} />
             <span>核心解析思路</span>
        </div>
        <div className="text-gray-600 italic border-l-4 border-amber-400 pl-4 py-1 text-sm leading-relaxed">
            <LatexText text={problem.analysis} />
        </div>

        <button 
            onClick={() => setShowSolution(!showSolution)}
            className="w-full mt-4 flex items-center justify-between px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-md active:transform active:scale-[0.99]"
        >
            <span className="flex items-center gap-2 font-medium">
                <Calculator size={18} />
                {showSolution ? '隐藏详细步骤' : '查看详细步骤 & 答案'}
            </span>
            {showSolution ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {showSolution && (
            <div className="mt-4 space-y-4 animate-fade-in">
                <div className="space-y-3">
                    {problem.solutionSteps.map((step, idx) => (
                        <div key={idx} className="flex gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold mt-0.5">
                                {idx + 1}
                            </div>
                            <p className="text-gray-700">
                                <LatexText text={step} />
                            </p>
                        </div>
                    ))}
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200 text-center">
                    <span className="text-sm text-green-600 font-medium uppercase">最终答案</span>
                    <div className="text-2xl font-bold text-green-800 mt-1">
                        <LatexText text={problem.answer} />
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};