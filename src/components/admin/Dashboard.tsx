import { AdminSidebar } from "./AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Package, Users, TrendingUp, Clock } from "lucide-react";

const stats = [
  {
    title: "Total Products",
    value: "57",
    change: "+3 this month",
    icon: Package,
    color: "text-[#007BFF]"
  },
  {
    title: "Active Categories", 
    value: "3",
    change: "All categories active",
    icon: Users,
    color: "text-green-600"
  },
  {
    title: "Site Views",
    value: "12,847",
    change: "+12% this month",
    icon: TrendingUp,
    color: "text-purple-600"
  },
  {
    title: "Last Updated",
    value: "2 hours ago",
    change: "Product catalog sync",
    icon: Clock,
    color: "text-orange-600"
  }
];

const recentActivity = [
  {
    action: "Product Added",
    item: "Membrane Filter System MFS-500",
    time: "2 hours ago",
    user: "Admin"
  },
  {
    action: "Product Updated",
    item: "HEPA Air Filter HAF-300",
    time: "5 hours ago", 
    user: "Admin"
  },
  {
    action: "Category Created",
    item: "Oil & Chemical Filters",
    time: "1 day ago",
    user: "Admin"
  },
  {
    action: "Product Published",
    item: "Industrial Cartridge Filter ICF-200",
    time: "2 days ago",
    user: "Admin"
  }
];

export function Dashboard({ onNavigate }: { onNavigate?: (page: string) => void }) {
  return (
    <div className="min-h-screen bg-[#F7F8FA] flex">
      <AdminSidebar />
      
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[#1A237E]">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="border-gray-200 hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-2xl font-semibold text-[#1A237E] mb-1">{stat.value}</p>
                      <p className="text-xs text-gray-500">{stat.change}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-[#1A237E]">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150">
                    <div className="w-2 h-2 bg-[#007BFF] rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#1A237E]">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {activity.item}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time} • by {activity.user}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-[#1A237E]">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <button className="w-full p-4 text-left rounded-lg border border-gray-200 hover:border-[#007BFF] hover:bg-blue-50 transition-all duration-200 group">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-[#1A237E] group-hover:text-[#007BFF]">
                        Add New Product
                      </h4>
                      <p className="text-sm text-gray-600">Create a new product listing</p>
                    </div>
                    <Package className="h-5 w-5 text-gray-400 group-hover:text-[#007BFF]" />
                  </div>
                </button>
                
                <button className="w-full p-4 text-left rounded-lg border border-gray-200 hover:border-[#007BFF] hover:bg-blue-50 transition-all duration-200 group">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-[#1A237E] group-hover:text-[#007BFF]">
                        Manage Categories
                      </h4>
                      <p className="text-sm text-gray-600">Organize product categories</p>
                    </div>
                    <Users className="h-5 w-5 text-gray-400 group-hover:text-[#007BFF]" />
                  </div>
                </button>
                
                <button className="w-full p-4 text-left rounded-lg border border-gray-200 hover:border-[#007BFF] hover:bg-blue-50 transition-all duration-200 group">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-[#1A237E] group-hover:text-[#007BFF]">
                        View Site Analytics
                      </h4>
                      <p className="text-sm text-gray-600">Check website performance</p>
                    </div>
                    <TrendingUp className="h-5 w-5 text-gray-400 group-hover:text-[#007BFF]" />
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card className="border-gray-200 mt-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-[#1A237E]">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                <p className="text-sm font-medium text-[#1A237E]">Website Status</p>
                <p className="text-xs text-gray-600">All systems operational</p>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                <p className="text-sm font-medium text-[#1A237E]">Database</p>
                <p className="text-xs text-gray-600">Running smoothly</p>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                <p className="text-sm font-medium text-[#1A237E]">Content Sync</p>
                <p className="text-xs text-gray-600">Last sync: 2 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}