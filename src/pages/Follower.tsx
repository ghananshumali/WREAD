<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_BASE } from "@/lib/api";
import { ArrowLeft, Users } from "lucide-react";

const Followers = () => {

  const { id } = useParams();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/user/followers/${id}`)
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [id]);

  return (
    <div className="container mx-auto max-w-xl px-4 py-10 md:px-6">

      {/* Header */}
      <div className="mb-8">
        <Link
          to={`/profile/${id}`}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to profile
        </Link>
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-primary" />
          <h1 className="font-display text-2xl font-bold text-foreground">
            Followers
            {users.length > 0 && (
              <span className="ml-2 text-base font-normal text-muted-foreground">({users.length})</span>
            )}
          </h1>
        </div>
        <div className="mt-4 h-px bg-border" />
      </div>

      {/* User list */}
      {users.length > 0 ? (
        <div className="space-y-1">
          {users.map((user, i) => (
            <Link
              key={user._id}
              to={`/profile/${user._id}`}
              className="group flex items-center gap-4 p-3 rounded-xl hover:bg-muted/60 transition-colors animate-slide-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="h-11 w-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm ring-2 ring-primary/20 shrink-0">
                {user.username?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  {user.username}
                </p>
                {user.bio && (
                  <p className="text-xs text-muted-foreground truncate">{user.bio}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-3">
          <Users className="mx-auto h-10 w-10 text-muted-foreground/20" />
          <p className="font-display text-xl text-muted-foreground/40">No followers yet</p>
        </div>
      )}
    </div>
  );
};

export default Followers;
=======
import { useEffect,useState } from "react";
import { useParams,Link } from "react-router-dom";
import { API_BASE } from "@/lib/api";

const Followers = () => {

const { id } = useParams();

const [users,setUsers] = useState<any[]>([]);

useEffect(()=>{

fetch(`${API_BASE}/user/followers/${id}`)

.then(res=>res.json())

.then(data=>setUsers(data));

},[id]);



return (

<div className="container mx-auto max-w-xl py-10">

<h1 className="text-xl font-bold mb-6">

Followers

</h1>



{users.map(user=>(

<Link

key={user._id}

to={`/profile/${user._id}`}

className="flex items-center gap-3 p-3 border-b hover:bg-muted transition"
>

<div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">

{user.username[0]}

</div>

<p>{user.username}</p>

</Link>

))}

</div>

);

};

export default Followers;
>>>>>>> d9d42a9ad3414c393c0c8b4164ef6c1c415a8baf
