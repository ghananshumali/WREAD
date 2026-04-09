import { useEffect,useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import {
API_BASE,
authHeaders,
getStoredUser,
requestJson
} from "@/lib/api";

const Profile = () => {

const { id } = useParams();

const currentUser = getStoredUser();

const [user,setUser] = useState<any>(null);

const [posts,setPosts] = useState<any[]>([]);

const [followers,setFollowers] = useState(0);

const [following,setFollowing] = useState(0);

const [isFollowing,setIsFollowing] = useState(false);



useEffect(()=>{

if(!id) return;



// load posts of this user
requestJson(`${API_BASE}/post/user/${id}`)

.then(data=>setPosts(data))

.catch(err=>console.log(err));



// load user profile
requestJson(`${API_BASE}/user/${id}`)

.then(data=>{

setUser(data);

setFollowers(data.followers?.length || 0);

setFollowing(data.following?.length || 0);



if(currentUser?._id){

setIsFollowing(

data.followers?.includes(currentUser._id)

);

}

})

.catch(err=>console.log(err));


},[id,currentUser?._id]);



const handleFollow = async ()=>{

if(!currentUser || !id) return;



try{

const res = await fetch(

`${API_BASE}/user/follow/${id}`,

{

method:"PUT",

headers:{

"Content-Type":"application/json",

...authHeaders()

}

}

);



const data = await res.json();



setFollowers(data.followers || 0);

setIsFollowing(data.isFollowing);



}catch(err){

console.log(err);

}

};



const handleEditProfile = async ()=>{

if(!currentUser || !id) return;



const newUsername =

prompt(

"Update username",

user.username

) || user.username;



const newBio =

prompt(

"Update bio",

user.bio || ""

) || user.bio;



try{

const res = await fetch(

`${API_BASE}/user/${id}`,

{

method:"PUT",

headers:{

"Content-Type":"application/json",

...authHeaders()

},

body:JSON.stringify({

username:newUsername,

bio:newBio

})

}

);



const data = await res.json();



setUser(data);



localStorage.setItem(

"user",

JSON.stringify({

...currentUser,

...data

})

);



}catch(err){

console.log(err);

}

};



if(!user){

return (

<div className="container mx-auto px-4 py-20 text-center">

Loading profile...

</div>

);

}



return (

<div className="container mx-auto max-w-3xl px-4 py-10 md:px-6">


{/* PROFILE HEADER */}

<div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start gap-6 mb-10">


<div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground flex-shrink-0">

{user.username?.[0] || "U"}

</div>



<div className="flex-1 space-y-2">


<h1 className="font-display text-2xl font-bold text-foreground">

{user.username}

</h1>



<p className="text-muted-foreground">

{user.email}

</p>



{/* FOLLOWERS / FOLLOWING */}

<div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-muted-foreground">


<span>

<strong className="text-foreground">

{posts.length}

</strong>

 articles

</span>



<Link to={`/followers/${id}`}>

<span className="hover:underline cursor-pointer">

<strong className="text-foreground">

{followers}

</strong>

 followers

</span>

</Link>



<Link to={`/following/${id}`}>

<span className="hover:underline cursor-pointer">

<strong className="text-foreground">

{following}

</strong>

 following

</span>

</Link>


</div>



{/* ACTION BUTTON */}

<div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-2">


{currentUser?._id &&

String(currentUser._id) !== String(id) && (

<Button

variant="hero"

size="sm"

className="rounded-full"

onClick={handleFollow}

>

{isFollowing ? "Following" : "Follow"}

</Button>

)}



{currentUser?._id &&

String(currentUser._id) === String(id) && (

<div className="flex gap-2">

<Button
variant="outline"
size="sm"
className="rounded-full"
onClick={handleEditProfile}
>
Edit profile
</Button>


<Link to="/stats">

<Button
variant="outline"
size="sm"
className="rounded-full"
>
Stats
</Button>

</Link>

</div>

)}


</div>


</div>


</div>



{/* USER POSTS */}

<div>


<h2 className="font-display text-xl font-bold text-foreground mb-4">

Articles ({posts.length})

</h2>



{posts.length>0 ? (

<div className="divide-y">


{posts.map(post=>(

<div

key={post._id}

className="py-6"

>


<Link to={`/article/${post._id}`}>

<h3 className="font-semibold text-lg text-foreground hover:text-primary transition">

{post.title}

</h3>

</Link>



{post.subtitle && (

<p className="text-muted-foreground mt-1">

{post.subtitle}

</p>

)}



<p className="text-muted-foreground mt-2 line-clamp-2">

{post.content}

</p>



<div className="text-xs text-muted-foreground mt-2">

{new Date(post.createdAt).toDateString()}

</div>


</div>

))}


</div>

) : (

<p className="py-12 text-center text-muted-foreground">

No articles yet.

</p>

)}


</div>


</div>

);

};

export default Profile;