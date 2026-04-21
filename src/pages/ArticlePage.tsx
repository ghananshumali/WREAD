import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Heart, Bookmark, Share2, MessageCircle, Pencil, Trash2,
  Clock, ArrowLeft, Check, UserPlus, UserCheck
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import {
  API_BASE, authHeaders, getStoredUser,
  placeholderImageFromTitle, requestJson, resolveImageUrl
} from "@/lib/api";
import { ReadingProgress } from "@/components/ReadingProgress";
import { useReadingProgress } from "@/hooks/useReadingProgress";

const ArticlePage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState<string[]>([]);
  const [likeAnim, setLikeAnim] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  const [floatingVisible, setFloatingVisible] = useState(false);
  const [authorFollowing, setAuthorFollowing] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const currentUser = getStoredUser();
  const postAuthorId = post?.author?._id || post?.userId?._id || post?.userId;
  const isOwner = Boolean(currentUser && post && String(currentUser._id) === String(postAuthorId));
  const progress = useReadingProgress();
  const [summary, setSummary] = useState("");

  // Show floating bar after scrolling past hero header
  useEffect(() => {
    const onScroll = () => setFloatingVisible(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLike = async () => {
    const user = getStoredUser();
    if (!user) { alert("Login required"); return; }
    setLikeAnim(true);
    setTimeout(() => setLikeAnim(false), 600);
    const res = await fetch(`${API_BASE}/post/like/${post._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({})
    });
    const data = await res.json();
    if (!res.ok) { alert(data.message || "Could not update like"); return; }
    setLikes(data);
    setLiked(data.includes(user._id));
  };

  const handleBookmark = async () => {
    const user = getStoredUser();
    if (!user) { alert("Login required"); return; }
    try {
      const res = await fetch(`${API_BASE}/user/bookmark/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ postId: post._id })
      });
      const data = await res.json();
      setBookmarked(Array.isArray(data) && data.includes(post._id));
    } catch (err) { console.log(err); }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this article?")) return;
    try {
      await requestJson(`${API_BASE}/post/${post._id}`, {
        method: "DELETE",
        headers: { ...authHeaders() }
      });
      alert("Article deleted");
      window.location.href = "/feed";
    } catch (err) { console.log(err); alert("Error deleting article"); }
  };

  const handleComment = async () => {
    const user = getStoredUser();
    if (!user) { alert("Login required"); return; }
    await requestJson(`${API_BASE}/comment/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ content: comment, postId: id })
    });
    setComment("");
    const data = await requestJson(`${API_BASE}/comment/${id}`);
    setComments(data);
  };

  const handleFollowAuthor = async () => {
    if (!currentUser || !postAuthorId) return;
    try {
      const res = await fetch(`${API_BASE}/user/follow/${postAuthorId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders() }
      });
      const data = await res.json();
      setAuthorFollowing(data.isFollowing);
    } catch (err) { console.log(err); }
  };

  useEffect(() => {
    requestJson(`${API_BASE}/post/${id}`)
      .then(data => {
        setPost(data);
        setLikes(data.likes || []);
        const user = getStoredUser() || {};
        setLiked(data.likes?.includes(user._id));
        if (user?._id) {
          requestJson(`${API_BASE}/user/bookmarks/${user._id}`)
            .then(ids => setBookmarked(Array.isArray(ids) && ids.includes(data._id)))
            .catch(() => {});
          // Check if following author
          const authorId = data.author?._id || data.userId?._id || data.userId;
          if (authorId && String(user._id) !== String(authorId)) {
            requestJson(`${API_BASE}/user/${authorId}`)
              .then(u => setAuthorFollowing(u.followers?.includes(user._id)))
              .catch(() => {});
          }
        }
      })
      .catch(err => console.log(err));
  }, [id]);

  useEffect(() => {
    requestJson(`${API_BASE}/comment/${id}`)
      .then(data => setComments(data))
      .catch(err => console.log(err));
  }, [id]);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-28 text-center space-y-3">
        <ReadingProgress />
        <div className="font-display text-6xl font-bold text-primary/10 animate-pulse select-none">W</div>
        <p className="text-muted-foreground text-sm">Loading article…</p>
      </div>
    );
  }

  const date = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric"
  });
  const authorName = post.author?.username || post.userId?.username || "Author";
  const authorInitial = authorName[0]?.toUpperCase();
  const authorId = post.author?._id || post.userId?._id || post.userId;

