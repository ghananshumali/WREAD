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