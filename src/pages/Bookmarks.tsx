import { useEffect, useState } from "react";
import ArticleCard from "@/components/ArticleCard";
<<<<<<< HEAD
import { Bookmark, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
=======
import { Bookmark } from "lucide-react";
>>>>>>> d9d42a9ad3414c393c0c8b4164ef6c1c415a8baf
import { API_BASE, getStoredUser, mapPostToArticle, requestJson } from "@/lib/api";

const Bookmarks = () => {
  const [saved, setSaved] = useState<any[]>([]);
  const user = getStoredUser();

  useEffect(() => {
    if (!user?._id) return;
    requestJson(`${API_BASE}/post/saved/${user._id}`)
<<<<<<< HEAD
      .then(data => setSaved(data || []))
      .catch(err => console.log(err));
=======
      .then((data) => setSaved(data || []))
      .catch((err) => console.log(err));
>>>>>>> d9d42a9ad3414c393c0c8b4164ef6c1c415a8baf
  }, [user?._id]);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10 md:px-6">
<<<<<<< HEAD

      {/* Header */}
      <div className="mb-10">
        <p className="eyebrow mb-2">Your collection</p>
        <div className="flex items-end justify-between">
          <h1 className="font-display text-3xl font-bold text-foreground">Library</h1>
          {saved.length > 0 && (
            <span className="text-sm text-muted-foreground">{saved.length} saved</span>
          )}
        </div>
        <div className="mt-3 h-px bg-border" />
      </div>

      {saved.length > 0 ? (
        <div className="divide-y animate-slide-up">
          {saved.map(a => (
            <ArticleCard key={a._id} article={mapPostToArticle(a)} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent mx-auto">
            <Bookmark className="h-7 w-7 text-primary" />
          </div>
          <p className="font-display text-xl text-foreground">Your library is empty</p>
          <p className="text-sm text-muted-foreground">Save articles to revisit them anytime.</p>
          <Link to="/feed" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-semibold mt-2">
            Browse articles <ArrowRight className="h-3.5 w-3.5" />
          </Link>
=======
      <div className="flex items-center gap-3 mb-8">
        <Bookmark className="h-5 w-5 text-primary" />
        <h1 className="font-display text-2xl font-bold text-foreground">Your Library</h1>
      </div>

      {saved.length > 0 ? (
        <div className="divide-y">
          {saved.map((a) => <ArticleCard key={a._id} article={mapPostToArticle(a)} />)}
        </div>
      ) : (
        <div className="py-20 text-center">
          <Bookmark className="mx-auto h-10 w-10 text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">No bookmarks yet. Save articles to read later.</p>
>>>>>>> d9d42a9ad3414c393c0c8b4164ef6c1c415a8baf
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
