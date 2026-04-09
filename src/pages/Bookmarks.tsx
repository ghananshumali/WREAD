import { useEffect, useState } from "react";
import ArticleCard from "@/components/ArticleCard";
import { Bookmark } from "lucide-react";
import { API_BASE, getStoredUser, mapPostToArticle, requestJson } from "@/lib/api";

const Bookmarks = () => {
  const [saved, setSaved] = useState<any[]>([]);
  const user = getStoredUser();

  useEffect(() => {
    if (!user?._id) return;
    requestJson(`${API_BASE}/post/saved/${user._id}`)
      .then((data) => setSaved(data || []))
      .catch((err) => console.log(err));
  }, [user?._id]);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10 md:px-6">
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
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
