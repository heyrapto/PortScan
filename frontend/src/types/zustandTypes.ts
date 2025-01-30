
export interface ScanState {

    url: string;
  
    loading: boolean;
  
    error: string | null;
  
    result: {
  
      feedback: {
  
        suggestions: string[];
  
        critiques: string[];
  
        bestPractices: string[];
      };
  
      metrics: {
  
        linkCount: number;
  
        divCount: number;
  
        sectionCount: number;
  
        h1TagsCount: number;
  
        pTagsCount: number;
  
        imgAltCount: number;
  
        performance: {
  
          pageLoadTime: number;
  
          domContentLoaded: number;
  
        };
  
        isValidURL: boolean;
  
        hireablePercentage: string;
  
      };
  
    };
  
    response: string | null;
  
    setUrl: (url: string) => void;
  
    scanUrl: (url: string) => Promise<void>;
  
  }
  