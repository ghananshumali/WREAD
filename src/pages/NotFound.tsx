import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      {/* Large editorial 404 */}
      <div className="relative mb-6">
        <span className="font-display text-[10rem] font-bold leading-none text-muted/40 select-none">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-2xl font-bold text-foreground">
            Page not found
          </span>
        </div>
      </div>

      <p className="text-muted-foreground mb-8 max-w-xs leading-relaxed">
        The story you're looking for seems to have wandered off. Let's get you back on track.
      </p>

      <Link
        to="/"
        className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Return to home
      </Link>

      {/* Decorative WREAD watermark */}
      <p className="absolute bottom-8 font-display text-6xl font-bold text-muted/10 select-none pointer-events-none">
        WREAD
      </p>
    </div>
  );
};

export default NotFound;
