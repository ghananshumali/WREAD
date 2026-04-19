<<<<<<< HEAD
/**
 * Index — redirects to the Landing page.
 * This file exists as a fallback route entry; the actual UI lives in Landing.tsx.
 */
import { Navigate } from "react-router-dom";

const Index = () => <Navigate to="/" replace />;
=======
// Update this page (the content is just a fallback if you fail to update the page)

// IMPORTANT: Fully REPLACE this with your own code
const PlaceholderIndex = () => {
  // PLACEHOLDER: Replace this entire return statement with the user's app.
  // The inline background color is intentionally not part of the design system.
  return (
    <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: '#fcfbf8' }}>
      <img data-lovable-blank-page-placeholder="REMOVE_THIS" src="/placeholder.svg" alt="Your app will live here!" />
    </div>
  );
};

const Index = PlaceholderIndex;
>>>>>>> d9d42a9ad3414c393c0c8b4164ef6c1c415a8baf

export default Index;
