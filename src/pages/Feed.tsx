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