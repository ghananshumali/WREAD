import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Navbar from "@/components/Navbar";
import Background from "@/components/Background";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import ArticlePage from "./pages/ArticlePage";
import Write from "./pages/Write";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Bookmarks from "./pages/Bookmarks";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";
import Saved from "./pages/Saved";
import Followers from "./pages/Follower";
import Following from "./pages/Following";
import Stats from "./pages/Stats";

const queryClient = new QueryClient();

const App = () => (

<QueryClientProvider client={queryClient}>

<TooltipProvider>

<Toaster />

<Sonner />

<BrowserRouter>

{/* global animated background */}
<Background />

{/* navbar */}
<Navbar />

{/* routes */}

<Routes>

<Route path="/" element={<Landing />} />

<Route path="/login" element={<Login />} />

<Route path="/signup" element={<Signup />} />

<Route path="/feed" element={<Feed />} />

<Route path="/article/:id" element={<ArticlePage />} />

<Route path="/write" element={<Write />} />

<Route path="/write/:id" element={<Write />} />

<Route path="/profile/:id" element={<Profile />} />

<Route path="/explore" element={<Explore />} />

<Route path="/bookmarks" element={<Bookmarks />} />

<Route path="/saved" element={<Saved />} />

<Route path="/search" element={<SearchPage />} />

<Route path="/followers/:id" element={<Followers />} />

<Route path="/following/:id" element={<Following />} />

<Route path="/stats" element={<Stats />} />

<Route path="*" element={<NotFound />} />

</Routes>

</BrowserRouter>

</TooltipProvider>

</QueryClientProvider>

);

export default App;