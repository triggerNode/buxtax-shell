import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load new pages
const Landing = lazy(() => import("./pages/Landing"));
const SignIn = lazy(() => import("./pages/SignIn"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const Account = lazy(() => import("./pages/Account"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
              <Landing />
            </Suspense>
          } />
          <Route path="/signin" element={
            <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
              <SignIn />
            </Suspense>
          } />
          <Route path="/thank-you" element={
            <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
              <ThankYou />
            </Suspense>
          } />
          <Route path="/account" element={
            <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
              <Account />
            </Suspense>
          } />
          <Route path="/app/*" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
