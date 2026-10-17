import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import AllProjects from "./pages/AllProjects";
import CaseStudy from "./pages/CaseStudy";
import NotFound from "./pages/NotFound.tsx";
import { WhatsAppContact } from "./features/portfolio/WhatsAppContact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <WhatsAppContact />
        <Analytics />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
