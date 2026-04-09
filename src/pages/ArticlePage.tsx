import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Bookmark, Share2, MessageCircle, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { API_BASE, API_HOST, authHeaders, getStoredUser, placeholderImageFromTitle, requestJson, resolveImageUrl } from "@/lib/api";

const ArticlePage = () => {

const { id } = useParams();

const [post,setPost] = useState<any>(null);

const [liked,setLiked] = useState(false);

const [likes,setLikes] = useState<string[]>([]);

const [bookmarked,setBookmarked] = useState(false);

const [comment,setComment] = useState("");

const [comments,setComments] = useState<any[]>([]);
const currentUser = getStoredUser();
const postAuthorId = post?.author?._id || post?.userId?._id || post?.userId;
const isOwner = Boolean(currentUser && post && String(currentUser._id) === String(postAuthorId));


// DELETE POST

const handleDelete = async () => {

const confirmDelete = confirm("Delete this article?");

if(!confirmDelete) return;

try{

await requestJson(`${API_BASE}/post/${post._id}`,{
method:"DELETE",
headers:{
...authHeaders()
}
});

alert("Article deleted");

window.location.href="/feed";

}catch(err){

console.log(err);

alert("Error deleting article");

}

};


// LIKE POST

const handleLike = async ()=>{

const user = getStoredUser();

if(!user){

alert("Login required");

return;

}

const res = await fetch(

`${API_BASE}/post/like/${post._id}`,

{

method:"PUT",

headers:{
"Content-Type":"application/json",
...authHeaders()
},

body:JSON.stringify({})

}

);

const data = await res.json();
if (!res.ok) {
alert(data.message || "Could not update like");
return;
}

setLikes(data);

setLiked(

data.includes(user._id)

);

};


// CREATE COMMENT

const handleComment = async ()=>{

const user = getStoredUser();

if(!user){

alert("Login required");

return;

}

await requestJson(`${API_BASE}/comment/create`,{

method:"POST",

headers:{
"Content-Type":"application/json",
...authHeaders()
},

body:JSON.stringify({

content:comment,
postId:id

})

});

setComment("");


const data = await requestJson(`${API_BASE}/comment/${id}`);
setComments(data);

};


// FETCH POST

useEffect(()=>{

requestJson(`${API_BASE}/post/${id}`)
.then(data=>{

setPost(data);

setLikes(data.likes || []);

const user = getStoredUser() || {};

setLiked(

data.likes?.includes(user._id)

);

if (user?._id) {
requestJson(`${API_BASE}/user/bookmarks/${user._id}`)
.then((bookmarkIds) => setBookmarked(Array.isArray(bookmarkIds) && bookmarkIds.includes(data._id)))
.catch((err) => console.log(err));
}

})

.catch(err=>console.log(err));

},[id]);


// FETCH COMMENTS

useEffect(()=>{

requestJson(`${API_BASE}/comment/${id}`)
.then(data=>setComments(data))

.catch(err=>console.log(err));

},[id]);


if(!post){

return (

<div className="container mx-auto px-4 py-20 text-center text-muted-foreground">

Loading article...

</div>

);

}


const date = new Date(post.createdAt).toLocaleDateString(

"en-US",

{

month:"long",

day:"numeric",

year:"numeric"

}

);


return (

<div className="container mx-auto max-w-3xl px-4 py-10 md:px-6">


<header className="mb-8 space-y-4">


<div className="flex flex-wrap gap-2">

{post.tags?.map((tag:string)=>(

<span

key={tag}

className="rounded-full bg-accent px-3 py-0.5 text-xs font-medium text-accent-foreground"

>

{tag}

</span>

))}

</div>


<div className="flex items-center gap-2">


<h1 className="font-display text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl flex-1">

{post.title}

</h1>


{isOwner && <Button

variant="outline"

size="sm"

className="rounded-full text-xs flex items-center gap-1.5"

onClick={()=>window.location.href=`/write/${post._id}`}

>

<Pencil className="h-3.5 w-3.5"/>

Edit

</Button>}


{isOwner && <Button

variant="outline"

size="sm"

className="rounded-full text-xs text-destructive border-destructive hover:bg-destructive hover:text-white flex items-center gap-1.5"

onClick={handleDelete}

>

<Trash2 className="h-3.5 w-3.5"/>

Delete

</Button>}


</div>


{post.subtitle && (

<p className="text-lg text-muted-foreground leading-relaxed">

{post.subtitle}

</p>

)}


<div className="text-sm text-muted-foreground">

{date}
 · {post.author?.username || "Author"} · {post.readingTime || 1} min read

</div>


</header>


<div className="mb-10 aspect-[2/1] overflow-hidden rounded-lg bg-accent">
<img
src={resolveImageUrl(post.coverImage || post.image) || placeholderImageFromTitle(post.title)}
alt={post.title}
className="h-full w-full object-cover"
/>
</div>


<div className="prose-article whitespace-pre-line">

{post.content}

</div>


<div className="mt-10 flex items-center justify-between border-t border-b py-4">


<div className="flex items-center gap-4">


<button

onClick={handleLike}

className={`flex items-center gap-1.5 text-sm transition-colors ${

liked

? "text-primary"

: "text-muted-foreground hover:text-foreground"

}`}

>


<Heart

className={`h-5 w-5 ${

liked

? "fill-primary"

: ""

}`}

/>


{likes.length}


</button>


<button

className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"

>

<MessageCircle className="h-5 w-5"/>

Comment

</button>


</div>


<div className="flex items-center gap-3">


<button

onClick={async ()=>{
const user = getStoredUser();
if(!user){
alert("Login required");
return;
}
try{
const res = await fetch(`${API_BASE}/user/bookmark/${user._id}`,{
method:"PUT",
headers:{
"Content-Type":"application/json",
...authHeaders()
},
body:JSON.stringify({ postId: post._id })
});
const data = await res.json();
setBookmarked(Array.isArray(data) && data.includes(post._id));
}catch(err){
console.log(err);
}
}}

className={`transition-colors ${

bookmarked

? "text-primary"

: "text-muted-foreground hover:text-foreground"

}`}

>


<Bookmark

className={`h-5 w-5 ${

bookmarked

? "fill-primary"

: ""

}`}

/>


</button>


<button className="text-muted-foreground hover:text-foreground transition-colors">

<Share2 className="h-5 w-5"/>

</button>


</div>


</div>


<div className="mt-10">


<h3 className="font-display text-xl font-bold text-foreground mb-4">

Comments

</h3>


<div className="rounded-lg border p-4">


<textarea

value={comment}

onChange={(e)=>setComment(e.target.value)}

placeholder="Share your thoughts..."

className="w-full resize-none border-0 bg-transparent text-sm text-foreground focus:outline-none"

rows={3}

/>


<div className="flex justify-end mt-2">


<Button

variant="hero"

size="sm"

onClick={handleComment}

>

Comment

</Button>


</div>


</div>


<div className="mt-6 space-y-4">


{comments.map((c)=>(


<div

key={c._id}

className="border rounded-lg p-3"

>


<p>{c.content}</p>


<p className="text-xs text-muted-foreground mt-1">


{c.authorName ? `${c.authorName} · ` : ""}
{new Date(c.createdAt).toDateString()}


</p>
{currentUser?._id && String(c.userId?._id || c.userId) === String(currentUser._id) && (
<div className="mt-2">
<Button
variant="outline"
size="sm"
onClick={async () => {
try {
await requestJson(`${API_BASE}/comment/${c._id}`, {
method: "DELETE",
headers: { ...authHeaders() }
});
setComments((prev) => prev.filter((item) => item._id !== c._id));
} catch (err) {
console.log(err);
}
}}
>
Delete
</Button>
</div>
)}


</div>


))}


</div>


</div>


</div>

);

};

export default ArticlePage;