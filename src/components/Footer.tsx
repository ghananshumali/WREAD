import { Link } from "react-router-dom";

const Footer = () => (
<<<<<<< HEAD
  <footer className="border-t py-14" style={{ background: 'hsl(var(--secondary) / 0.5)' }}>
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid gap-10 md:grid-cols-4">
        {/* Brand */}
        <div className="space-y-3">
          <div className="font-display text-lg font-bold text-foreground flex items-center gap-1.5">
            WREAD
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mb-0.5" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">
            A calm space for thoughtful writing and reading.
          </p>
        </div>

        {/* Platform */}
        <div>
          <h4 className="mb-4 text-xs font-semibold tracking-widest uppercase text-foreground/70">Platform</h4>
          <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
            <Link to="/explore" className="hover:text-foreground transition-colors w-fit">Explore</Link>
            <Link to="/write" className="hover:text-foreground transition-colors w-fit">Write</Link>
            <Link to="/feed" className="hover:text-foreground transition-colors w-fit">Feed</Link>
          </div>
        </div>

        {/* Topics */}
        <div>
          <h4 className="mb-4 text-xs font-semibold tracking-widest uppercase text-foreground/70">Topics</h4>
          <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
            <Link to="/explore" className="hover:text-foreground transition-colors w-fit">Technology</Link>
            <Link to="/explore" className="hover:text-foreground transition-colors w-fit">Science</Link>
            <Link to="/explore" className="hover:text-foreground transition-colors w-fit">Design</Link>
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="mb-4 text-xs font-semibold tracking-widest uppercase text-foreground/70">Company</h4>
          <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
            <span className="cursor-default hover:text-foreground transition-colors w-fit">About</span>
            <span className="cursor-default hover:text-foreground transition-colors w-fit">Terms</span>
            <span className="cursor-default hover:text-foreground transition-colors w-fit">Privacy</span>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
        <p>© 2025 WREAD. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Made with <span className="text-primary">♥</span> for readers &amp; writers
        </p>
      </div>
=======
  <footer className="border-t bg-secondary/50 py-12">
    <div className="container mx-auto grid gap-8 px-4 md:grid-cols-4 md:px-6">
      <div>
        <h3 className="font-display text-lg font-bold text-foreground">WREAD</h3>
        <p className="mt-2 text-sm text-muted-foreground">A calm space for thoughtful writing and reading.</p>
      </div>
      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">Platform</h4>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <Link to="/explore" className="hover:text-foreground transition-colors">Explore</Link>
          <Link to="/write" className="hover:text-foreground transition-colors">Write</Link>
          <Link to="/feed" className="hover:text-foreground transition-colors">Feed</Link>
        </div>
      </div>
      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">Topics</h4>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <Link to="/explore" className="hover:text-foreground transition-colors">Technology</Link>
          <Link to="/explore" className="hover:text-foreground transition-colors">Science</Link>
          <Link to="/explore" className="hover:text-foreground transition-colors">Design</Link>
        </div>
      </div>
      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">Company</h4>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <span>About</span>
          <span>Terms</span>
          <span>Privacy</span>
        </div>
      </div>
    </div>
    <div className="container mx-auto mt-8 border-t pt-6 px-4 md:px-6">
      <p className="text-center text-xs text-muted-foreground">© 2025 WREAD. All rights reserved.</p>
>>>>>>> d9d42a9ad3414c393c0c8b4164ef6c1c415a8baf
    </div>
  </footer>
);

export default Footer;
