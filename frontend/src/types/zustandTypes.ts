export interface ScanState {
    result: {
        feedback: {
        category: string;
        items: string[];
            }[];
        hireablePercentage: number;
        }
    url: string;
    loading: boolean;
    error: string | null;
    response: string | null;
    setUrl: (url: string) => void;
    scanUrl: (url: string) => Promise<void>;
}