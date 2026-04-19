<<<<<<< HEAD
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Flame, LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { API_BASE, mapPostToArticle, placeholderImageFromTitle, requestJson } from "@/lib/api";
import ArticleCard from "@/components/ArticleCard";
import { SkeletonCard } from "@/components/SkeletonCard";

// Grid card variant — shown in grid view
const GridCard = ({ post }: { post: any }) => {
  const article = mapPostToArticle(post);
  const date = new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return (
    <Link to={`/article/${post._id}`} className="group block rounded-xl border bg-card overflow-hidden shadow-sm card-lift">
      <div className="aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={article.coverImage || placeholderImageFromTitle(article.title)}
          alt={article.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 space-y-2">
        {article.tags[0] && <span className="tag-pill text-[11px]">{article.tags[0]}</span>}
        <h3 className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
          {article.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{article.subtitle}</p>
        <div className="flex items-center justify-between pt-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded-full bg-primary text-[8px] font-bold text-primary-foreground flex items-center justify-center">
              {article.author.name?.[0]?.toUpperCase()}
            </div>
            <span className="font-medium text-foreground/80">{article.author.name}</span>
          </div>
          <span>{date} · {article.readTime}m</span>
        </div>
      </div>
    </Link>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [trendingPosts, setTrendingPosts] = useState<any[]>([]);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [feedType, setFeedType] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [loading, setLoading] = useState(true);
  const [readFilter, setReadFilter] = useState<number | null>(null); // minutes filter

  useEffect(() => {
    setLoading(true);
    const query = new URLSearchParams({
      page: String(page),
      limit: "12",
      ...(activeTag ? { tag: activeTag } : {})
    });
    requestJson(`${API_BASE}/post/all?${query.toString()}`)
      .then(data => {
        setPosts(data.posts || []);
        setPages(data.pagination?.pages || 1);
        if (!trendingPosts.length) setTrendingPosts((data.posts || []).slice(0, 4));
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [activeTag, page]);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    setLoading(true);
    if (feedType === "following" && user) {
      fetch(`${API_BASE}/post/following/${user._id}`)
        .then(res => res.json())
        .then(data => setPosts(data))
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    } else {
      fetch(`${API_BASE}/post/all`)
        .then(res => res.json())
        .then(data => setPosts(data.posts || data))
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [feedType]);

  const topics = Array.from(new Set(posts.flatMap(p => p.tags || [])));

  // Client-side read time filter
  const filtered = readFilter
    ? posts.filter(p => (p.readingTime || 1) <= readFilter)
    : posts;

  const READ_FILTERS = [
    { label: "Any length", val: null },
    { label: "Quick (≤3 min)", val: 3 },
    { label: "Medium (≤8 min)", val: 8 },
    { label: "Long (≤20 min)", val: 20 },
  ];

  return (
    <div className="container mx-auto px-4 py-10 md:px-6">
      <div className="grid gap-12 lg:grid-cols-[1fr_288px]">

        {/* ── Main ─────────────────────────── */}
        <div>
          {/* Tab bar */}
          <div className="flex items-center gap-1 border-b mb-5">
            {["all", "following"].map(type => (
              <button
                key={type}
                onClick={() => setFeedType(type)}
                className={`pb-3 px-1 mr-4 text-sm font-semibold capitalize border-b-2 -mb-[1px] transition-colors ${
                  feedType === type
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {type === "all" ? "For you" : "Following"}
              </button>
            ))}
          </div>

          {/* Filters row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            {/* Topic pills */}
            <div className="flex flex-wrap gap-2 flex-1">
              <button
                onClick={() => { setActiveTag(null); setPage(1); }}
                className={`tag-pill cursor-pointer ${activeTag === null ? "!bg-primary/20 !text-primary font-semibold" : ""}`}
              >All</button>
              {topics.slice(0, 8).map(t => (
                <button
                  key={t}
                  onClick={() => { setActiveTag(t); setPage(1); }}
                  className={`tag-pill cursor-pointer ${activeTag === t ? "!bg-primary/20 !text-primary font-semibold" : ""}`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* View mode + read filter */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Read time filter */}
              <div className="relative group">
                <button className="flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  {readFilter ? `≤${readFilter}m` : "Filter"}
                </button>
                <div className="absolute right-0 top-full mt-1 z-20 hidden group-focus-within:flex group-hover:flex flex-col bg-card border rounded-xl shadow-lg p-1 min-w-[150px]">
                  {READ_FILTERS.map(f => (
                    <button
                      key={String(f.val)}
                      onClick={() => setReadFilter(f.val)}
                      className={`text-left px-3 py-2 text-xs rounded-lg transition-colors ${
                        readFilter === f.val
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid/List toggle */}
              <div className="flex rounded-full border p-0.5 bg-muted/40">
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                    viewMode === "list" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <List className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                    viewMode === "grid" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Read-time filter badge */}
          {readFilter && (
            <div className="mb-4 flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Showing articles ≤{readFilter} min read</span>
              <button onClick={() => setReadFilter(null)} className="text-xs text-primary hover:underline">Clear</button>
            </div>
          )}

          {/* Article list / grid */}
          {loading ? (
            viewMode === "list"
              ? <div className="divide-y">{Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}</div>
              : <div className="grid sm:grid-cols-2 gap-5">{Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-xl border bg-card overflow-hidden animate-pulse">
                    <div className="aspect-[16/10] bg-muted" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 w-3/4 rounded bg-muted" />
                      <div className="h-3 w-full rounded bg-muted" />
                    </div>
                  </div>
                ))}</div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <p className="font-display text-2xl text-muted-foreground/40">Nothing here yet.</p>
              <p className="text-sm text-muted-foreground">Try a different filter or topic.</p>
              <Link to="/write"><button className="mt-4 text-sm text-primary hover:underline font-medium">Write something →</button></Link>
            </div>
          ) : viewMode === "list" ? (
            <div className="divide-y">
              {filtered.map((post, i) => (
                <div key={post._id} className="animate-slide-up" style={{ animationDelay: `${Math.min(i, 6) * 0.05}s` }}>
                  <ArticleCard article={mapPostToArticle(post)} />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-5">
              {filtered.map((post, i) => (
                <div key={post._id} className="animate-slide-up" style={{ animationDelay: `${Math.min(i, 6) * 0.05}s` }}>
                  <GridCard post={post} />
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pages > 1 && !loading && (
            <div className="mt-10 flex items-center justify-center gap-3">
              <button
                disabled={page <= 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full border text-muted-foreground hover:text-foreground hover:border-foreground/40 disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm text-muted-foreground">
                Page <span className="font-semibold text-foreground">{page}</span> of {pages}
              </span>
              <button
                disabled={page >= pages}
                onClick={() => setPage(p => Math.min(pages, p + 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full border text-muted-foreground hover:text-foreground hover:border-foreground/40 disabled:opacity-30 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* ── Sidebar ──────────────────────── */}
        <aside className="hidden lg:block space-y-10">
          {trendingPosts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Flame className="h-4 w-4 text-primary" />
                <p className="eyebrow">Trending now</p>
              </div>
              <div className="space-y-5">
                {trendingPosts.slice(0, 4).map((post, i) => (
                  <Link key={post._id} to={`/article/${post._id}`} className="group flex gap-4 items-start">
                    <span className="font-display text-3xl font-bold text-muted-foreground/20 leading-none mt-0.5 shrink-0 group-hover:text-primary/30 transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        {" · "}{post.readingTime || 1}m read
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {trendingPosts.length > 0 && topics.length > 0 && <div className="h-px bg-border" />}
          {topics.length > 0 && (
            <div>
              <p className="eyebrow mb-4">Explore topics</p>
              <div className="flex flex-wrap gap-2">
                {topics.slice(0, 8).map(t => (
                  <button
                    key={t}
                    onClick={() => { setActiveTag(t); setPage(1); }}
                    className={`tag-pill cursor-pointer ${activeTag === t ? "!bg-primary/20 !text-primary font-semibold" : ""}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* Write CTA card */}
          <div className="rounded-xl border bg-gradient-to-br from-accent/50 to-card p-5 space-y-3">
            <p className="eyebrow">Got something to say?</p>
            <p className="font-display text-lg font-bold text-foreground leading-snug">Write your first story today.</p>
            <p className="text-xs text-muted-foreground">Free forever. No ads. Just writing.</p>
            <Link to="/write">
              <button className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                Start writing <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Feed;
=======
import { useEffect,useState } from "react";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { API_BASE, mapPostToArticle, placeholderImageFromTitle, requestJson } from "@/lib/api";

const Feed = () => {

const [posts,setPosts] = useState<any[]>([]);
const [trendingPosts,setTrendingPosts] = useState<any[]>([]);
const [activeTag,setActiveTag] = useState<string | null>(null);
const [page, setPage] = useState(1);
const [pages, setPages] = useState(1);
const [feedType,setFeedType] = useState("all");

useEffect(()=>{

const query = new URLSearchParams({
page: String(page),
limit: "12",
...(activeTag ? { tag: activeTag } : {})
});

requestJson(`${API_BASE}/post/all?${query.toString()}`)
.then(data=>{
setPosts(data.posts || []);
setPages(data.pagination?.pages || 1);
})

.catch(err=>console.log(err));

},[activeTag, page]);

const user = JSON.parse(localStorage.getItem("user")||"null");

useEffect(()=>{

if(feedType==="following" && user){

fetch(`${API_BASE}/post/following/${user._id}`)

.then(res=>res.json())

.then(data=>setPosts(data))

.catch(err=>console.log(err));

}else{

fetch(`${API_BASE}/post/all`)

.then(res=>res.json())

.then(data=>setPosts(data.posts || data))

.catch(err=>console.log(err));

}

},[feedType]);

const filtered = posts;

const topics = Array.from(
new Set(
posts.flatMap(p=>p.tags || [])
)
);

return (

<div className="container mx-auto px-4 py-8 md:px-6">

<div className="grid gap-10 lg:grid-cols-[1fr_300px]">

<div>

<h1 className="font-display text-2xl font-bold text-foreground mb-6">

Your Feed

</h1>

<div className="mb-6 flex flex-wrap gap-2 overflow-x-auto pb-2">

<Button
variant={activeTag===null?"default":"outline"}
size="sm"
className="rounded-full text-xs"
onClick={()=>{
setActiveTag(null);
setPage(1);
}}
>

All

</Button>

<div className="flex gap-2 mb-4">

<Button
variant={feedType==="all"?"default":"outline"}
size="sm"
onClick={()=>setFeedType("all")}
>

All

</Button>

<Button
variant={feedType==="following"?"default":"outline"}
size="sm"
onClick={()=>setFeedType("following")}
>

Following

</Button>

</div>

{topics.slice(0,8).map((t)=>(

<Button
key={t}
variant={activeTag===t?"default":"outline"}
size="sm"
className="rounded-full text-xs"
onClick={()=>{
setActiveTag(t);
setPage(1);
}}
>

{t}

</Button>

))}

</div>

<div className="divide-y">

{filtered.map((post)=>{
const article = mapPostToArticle(post);
return (

<div
key={post._id}
className="py-6 cursor-pointer transition-colors hover:bg-muted/20"
>

<Link to={`/article/${post._id}`}>

<div className="flex items-start gap-4">
<div className="flex-1">
<h2 className="text-xl font-semibold text-foreground hover:text-primary transition">

{post.title}

</h2>

{post.subtitle && (

<p className="text-muted-foreground mt-1">

{post.subtitle}

</p>

)}

<p className="text-muted-foreground mt-2 line-clamp-3">

{post.subtitle || post.content}

</p>

<div className="text-xs text-muted-foreground mt-2">

{article.author.name} · {new Date(post.createdAt).toDateString()} · {article.readTime} min read

</div>
</div>
<div className="hidden sm:block h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
<img
src={article.coverImage || placeholderImageFromTitle(article.title)}
alt={article.title}
className="h-full w-full object-cover"
/>
</div>
</div>

</Link>

</div>
);})}

</div>

<div className="mt-6 flex items-center justify-center gap-2">
<Button
variant="outline"
size="sm"
disabled={page <= 1}
onClick={() => setPage((p) => Math.max(1, p - 1))}
>
Prev
</Button>
<Button
variant="outline"
size="sm"
disabled={page >= pages}
onClick={() => setPage((p) => Math.min(pages, p + 1))}
>
Next
</Button>
</div>

{filtered.length===0 && (

<p className="py-12 text-center text-muted-foreground">

No articles yet.

</p>

)}

</div>

<aside className="hidden lg:block space-y-8">

<div>

<h3 className="flex items-center gap-2 font-display text-lg font-bold text-foreground mb-4">

<TrendingUp className="h-4 w-4 text-primary"/>

Trending

</h3>

<div className="space-y-4">

{trendingPosts.map((post,i)=>(

<div key={post._id} className="flex gap-3">

<span className="font-display text-2xl font-bold text-muted-foreground/40">

0{i+1}

</span>

<div>

<p className="text-sm font-semibold text-foreground">

{post.title}

</p>

<p className="text-xs text-muted-foreground">

{new Date(post.createdAt).toDateString()}

</p>

</div>

</div>

))}

</div>

</div>

<div>

<h3 className="font-display text-lg font-bold text-foreground mb-3">

Recommended topics

</h3>

<div className="flex flex-wrap gap-2">

{topics.slice(0,6).map((t)=>(

<Button
key={t}
variant="outline"
size="sm"
className="rounded-full text-xs"
onClick={()=>{
setActiveTag(t);
setPage(1);
}}
>

{t}

</Button>

))}

</div>

</div>

</aside>

</div>

</div>

);

};

export default Feed;
>>>>>>> d9d42a9ad3414c393c0c8b4164ef6c1c415a8baf
