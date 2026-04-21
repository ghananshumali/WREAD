/**
 * Index — redirects to the Landing page.
 * This file exists as a fallback route entry; the actual UI lives in Landing.tsx.
 */
import { Navigate } from "react-router-dom";

const Index = () => <Navigate to="/" replace />;

export default Index;
