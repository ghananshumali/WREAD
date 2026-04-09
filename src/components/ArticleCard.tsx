import { Link } from "react-router-dom";
import type { Article } from "@/lib/mock-data";
import { Bookmark, Heart } from "lucide-react";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

const ArticleCard = ({ article, featured = false }: ArticleCardProps) => {
  const date = new Date(article.publishDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (featured) {
    return (
      <Link to={`/article/${article.id}`} className="group block">
        <article className="grid gap-6 md:grid-cols-2 items-center">
          <div className="aspect-[16/10] overflow-hidden rounded-lg bg-muted">
            {article.coverImage ? (
              <img src={article.coverImage} alt={article.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
            ) : (
              <div className="flex h-full items-center justify-center bg-accent">
                <span className="font-display text-4xl text-accent-foreground/30">W</span>
              </div>
            )}
          </div>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-accent px-3 py-0.5 text-xs font-medium text-accent-foreground">{tag}</span>
              ))}
            </div>
            <h2 className="font-display text-2xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors lg:text-3xl">
              {article.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed">{article.subtitle}</p>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{article.author.name}</span>
              <span>·</span>
              <span>{date}</span>
              <span>·</span>
              <span>{article.readTime} min read</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link to={`/article/${article.id}`} className="group block">
      <article className="flex gap-4 py-5 border-b last:border-b-0">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{article.author.name}</span>
            <span>·</span>
            <span>{date}</span>
          </div>
          <h3 className="font-display text-lg font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{article.subtitle}</p>
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{article.readTime} min read</span>
              {article.tags[0] && (
                <span className="rounded-full bg-accent px-2 py-0.5 text-accent-foreground">{article.tags[0]}</span>
              )}
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Heart className="h-4 w-4" />
              <Bookmark className="h-4 w-4" />
            </div>
          </div>
        </div>
        <div className="hidden sm:block h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
          <div className="flex h-full items-center justify-center bg-accent">
            <span className="font-display text-xl text-accent-foreground/30">W</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;
