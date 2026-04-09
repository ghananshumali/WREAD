import { topics, articles } from "@/lib/mock-data";
import { Link } from "react-router-dom";
import ArticleCard from "@/components/ArticleCard";

const topicColors = [
  "bg-accent", "bg-primary/10", "bg-secondary", "bg-accent",
  "bg-primary/10", "bg-secondary", "bg-accent", "bg-primary/10",
  "bg-secondary", "bg-accent", "bg-primary/10", "bg-secondary",
];

const Explore = () => (
  <div className="container mx-auto px-4 py-10 md:px-6">
    <h1 className="font-display text-3xl font-bold text-foreground mb-2">Explore Topics</h1>
    <p className="text-muted-foreground mb-8">Discover ideas across every subject.</p>

    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 mb-14">
      {topics.map((t, i) => (
        <div
          key={t}
          className={`${topicColors[i % topicColors.length]} flex items-center justify-center rounded-lg p-6 text-center font-display text-sm font-semibold text-foreground hover:shadow-sm transition-shadow cursor-pointer`}
        >
          {t}
        </div>
      ))}
    </div>

    <h2 className="font-display text-xl font-bold text-foreground mb-4">Popular articles</h2>
    <div className="divide-y max-w-2xl">
      {articles.slice(0, 4).map((a) => <ArticleCard key={a.id} article={a} />)}
    </div>
  </div>
);

export default Explore;
