import React from 'react';
import { Search, Sparkles, X, ArrowUpRight, BookOpen } from 'lucide-react';
import { PRESET_PAPERS } from '../data/presetPapers';

interface PaperInputProps {
  input: string;
  setInput: (val: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  onSelectPreset: (id: string) => void;
}

export const PaperInput: React.FC<PaperInputProps> = ({
  input,
  setInput,
  onAnalyze,
  isLoading,
  onSelectPreset,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      onAnalyze();
    }
  };

  const handlePasteSampleAbstract = () => {
    setInput(
      `Attention Is All You Need

The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train. Our model achieves 28.4 BLEU on the WMT 2014 English-to-German translation task, improving over the existing best results, including ensembles, by over 2 BLEU.`
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="paper-input-textarea"
            className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
          >
            Research Paper Title or Abstract
          </label>
          <span className="text-xs text-slate-400 font-mono">
            Press Cmd + Enter to analyze
          </span>
        </div>

        <div className="relative">
          <textarea
            id="paper-input-textarea"
            rows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="Enter any research paper title (e.g. 'Attention Is All You Need') or paste an abstract..."
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 focus:border-transparent transition resize-y font-normal"
          />
          {input && !isLoading && (
            <button
              onClick={() => setInput('')}
              className="absolute top-3 right-3 p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
              title="Clear input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Preset Quick Chips */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="font-medium">Quick Try Landmark Papers:</span>
          <button
            onClick={handlePasteSampleAbstract}
            className="text-indigo-600 dark:text-indigo-400 hover:underline transition-colors"
          >
            Paste Sample Abstract
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {PRESET_PAPERS.map((paper) => (
            <button
              key={paper.id}
              onClick={() => onSelectPreset(paper.id!)}
              disabled={isLoading}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/60 rounded-lg transition-colors flex items-center gap-1 group"
            >
              <span className="truncate max-w-[200px]">{paper.title}</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Primary Submit Button */}
      <div className="pt-2">
        <button
          onClick={onAnalyze}
          disabled={isLoading || !input.trim()}
          className="w-full py-3.5 px-6 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 font-semibold text-sm sm:text-base shadow-sm active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Analyzing Paper Architecture & Results...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              <span>Analyze Paper</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
