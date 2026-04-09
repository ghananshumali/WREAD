import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, PenLine, Bookmark, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { getStoredUser } from "@/lib/api";

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