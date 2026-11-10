import React, { useState } from 'react';
import { PaperAnalysis } from '../types';
import { Bookmark, Download, Trash2, ArrowRight, FileText, Check } from 'lucide-react';

interface SavedCollectionProps {
  savedPapers: PaperAnalysis[];
  onRemovePaper: (title: string) => void;
  onSelectPaper: (paper: PaperAnalysis) => void;
  onClearAll: () => void;
}

export const SavedCollection: React.FC<SavedCollectionProps> = ({
  savedPapers,
  onRemovePaper,
  onSelectPaper,
  onClearAll,
}) => {
  const [downloaded, setDownloaded] = useState(false);

  const handleExportMarkdown = () => {
    if (savedPapers.length === 0) return;

    const content = savedPapers
      .map(
        (p, idx) => `### Paper ${idx + 1}: ${p.title} (${p.year || 'N/A'})
- Problem: ${p.problem}
- Method: ${p.method}
- Results: ${p.results}
- Limitations: ${p.limitations}
- Summary: ${p.summary}
`
      )
      .join('\n---\n\n');

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `research_paper_analyses_${new Date().toISOString().slice(0, 10)}.md`;
    link.click();
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  if (savedPapers.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center space-y-3 transition-colors">
        <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
          <Bookmark className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
          No Saved Analyses Yet
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          When you analyze papers or browse the landmark library, click the "Save" bookmark button to keep them organized here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
            Saved Paper Analyses
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            You have {savedPapers.length} saved {savedPapers.length === 1 ? 'analysis' : 'analyses'} in your local collection.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportMarkdown}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            {downloaded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Downloaded</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Export All (.md)</span>
              </>
            )}
          </button>

          <button
            onClick={onClearAll}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* List of Saved Papers */}
      <div className="space-y-4">
        {savedPapers.map((paper) => (
          <div
            key={paper.title}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  {paper.domain && <span>{paper.domain}</span>}
                  {paper.year && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{paper.year}</span>
                    </>
                  )}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {paper.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectPaper(paper)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <span>Open in Analyzer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onRemovePaper(paper.title)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                  title="Remove from saved"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200/80 dark:border-slate-800/80">
                <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Problem</span>
                <p className="text-slate-600 dark:text-slate-400 line-clamp-2">{paper.problem}</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200/80 dark:border-slate-800/80">
                <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Method</span>
                <p className="text-slate-600 dark:text-slate-400 line-clamp-2">{paper.method}</p>
              </div>
            </div>

            <div className="p-3 bg-indigo-50/40 dark:bg-indigo-950/20 rounded-xl border border-indigo-100 dark:border-indigo-900/30 text-xs">
              <span className="font-bold text-indigo-900 dark:text-indigo-300 block mb-1">Summary</span>
              <p className="text-slate-700 dark:text-slate-300">{paper.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
