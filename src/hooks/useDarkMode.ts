import { useEffect, useState } from "react";

export function useDarkMode() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("wread-theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("wread-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("wread-theme", "light");
    }
  }, [dark]);

  return { dark, toggle: () => setDark(d => !d) };
}
