import { Helmet } from "react-helmet-async";
import { useState } from "react";
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
import { permission } from "process";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { toast } = useToast();
  const [pageTitle, setPageTitle] = useState("Admin Dashboard");

  const isProviderRole = true; // This would be determined by auth state in a real app

  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;
  const userType = user?.userType || null;
  const isAdmin = userType === "admin";
  const isBusiness = userType === "business";

  const contentMenuItems = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
      permission: "admin",
    },
    {
      title: "Home Page",
      path: "/admin/edit-home",
      icon: Home,
      permission: "admin",
    },
    {
      title: "About Us",
      path: "/admin/edit-about",
      icon: FileText,
      permission: "admin",
    },
    {
      title: "Services",
      path: "/admin/edit-services",
      icon: FileText,
      permission: "admin",
    },
    {
      title: "Learning Hub",
      path: "/admin/edit-learning",
      icon: BookOpen,
      permission: "admin",
    },
    {
      title: "Marketplace",
      path: "/admin/edit-marketplace",
      icon: ShoppingBag,
      permission: "admin",
    },
    {
      title: "Insurance Companies",
      path: "/admin/edit-companies",
      icon: Building,
      permission: "admin",
    },
    {
      title: "Commercial Programs",
      path: "/admin/edit-commercial",
      icon: Briefcase,
      permission: "admin",
    },
    {
      title: "Insure It",
      path: "/admin/edit-insure-it",
      icon: Shield,
      permission: "admin",
    },
    {
      title: "Claims Management",
      path: "/admin/edit-claims",
      icon: FileCheck,
      permission: "admin",
    },
  ];

  const providerMenuItems = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
      permission: "admin",
    },
    {
      title: "Company Profile",
      path: "/admin/edit-company-profile",
      icon: Building2,
    },
    {
      title: "Insurance Products",
      path: "/admin/edit-products",
      icon: Package,
    },
  ];

  const adminMenuItems = [
    {
      title: "Users",
      path: "/admin/edit-users",
      icon: Users,
      permission: "admin",
    },
    {
      title: "Settings",
      path: "/admin/settings",
      icon: Settings,
      permission: "admin",
    },
  ];

  // New operational menu items for actual admin functionality
  const operationsMenuItems = [
    {
      title: "Manage Claims",
      path: "/admin/manage-claims",
      icon: ClipboardList,
    },
    {
      title: "Manage Applications",
      path: "/admin/manage-applications",
      icon: FileEdit,
    },
  ];

  const filterMenuItems = (items: any[]) => {
    return items.filter((item) => {
      if (!item.permission) return true; // No permission specified = show to all
      if (item.permission === "all") return true;
      if (item.permission === "admin") return true;
      return false;
    });
  };

  const handleNavigation = (path: string, title: string) => {
    navigate(path);
    setPageTitle(title);
  };

  return (
    <AuthGuard adminOnly>
      <Helmet>
        <title>Admin Dashboard - InsureHub</title>
        <meta
          name="description"
          content="Admin dashboard for managing InsureHub website content"
        />
      </Helmet>

      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center px-2 py-3">
                <Pencil className="h-6 w-6 text-insurance-orange mr-2" />
                <h1 className="text-xl font-bold">
                  {isAdmin ? "InsureHub Admin" : user.name}
                </h1>
              </div>
            </SidebarHeader>

            <SidebarContent>
              {isProviderRole && (
                <SidebarGroup>
                  <SidebarGroupLabel>Provider Dashboard</SidebarGroupLabel>
                  <SidebarMenu>
                    {providerMenuItems.map((item) => (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton
                          isActive={pathname === item.path}
                          tooltip={item.title}
                          onClick={() =>
                            handleNavigation(item.path, item.title)
                          }
                        >
                          {item.title === "Dashboard" && !isAdmin ? null : (
                            <>
                              <item.icon className="h-5 w-5" />
                              <span>{item.title}</span>
                            </>
                          )}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroup>
              )}

              <SidebarGroup>
                <SidebarGroupLabel>Operations</SidebarGroupLabel>
                <SidebarMenu>
                  {operationsMenuItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton
                        isActive={pathname === item.path}
                        tooltip={item.title}
                        onClick={() => handleNavigation(item.path, item.title)}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>

              {isAdmin && (
                <>
                  <SidebarGroup>
                    <SidebarGroupLabel>Website Content</SidebarGroupLabel>
                    <SidebarMenu>
                      {contentMenuItems.map((item) => (
                        <SidebarMenuItem key={item.path}>
                          <SidebarMenuButton
                            isActive={pathname === item.path}
                            tooltip={item.title}
                            onClick={() =>
                              handleNavigation(item.path, item.title)
                            }
                          >
                            <item.icon className="h-5 w-5" />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroup>

                  <SidebarGroup>
                    <SidebarGroupLabel>Administration</SidebarGroupLabel>
                    <SidebarMenu>
                      {adminMenuItems.map((item) => (
                        <SidebarMenuItem key={item.path}>
                          <SidebarMenuButton
                            isActive={pathname === item.path}
                            tooltip={item.title}
                            onClick={() =>
                              handleNavigation(item.path, item.title)
                            }
                          >
                            <item.icon className="h-5 w-5" />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroup>
                </>
              )}
            </SidebarContent>

            <SidebarFooter>
              <div className="p-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    navigate("/");
                    localStorage.removeItem("userData");
                    toast({
                      title: "Returning to website",
                      description: "You've left admin mode",
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
                  <h1 className="text-2xl font-bold">{pageTitle}</h1>
                  <p className="text-muted-foreground">
                    Manage your website content
                  </p>
                </div>
                <SidebarTrigger />
              </div>
              <Outlet />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
};

export default AdminDashboard;
