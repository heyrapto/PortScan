import axios from 'axios';
import { create } from 'zustand';
import { ScanState } from '../types/zustandTypes';

export const useScanStore = create<ScanState>((set) => ({
  url: '',
  loading: false,
  error: null,
  result: {
    feedback: [{ category: '', items: [] }],
    hireablePercentage: 0,
  },
  response: null,

  setUrl: (url) => set({ url }),

  scanUrl: async (url) => {
    set({ loading: true, error: null });
    
    try {
      const response = await axios.post(
        "http://localhost:7000/api/scrape",
        { url },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.data);

      set({ 
        result: response.data,
        response: JSON.stringify(response.data, null, 2),
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