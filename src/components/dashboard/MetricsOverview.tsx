import React from "react";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Activity, Clock, Users, MessageSquare } from "lucide-react";

interface MetricsOverviewProps {
  data?: {
    conversations: any[];
    responseTime: any[];
    dailyInteractions: any[];
    resolutionRate: any[];
  };
}

const MetricsOverview = ({
  data = {
    conversations: [
      { name: "Mon", value: 20 },
      { name: "Tue", value: 35 },
      { name: "Wed", value: 45 },
      { name: "Thu", value: 30 },
      { name: "Fri", value: 55 },
      { name: "Sat", value: 25 },
      { name: "Sun", value: 15 },
    ],
    responseTime: [
      { name: "00:00", value: 2.5 },
      { name: "04:00", value: 1.8 },
      { name: "08:00", value: 3.2 },
      { name: "12:00", value: 2.1 },
      { name: "16:00", value: 2.9 },
      { name: "20:00", value: 1.5 },
    ],
    dailyInteractions: [
      { name: "Mon", value: 150 },
      { name: "Tue", value: 230 },
      { name: "Wed", value: 280 },
      { name: "Thu", value: 190 },
      { name: "Fri", value: 295 },
      { name: "Sat", value: 130 },
      { name: "Sun", value: 100 },
    ],
    resolutionRate: [
      { name: "Resolved", value: 75 },
      { name: "Pending", value: 15 },
      { name: "Escalated", value: 10 },
    ],
  },
}: MetricsOverviewProps) => {
  const COLORS = ["#10B981", "#F59E0B", "#EF4444"];

  const StatCard = ({ title, value, icon: Icon, trend }: any) => (
    <Card className="p-6 flex items-start justify-between space-x-4">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        {trend && (
          <p
            className={`text-sm mt-1 ${trend > 0 ? "text-green-500" : "text-red-500"}`}
          >
            {trend > 0 ? "+" : ""}
            {trend}% from last week
          </p>
        )}
      </div>
      <div className="p-3 bg-primary/10 rounded-full">
        <Icon className="w-6 h-6 text-primary" />
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Conversations"
          value="1,234"
          icon={MessageSquare}
          trend={12}
        />
        <StatCard
          title="Avg. Response Time"
          value="2.3s"
          icon={Clock}
          trend={-8}
        />
        <StatCard
          title="Daily Active Users"
          value="892"
          icon={Users}
          trend={5}
        />
        <StatCard
          title="Resolution Rate"
          value="94%"
          icon={Activity}
          trend={3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Weekly Conversations</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.conversations}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#10B981"
                  fill="#10B98120"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Response Time (24h)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.responseTime}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6366F1"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Daily Interactions</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.dailyInteractions}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#F59E0B"
                  fill="#F59E0B20"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Resolution Distribution
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.resolutionRate}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.resolutionRate.map((entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {data.resolutionRate.map((entry: any, index: number) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-sm text-gray-600">
                  {entry.name} ({entry.value}%)
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MetricsOverview;
