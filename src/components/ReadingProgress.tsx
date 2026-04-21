import { useReadingProgress } from "@/hooks/useReadingProgress";

export function ReadingProgress() {
  const progress = useReadingProgress();
  return (
    <div className="fixed top-0 left-0 z-[60] h-[3px] w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-primary/80 via-primary to-primary/80 transition-all duration-100 ease-out shadow-[0_0_8px_hsl(var(--primary)/0.6)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
