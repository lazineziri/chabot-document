import React, { useState } from "react";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DashboardLayout = ({
  children,
  activeTab,
  onTabChange,
}: DashboardLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        onNavigate={onTabChange}
        activeTab={activeTab}
      />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
