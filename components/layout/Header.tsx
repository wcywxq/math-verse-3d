import React from 'react';
import { Box, Menu, X, BookOpen, Grid } from 'lucide-react';
import { AppModule } from '../../types';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  isLoading: boolean;
  onGenerate: (topic: string) => void;
  currentModule: AppModule;
  onModuleChange: (module: AppModule) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen, 
  isLoading, 
  onGenerate,
  currentModule,
  onModuleChange
}) => {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 flex-shrink-0 z-30 shadow-sm relative">
      {/* Left: Brand & Mobile Toggle */}
      <div className="flex items-center gap-3 w-1/3">
         <button 
            className="md:hidden text-gray-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
         >
             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
         </button>

        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-indigo-200">
          <Box size={18} strokeWidth={2.5} />
        </div>
        <div className="hidden md:block">
          <h1 className="text-base font-bold tracking-tight text-gray-900">MathVerse</h1>
        </div>
      </div>

      {/* Center: Module Switcher - Slider Style */}
      <div className="flex-1 flex justify-center">
        <div className="relative flex p-1 bg-gray-100 rounded-xl shadow-inner isolate">
            {/* Animated Slider Background */}
            <div 
                className={`absolute top-1 bottom-1 w-28 bg-white rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.1)] ring-1 ring-black/5 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] -z-10 ${
                    currentModule === 'PRACTICE' ? 'left-1 translate-x-0' : 'left-1 translate-x-full'
                }`}
            />

            <button
                onClick={() => onModuleChange('PRACTICE')}
                className={`relative z-10 flex items-center justify-center gap-2 w-28 py-1.5 text-xs font-bold rounded-lg transition-colors duration-300 ${
                    currentModule === 'PRACTICE' 
                    ? 'text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
            >
                <Grid size={14} strokeWidth={2.5} />
                题库练习
            </button>
            <button
                onClick={() => onModuleChange('KNOWLEDGE')}
                className={`relative z-10 flex items-center justify-center gap-2 w-28 py-1.5 text-xs font-bold rounded-lg transition-colors duration-300 ${
                    currentModule === 'KNOWLEDGE' 
                    ? 'text-emerald-600' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
            >
                <BookOpen size={14} strokeWidth={2.5} />
                知识百科
            </button>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center justify-end gap-2 w-1/3">
           {currentModule === 'PRACTICE' && (
               <button 
                  onClick={() => onGenerate("公考数量关系，行程问题")}
                  disabled={isLoading}
                  className="hidden md:flex items-center px-3 py-1.5 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-indigo-100"
               >
                  ✨ AI 生成新题目
               </button>
           )}
      </div>
    </header>
  );
};