import "./App.css";
import CommunityPage from "./pages/CommunityPage";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUppage from "./pages/SignUppage.jsx";
import LoginPage from "./pages/LoginPage";
import PageNotFound from "./pages/errorpage/PageNotFound";
import Profile from "./pages/profilepage/profile" 
import Index from "./pages/profilepage/Index";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Routes>
            <Route path="/" element={<SignUppage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/index" element={<Index />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
