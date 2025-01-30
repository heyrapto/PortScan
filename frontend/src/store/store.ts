import axios from 'axios';
import { create } from 'zustand';
import { ScanState } from '../types/zustandTypes';

export const useScanStore = create<ScanState>((set) => ({
  url: '',
  loading: false,
  error: null,
  result: {
    feedback: {
      suggestions: [],
      critiques: [],
      bestPractices: [],
    },
    metrics: {
      linkCount: 0,
      divCount: 0,
      sectionCount: 0,
      h1TagsCount: 0,
      pTagsCount: 0,
      imgAltCount: 0,
      performance: {
        pageLoadTime: 0,
        domContentLoaded: 0
      },
      isValidURL: false,
      hireablePercentage: '0.00'
    }
  },
  response: null,

  setUrl: (url) => set({ url }),

  scanUrl: async (url) => {
    set({ loading: true, error: null });
    
    try {
      const { data } = await axios.post(
        "http://localhost:7000/api/scrape",
        { url },
        { headers: { "Content-Type": "application/json" } }
      );

      set({ 
        result: {
          feedback: {
            suggestions: data.feedback.suggestions || [],
            critiques: data.feedback.critiques || [],
            bestPractices: data.feedback.bestPractices || [],
          },
          metrics: {
            ...data.metrics,
            hireablePercentage: data.metrics.hireablePercentage || '0.00'
          }
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