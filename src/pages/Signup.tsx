import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_BASE } from "@/lib/api";

const Signup = () => {

  const navigate = useNavigate();

  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSignup = async (e:any) => {

    e.preventDefault();

    try{

      const res = await fetch(`${API_BASE}/auth/signup`,{

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          username,
          email,
          password

        })

      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      alert("Account created successfully");

      navigate("/login");

    }catch(err){

      console.log(err);
      alert("Signup failed");

    }

  };

  return (

    <div className="flex min-h-screen items-center justify-center bg-background px-4">

      <div className="w-full max-w-sm space-y-6">

        <div className="text-center space-y-2">

          <Link to="/" className="font-display text-2xl font-bold text-foreground">
            WREAD
          </Link>

          <p className="text-muted-foreground">
            Create your account
          </p>

        </div>

        <form className="space-y-4" onSubmit={handleSignup}>

          <div className="space-y-2">

            <Label>Name</Label>

            <Input

              placeholder="Your name"

              onChange={(e)=>setUsername(e.target.value)}

            />

          </div>

          <div className="space-y-2">

            <Label>Email</Label>

            <Input

              type="email"

              placeholder="you@example.com"

              onChange={(e)=>setEmail(e.target.value)}

            />

          </div>

          <div className="space-y-2">

            <Label>Password</Label>

            <Input

              type="password"

              placeholder="••••••••"

              onChange={(e)=>setPassword(e.target.value)}

            />

          </div>

          <Button variant="hero" className="w-full mt-2">

            Create account

          </Button>

        </form>

        <p className="text-center text-sm text-muted-foreground">

          Already have an account?{" "}

          <Link to="/login" className="text-primary hover:underline font-medium">

            Sign in

          </Link>

        </p>

      </div>

    </div>

  );

};

export default Signup;