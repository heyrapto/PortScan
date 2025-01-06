import { create } from "zustand";

type ResultStore = {
    result: string[];
}

export const useResultStore = create<ResultStore>(() => ({
    result: [],
}));