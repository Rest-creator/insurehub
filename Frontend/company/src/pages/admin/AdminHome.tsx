import Server from "@/components/server/Server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Building,
  Briefcase,
  FileText,
  Home,
  Shield,
  ShoppingBag,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

const AdminHome = () => {
  const [dashboardStats, setDashboardStats] = useState({
    articles: 0,
    products: 0,
    insurance_companies: 0,
    users: 0
  });
  const fetchStats = async () => {
    // Fetch data from the API
    Server.getAdminDashboardStats()
      .then((response) => {
        setDashboardStats(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchStats()
  }, [])
  
  const stats = [
    {
      title: "Services",
      content: "5 Services", // You might want to fetch this from backend too
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      title: "Learning Content",
      content: `${dashboardStats.articles} Articles`,
      icon: BookOpen,
      color: "bg-green-500",
    },
    {
      title: "Marketplace Products",
      content: `${dashboardStats.products} Products`,
      icon: ShoppingBag,
      color: "bg-purple-500",
    },
    {
      title: "Insurance Companies",
      content: `${dashboardStats.insurance_companies} Companies`,
      icon: Building,
      color: "bg-amber-500",
    },
    {
      title: "Commercial Programs",
      content: "6 Programs", // You might want to fetch this from backend too
      icon: Briefcase,
      color: "bg-pink-500",
    },
    {
      title: "Registered Users",
      content: `${dashboardStats.users} Users`,
      icon: Users,
      color: "bg-cyan-500",
    },
  ];
  

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, idx) => (
          <Card key={idx}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.content}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 md:grid-cols-3">
            <div className="flex flex-col items-center gap-2 bg-muted/50 p-4 rounded-lg">
              <Home className="h-8 w-8 text-insurance-orange" />
              <span className="font-medium">Edit Home</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-muted/50 p-4 rounded-lg">
              <BookOpen className="h-8 w-8 text-insurance-green" />
              <span className="font-medium">Add Article</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-muted/50 p-4 rounded-lg">
              <ShoppingBag className="h-8 w-8 text-insurance-blue" />
              <span className="font-medium">Add Product</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminHome;
