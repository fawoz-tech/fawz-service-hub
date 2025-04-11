
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
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
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <LanguageProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/jobs" element={<ProtectedRoute><JobManagement /></ProtectedRoute>} />
              <Route path="/services" element={<ProtectedRoute><ServiceManagement /></ProtectedRoute>} />
              <Route path="/team" element={<ProtectedRoute><TeamManagement /></ProtectedRoute>} />
              <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
              <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
              <Route path="/locations" element={<ProtectedRoute><Locations /></ProtectedRoute>} />
              <Route path="/financials" element={<ProtectedRoute><FinancialDashboard /></ProtectedRoute>} />
              <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/bidding" element={<ProtectedRoute><OpenBidding /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
