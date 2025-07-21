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
import ManageApplications from "./pages/admin/ManageApplications";
import ManageCompanies from "./pages/admin/ManageCompanies";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

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
              <Route path="settings" element={<AdminSettings />} />
              <Route path="manage-companies" element={<ManageCompanies />} />
              <Route path="edit-users" element={<ManageApplications />} />
            </Route>
            <Route
              path="/dashboard"
              element={<Navigate to="/admin" replace />}
            />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
