import { topics, articles } from "@/lib/mock-data";
import { Link } from "react-router-dom";
import ArticleCard from "@/components/ArticleCard";

const topicAccents = [
  "from-accent to-muted",
  "from-primary/10 to-accent",
  "from-secondary to-accent",
  "from-muted to-primary/10",
];

const Explore = () => (
  <div className="container mx-auto px-4 py-10 md:px-6">
    <div className="mb-10">
      <p className="eyebrow mb-2">Browse everything</p>
      <h1 className="font-display text-3xl font-bold text-foreground">Explore Topics</h1>
      <p className="text-muted-foreground mt-1">Discover ideas across every subject.</p>
    </div>

    {/* Topic grid */}
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 mb-14">
      {topics.map((t, i) => (
        <Link
          key={t}
          to={`/feed?tag=${t}`}
          className={`bg-gradient-to-br ${topicAccents[i % topicAccents.length]} flex items-center justify-center rounded-xl p-6 text-center font-display text-sm font-semibold text-foreground hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border border-border/50`}
        >
          {t}
        </Link>
      ))}
    </div>

    {/* Popular articles */}
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-6">
        <p className="eyebrow">Popular articles</p>
        <div className="flex-1 h-px bg-border" />
      </div>
      <div className="divide-y">
        {articles.slice(0, 4).map(a => <ArticleCard key={a.id} article={a} />)}
      </div>
    </div>
  </div>
);

export default Explore;
