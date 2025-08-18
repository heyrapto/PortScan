import axios from 'axios';
import { create } from 'zustand';
import { ScanState } from '../types/zustandTypes';

export const useScanStore = create<ScanState>((set) => ({
  url: '',
  loading: false,
  error: null,
  result: {
    suggestions: [],
    critiques: [],
    bestPractices: [],
    hireablePercentage: '0.00'
  },
  response: null,

  setUrl: (url) => set({ url }),

  scanUrl: async (url) => {
    set({ loading: true, error: null });
    
    try {
      const { data } = await axios.post(
        "http://7000/api/scrape",
        { url },
        { headers: { "Content-Type": "application/json" } }
      );

      set({ 
        result: {
          suggestions: data.suggestions || [],
          critiques: data.critiques || [],
          bestPractices: data.bestPractices || [],
          hireablePercentage: data.hireablePercentage || '0.00'
        },
        response: JSON.stringify(data, null, 2),
        error: null
      });
    } catch (err) {
      const error = axios.isAxiosError(err) 
        ? err.response?.data?.message || "Request error"
        : "Unknown error";
      set({ error });
    } finally {
      set({ loading: false });
    }
  }
}));
