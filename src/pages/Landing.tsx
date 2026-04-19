import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ArticleCard from "@/components/ArticleCard";
<<<<<<< HEAD
import { SkeletonCard, SkeletonFeatured } from "@/components/SkeletonCard";
import Footer from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  ArrowRight, BookOpen, PenLine, Zap, Globe, Shield,
  MessageSquare, TrendingUp, Star
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { API_BASE, mapPostToArticle } from "@/lib/api";

const CYCLING_WORDS = ["voice.", "story.", "impact.", "idea.", "home."];

const FEATURES = [
  {
    icon: PenLine,
    title: "Write without friction",
    desc: "A distraction-free editor with live word count, estimated read time, and image uploads — everything you need, nothing you don't.",
  },
  {
    icon: Globe,
    title: "Reach real readers",
    desc: "Articles are surfaced on a curated feed by topic. Your writing finds the people who care about it.",
  },
  {
    icon: MessageSquare,
    title: "Conversations that matter",
    desc: "Readers can respond, like, and bookmark. Build a community around your ideas.",
  },
  {
    icon: Shield,
    title: "Your content, your space",
    desc: "No ads, no algorithmic chaos. Just clean reading and honest writing.",
  },
  {
    icon: TrendingUp,
    title: "Track your growth",
    desc: "See how many people read, liked, and responded to each piece with your personal stats dashboard.",
  },
  {
    icon: Zap,
    title: "Instant publishing",
    desc: "Write and publish in minutes. Tag your article, add a cover, hit publish — that's it.",
  },
];

const HOW_STEPS = [
  { num: "01", title: "Create your account", desc: "Sign up in seconds — no credit card, no setup. Just you and a blank page." },
  { num: "02", title: "Write your first story", desc: "Use the editor to draft, format, and upload a cover image. Preview before you publish." },
  { num: "03", title: "Publish & grow", desc: "Your story goes live instantly. Readers discover it through the feed and topic filters." },
];

