import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, PenLine, Bookmark, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { getStoredUser } from "@/lib/api";
<<<<<<< HEAD
import { ThemeToggle } from "@/components/ThemeToggle";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = getStoredUser();

  const isAuth =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  if (location.pathname === "/" && !user) return null;
  if (isAuth) return null;

  const profileTarget = user?._id ? `/profile/${user._id}` : "/login";

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur-lg">
      <div className="h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">

        {/* Logo */}
        <Link
          to={user ? "/feed" : "/"}
          className="font-display text-xl font-bold tracking-tight text-foreground flex items-center gap-1.5 hover:text-primary transition-colors duration-200"
        >
          WREAD
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mb-0.5" />
        </Link>

        {/* DESKTOP */}
        <div className="hidden items-center gap-1 md:flex">
          <Link to="/search">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground group">
              <Search className="h-4 w-4" />
              Search
              <kbd className="hidden lg:inline-flex h-5 items-center gap-0.5 rounded border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                /
              </kbd>
            </Button>
          </Link>

          {user && (
            <Link to="/write">
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                <PenLine className="h-4 w-4" />
                Write
              </Button>
            </Link>
          )}

          {user && (
            <Link to="/bookmarks">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Bookmark className="h-4 w-4" />
              </Button>
            </Link>
          )}

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Avatar */}
          <Link to={profileTarget} className="ml-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground ring-2 ring-primary/20 hover:ring-primary/60 hover:scale-105 transition-all duration-200">
              {user?.username?.[0]?.toUpperCase() || "S"}
            </div>
          </Link>

          {user && (
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-destructive ml-1"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="text-foreground p-1 rounded-md hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="border-t bg-background/98 backdrop-blur-lg px-4 py-4 md:hidden animate-slide-up">
          <div className="flex flex-col gap-1">
            {[
              { to: "/feed", label: "Home", show: true },
              { to: "/search", label: "Search", show: true },
              { to: "/write", label: "Write", show: !!user },
              { to: "/bookmarks", label: "Bookmarks", show: !!user },
              { to: profileTarget, label: user ? "Profile" : "Sign in", show: true },
            ].filter(l => l.show).map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 px-3 rounded-md text-foreground font-medium hover:bg-muted transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <button
                onClick={() => { handleLogout(); setMobileOpen(false); }}
                className="py-2.5 px-3 rounded-md text-left text-destructive font-medium hover:bg-destructive/10 transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
=======

const Navbar = () => {

const location = useLocation();
const navigate = useNavigate();

const [mobileOpen, setMobileOpen] = useState(false);

const user = getStoredUser();

const isAuth =
location.pathname === "/login" ||
location.pathname === "/signup";

/*
Hide navbar on landing page when user not logged in
prevents double WREAD logo
*/

if(location.pathname === "/" && !user){

return null;

}

if(isAuth) return null;

const profileTarget =
user?._id ? `/profile/${user._id}` : "/login";

const handleLogout = () => {

localStorage.removeItem("user");

localStorage.removeItem("token");

navigate("/");

window.location.reload();

};

return (

<nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">

<div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">

<Link
to={user ? "/feed" : "/"}
className="font-display text-xl font-bold tracking-tight text-foreground"
>

WREAD

</Link>



{/* DESKTOP */}

<div className="hidden items-center gap-1 md:flex">

<Link to="/search">

<Button
variant="ghost"
size="sm"
className="gap-2 text-muted-foreground"
>

<Search className="h-4 w-4"/>

Search

</Button>

</Link>



{/* show write only if logged in */}

{user && (

<Link to="/write">

<Button
variant="ghost"
size="sm"
className="gap-2 text-muted-foreground"
>

<PenLine className="h-4 w-4"/>

Write

</Button>

</Link>

)}



{user && (

<Link to="/bookmarks">

<Button
variant="ghost"
size="sm"
className="gap-2 text-muted-foreground"
>

<Bookmark className="h-4 w-4"/>

</Button>

</Link>

)}



<Link to={profileTarget}>

<div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">

{user?.username?.[0]?.toUpperCase() || "S"}

</div>

</Link>



{/* logout */}

{user && (

<Button
variant="ghost"
size="sm"
className="text-muted-foreground"
onClick={handleLogout}
>

<LogOut className="h-4 w-4"/>

</Button>

)}



</div>



{/* MOBILE BUTTON */}

<button
className="md:hidden text-foreground"
onClick={()=>setMobileOpen(!mobileOpen)}
>

{mobileOpen

? <X className="h-5 w-5"/>

: <Menu className="h-5 w-5"/>

}

</button>

</div>



{/* MOBILE MENU */}

{mobileOpen && (

<div className="border-t bg-background px-4 py-4 md:hidden animate-fade-in">

<div className="flex flex-col gap-2">

<Link
to="/feed"
onClick={()=>setMobileOpen(false)}
className="py-2 text-foreground font-medium"
>

Home

</Link>

<Link
to="/search"
onClick={()=>setMobileOpen(false)}
className="py-2 text-foreground font-medium"
>

Search

</Link>



{user && (

<Link
to="/write"
onClick={()=>setMobileOpen(false)}
className="py-2 text-foreground font-medium"
>

Write

</Link>

)}



{user && (

<Link
to="/bookmarks"
onClick={()=>setMobileOpen(false)}
className="py-2 text-foreground font-medium"
>

Bookmarks

</Link>

)}



<Link
to={profileTarget}
onClick={()=>setMobileOpen(false)}
className="py-2 text-foreground font-medium"
>

{user ? "Profile" : "Sign in"}

</Link>



{user && (

<button
onClick={()=>{
handleLogout();
setMobileOpen(false);
}}
className="py-2 text-left text-red-500 font-medium"
>

Logout

</button>

)}

</div>

</div>

)}

</nav>

);

};

export default Navbar;
>>>>>>> d9d42a9ad3414c393c0c8b4164ef6c1c415a8baf
