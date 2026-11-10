import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: 'analyzer' | 'compare' | 'library' | 'saved';
  setActiveTab: (tab: 'analyzer' | 'compare' | 'library' | 'saved') => void;
  savedCount: number;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  darkMode,
  setDarkMode,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element, no badges or pills) */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-slate-100 flex items-center justify-center text-white dark:text-slate-950 font-bold text-sm tracking-tight shadow-sm">
            RP
          </div>
          <button
            onClick={() => setActiveTab('analyzer')}
            className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 hover:opacity-80 transition-opacity whitespace-nowrap text-left"
          >
            Research Paper Agent
          </button>
        </div>

        {/* Zone 2: Navigation Links (Single-line text links with subtle active states) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
          <button
            onClick={() => setActiveTab('analyzer')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'analyzer'
                ? 'text-slate-900 dark:text-slate-100 font-semibold border-b-2 border-slate-900 dark:border-slate-100'
                : 'hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Structured Analyzer
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'compare'
                ? 'text-slate-900 dark:text-slate-100 font-semibold border-b-2 border-slate-900 dark:border-slate-100'
                : 'hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Side-by-Side Comparison
          </button>

          <button
            onClick={() => setActiveTab('library')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'library'
                ? 'text-slate-900 dark:text-slate-100 font-semibold border-b-2 border-slate-900 dark:border-slate-100'
                : 'hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Landmark Library
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`whitespace-nowrap transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'saved'
                ? 'text-slate-900 dark:text-slate-100 font-semibold border-b-2 border-slate-900 dark:border-slate-100'
                : 'hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <span>Saved Analyses</span>
            {savedCount > 0 && (
              <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
                ({savedCount})
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Theme Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              setActiveTab('analyzer');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors whitespace-nowrap shadow-sm"
          >
            Analyze Paper
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-200 dark:border-slate-800 py-2 px-3 text-xs font-medium text-slate-600 dark:text-slate-400">
        <button
          onClick={() => setActiveTab('analyzer')}
          className={`py-1 px-2 whitespace-nowrap ${
            activeTab === 'analyzer' ? 'text-slate-900 dark:text-slate-100 font-bold' : ''
          }`}
        >
          Analyzer
        </button>
        <button
          onClick={() => setActiveTab('compare')}
          className={`py-1 px-2 whitespace-nowrap ${
            activeTab === 'compare' ? 'text-slate-900 dark:text-slate-100 font-bold' : ''
          }`}
        >
          Compare
        </button>
        <button
          onClick={() => setActiveTab('library')}
          className={`py-1 px-2 whitespace-nowrap ${
            activeTab === 'library' ? 'text-slate-900 dark:text-slate-100 font-bold' : ''
          }`}
        >
          Library
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`py-1 px-2 whitespace-nowrap ${
            activeTab === 'saved' ? 'text-slate-900 dark:text-slate-100 font-bold' : ''
          }`}
        >
          Saved {savedCount > 0 && `(${savedCount})`}
        </button>
      </div>
    </header>
  );
};
