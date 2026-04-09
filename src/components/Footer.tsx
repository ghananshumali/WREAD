import { Link } from "react-router-dom";

const Footer = () => (
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
    </div>
  </footer>
);

export default Footer;
