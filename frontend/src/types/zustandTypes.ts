export interface ScanState {
  url: string;
  loading: boolean;
  error: string | null;
  result: {
    suggestions: string[];
    critiques: string[];
    bestPractices: string[];
    hireablePercentage: string;
  };
  response: string | null;
  setUrl: (url: string) => void;
  scanUrl: (url: string) => Promise<void>;
}