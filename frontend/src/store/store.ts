import { create } from "zustand";
import { ResultStore } from "../types/zustandTypes";

export const useResultStore = create<ResultStore>(() => ({
    result: [],
}));