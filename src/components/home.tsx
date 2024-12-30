import React, { useState } from "react";
import KnowledgeBaseManager from "./dashboard/KnowledgeBaseManager";
import ChatbotCustomization from "./dashboard/ChatbotCustomization";
import ThemeEditor from "./dashboard/ThemeEditor";
import SettingsGrid from "./dashboard/SettingsGrid";
import MetricsOverview from "./dashboard/MetricsOverview";
import DashboardLayout from "./layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  const [activeTab, setActiveTab] = useState("knowledge-base");

  const renderContent = () => {
    switch (activeTab) {
      case "knowledge-base":
        return <KnowledgeBaseManager />;
      case "customization":
        return <ChatbotCustomization />;
      case "metrics":
        return <MetricsOverview />;
      case "theme":
        return <ThemeEditor />;
      case "settings":
        return <SettingsGrid />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <Card className="bg-white">
        <CardContent className="pt-6">{renderContent()}</CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Home;
