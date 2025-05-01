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
// import Index from "./pages/profilepage/Index";
import PriceForecasting from "./pages/PriceForecasting";
import CropRecommendation from "./pages/CropRecommendation";
import HomePage from "./pages/Home";
import FertilizerRecommendation from "./pages/FertilizerRecommendation";
import DiseaseDetection from "./pages/DiseaseDectection";
import Chatbot from "./pages/Chatbot";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

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
            <Route path="/" element={<PublicRoute><SignUppage /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
            <Route path="/community" element={<PrivateRoute><CommunityPage /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
            <Route path="/price-forecasting" element={<PrivateRoute><PriceForecasting /></PrivateRoute>} />
            <Route path="/crop-recommendation" element={<PrivateRoute><CropRecommendation /></PrivateRoute>} />
            <Route path="/fertilizer-recommendation" element={<PrivateRoute><FertilizerRecommendation /></PrivateRoute>} />
            <Route path="/disease-detection" element={<PrivateRoute><DiseaseDetection /></PrivateRoute>} />
            <Route path="/chatbot" element={<PrivateRoute><Chatbot /></PrivateRoute>} />
            
            {/* <Route path="/index" element={<Index />} /> */}

            <Route path="*" element={<PageNotFound />} />

          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
