
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import LearningHub from "./pages/LearningHub";
import NotFound from "./pages/NotFound";
import Marketplace from "./pages/Marketplace";
import InsuranceCompanies from "./pages/InsuranceCompanies";
import CommercialPrograms from "./pages/CommercialPrograms";
import Dashboard from "./pages/Dashboard";
import InsureIt from "./pages/InsureIt";
import ClaimsManagement from "./pages/ClaimsManagement";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AuthGuard from "./components/auth/AuthGuard";

// Admin Dashboard and Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminHome from "./pages/admin/AdminHome";
import EditHome from "./pages/admin/EditHome";
import EditAbout from "./pages/admin/EditAbout";
import EditServices from "./pages/admin/EditServices";
import EditLearningHub from "./pages/admin/EditLearningHub";
import EditMarketplace from "./pages/admin/EditMarketplace";
import EditCompanies from "./pages/admin/EditCompanies";
import EditCommercial from "./pages/admin/EditCommercial";
import EditInsureIt from "./pages/admin/EditInsureIt";
import EditClaims from "./pages/admin/EditClaims";
import EditUsers from "./pages/admin/EditUsers";
import EditCompanyProfile from "./pages/admin/EditCompanyProfile";
import EditProducts from "./pages/admin/EditProducts";
import ManageClaims from "./pages/admin/ManageClaims";
import ManageApplications from "./pages/admin/ManageApplications";
import InsuranceDocumentUpload from "./pages/InsuranceDocumentUpload";
import { createClient } from '@supabase/supabase-js'

const queryClient = new QueryClient();


const supabaseUrl = 'postgresql://postgres:[YOUR-PASSWORD]@db.dofnznkicmjqeckjlfkv.supabase.co:5432/postgres'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'
const supabase = createClient(supabaseUrl, supabaseKey)

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
            
            {/* Protected Routes */}
            <Route path="/insurance-companies" element={<AuthGuard><InsuranceCompanies /></AuthGuard>} />
            <Route path="/commercial-programs" element={<AuthGuard><CommercialPrograms /></AuthGuard>} />
            <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
            <Route path="/insure-it" element={<AuthGuard><InsureIt /></AuthGuard>} />
            <Route path="/insurance-docs" element={<AuthGuard><InsuranceDocumentUpload /></AuthGuard>} />
            <Route path="/claims-management" element={<AuthGuard><ClaimsManagement /></AuthGuard>} />
            
            {/* Redirects */}
            <Route path="/get-started" element={<Navigate to="/sign-up" replace />} />
            <Route path="/companies" element={<Navigate to="/insurance-companies" replace />} />
            <Route path="/admin-dashboard" element={<Navigate to="/admin" replace />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
