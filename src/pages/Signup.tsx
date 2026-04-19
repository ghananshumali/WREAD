import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_BASE } from "@/lib/api";
<<<<<<< HEAD
import { ArrowRight } from "lucide-react";
=======
>>>>>>> d9d42a9ad3414c393c0c8b4164ef6c1c415a8baf

const Signup = () => {

  const navigate = useNavigate();
<<<<<<< HEAD
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");
      alert("Account created successfully");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left panel – decorative */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-foreground flex-col justify-between p-12">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, hsl(38 22% 97%) 0, hsl(38 22% 97%) 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/15 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/4" />
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-primary/10 rounded-full blur-2xl translate-y-1/4 translate-x-1/4" />
        <Link to="/" className="relative z-10 font-display text-2xl font-bold text-background flex items-center gap-1.5">
          WREAD
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mb-0.5" />
        </Link>
        <div className="relative z-10 space-y-4">
          <blockquote className="font-display text-3xl font-bold italic text-background leading-snug">
            "Your voice<br />matters here."
          </blockquote>
          <p className="text-background/50 text-sm">Join thousands of thoughtful writers.</p>
        </div>
      </div>

      {/* Right panel – form */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm space-y-8 animate-slide-up">
          <div className="lg:hidden text-center">
            <Link to="/" className="font-display text-2xl font-bold text-foreground inline-flex items-center gap-1.5">
              WREAD<span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mb-0.5" />
            </Link>
          </div>
          <div className="space-y-1">
            <h1 className="font-display text-3xl font-bold text-foreground">Create account</h1>
            <p className="text-muted-foreground text-sm">Start your writing journey today</p>
          </div>
          <form className="space-y-4" onSubmit={handleSignup}>
            <div className="space-y-1.5">
              <Label className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">Name</Label>
              <Input placeholder="Your name" className="h-11 bg-secondary/50" onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">Email</Label>
              <Input type="email" placeholder="you@example.com" className="h-11 bg-secondary/50" onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">Password</Label>
              <Input type="password" placeholder="••••••••" className="h-11 bg-secondary/50" onChange={e => setPassword(e.target.value)} />
            </div>
            <Button variant="hero" className="w-full h-11 mt-2 gap-2">
              Create account <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-semibold">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
=======

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
>>>>>>> d9d42a9ad3414c393c0c8b4164ef6c1c415a8baf
