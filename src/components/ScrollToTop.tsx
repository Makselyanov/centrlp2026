import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const targetId = decodeURIComponent(hash.slice(1));
            window.setTimeout(() => {
                document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 0);
            return;
        }

        window.scrollTo(0, 0);
    }, [pathname, hash]);

    return null;
}