const generateSummary = async () => {

 try {

  const res = await fetch(`${API_BASE}/ai/summary`, {

   method: "POST",

   headers: {
    "Content-Type": "application/json"
   },

   body: JSON.stringify({
    text: post.content
   })

  });

  const data = await res.json();

  setSummary(data.summary);

 } catch(error){

  console.log(error);

 }

};

  return (
    <div className="min-h-screen bg-background">
      {/* Reading progress bar */}
      <ReadingProgress />

      {/* Sub-header */}
      <div className="border-b bg-background/90 backdrop-blur-md sticky top-[57px] z-40" ref={headerRef}>
        <div className="container mx-auto max-w-3xl px-4 py-2 md:px-6 flex items-center justify-between">
          <Link to="/feed" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to feed
          </Link>
          {isOwner && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-full text-xs gap-1.5"
                onClick={() => window.location.href = `/write/${post._id}`}>
                <Pencil className="h-3.5 w-3.5" /> Edit
              </Button>
              <Button variant="outline" size="sm"
                className="rounded-full text-xs text-destructive border-destructive hover:bg-destructive hover:text-white gap-1.5"
                onClick={handleDelete}>
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* ── Floating Action Bar ─────────────────────────────────── */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        floatingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}>
        <div className="flex items-center gap-1 bg-background/95 dark:bg-card border shadow-xl rounded-full px-4 py-2.5 backdrop-blur-md">
          {/* Progress arc */}
          <div className="relative flex h-8 w-8 items-center justify-center mr-1">
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="13" fill="none" stroke="hsl(var(--border))" strokeWidth="2.5" />
              <circle cx="16" cy="16" r="13" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5"
                strokeDasharray={`${2 * Math.PI * 13}`}
                strokeDashoffset={`${2 * Math.PI * 13 * (1 - progress / 100)}`}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.1s ease" }}
              />
            </svg>
            <span className="text-[9px] font-bold text-foreground">{Math.round(progress)}%</span>
          </div>

          <div className="h-5 w-px bg-border mx-1" />

          {/* Like */}
          <button onClick={handleLike}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              liked ? "text-rose-500 bg-rose-50 dark:bg-rose-950/30" : "text-muted-foreground hover:text-foreground hover:bg-muted"
            } ${likeAnim ? "scale-125" : "scale-100"}`}
          >
            <Heart className={`h-4 w-4 transition-all ${liked ? "fill-rose-500" : ""} ${likeAnim ? "scale-125" : ""}`} />
            <span>{likes.length}</span>
          </button>

          {/* Comment */}
          <button
            onClick={() => document.getElementById("comments-section")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{comments.length}</span>
          </button>

          {/* Bookmark */}
          <button onClick={handleBookmark}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              bookmarked ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-primary" : ""}`} />
          </button>

          {/* Share */}
          <button onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            {copied ? <Check className="h-4 w-4 text-primary" /> : <Share2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <article className="container mx-auto max-w-3xl px-4 py-12 md:px-6 animate-slide-up">
        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag: string) => <span key={tag} className="tag-pill">{tag}</span>)}
          </div>
        )}

        {/* Title */}
        <h1 className="font-display text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl mb-4">
          {post.title}
        </h1>

        {/* Subtitle */}
        {post.subtitle && (
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">{post.subtitle}</p>
        )}

        {/* Author + meta */}
        <div className="flex items-center justify-between mb-10 pb-6 border-b">
          <div className="flex items-center gap-3">
            <Link to={authorId ? `/profile/${authorId}` : "#"}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground ring-2 ring-primary/20 hover:ring-primary/50 transition-all">
                {authorInitial}
              </div>
            </Link>
            <div>
              <Link to={authorId ? `/profile/${authorId}` : "#"}
                className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                {authorName}
              </Link>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{date}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readingTime || 1} min read
                </span>
              </div>
            </div>
          </div>

          {/* Follow author (if not own article) */}
          {currentUser && !isOwner && authorId && (
            <button onClick={handleFollowAuthor}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                authorFollowing
                  ? "border-primary/40 text-primary bg-primary/5"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {authorFollowing
                ? <><UserCheck className="h-3.5 w-3.5" /> Following</>
                : <><UserPlus className="h-3.5 w-3.5" /> Follow</>
              }
            </button>
          )}
        </div>

        {/* Cover image */}
        <div className="mb-10 aspect-[2/1] overflow-hidden rounded-xl bg-accent shadow-sm">
          <img
            src={resolveImageUrl(post.coverImage || post.image) || placeholderImageFromTitle(post.title)}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>


        {/* AI Summary */}
        <div className="mb-10">

          <div className="flex items-center justify-between mb-3">

            <h3 className="text-sm font-semibold text-muted-foreground tracking-wide uppercase">
              AI Summary
            </h3>

            <Button
              variant="outline"
              size="sm"
              onClick={generateSummary}
              className="rounded-full text-xs"
            >
              Generate summary
            </Button>

          </div>


          {summary && (
            <div className="rounded-xl border bg-card p-5 text-sm leading-relaxed shadow-sm">
              {summary}
            </div>
          )}

        </div>


        {/* Content */}
        <div className="prose-article whitespace-pre-line mb-12">
          {post.content}
        </div>

        {/* Content */}
        <div className="prose-article whitespace-pre-line mb-12">{post.content}</div>

        {/* Inline action bar */}
        <div className="flex items-center justify-between border-t border-b py-4 mb-12">
          <div className="flex items-center gap-5">
            <button onClick={handleLike}
              className={`flex items-center gap-2 text-sm font-medium transition-all ${
                liked ? "text-rose-500" : "text-muted-foreground hover:text-foreground"
              } ${likeAnim ? "scale-110" : "scale-100"}`}
            >
              <Heart className={`h-5 w-5 ${liked ? "fill-rose-500" : ""}`} />
              <span>{likes.length}</span>
            </button>
            <button
              onClick={() => document.getElementById("comments-section")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span>{comments.length}</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleBookmark}
              className={`transition-colors ${bookmarked ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
              <Bookmark className={`h-5 w-5 ${bookmarked ? "fill-primary" : ""}`} />
            </button>
            <button onClick={handleShare}
              className="text-muted-foreground hover:text-foreground transition-colors relative"
              title="Copy link">
              {copied
                ? <span className="text-xs font-semibold text-primary flex items-center gap-1"><Check className="h-4 w-4" /> Copied!</span>
                : <Share2 className="h-5 w-5" />
              }
            </button>
          </div>
        </div>

        {/* Author card */}
        {!isOwner && authorId && (
          <div className="mb-12 rounded-xl border bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-sm">
            <Link to={`/profile/${authorId}`}>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground ring-4 ring-primary/15 shrink-0">
                {authorInitial}
              </div>
            </Link>
            <div className="flex-1 min-w-0">
              <Link to={`/profile/${authorId}`}
                className="font-display text-lg font-bold text-foreground hover:text-primary transition-colors">
                {authorName}
              </Link>
              {post.author?.bio && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.author.bio}</p>
              )}
            </div>
            {currentUser && (
              <button onClick={handleFollowAuthor}
                className={`shrink-0 flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full border transition-all ${
                  authorFollowing
                    ? "border-primary/40 text-primary bg-primary/5"
                    : "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                }`}
              >
                {authorFollowing
                  ? <><UserCheck className="h-4 w-4" /> Following</>
                  : <><UserPlus className="h-4 w-4" /> Follow</>
                }
              </button>
            )}
          </div>
        )}

        {/* ── Comments ─────────────────────────── */}
        <section id="comments-section">
          <div className="flex items-center gap-4 mb-6">
            <p className="eyebrow">Responses ({comments.length})</p>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="rounded-xl border bg-card p-5 mb-8 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-primary text-xs font-bold text-primary-foreground flex items-center justify-center shrink-0 mt-0.5">
                {currentUser?.username?.[0]?.toUpperCase() || "?"}
              </div>
              <div className="flex-1">
                <textarea
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="Share your thoughts…"
                  className="w-full resize-none border-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none leading-relaxed min-h-[80px]"
                  rows={3}
                />
                <div className="flex justify-between items-center mt-3 pt-3 border-t">
                  <p className="text-xs text-muted-foreground">{comment.length} characters</p>
                  <Button variant="hero" size="sm" onClick={handleComment} disabled={!comment.trim()}>
                    Post response
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {comments.map(c => (
              <div key={c._id} className="rounded-xl border bg-card p-5 shadow-sm card-lift">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-foreground">
                    {(c.authorName || "A")?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-foreground">{c.authorName || "Anonymous"}</span>
                  <span className="text-muted-foreground text-xs">·</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(c.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
                <p className="text-sm text-foreground leading-relaxed pl-9">{c.content}</p>
                {currentUser?._id && String(c.userId?._id || c.userId) === String(currentUser._id) && (
                  <div className="pl-9 mt-2">
                    <button
                      onClick={async () => {
                        try {
                          await requestJson(`${API_BASE}/comment/${c._id}`, {
                            method: "DELETE", headers: { ...authHeaders() }
                          });
                          setComments(prev => prev.filter(item => item._id !== c._id));
                        } catch (err) { console.log(err); }
                      }}
                      className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
            {comments.length === 0 && (
              <p className="text-center py-8 text-muted-foreground text-sm">No responses yet. Be the first.</p>
            )}
          </div>
        </section>
      </article>
    </div>
  );
};

export default ArticlePage;
