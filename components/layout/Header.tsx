import React from 'react';
import { Box, Menu, X } from 'lucide-react';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  isLoading: boolean;
  onGenerate: (topic: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen, 
  isLoading, 
  onGenerate 
}) => {
  return (
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
              onClick={() => onGenerate("公考数量关系，行程问题")}
              disabled={isLoading}
              className="hidden md:flex items-center px-3 py-1.5 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
           >
              ✨ AI 生成新题目
           </button>
      </div>
    </header>
  );
};