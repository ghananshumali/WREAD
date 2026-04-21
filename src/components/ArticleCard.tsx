import { Link } from "react-router-dom";
import type { Article } from "@/lib/mock-data";
import { Bookmark, Heart, Clock } from "lucide-react";

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
        <article className="grid gap-8 md:grid-cols-[1fr_0.85fr] items-center rounded-xl overflow-hidden border bg-card shadow-sm hover:shadow-md transition-shadow duration-300">
          {/* Image */}
          <div className="aspect-[16/10] overflow-hidden bg-muted relative">
            {article.coverImage ? (
              <>
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
              </>
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-accent to-muted">
                <span className="font-display text-7xl font-bold text-primary/20 select-none">W</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="space-y-4 p-6 md:pr-8 md:pl-2">
            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>
            )}

            <h2 className="font-display text-2xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors duration-200 lg:text-3xl">
              {article.title}
            </h2>

            <p className="text-muted-foreground leading-relaxed line-clamp-3">
              {article.subtitle}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-3 text-sm pt-1">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground shrink-0">
                {article.author.name?.[0]?.toUpperCase() || "W"}
              </div>
              <span className="font-medium text-foreground">{article.author.name}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">{date}</span>
              <span className="text-muted-foreground">·</span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                {article.readTime} min
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link to={`/article/${article.id}`} className="group block">
      <article className="flex gap-4 py-5 border-hover-accent">
        {/* Text content */}
        <div className="flex-1 space-y-1.5 min-w-0">
          {/* Author & date */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/80 text-[9px] font-semibold text-primary-foreground shrink-0">
              {article.author.name?.[0]?.toUpperCase() || "W"}
            </div>
            <span className="font-medium text-foreground/80">{article.author.name}</span>
            <span>·</span>
            <span>{date}</span>
          </div>

          <h3 className="font-display text-lg font-bold leading-snug text-foreground group-hover:text-primary transition-colors duration-200">
            {article.title}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {article.subtitle}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              {article.tags[0] && (
                <span className="tag-pill text-[11px]">{article.tags[0]}</span>
              )}
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {article.readTime} min
              </span>
            </div>

            <div className="flex items-center gap-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Heart className="h-4 w-4 hover:text-rose-500 transition-colors cursor-pointer" />
              <Bookmark className="h-4 w-4 hover:text-primary transition-colors cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Thumbnail */}
        <div className="hidden sm:flex h-[90px] w-[90px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-accent to-muted border">
          {article.coverImage ? (
            <img
              src={article.coverImage}
              alt={article.title}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <span className="font-display text-2xl font-bold text-primary/25 select-none">W</span>
          )}
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;
