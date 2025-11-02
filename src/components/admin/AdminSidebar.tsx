import { useState } from "react";
import { Home, Package, FileText, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

const navigationItems = [
  { icon: Home, label: "Dashboard", id: "dashboard", active: false },
  { icon: Package, label: "Products", id: "products", active: true },
  { icon: FileText, label: "Site Content", id: "content", active: false },
  { icon: Settings, label: "Settings", id: "settings", active: false }
];

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`bg-white   border-r border-gray-200  transition-all duration-300 ${collapsed ? 'w-24' : 'w-64'}`}>
      <div className="p-4 border-b border-gray-200 ">
        <div className="flex items-center pl-3 justify-between ">
          {!collapsed && (
            <h2 className="font-semibold text-[#1A237E]">Admin Portal</h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-500 hover:text-[#007BFF]"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              className={`w-full flex items-center p-5 rounded-lg transition-colors duration-200 ${
                item.active 
                  ? 'bg-[#007BFF] text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <IconComponent className="h-5 w-5 flex-shrink-0" />
              {!collapsed && (
                <span className="ml-3 font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}