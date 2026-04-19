<<<<<<< HEAD
import { useState, useEffect, useRef } from "react";
import ArticleCard from "@/components/ArticleCard";
import { Search, X } from "lucide-react";
=======
import { useState,useEffect } from "react";
import ArticleCard from "@/components/ArticleCard";
import { Search } from "lucide-react";
>>>>>>> d9d42a9ad3414c393c0c8b4164ef6c1c415a8baf
import { API_BASE, mapPostToArticle, requestJson } from "@/lib/api";
import { Link } from "react-router-dom";

const SearchPage = () => {
<<<<<<< HEAD
  const [query, setQuery] = useState("");
  const [postResults, setPostResults] = useState<any[]>([]);
  const [userResults, setUserResults] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on "/" keypress from anywhere
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (query.trim().length < 1) { setPostResults([]); setUserResults([]); return; }
    const timer = setTimeout(async () => {
      try {
        const [posts, users] = await Promise.all([
          requestJson(`${API_BASE}/post/search?q=${encodeURIComponent(query)}`),
          requestJson(`${API_BASE}/user/search?q=${encodeURIComponent(query)}`),
        ]);
        setPostResults(posts || []);
        setUserResults(users || []);
      } catch (err) { console.log(err); }
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  const hasResults = postResults.length > 0 || userResults.length > 0;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10 md:px-6">

      {/* Search input */}
      <div className="relative mb-10 group">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search articles, topics, or authors…"
          className="w-full rounded-full border bg-card py-3.5 pl-12 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all shadow-sm dark:bg-card"
          autoFocus
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {!query && (
          <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex h-5 items-center rounded border bg-muted px-1.5 text-[10px] text-muted-foreground">
            /
          </kbd>
        )}
      </div>

      {query.trim() ? (
        <>
          {/* Users */}
          {userResults.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-4">
                <p className="eyebrow">Writers</p>
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">{userResults.length} found</span>
              </div>
              <div className="space-y-2">
                {userResults.map((user, i) => (
                  <Link
                    key={user._id}
                    to={`/profile/${user._id}`}
                    className="group flex items-center gap-4 p-3 rounded-xl hover:bg-muted/60 transition-colors animate-slide-up"
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    <div className="h-10 w-10 rounded-full bg-primary text-sm text-primary-foreground flex items-center justify-center font-semibold ring-2 ring-primary/20 shrink-0">
                      {user.username?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">{user.username}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.bio || "Writer on WREAD"}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Articles */}
          {postResults.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-4">
                <p className="eyebrow">Articles</p>
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">{postResults.length} results</span>
              </div>
              <div className="divide-y">
                {postResults.map(post => (
                  <ArticleCard key={post._id} article={mapPostToArticle(post)} />
                ))}
              </div>
            </div>
          )}

          {!hasResults && (
            <div className="py-20 text-center space-y-3">
              <Search className="mx-auto h-10 w-10 text-muted-foreground/20" />
              <p className="font-display text-xl text-muted-foreground/50">No results</p>
              <p className="text-sm text-muted-foreground">
                Nothing matched <span className="font-semibold text-foreground">"{query}"</span>
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="py-20 text-center space-y-4">
          <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-30" />
            <Search className="h-8 w-8 text-muted-foreground/30 relative" />
          </div>
          <p className="font-display text-xl text-muted-foreground/50">What are you looking for?</p>
          <p className="text-sm text-muted-foreground">Search articles, writers, or topics</p>
          <p className="text-xs text-muted-foreground/50">Press <kbd className="border rounded px-1 py-0.5 text-xs">/</kbd> anytime to search</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
=======

const [query,setQuery] = useState("");

const [postResults,setPostResults] = useState<any[]>([]);

const [userResults,setUserResults] = useState<any[]>([]);



useEffect(()=>{

if(query.trim().length < 1){

setPostResults([]);

setUserResults([]);

return;

}



const fetchResults = async ()=>{

try{

// SEARCH POSTS
const posts = await requestJson(

`${API_BASE}/post/search?q=${encodeURIComponent(query)}`

);

setPostResults(posts || []);


// SEARCH USERS
const users = await requestJson(

`${API_BASE}/user/search?q=${encodeURIComponent(query)}`

);

setUserResults(users || []);



}catch(err){

console.log(err);

}

};



fetchResults();

},[query]);



return (

<div className="container mx-auto max-w-3xl px-4 py-10 md:px-6">


<div className="relative mb-8">

<Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

<input

value={query}

onChange={(e)=>setQuery(e.target.value)}

placeholder="Search articles, topics, or authors..."

className="w-full rounded-full border bg-card py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"

autoFocus

/>

</div>



{query.trim() ? (

<>


{/* USERS */}

{userResults.length > 0 && (

<div className="mb-8">

<p className="text-sm text-muted-foreground mb-3">

Users

</p>


<div className="space-y-3">


{userResults.map(user=>(

<Link

key={user._id}

to={`/profile/${user._id}`}

className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition"

>

<div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">

{user.username?.[0] || "U"}

</div>



<div>

<p className="font-medium text-foreground">

{user.username}

</p>

<p className="text-xs text-muted-foreground">

{user.bio || "Writer on WREAD"}

</p>

</div>

</Link>

))}


</div>

</div>

)}



{/* POSTS */}

{postResults.length > 0 && (

<div>

<p className="text-sm text-muted-foreground mb-4">

Articles

</p>


<div className="divide-y">


{postResults.map(post=>(

<ArticleCard

key={post._id}

article={mapPostToArticle(post)}

/>

))}


</div>

</div>

)}



{postResults.length === 0 && userResults.length === 0 && (

<p className="py-16 text-center text-muted-foreground">

No results for "{query}"

</p>

)}



</>

) : (

<div className="py-16 text-center">

<Search className="mx-auto h-10 w-10 text-muted-foreground/30 mb-4" />

<p className="text-muted-foreground">

Start typing to search articles.

</p>

</div>

)}


</div>

);

};

export default SearchPage;
>>>>>>> d9d42a9ad3414c393c0c8b4164ef6c1c415a8baf
