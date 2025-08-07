"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  DollarSign,
} from "lucide-react";

interface MetricCard {
  title: string;
  value: string;
  change: number;
  changeType: "increase" | "decrease";
  description: string;
  icon: React.ReactNode;
  color: string;
}

const metrics: MetricCard[] = [
  {
    title: "Total Leads",
    value: "47",
    change: 12.5,
    changeType: "increase",
    description: "Active leads in pipeline",
    icon: <Users className="h-4 w-4" />,
    color: "text-[#0891b2]",
  },
  {
    title: "Applications",
    value: "23",
    change: 8.3,
    changeType: "increase",
    description: "Submitted this month",
    icon: <FileText className="h-4 w-4" />,
    color: "text-green-600",
  },
  {
    title: "Closed Deals",
    value: "12",
    change: -2.1,
    changeType: "decrease",
    description: "Total this quarter",
    icon: <DollarSign className="h-4 w-4" />,
    color: "text-purple-600",
  },
];

export function PerformanceScorecard() {
  return (
    <div className="grid grid-cols-1 gap-4 h-full">
      {metrics.map((metric) => (
        <Card key={metric.title} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center justify-between">
              {metric.title}
              <div className={metric.color}>{metric.icon}</div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <p className={`text-3xl font-bold ${metric.color}`}>
                {metric.value}
              </p>
              <div className="flex items-center gap-1">
                {metric.changeType === "increase" ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span
                  className={`text-sm font-medium ${
                    metric.changeType === "increase"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {Math.abs(metric.change)}%
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-1">{metric.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
