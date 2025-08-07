"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3 } from "lucide-react";

interface PipelineStage {
  name: string;
  count: number;
  percentage: number;
  color: string;
  bgColor: string;
}

const pipelineStages: PipelineStage[] = [
  {
    name: "New Deal",
    count: 15,
    percentage: 31.9,
    color: "bg-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    name: "Application",
    count: 12,
    percentage: 25.5,
    color: "bg-cyan-500",
    bgColor: "bg-cyan-100",
  },
  {
    name: "Processing",
    count: 8,
    percentage: 17.0,
    color: "bg-indigo-500",
    bgColor: "bg-indigo-100",
  },
  {
    name: "Approved",
    count: 7,
    percentage: 14.9,
    color: "bg-purple-500",
    bgColor: "bg-purple-100",
  },
  {
    name: "Closed",
    count: 5,
    percentage: 10.6,
    color: "bg-green-500",
    bgColor: "bg-green-100",
  },
];

export function PipelineSnapshot() {
  const totalDeals = pipelineStages.reduce(
    (sum, stage) => sum + stage.count,
    0,
  );
  const maxCount = Math.max(...pipelineStages.map((stage) => stage.count));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Pipeline Snapshot
          </div>
          <span className="text-sm font-normal text-text-secondary">
            Total Deals: {totalDeals}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {pipelineStages.map((stage) => (
            <div key={stage.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-text">
                    {stage.name}
                  </span>
                  <span className="text-xs text-text-muted">
                    ({stage.percentage}%)
                  </span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {stage.count} deals
                </span>
              </div>
              <div
                className={`relative h-8 rounded-full overflow-hidden ${stage.bgColor}`}
              >
                <div
                  className={`absolute top-0 left-0 h-full transition-all duration-500 ease-out ${stage.color}`}
                  style={{ width: `${(stage.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {pipelineStages.map((stage) => (
              <div key={stage.name} className="space-y-1">
                <div
                  className={`h-3 w-3 rounded-full mx-auto ${stage.color}`}
                />
                <p className="text-xs text-text-secondary">{stage.name}</p>
                <p className="text-sm font-semibold text-text">
                  ${(stage.count * 250000).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
