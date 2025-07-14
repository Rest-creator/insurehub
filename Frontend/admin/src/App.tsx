
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

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
            
            {/* Authentication Routes */}
            <Route index element={<Login />} />
            {/* Admin Dashboard Routes */}
            <Route path="/admin" element={<AdminDashboard />}>
              <Route index element={<AdminHome />} />
              <Route path="edit-home" element={<EditHome />} />
              <Route path="edit-about" element={<EditAbout />} />
              <Route path="edit-services" element={<EditServices />} />
              <Route path="edit-learning" element={<EditLearningHub />} />
              <Route path="edit-marketplace" element={<EditMarketplace />} />
              <Route path="edit-companies" element={<EditCompanies />} />
              <Route path="edit-commercial" element={<EditCommercial />} />
              <Route path="edit-insure-it" element={<EditInsureIt />} />
              <Route path="edit-claims" element={<EditClaims />} />
              <Route path="edit-users" element={<EditUsers />} />
              <Route path="edit-company-profile" element={<EditCompanyProfile />} />
              <Route path="edit-products" element={<EditProducts />} />
              <Route path="manage-claims" element={<ManageClaims />} />
              <Route path="manage-applications" element={<ManageApplications />} />
            </Route>
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
