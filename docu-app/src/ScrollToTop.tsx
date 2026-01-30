import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { fromSearch?: boolean } | null;

    if (state?.fromSearch) return;

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return null;
}
