import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Upload,
  Database,
  Palette,
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onNavigate: (tab: string) => void;
  activeTab: string;
}

const Sidebar = ({
  collapsed,
  onToggle,
  onNavigate,
  activeTab,
}: SidebarProps) => {
  const menuItems = [
    { id: "knowledge-base", icon: Upload, label: "Knowledge Base" },
    { id: "customization", icon: Database, label: "Customization" },
    { id: "metrics", icon: Activity, label: "Metrics" },
    { id: "theme", icon: Palette, label: "Theme" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div
      className={cn(
        "h-screen bg-white border-r transition-all duration-300 flex flex-col sidebar-shadow rounded-r-3xl",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="p-4 border-b flex justify-between items-center bg-gray-50/50">
        {!collapsed && (
          <h2 className="font-semibold text-gray-800">Dashboard</h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="ml-auto hover:bg-gray-100 rounded-full button-hover"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>

      <nav className="flex-1 p-3 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start rounded-xl button-hover",
                collapsed ? "px-2" : "px-4",
                activeTab === item.id
                  ? "bg-primary/10 hover:bg-primary/15"
                  : "hover:bg-gray-100",
              )}
              onClick={() => onNavigate(item.id)}
            >
              <Icon className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-2")} />
              {!collapsed && <span>{item.label}</span>}
            </Button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
