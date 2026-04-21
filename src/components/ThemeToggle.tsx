import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";

export function ThemeToggle() {
  const { dark, toggle } = useDarkMode();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-accent/50 transition-all duration-200"
    >
      {dark
        ? <Sun className="h-4 w-4 text-amber-400" />
        : <Moon className="h-4 w-4" />
      }
    </button>
  );
}