const Landing = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [wordIdx, setWordIdx] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const intervalRef = useRef<any>(null);

  // Cycle hero word every 2.5s
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIdx(i => (i + 1) % CYCLING_WORDS.length);
        setWordVisible(true);
      }, 350);
    }, 2500);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    fetch(`${API_BASE}/post/all`)
      .then(res => res.json())
      .then(data => {
        const posts = Array.isArray(data) ? data : data.posts || [];
        setArticles(posts);
        const allTags: string[] = posts.flatMap((p: any) => p.tags || []);
        setTopics([...new Set(allTags)]);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">

      {/* ── Landing Navbar ─────────────────── */}
      <nav className="border-b bg-background/90 backdrop-blur-lg sticky top-0 z-50">
        <div className="h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
          <span className="font-display text-xl font-bold tracking-tight text-foreground flex items-center gap-1.5">
            WREAD
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mb-0.5" />
          </span>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Sign in</Button>
            </Link>
            <Link to="/signup">
              <Button variant="hero" size="sm" className="gap-1.5">
                Get started <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────── */}
      <section className="relative border-b overflow-hidden">
        <div className="absolute top-0 right-0 w-[42%] h-full bg-accent/20 dark:bg-accent/10 -z-10 hidden md:block" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-primary/20 hidden md:block" />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-primary/20 hidden md:block" />
        {/* Decorative large W watermark */}
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 font-display text-[22rem] font-bold text-primary/[0.04] select-none hidden xl:block leading-none">
          W
        </div>

        <div className="container mx-auto px-4 py-24 md:px-6 md:py-36">
          <p className="eyebrow mb-5 animate-slide-up">A space for deep reading &amp; writing</p>

          <h1 className="font-display text-5xl font-bold leading-[1.06] text-foreground md:text-6xl lg:text-[5.5rem] max-w-4xl mb-8 animate-slide-up-d1">
            Where ideas find their{" "}
            <span
              className="relative inline-block text-primary"
              style={{
                transition: "opacity 0.3s ease, transform 0.3s ease",
                opacity: wordVisible ? 1 : 0,
                transform: wordVisible ? "translateY(0)" : "translateY(12px)",
              }}
            >
              <span className="accent-line">{CYCLING_WORDS[wordIdx]}</span>
            </span>
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 max-w-4xl animate-slide-up-d2">
            <p className="text-lg text-muted-foreground leading-relaxed max-w-sm">
              WREAD is a calm, ad-free space for sharing thoughts, ideas, and stories.
              Read deeply. Write freely.
            </p>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link to="/signup">
                <Button variant="hero" size="lg" className="gap-2 shadow-sm">
                  <PenLine className="h-4 w-4" /> Start Writing
                </Button>
              </Link>
              <Link to="/feed">
                <Button variant="hero-outline" size="lg" className="gap-2">
                  <BookOpen className="h-4 w-4" /> Explore Articles
                </Button>
              </Link>
            </div>
          </div>

          {/* Live stats */}
          <div className="mt-14 flex flex-wrap gap-10 text-sm text-muted-foreground border-t pt-8 animate-slide-up-d3">
            {[
              { label: "Writers", value: "1K+" },
              { label: "Articles published", value: loading ? "—" : `${articles.length}+` },
              { label: "Topics covered", value: loading ? "—" : `${topics.length}+` },
              { label: "Always free", value: "100%" },
            ].map(s => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold text-foreground">{s.value}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────── */}
      <section className="border-b py-20" style={{ background: "hsl(var(--secondary)/0.3)" }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-4 mb-12">
            <p className="eyebrow">How it works</p>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {HOW_STEPS.map((step, i) => (
              <div
                key={step.num}
                className="animate-slide-up space-y-3"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="flex items-center gap-3">
                  <span className="font-display text-5xl font-bold text-primary/20">{step.num}</span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured article ─────────────────── */}
      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="flex items-center gap-4 mb-8">
          <p className="eyebrow">Featured story</p>
          <div className="flex-1 h-px bg-border" />
        </div>
        {loading
          ? <SkeletonFeatured />
          : articles.length > 0 && <ArticleCard article={mapPostToArticle(articles[0])} featured />
        }
      </section>

      {/* ── Recent stories ───────────────────── */}
      <section className="container mx-auto px-4 pb-16 md:px-6">
        <div className="flex items-center gap-4 mb-6">
          <p className="eyebrow">Recent stories</p>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="divide-y">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : articles.slice(1, 5).map((post, i) => (
                <div key={post._id} className="animate-slide-up" style={{ animationDelay: `${i * 0.08}s` }}>
                  <ArticleCard article={mapPostToArticle(post)} />
                </div>
              ))
          }
        </div>
        <div className="mt-8 text-center">
          <Link to="/feed">
            <Button variant="outline" className="gap-2 rounded-full px-6">
              View all articles <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Why WREAD features ───────────────── */}
      <section className="border-t border-b py-20" style={{ background: "hsl(var(--secondary)/0.25)" }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-4 mb-12">
            <p className="eyebrow">Why WREAD</p>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="rounded-xl border bg-card p-6 shadow-sm card-lift space-y-3 animate-slide-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Topics ───────────────────────────── */}
      {topics.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center gap-4 mb-8">
              <p className="eyebrow">Explore topics</p>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="flex flex-wrap gap-3">
              {topics.slice(0, 12).map(t => (
                <Link key={t} to={`/feed?tag=${t}`}>
                  <span className="tag-pill cursor-pointer">{t}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Banner ───────────────────────── */}
      <section className="border-t py-20 bg-foreground dark:bg-card">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-6">
          <Star className="mx-auto h-8 w-8 text-primary" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-background dark:text-foreground max-w-xl mx-auto leading-tight">
            Ready to share your story with the world?
          </h2>
          <p className="text-background/60 dark:text-muted-foreground max-w-md mx-auto text-base">
            Join writers who've found their voice on WREAD. It's free, it's yours.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link to="/signup">
              <Button variant="hero" size="lg" className="gap-2">
                <PenLine className="h-4 w-4" /> Start writing for free
              </Button>
            </Link>
            <Link to="/feed">
              <Button size="lg" className="gap-2 bg-background/10 dark:bg-secondary text-background dark:text-foreground hover:bg-background/20 border-background/20 border">
                <BookOpen className="h-4 w-4" /> Browse articles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
=======
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { useEffect,useState } from "react";
import { API_BASE, mapPostToArticle } from "@/lib/api";

const Landing = () => {

const [articles,setArticles] = useState<any[]>([]);
const [topics,setTopics] = useState<string[]>([]);



useEffect(()=>{

fetch(`${API_BASE}/post/all`)

.then(res=>res.json())

.then(data=>{

const posts = Array.isArray(data) ? data : data.posts || [];

setArticles(posts);


// extract tags dynamically

const allTags:string[] = posts.flatMap((p:any)=>p.tags || []);

setTopics([...new Set(allTags)]);


})

.catch(err=>console.log(err));

},[]);



return (

<div className="min-h-screen">


{/* Navbar */}

<nav className="border-b bg-background/80 backdrop-blur-md">

<div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">

<span className="font-display text-xl font-bold tracking-tight text-foreground">

WREAD

</span>


<div className="flex items-center gap-2">

<Link to="/login">

<Button variant="ghost" size="sm">

Sign in

</Button>

</Link>



<Link to="/signup">

<Button variant="hero" size="sm">

Get started

</Button>

</Link>

</div>

</div>

</nav>



{/* Hero */}

<section className="border-b">

<div className="container mx-auto px-4 py-20 md:px-6 md:py-28">

<div className="max-w-2xl space-y-6">

<h1 className="font-display text-5xl font-bold leading-[1.1] text-foreground md:text-6xl lg:text-7xl">

Where ideas<br/>find their voice.

</h1>



<p className="text-lg text-muted-foreground leading-relaxed max-w-md">

WREAD is a calm space for sharing thoughts, ideas, and stories.

Read deeply. Write freely.

</p>



<div className="flex flex-wrap gap-3 pt-2">

<Link to="/signup">

<Button variant="hero" size="lg" className="gap-2">

Start Writing

<ArrowRight className="h-4 w-4"/>

</Button>

</Link>



<Link to="/feed">

<Button variant="hero-outline" size="lg">

Explore Articles

</Button>

</Link>

</div>

</div>

</div>

</section>



{/* Featured */}

<section className="container mx-auto px-4 py-16 md:px-6">

<h2 className="font-display text-2xl font-bold text-foreground mb-8">

Featured

</h2>



{articles.length>0 && (

<ArticleCard

article={mapPostToArticle(articles[0])}

featured

/>

)}

</section>



{/* Recent Articles */}

<section className="container mx-auto px-4 pb-16 md:px-6">

<h2 className="font-display text-2xl font-bold text-foreground mb-4">

Recent stories

</h2>



<div className="divide-y">

{articles.slice(1,5).map(post=>(

<ArticleCard

key={post._id}

article={mapPostToArticle(post)}

/>

))}

</div>



<div className="mt-6 text-center">

<Link to="/feed">

<Button variant="outline" className="gap-2">

View all articles

<ArrowRight className="h-4 w-4"/>

</Button>

</Link>

</div>

</section>



{/* Topics */}

<section className="border-t bg-secondary/30 py-16">

<div className="container mx-auto px-4 md:px-6">

<h2 className="font-display text-2xl font-bold text-foreground mb-6">

Explore topics

</h2>



<div className="flex flex-wrap gap-3">

{topics.slice(0,8).map(t=>(

<Link key={t} to={`/feed?tag=${t}`}>

<Button

variant="outline"

size="sm"

className="rounded-full"

>

{t}

</Button>

</Link>

))}

</div>

</div>

</section>



<Footer/>

</div>

);

};

export default Landing;
>>>>>>> d9d42a9ad3414c393c0c8b4164ef6c1c415a8baf
