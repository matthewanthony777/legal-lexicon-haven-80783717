
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Collaborate from "./pages/Collaborate";
import AboutUs from "./pages/AboutUs";
import CareerInsights from "./pages/CareerInsights";
import CareerInsightDetail from "./pages/CareerInsightDetail";
import FutureInsights from "./pages/FutureInsights";
import FutureInsightDetail from "./pages/FutureInsightDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:slug" element={<ArticleDetail />} />
            <Route path="/collaborate" element={<Collaborate />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/career-insights" element={<CareerInsights />} />
            <Route path="/career-insights/:slug" element={<CareerInsightDetail />} />
            <Route path="/future-insights" element={<FutureInsights />} />
            <Route path="/future-insights/:slug" element={<FutureInsightDetail />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
