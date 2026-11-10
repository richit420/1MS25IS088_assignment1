import React, { useState } from 'react';
import { PaperAnalysis } from '../types';
import { PRESET_PAPERS } from '../data/presetPapers';
import { ArrowRight, BookOpen, Search } from 'lucide-react';

interface LandmarkLibraryProps {
  onSelectPaper: (paper: PaperAnalysis) => void;
}

export const LandmarkLibrary: React.FC<LandmarkLibraryProps> = ({ onSelectPaper }) => {
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const domains = ['All', 'Natural Language Processing', 'Computer Vision', 'Systems & Efficiency', 'Parameter-Efficient Fine-Tuning', 'Reinforcement Learning'];

  const filteredPapers = PRESET_PAPERS.filter((paper) => {
    const matchesDomain = selectedDomain === 'All' || paper.domain === selectedDomain;
    const matchesSearch =
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (paper.tags && paper.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      paper.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              Landmark Research Papers
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Pre-computed 5-point analyses of breakthrough papers that transformed artificial intelligence.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, tags..."
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-100"
            />
          </div>
        </div>

        {/* Domain Filter Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-100 dark:border-slate-800/80">
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedDomain === dom
                  ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {dom}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredPapers.map((paper) => (
          <div
            key={paper.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>{paper.domain}</span>
                <span aria-hidden="true">·</span>
                <span>{paper.year}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">
                {paper.title}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 italic line-clamp-1">
                {paper.authors}
              </p>

              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Core Bottleneck
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {paper.problem}
                </p>
              </div>

              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  3-Sentence Summary
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {paper.summary}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                {paper.tags?.slice(0, 2).join(' / ')}
              </span>
              <button
                onClick={() => onSelectPaper(paper)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-slate-100 hover:opacity-75 transition"
              >
                <span>Analyze Full Breakdown</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
