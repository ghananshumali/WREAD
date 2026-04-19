<<<<<<< HEAD
import { useEffect, useState } from "react";
import { SkeletonProfile } from "@/components/SkeletonCard";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { PenLine, BarChart2, Clock } from "lucide-react";
import {
  API_BASE,
  authHeaders,
  getStoredUser,
  requestJson
=======
import { useEffect,useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import {
API_BASE,
authHeaders,
getStoredUser,
requestJson
>>>>>>> d9d42a9ad3414c393c0c8b4164ef6c1c415a8baf
} from "@/lib/api";

const Profile = () => {

<<<<<<< HEAD
  const { id } = useParams();
  const currentUser = getStoredUser();

  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (!id) return;

    requestJson(`${API_BASE}/post/user/${id}`)
      .then(data => setPosts(data))
      .catch(err => console.log(err));

    requestJson(`${API_BASE}/user/${id}`)
      .then(data => {
        setUser(data);
        setFollowers(data.followers?.length || 0);
        setFollowing(data.following?.length || 0);
        if (currentUser?._id) {
          setIsFollowing(data.followers?.includes(currentUser._id));
        }
      })
      .catch(err => console.log(err));

  }, [id, currentUser?._id]);

  const handleFollow = async () => {
    if (!currentUser || !id) return;
    try {
      const res = await fetch(`${API_BASE}/user/follow/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders() }
      });
      const data = await res.json();
      setFollowers(data.followers || 0);
      setIsFollowing(data.isFollowing);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditProfile = async () => {
    if (!currentUser || !id) return;
    const newUsername = prompt("Update username", user.username) || user.username;
    const newBio = prompt("Update bio", user.bio || "") || user.bio;
    try {
      const res = await fetch(`${API_BASE}/user/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ username: newUsername, bio: newBio })
      });
      const data = await res.json();
      setUser(data);
      localStorage.setItem("user", JSON.stringify({ ...currentUser, ...data }));
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-28 text-center space-y-3">
        <div className="font-display text-5xl text-muted-foreground/20 animate-pulse">W</div>
        <p className="text-muted-foreground text-sm">Loading profile…</p>
      </div>
    );
  }

  const isOwnProfile = currentUser?._id && String(currentUser._id) === String(id);

  return (
    <div className="min-h-screen">
      {/* ── Profile hero ──────────────────────── */}
      <div className="border-b" style={{ background: "hsl(var(--secondary) / 0.4)" }}>
        <div className="container mx-auto max-w-3xl px-4 py-12 md:px-6">
          <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start gap-6">

            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground ring-4 ring-background shadow-md">
                {user.username?.[0]?.toUpperCase() || "U"}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-3">
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">{user.username}</h1>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>

              {user.bio && (
                <p className="text-sm text-foreground/80 leading-relaxed max-w-md">{user.bio}</p>
              )}

              {/* Stats strip */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-6 text-sm">
                <div className="text-center sm:text-left">
                  <p className="font-display text-xl font-bold text-foreground">{posts.length}</p>
                  <p className="text-muted-foreground text-xs">Articles</p>
                </div>
                <Link to={`/followers/${id}`} className="text-center sm:text-left hover:opacity-80 transition-opacity">
                  <p className="font-display text-xl font-bold text-foreground">{followers}</p>
                  <p className="text-muted-foreground text-xs">Followers</p>
                </Link>
                <Link to={`/following/${id}`} className="text-center sm:text-left hover:opacity-80 transition-opacity">
                  <p className="font-display text-xl font-bold text-foreground">{following}</p>
                  <p className="text-muted-foreground text-xs">Following</p>
                </Link>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-1">
                {!isOwnProfile && currentUser?._id && (
                  <Button
                    variant={isFollowing ? "outline" : "hero"}
                    size="sm"
                    className="rounded-full px-5"
                    onClick={handleFollow}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                )}
                {isOwnProfile && (
                  <>
                    <Button variant="outline" size="sm" className="rounded-full gap-1.5" onClick={handleEditProfile}>
                      <PenLine className="h-3.5 w-3.5" /> Edit profile
                    </Button>
                    <Link to="/stats">
                      <Button variant="outline" size="sm" className="rounded-full gap-1.5">
                        <BarChart2 className="h-3.5 w-3.5" /> Stats
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Articles ──────────────────────────── */}
      <div className="container mx-auto max-w-3xl px-4 py-10 md:px-6">
        <div className="flex items-center gap-4 mb-8">
          <p className="eyebrow">Articles ({posts.length})</p>
          <div className="flex-1 h-px bg-border" />
          {isOwnProfile && (
            <Link to="/write">
              <button className="text-xs text-primary hover:underline font-semibold flex items-center gap-1">
                <PenLine className="h-3 w-3" /> New article
              </button>
            </Link>
          )}
        </div>

        {posts.length > 0 ? (
          <div className="divide-y">
            {posts.map((post, i) => (
              <div
                key={post._id}
                className="py-6 animate-slide-up border-hover-accent"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <Link to={`/article/${post._id}`} className="group block space-y-1.5">
                  <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h3>
                  {post.subtitle && (
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{post.subtitle}</p>
                  )}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
                    <span>{new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    {post.tags?.slice(0, 2).map((t: string) => (
                      <span key={t} className="tag-pill text-[11px]">{t}</span>
                    ))}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-3">
            <p className="font-display text-2xl text-muted-foreground/30">No articles yet.</p>
            {isOwnProfile && (
              <Link to="/write">
                <button className="text-sm text-primary hover:underline font-medium">Write your first story →</button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
=======
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
>>>>>>> d9d42a9ad3414c393c0c8b4164ef6c1c415a8baf
