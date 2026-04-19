import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
<<<<<<< HEAD
import { useState, useEffect, useCallback } from "react";
import {
  Bold, Italic, Underline, List, ListOrdered,
  Quote, Code, Image, Link as LinkIcon, Heading2, Save, X,
  Eye, EyeOff, Clock, Type
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE, authHeaders, getStoredUser, requestJson, resolveImageUrl } from "@/lib/api";

const toolbar = [
  { icon: Heading2, label: "Heading", action: "## " },
  { icon: Bold, label: "Bold", action: "**text**" },
  { icon: Italic, label: "Italic", action: "*text*" },
  { icon: Underline, label: "Underline", action: "__text__" },
  { icon: List, label: "Bullet list", action: "- " },
  { icon: ListOrdered, label: "Numbered list", action: "1. " },
  { icon: Quote, label: "Quote", action: "> " },
  { icon: Code, label: "Code", action: "`code`" },
  { icon: Image, label: "Image", action: "![alt](url)" },
  { icon: LinkIcon, label: "Link", action: "[text](url)" },
];

function estimateReadTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

const Write = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [preview, setPreview] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [titleCount, setTitleCount] = useState(0);

  useEffect(() => { setTitleCount(title.length); }, [title]);

  useEffect(() => {
    if (isEdit) {
      requestJson(`${API_BASE}/post/${id}`)
        .then(data => {
          setTitle(data.title);
          setSubtitle(data.subtitle || "");
          setContent(data.content);
          setTags(data.tags || []);
          setCoverImage(data.coverImage || "");
        });
    }
  }, [id, isEdit]);

  // Keyboard shortcut: Ctrl+S → save draft
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSaveDraft();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [title, content]);

  const handleSaveDraft = useCallback(() => {
    if (!title && !content) return;
    setSavedAt(new Date());
    toast.success("Draft saved");
  }, [title, content]);

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t) && tags.length < 5) {
      setTags([...tags, t]);
      setTagInput("");
    }
  };

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      const data = await requestJson(`${API_BASE}/post/upload`, {
        method: "POST",
        headers: { ...authHeaders() },
        body: formData
      });
      setCoverImage(data.image);
      toast.success("Image uploaded");
    } catch (err) {
      toast.error("Upload failed");
    }
  };

  const handlePublish = async () => {
    const user = getStoredUser();
    if (!user) { toast.error("Please login first"); navigate("/login"); return; }
    if (!title || !content) { toast.error("Title and content required"); return; }
    try {
      const url = isEdit ? `${API_BASE}/post/${id}` : `${API_BASE}/post/create`;
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ title, subtitle, content, tags, coverImage })
      });
      const data = await res.json();
      toast.success(isEdit ? "Article updated!" : "Article published!");
      navigate(`/article/${data._id}`);
    } catch (err) {
      toast.error("Error publishing article");
    }
  };

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const readTime = estimateReadTime(content);
  const charCount = content.length;

  return (
    <div className="min-h-screen bg-background">

      {/* ── Sticky top bar ──────────────────────────────── */}
      <div className="sticky top-[57px] z-40 border-b bg-background/95 backdrop-blur-md">
        <div className="container mx-auto max-w-3xl px-4 py-2 md:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <span className="font-display text-sm font-bold text-foreground truncate">
              {title || (isEdit ? "Editing article" : "New story")}
            </span>
            {/* Live stats */}
            <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Type className="h-3 w-3" />
                {wordCount} words
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                ~{readTime} min read
              </span>
              {savedAt && (
                <span className="text-primary/70">
                  Saved {savedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {/* Preview toggle */}
            <button
              onClick={() => setPreview(p => !p)}
              className={`flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium border transition-colors ${
                preview ? "bg-primary/10 text-primary border-primary/30" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {preview ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">{preview ? "Edit" : "Preview"}</span>
            </button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-muted-foreground hidden sm:flex"
              onClick={handleSaveDraft}
            >
              <Save className="h-3.5 w-3.5" /> Save
              <kbd className="ml-1 h-4 rounded border bg-muted px-1 text-[10px] text-muted-foreground">⌘S</kbd>
            </Button>
            <Button variant="hero" size="sm" onClick={handlePublish} className="gap-1.5">
              {isEdit ? "Update" : "Publish"}
            </Button>
          </div>
        </div>

        {/* Progress bar showing content completeness */}
        <div className="h-0.5 bg-muted">
          <div
            className="h-full bg-primary/40 transition-all duration-500"
            style={{ width: `${Math.min(100, (wordCount / 300) * 100)}%` }}
          />
        </div>
      </div>

      {/* ── Editor area ─────────────────────────────────── */}
      <div className="container mx-auto max-w-3xl px-4 py-10 md:px-6">

        {preview ? (
          /* Preview pane */
          <div className="space-y-6 animate-slide-up">
            {post_tags_preview(tags)}
            <h1 className="font-display text-4xl font-bold text-foreground leading-tight">{title || "Untitled"}</h1>
            {subtitle && <p className="text-xl text-muted-foreground">{subtitle}</p>}
            {coverImage && (
              <div className="aspect-[2/1] overflow-hidden rounded-xl bg-muted">
                <img src={resolveImageUrl(coverImage)} alt="Cover" className="h-full w-full object-cover" />
              </div>
            )}
            <div className="prose-article whitespace-pre-line">{content || <span className="text-muted-foreground/40">No content yet…</span>}</div>
          </div>
        ) : (
          /* Edit pane */
          <div className="space-y-5">
            {/* Title with char count */}
            <div className="relative">
              <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Your story title…"
                maxLength={120}
                className="border-0 bg-transparent p-0 font-display text-3xl font-bold placeholder:text-muted-foreground/25 focus-visible:ring-0 md:text-4xl pr-12"
              />
              <span className={`absolute right-0 top-2 text-xs ${titleCount > 100 ? "text-amber-500" : "text-muted-foreground/40"}`}>
                {titleCount}/120
              </span>
            </div>

            {/* Subtitle */}
            <Input
              value={subtitle}
              onChange={e => setSubtitle(e.target.value)}
              placeholder="Add a subtitle (optional)"
              className="border-0 bg-transparent p-0 text-lg text-muted-foreground placeholder:text-muted-foreground/25 focus-visible:ring-0"
            />

            {/* Cover image */}
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors group">
                <div className="flex h-8 w-8 items-center justify-center rounded-md border group-hover:border-primary group-hover:text-primary transition-colors">
                  <Image className="h-4 w-4" />
                </div>
                <span>{coverImage ? "Change cover" : "Add cover image"}</span>
                <input type="file" accept="image/*" className="sr-only" onChange={handleImageUpload} />
              </label>
              {coverImage && (
                <button onClick={() => setCoverImage("")} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors">
                  <X className="h-3 w-3" /> Remove
                </button>
              )}
            </div>

            {coverImage && (
              <div className="aspect-[2/1] overflow-hidden rounded-xl bg-muted">
                <img src={resolveImageUrl(coverImage)} alt="Cover" className="h-full w-full object-cover" />
              </div>
            )}

            {/* Toolbar */}
            <div className="flex flex-wrap gap-0.5 border-t border-b py-2">
              {toolbar.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  title={label}
                  className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>

            {/* Content textarea */}
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Tell your story… (Ctrl+S to save draft)"
              className="min-h-[420px] w-full resize-none border-0 bg-transparent text-lg leading-[1.8] text-foreground placeholder:text-muted-foreground/25 focus:outline-none font-body"
            />

            {/* Bottom stats bar */}
            <div className="flex items-center gap-5 text-xs text-muted-foreground border-t pt-3">
              <span>{charCount} characters</span>
              <span>{wordCount} words</span>
              <span>~{readTime} min read</span>
            </div>

            {/* Tags */}
            <div className="border-t pt-6 space-y-3">
              <p className="eyebrow">
                Tags
                <span className="normal-case font-normal text-muted-foreground tracking-normal text-xs ml-2">
                  ({tags.length}/5)
                </span>
              </p>
              <div className="flex flex-wrap gap-2 items-center min-h-[32px]">
                {tags.map(t => (
                  <button
                    key={t}
                    onClick={() => setTags(tags.filter(x => x !== t))}
                    className="flex items-center gap-1 tag-pill group"
                  >
                    {t} <X className="h-2.5 w-2.5 opacity-60 group-hover:opacity-100" />
                  </button>
                ))}
                {tags.length < 5 && (
                  <input
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())}
                    placeholder="Add a tag…"
                    className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none min-w-[100px]"
                  />
                )}
              </div>
              {tags.length < 5 && tagInput && (
                <p className="text-xs text-muted-foreground">Press Enter to add</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper: preview tag pills
function post_tags_preview(tags: string[]) {
  if (!tags.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(t => <span key={t} className="tag-pill">{t}</span>)}
    </div>
  );
}

export default Write;
=======
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
>>>>>>> d9d42a9ad3414c393c0c8b4164ef6c1c415a8baf
