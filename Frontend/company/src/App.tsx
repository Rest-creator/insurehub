
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "./pages/NotFound";
import CommercialPrograms from "./pages/CommercialPrograms";
import Dashboard from "./pages/Dashboard";
import ClaimsManagement from "./pages/ClaimsManagement";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AuthGuard from "./components/auth/AuthGuard";
import CompanyReports from "./pages/CompanyReports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />          
            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/commercial-programs" element={<AuthGuard><CommercialPrograms /></AuthGuard>} />
            <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
            <Route path="/company/reports" element={<AuthGuard><CompanyReports /></AuthGuard>} />
            <Route path="/company/policy/claims" element={<AuthGuard><ClaimsManagement /></AuthGuard>} />
            {/* Redirects */}
            <Route path="/get-started" element={<Navigate to="/sign-up" replace />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
