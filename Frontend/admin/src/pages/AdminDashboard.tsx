// src/pages/admin/AdminDashboard.jsx
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react"; // Import useEffect
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Pencil,
  LayoutDashboard,
  FileText,
  BookOpen,
  ShoppingBag,
  Building,
  Briefcase,
  Shield,
  FileCheck,
  Home,
  Settings,
  Users,
  Package,
  Building2,
  ClipboardList,
  FileEdit,
} from "lucide-react";
import AuthGuard from "../components/auth/AuthGuard";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarGroup,
  SidebarGroupLabel,
} from "../components/ui/sidebar";
import { Button } from "../components/ui/button";
import { useToast } from "../hooks/use-toast";
// import { permission } from "process"; // This import seems incorrect/unused, let's remove it if not needed

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { toast } = useToast();
  const [pageTitle, setPageTitle] = useState("Admin Dashboard"); // Initial title

  // Define admin menu items, including the new "Manage Companies" and "Settings"
  const adminMenuItems = [
    {
      title: "Dashboard Overview", // Added a general dashboard entry
      path: "/admin",
      icon: LayoutDashboard,
      permission: "admin",
    },
    {
      title: "Users",
      path: "/admin/edit-users",
      icon: Users,
      permission: "admin",
    },
    {
      title: "Manage Companies",
      path: "/admin/manage-companies",
      icon: Building,
      permission: "admin",
    },
    {
      title: "Settings",
      path: "/admin/settings",
      icon: Settings,
      permission: "admin",
    },
    // Add other admin-specific menu items as needed
    // {
    //   title: "Manage Claims",
    //   path: "/admin/manage-claims",
    //   icon: ClipboardList,
    //   permission: "admin",
    // },
    // Example of other potential sections (can uncomment or add more)
    // {
    //   title: "Products",
    //   path: "/admin/edit-products",
    //   icon: Package,
    //   permission: "admin",
    // },
    // {
    //   title: "Reports",
    //   path: "/admin/reports",
    //   icon: FileText,
    //   permission: "admin",
    // },
  ];

  // This effect updates the pageTitle state when the pathname changes,
  // ensuring the header always matches the current route.
  useEffect(() => {
    const currentItem = adminMenuItems.find(item => item.path === pathname);
    if (currentItem) {
      setPageTitle(currentItem.title);
    } else if (pathname === "/admin") {
        setPageTitle("Admin Dashboard"); // Default for base admin path
    } else {
        // Fallback for paths not explicitly in menu, e.g., nested routes or unknown paths
        setPageTitle("Admin Console");
    }
  }, [pathname, adminMenuItems]); // Rerun when pathname or menu items change

  const handleNavigation = (path) => { // Removed 'title' parameter from here as useEffect now handles title
    navigate(path);
    // setPageTitle(title); // This line is no longer needed here due to useEffect
  };

  return (
    <AuthGuard adminOnly>
      <Helmet>
        <title>{pageTitle} - InsureHub Admin</title> {/* Dynamic title */}
        <meta
          name="description"
          content="Admin dashboard for managing InsureHub platform and content"
        />
      </Helmet>

      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center px-2 py-3">
                <Pencil className="h-6 w-6 text-insurance-orange mr-2" />
                <h1 className="text-xl font-bold">InsureHub Admin</h1>
              </div>
            </SidebarHeader>

            <SidebarContent>
              {/* Assuming these are visible for a general admin, otherwise add user role check */}
              <>
                <SidebarGroup>
                  <SidebarGroupLabel>Administration</SidebarGroupLabel>
                  <SidebarMenu>
                    {adminMenuItems.map((item) => (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton
                          isActive={pathname === item.path || (item.path === "/admin" && pathname === "/admin/")} // Handle base path with trailing slash
                          tooltip={item.title}
                          onClick={() => handleNavigation(item.path)}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroup>
              </>
            </SidebarContent>

            <SidebarFooter>
              <div className="p-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    navigate("/");
                    localStorage.removeItem("userData"); // Clear user session
                    toast({
                      title: "Returning to website",
                      description: "You've left admin mode.",
                      variant: "success", // Assuming you have a success variant
                    });
                  }}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Exit Admin
                </Button>
              </div>
            </SidebarFooter>
          </Sidebar>

          <SidebarInset>
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-insurance-neutral-dark">{pageTitle}</h1>
                  <p className="text-gray-600">
                    Manage your InsureHub platform
                  </p>
                </div>
                <SidebarTrigger />
              </div>
              <Outlet /> {/* This is where the routed components will render */}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
};

export default AdminDashboard;