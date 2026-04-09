import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState,useEffect } from "react";
import {
Bold,
Italic,
Underline,
List,
ListOrdered,
Quote,
Code,
Image,
Link as LinkIcon,
Heading2,
Save
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate,useParams } from "react-router-dom";
import { API_BASE, authHeaders, getStoredUser, requestJson, resolveImageUrl } from "@/lib/api";

const toolbar = [
{ icon: Heading2,label:"Heading" },
{ icon: Bold,label:"Bold" },
{ icon: Italic,label:"Italic" },
{ icon: Underline,label:"Underline" },
{ icon: List,label:"Bullet list" },
{ icon: ListOrdered,label:"Numbered list" },
{ icon: Quote,label:"Quote" },
{ icon: Code,label:"Code" },
{ icon: Image,label:"Image" },
{ icon: LinkIcon,label:"Link" }
];

const Write = () => {

const navigate = useNavigate();

const { id } = useParams();

const isEdit = Boolean(id);

const [title,setTitle] = useState("");
const [subtitle,setSubtitle] = useState("");
const [content,setContent] = useState("");
const [tags,setTags] = useState<string[]>([]);
const [tagInput,setTagInput] = useState("");
const [coverImage,setCoverImage] = useState("");

useEffect(()=>{

if(isEdit){

requestJson(`${API_BASE}/post/${id}`)

.then(data=>{

setTitle(data.title);
setSubtitle(data.subtitle || "");
setContent(data.content);
setTags(data.tags || []);
setCoverImage(data.coverImage || "");

});

}

},[id,isEdit]);

const addTag = ()=>{

const t = tagInput.trim();

if(t && !tags.includes(t) && tags.length<5){

setTags([...tags,t]);

setTagInput("");

}

};

const handleImageUpload = async (e:any)=>{

const file = e.target.files[0];

if(!file) return;

const formData = new FormData();

formData.append("image", file);

try{

const data = await requestJson(`${API_BASE}/post/upload`,{
method:"POST",
headers:{
...authHeaders()
},
body:formData
});

setCoverImage(data.image);

toast.success("Image uploaded");

}catch(err){

console.log(err);

toast.error("Upload failed");

}

};

const handlePublish = async ()=>{

const user = getStoredUser();

if(!user){

toast.error("Please login first");

navigate("/login");

return;

}

if(!title || !content){

toast.error("Title and content required");

return;

}

try{

const url = isEdit
? `${API_BASE}/post/${id}`
: `${API_BASE}/post/create`;

const method = isEdit ? "PUT" : "POST";

const res = await fetch(url,{

method,

headers:{
"Content-Type":"application/json",
...authHeaders()
},

body:JSON.stringify({

title,
subtitle,
content,
tags,
coverImage
})

});

const data = await res.json();

toast.success(isEdit ? "Article updated" : "Article published");

navigate(`/article/${data._id}`);

}catch(err){

console.log(err);

toast.error("Error publishing article");

}

};

return (

<div className="container mx-auto max-w-3xl px-4 py-8 md:px-6">

<div className="flex items-center justify-between mb-8">

<h1 className="font-display text-xl font-bold text-foreground">

{isEdit ? "Edit article" : "Write"}

</h1>

<div className="flex gap-2">

<Button
variant="outline"
size="sm"
className="gap-1.5"
onClick={()=>toast.success("Draft saved")}
>

<Save className="h-3.5 w-3.5"/>

Save draft

</Button>

<Button
variant="hero"
size="sm"
onClick={handlePublish}
>

{isEdit ? "Update" : "Publish"}

</Button>

</div>

</div>

<div className="space-y-4">

<Input
value={title}
onChange={(e)=>setTitle(e.target.value)}
placeholder="Title"
className="border-0 bg-transparent p-0 font-display text-3xl font-bold placeholder:text-muted-foreground/50 focus-visible:ring-0 md:text-4xl"
/>

<Input
value={subtitle}
onChange={(e)=>setSubtitle(e.target.value)}
placeholder="Subtitle (optional)"
className="border-0 bg-transparent p-0 text-lg text-muted-foreground placeholder:text-muted-foreground/40 focus-visible:ring-0"
/>

<input
type="file"
accept="image/*"
onChange={handleImageUpload}
className="text-sm text-muted-foreground mt-2"
/>

<div className="flex flex-wrap gap-1 border-t border-b py-2">

{toolbar.map(({icon:Icon,label})=>(

<button
key={label}
title={label}
className="flex h-8 w-8 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
>

<Icon className="h-4 w-4"/>

</button>

))}

</div>

<textarea
value={content}
onChange={(e)=>setContent(e.target.value)}
placeholder="Tell your story..."
className="min-h-[400px] w-full resize-none border-0 bg-transparent text-lg leading-relaxed text-foreground placeholder:text-muted-foreground/40 focus:outline-none"
/>

<div className="border-t pt-6 space-y-3">

<p className="text-sm font-medium text-foreground">

Tags

</p>

<div className="flex flex-wrap gap-2">

{tags.map((t)=>(

<span
key={t}
className="flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
onClick={()=>setTags(tags.filter(x=>x!==t))}
>

{t} ×

</span>

))}

<input
value={tagInput}
onChange={(e)=>setTagInput(e.target.value)}
onKeyDown={(e)=>e.key==="Enter"&&(e.preventDefault(),addTag())}
placeholder={tags.length<5?"Add a tag...":""}
disabled={tags.length>=5}
className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none"
/>

</div>

</div>

</div>

</div>

);

};

export default Write;