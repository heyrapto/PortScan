import { useRef } from "react";

export const useCustomRef = () => {
    const ref = useRef(null);
    return ref;
}