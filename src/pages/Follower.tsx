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