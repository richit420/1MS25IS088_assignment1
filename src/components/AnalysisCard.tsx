import React, { useState } from 'react';
import { PaperAnalysis, QaItem } from '../types';
import {
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  Volume2,
  VolumeX,
  FileText,
  Send,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Share2,
} from 'lucide-react';

interface AnalysisCardProps {
  analysis: PaperAnalysis;
  isSaved: boolean;
  onToggleSave: (paper: PaperAnalysis) => void;
  onSelectRelatedPaper?: (title: string) => void;
}

export const AnalysisCard: React.FC<AnalysisCardProps> = ({
  analysis,
  isSaved,
  onToggleSave,
  onSelectRelatedPaper,
}) => {
  const [copiedFormat, setCopiedFormat] = useState<'markdown' | 'bibtex' | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [qaList, setQaList] = useState<QaItem[]>([]);
  const [customQuestion, setCustomQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [showAbstract, setShowAbstract] = useState(false);

  // Copy standard 5-part Markdown output
  const handleCopyMarkdown = () => {
    const markdown = `Input: "${analysis.title}"
Output:
- Problem: ${analysis.problem}
- Method: ${analysis.method}
- Results: ${analysis.results}
- Limitations: ${analysis.limitations}
- Summary: ${analysis.summary}`;

    navigator.clipboard.writeText(markdown).then(() => {
      setCopiedFormat('markdown');
      setTimeout(() => setCopiedFormat(null), 2000);
    });
  };

  // Copy BibTeX citation
  const handleCopyBibtex = () => {
    const key = (analysis.title.split(' ')[0] || 'paper').toLowerCase() + (analysis.year || '2024');
    const bibtex = `@article{${key},
  title={${analysis.title}},
  author={${analysis.authors || 'Research Team'}},
  year={${analysis.year || 'Recent'}},
  journal={arXiv preprint}
}`;
    navigator.clipboard.writeText(bibtex).then(() => {
      setCopiedFormat('bibtex');
      setTimeout(() => setCopiedFormat(null), 2000);
    });
  };

  // Text-to-speech for the 3-sentence summary
  const handleToggleSpeak = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(analysis.summary);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  // Handle follow-up inquiry via backend /api/ask
  const handleAskQuestion = async (qText: string) => {
    const q = qText.trim();
    if (!q || isAsking) return;

    setIsAsking(true);
    const newQaItem: QaItem = { question: q, answer: '', loading: true };
    setQaList((prev) => [...prev, newQaItem]);
    setCustomQuestion('');

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paperContext: analysis,
          question: q,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to get answer from research agent.');
      }

      const data = await res.json();
      setQaList((prev) =>
        prev.map((item, idx) =>
          idx === prev.length - 1 ? { ...item, answer: data.answer, loading: false } : item
        )
      );
    } catch (err: any) {
      setQaList((prev) =>
        prev.map((item, idx) =>
          idx === prev.length - 1
            ? {
                ...item,
                answer: `Note: ${err.message || 'Unable to query agent.'}`,
                loading: false,
              }
            : item
        )
      );
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden transition-colors">
      {/* Top Header Information & Actions */}
      <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 space-y-4">
        {/* Unboxed Metadata (Zero-Pill Discipline with subtle typographic separators) */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          {analysis.domain && <span className="font-medium text-slate-700 dark:text-slate-300">{analysis.domain}</span>}
          {analysis.year && (
            <>
              <span aria-hidden="true">·</span>
              <span>Published {analysis.year}</span>
            </>
          )}
          {analysis.tags && analysis.tags.length > 0 && (
            <>
              <span aria-hidden="true">·</span>
              <span>{analysis.tags.slice(0, 3).join(' / ')}</span>
            </>
          )}
        </div>

        {/* Paper Title */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              {analysis.title}
            </h2>
            {analysis.authors && (
              <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                {analysis.authors}
              </p>
            )}
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <button
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              title="Copy 5-point analysis as Markdown"
            >
              {copiedFormat === 'markdown' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Markdown</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopyBibtex}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              title="Copy BibTeX Citation"
            >
              {copiedFormat === 'bibtex' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>BibTeX Copied</span>
                </>
              ) : (
                <>
                  <FileText className="w-3.5 h-3.5" />
                  <span>BibTeX</span>
                </>
              )}
            </button>

            <button
              onClick={() => onToggleSave(analysis)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                isSaved
                  ? 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800'
                  : 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              title={isSaved ? 'Saved in collection' : 'Save paper analysis'}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Save</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Abstract Toggle if abstract is available */}
        {analysis.abstract && (
          <div className="pt-2">
            <button
              onClick={() => setShowAbstract(!showAbstract)}
              className="text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors inline-flex items-center gap-1"
            >
              <span>{showAbstract ? 'Hide original abstract' : 'View original abstract'}</span>
              <span className="text-slate-400">({analysis.abstract.length} chars)</span>
            </button>
            {showAbstract && (
              <div className="mt-2.5 p-4 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-xl text-xs leading-relaxed text-slate-600 dark:text-slate-400 font-mono">
                {analysis.abstract}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 5-Step Core Breakdown Container */}
      <div className="p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 gap-5">
          {/* 1. Problem */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800/90 bg-slate-50/60 dark:bg-slate-950/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                1. Problem Identified
              </span>
              <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                Challenge & Bottleneck
              </span>
            </div>
            <p className="text-base text-slate-900 dark:text-slate-100 leading-relaxed">
              {analysis.problem}
            </p>
          </div>

          {/* 2. Method Used */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800/90 bg-slate-50/60 dark:bg-slate-950/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                2. Method Used
              </span>
              <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                Technical Architecture
              </span>
            </div>
            <p className="text-base text-slate-900 dark:text-slate-100 leading-relaxed">
              {analysis.method}
            </p>
          </div>

          {/* 3. Key Results */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800/90 bg-slate-50/60 dark:bg-slate-950/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                3. Key Results
              </span>
              <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                Empirical Validation
              </span>
            </div>
            <p className="text-base text-slate-900 dark:text-slate-100 leading-relaxed">
              {analysis.results}
            </p>
          </div>

          {/* 4. Limitations */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800/90 bg-slate-50/60 dark:bg-slate-950/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                4. Limitations & Tradeoffs
              </span>
              <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                Constraints & Caveats
              </span>
            </div>
            <p className="text-base text-slate-900 dark:text-slate-100 leading-relaxed">
              {analysis.limitations}
            </p>
          </div>

          {/* 5. 3-Sentence Plain-English Summary */}
          <div className="p-6 rounded-xl border border-indigo-200 dark:border-indigo-900/40 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                5. Plain-English Summary (3 Sentences)
              </span>
              <button
                onClick={handleToggleSpeak}
                className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition-colors"
                title="Listen to summary"
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span>Stop Audio</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span>Listen</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-base sm:text-lg text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
              {analysis.summary}
            </p>
            {analysis.significance && (
              <div className="pt-2 border-t border-indigo-100 dark:border-indigo-900/30 text-xs text-indigo-900/80 dark:text-indigo-300/80">
                <span className="font-semibold">Significance:</span> {analysis.significance}
              </div>
            )}
          </div>
        </div>

        {/* Deep Dive & Follow-Up Q&A Section */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-slate-500" />
              <span>Explore Research Questions</span>
            </h3>
            <span className="text-xs text-slate-400">Ask the Research Agent</span>
          </div>

          {/* Suggested Quick Questions */}
          {analysis.suggestedQuestions && analysis.suggestedQuestions.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
              {analysis.suggestedQuestions.map((sq, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAskQuestion(sq)}
                  disabled={isAsking}
                  className="text-left text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700/60 transition-colors flex items-center justify-between gap-2 group"
                >
                  <span className="line-clamp-1">{sq}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 shrink-0 transition-colors" />
                </button>
              ))}
            </div>
          )}

          {/* Q&A Thread */}
          {qaList.length > 0 && (
            <div className="space-y-3 pt-2">
              {qaList.map((qa, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-2 text-sm"
                >
                  <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-mono">Q:</span>
                    <span>{qa.question}</span>
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 leading-relaxed pl-4 border-l-2 border-slate-300 dark:border-slate-700 whitespace-pre-line text-sm">
                    {qa.loading ? (
                      <span className="text-slate-400 animate-pulse">
                        Analyzing paper nuances and generating answer...
                      </span>
                    ) : (
                      qa.answer
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Question Input Field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAskQuestion(customQuestion);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              placeholder="Ask any follow-up question about this paper..."
              disabled={isAsking}
              className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-100 transition"
            />
            <button
              type="submit"
              disabled={isAsking || !customQuestion.trim()}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 disabled:opacity-50 transition flex items-center gap-1.5"
            >
              {isAsking ? (
                <span>Thinking...</span>
              ) : (
                <>
                  <span>Ask</span>
                  <Send className="w-3 h-3" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </article>
  );
};
