import { useState,useEffect } from "react";
import ArticleCard from "@/components/ArticleCard";
import { Search } from "lucide-react";
import { API_BASE, mapPostToArticle, requestJson } from "@/lib/api";
import { Link } from "react-router-dom";

const SearchPage = () => {

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