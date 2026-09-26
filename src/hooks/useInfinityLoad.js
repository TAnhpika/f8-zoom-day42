import { useEffect } from "react";

export default function useInfinityLoad({
    bottomOffset = 0,
    onEnd = () => {},
}) {
    useEffect(() => {
        const handle = () => {
            const isScrollEnd =
                document.documentElement.scrollHeight +
                bottomOffset -
                (window.innerHeight + window.scrollY);
            
            // tránh số lẻ 0.3
            if (isScrollEnd <= 1) onEnd();
        };

        window.addEventListener("scroll", handle);
        return () => window.removeEventListener("scroll", handle);
    }, [bottomOffset, onEnd]);
}
