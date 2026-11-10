import React, { useState } from 'react';
import { PaperAnalysis } from '../types';
import { PRESET_PAPERS } from '../data/presetPapers';
import { ArrowLeftRight, Check, Copy } from 'lucide-react';

interface CompareViewProps {
  onSelectPaper: (analysis: PaperAnalysis) => void;
}

export const CompareView: React.FC<CompareViewProps> = () => {
  const [paperAId, setPaperAId] = useState<string>('attention-is-all-you-need');
  const [paperBId, setPaperBId] = useState<string>('flash-attention');
  const [copiedComparison, setCopiedComparison] = useState(false);

  const paperA = PRESET_PAPERS.find((p) => p.id === paperAId) || PRESET_PAPERS[0];
  const paperB = PRESET_PAPERS.find((p) => p.id === paperBId) || PRESET_PAPERS[1];

  const handleCopyComparison = () => {
    const text = `# Comparative Analysis: ${paperA.title} vs. ${paperB.title}

## Paper A: ${paperA.title} (${paperA.year})
- Problem: ${paperA.problem}
- Method: ${paperA.method}
- Results: ${paperA.results}
- Limitations: ${paperA.limitations}
- Summary: ${paperA.summary}

## Paper B: ${paperB.title} (${paperB.year})
- Problem: ${paperB.problem}
- Method: ${paperB.method}
- Results: ${paperB.results}
- Limitations: ${paperB.limitations}
- Summary: ${paperB.summary}`;

    navigator.clipboard.writeText(text).then(() => {
      setCopiedComparison(true);
      setTimeout(() => setCopiedComparison(false), 2000);
    });
  };

  const swapPapers = () => {
    const temp = paperAId;
    setPaperAId(paperBId);
    setPaperBId(temp);
  };

  const sections = [
    {
      num: '1',
      title: 'Problem Identified',
      valA: paperA.problem,
      valB: paperB.problem,
      color: 'text-amber-700 dark:text-amber-400',
    },
    {
      num: '2',
      title: 'Method Used',
      valA: paperA.method,
      valB: paperB.method,
      color: 'text-blue-700 dark:text-blue-400',
    },
    {
      num: '3',
      title: 'Key Results',
      valA: paperA.results,
      valB: paperB.results,
      color: 'text-emerald-700 dark:text-emerald-400',
    },
    {
      num: '4',
      title: 'Limitations & Tradeoffs',
      valA: paperA.limitations,
      valB: paperB.limitations,
      color: 'text-rose-700 dark:text-rose-400',
    },
    {
      num: '5',
      title: '3-Sentence Summary',
      valA: paperA.summary,
      valB: paperB.summary,
      color: 'text-indigo-700 dark:text-indigo-400',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Selector Ribbon */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              Side-by-Side Paper Comparison
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Directly contrast the 5 structured dimensions between two major research approaches.
            </p>
          </div>

          <button
            onClick={handleCopyComparison}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors shrink-0"
          >
            {copiedComparison ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Comparison Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Comparison Markdown</span>
              </>
            )}
          </button>
        </div>

        {/* Paper Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Paper A
            </label>
            <select
              value={paperAId}
              onChange={(e) => setPaperAId(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-100"
            >
              {PRESET_PAPERS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.year})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5 relative">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Paper B
              </label>
              <button
                onClick={swapPapers}
                className="text-[11px] text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 inline-flex items-center gap-1 transition-colors"
              >
                <ArrowLeftRight className="w-3 h-3" />
                <span>Swap</span>
              </button>
            </div>
            <select
              value={paperBId}
              onChange={(e) => setPaperBId(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-100"
            >
              {PRESET_PAPERS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.year})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="space-y-4">
        {sections.map((sec) => (
          <div
            key={sec.num}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold uppercase tracking-wider ${sec.color}`}>
                {sec.num}. {sec.title}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
              <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800/80 space-y-1.5">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate block">
                  {paperA.title}
                </span>
                <p className="text-sm text-slate-900 dark:text-slate-100 leading-relaxed">
                  {sec.valA}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800/80 space-y-1.5">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate block">
                  {paperB.title}
                </span>
                <p className="text-sm text-slate-900 dark:text-slate-100 leading-relaxed">
                  {sec.valB}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
