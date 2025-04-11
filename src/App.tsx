
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import JobManagement from "./pages/JobManagement";
import ServiceManagement from "./pages/ServiceManagement";
import TeamManagement from "./pages/TeamManagement";
import Calendar from "./pages/Calendar";
import Messages from "./pages/Messages";
import Locations from "./pages/Locations";
import FinancialDashboard from "./pages/FinancialDashboard";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import OpenBidding from "./pages/OpenBidding";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <LanguageProvider>
          <Toaster />
          <Sonner />
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
            <Route path="/settings" element={<Settings />} />
            <Route path="/bidding" element={<OpenBidding />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
