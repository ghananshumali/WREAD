import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ArticleCard from "@/components/ArticleCard";
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