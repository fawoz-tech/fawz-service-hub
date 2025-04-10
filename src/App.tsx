
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import JobManagement from "./pages/JobManagement";
import ServiceManagement from "./pages/ServiceManagement";
import TeamManagement from "./pages/TeamManagement";
import Calendar from "./pages/Calendar";
import Messages from "./pages/Messages";
import Locations from "./pages/Locations";
import FinancialDashboard from "./pages/FinancialDashboard";
import Payments from "./pages/Payments";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/jobs" element={<JobManagement />} />
          <Route path="/services" element={<ServiceManagement />} />
          <Route path="/team" element={<TeamManagement />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/financials" element={<FinancialDashboard />} />
          <Route path="/payments" element={<Payments />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
