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


  const userData = localStorage.getItem("userData");
  

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
                  InsureHub Admin
                </h1>
              </div>
            </SidebarHeader>

            <SidebarContent>
            

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

             
                <>
                  <SidebarGroup>
                    <SidebarGroupLabel>Website Content</SidebarGroupLabel>
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
