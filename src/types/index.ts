export interface PaperAnalysis {
  id?: string;
  title: string;
  problem: string;
  method: string;
  results: string;
  limitations: string;
  summary: string;
  domain?: string;
  tags?: string[];
  significance?: string;
  suggestedQuestions?: string[];
  authors?: string;
  year?: string;
  abstract?: string;
  timestamp?: number;
}

export interface QaItem {
  question: string;
  answer: string;
  loading?: boolean;
}
