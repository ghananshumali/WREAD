<<<<<<< HEAD
import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/api";
import { FileText, Heart, Eye, MessageCircle, TrendingUp, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const statConfig = [
  { key: "posts",    label: "Articles",  icon: FileText,        color: "text-primary",     bg: "bg-primary/10"    },
  { key: "likes",    label: "Likes",     icon: Heart,           color: "text-rose-500",    bg: "bg-rose-500/10"   },
  { key: "views",    label: "Views",     icon: Eye,             color: "text-sky-500",     bg: "bg-sky-500/10"    },
  { key: "comments", label: "Responses", icon: MessageCircle,   color: "text-amber-500",   bg: "bg-amber-500/10"  },
];

const Stats = () => {

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_BASE}/post/stats/${user._id}`)
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  if (!stats) {
    return (
      <div className="container mx-auto px-4 py-28 text-center space-y-3">
        <div className="font-display text-5xl text-muted-foreground/20 animate-pulse">W</div>
        <p className="text-muted-foreground text-sm">Loading your stats…</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10 md:px-6">

      {/* Header */}
      <div className="mb-10 space-y-1">
        <Link to={`/profile/${user._id}`} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to profile
        </Link>
        <div className="flex items-center gap-3">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h1 className="font-display text-2xl font-bold text-foreground">Your Stats</h1>
        </div>
        <p className="text-sm text-muted-foreground">A summary of your writing activity</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {statConfig.map(({ key, label, icon: Icon, color, bg }) => (
          <div key={key} className="border rounded-xl p-5 bg-card shadow-sm card-lift space-y-3">
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${bg}`}>
              <Icon className={`h-4 w-4 ${color}`} />
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-foreground">{stats[key] ?? 0}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Engagement rate */}
      {stats.posts > 0 && (
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <p className="eyebrow mb-4">Engagement overview</p>
          <div className="space-y-3">
            {[
              { label: "Avg. likes per article", value: (stats.likes / stats.posts).toFixed(1) },
              { label: "Avg. responses per article", value: (stats.comments / stats.posts).toFixed(1) },
            ].map(row => (
              <div key={row.label} className="flex items-center justify-between py-2 border-b last:border-0">
                <span className="text-sm text-muted-foreground">{row.label}</span>
                <span className="font-display font-bold text-foreground">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Stats;
=======
import { useEffect,useState } from "react";
import { API_BASE } from "@/lib/api";

const Stats = () => {

const user = JSON.parse(

localStorage.getItem("user")||"null"

);

const [stats,setStats] = useState<any>(null);

useEffect(()=>{

fetch(`${API_BASE}/post/stats/${user._id}`)

.then(res=>res.json())

.then(data=>setStats(data));

},[]);



if(!stats) return <p>Loading...</p>;



return (

<div className="container mx-auto max-w-3xl py-10">

<h1 className="text-2xl font-bold mb-6">

Your Stats

</h1>



<div className="grid grid-cols-2 md:grid-cols-4 gap-4">

<div className="p-4 border rounded-lg">

<h2 className="text-lg font-bold">

{stats.posts}

</h2>

<p className="text-sm text-muted-foreground">

Posts

</p>

</div>



<div className="p-4 border rounded-lg">

<h2 className="text-lg font-bold">

{stats.likes}

</h2>

<p className="text-sm text-muted-foreground">

Likes

</p>

</div>



<div className="p-4 border rounded-lg">

<h2 className="text-lg font-bold">

{stats.views}

</h2>

<p className="text-sm text-muted-foreground">

Views

</p>

</div>



<div className="p-4 border rounded-lg">

<h2 className="text-lg font-bold">

{stats.comments}

</h2>

<p className="text-sm text-muted-foreground">

Comments

</p>

</div>

</div>

</div>

);

};

export default Stats;
>>>>>>> d9d42a9ad3414c393c0c8b4164ef6c1c415a8baf
