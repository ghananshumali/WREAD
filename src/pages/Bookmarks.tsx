import { useEffect, useState } from "react";
import ArticleCard from "@/components/ArticleCard";
import { Bookmark, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { API_BASE, getStoredUser, mapPostToArticle, requestJson } from "@/lib/api";

const Bookmarks = () => {
  const [saved, setSaved] = useState<any[]>([]);
  const user = getStoredUser();

  useEffect(() => {
    if (!user?._id) return;
    requestJson(`${API_BASE}/post/saved/${user._id}`)
      .then(data => setSaved(data || []))
      .catch(err => console.log(err));
  }, [user?._id]);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10 md:px-6">

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
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
