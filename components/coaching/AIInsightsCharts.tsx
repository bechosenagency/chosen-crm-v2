"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  TrendingUp,
  Clock,
  Zap,
  Brain,
  Target,
  AlertCircle,
  CheckCircle2,
  PhoneCall,
  Battery,
} from "lucide-react";

interface AIInsightsChartsProps {
  className?: string;
}

// Mock data for charts
const callSuccessData = [
  { hour: "8 AM", rate: 45, calls: 2 },
  { hour: "9 AM", rate: 68, calls: 5 },
  { hour: "10 AM", rate: 72, calls: 8 },
  { hour: "11 AM", rate: 65, calls: 6 },
  { hour: "12 PM", rate: 40, calls: 3 },
  { hour: "1 PM", rate: 55, calls: 4 },
  { hour: "2 PM", rate: 78, calls: 9, optimal: true },
  { hour: "3 PM", rate: 75, calls: 7, optimal: true },
  { hour: "4 PM", rate: 48, calls: 4 },
  { hour: "5 PM", rate: 35, calls: 2 },
];

const energyData = [
  { time: "8 AM", energy: 85, conversion: 72 },
  { time: "9 AM", energy: 92, conversion: 78 },
  { time: "10 AM", energy: 88, conversion: 75 },
  { time: "11 AM", energy: 82, conversion: 70 },
  { time: "12 PM", energy: 65, conversion: 55 },
  { time: "1 PM", energy: 70, conversion: 60 },
  { time: "2 PM", energy: 78, conversion: 68 },
  { time: "3 PM", energy: 72, conversion: 52 },
  { time: "4 PM", energy: 55, conversion: 40 },
  { time: "5 PM", energy: 45, conversion: 35 },
];

const performanceRadarData = [
  { metric: "Call Volume", value: 85, fullMark: 100 },
  { metric: "Response Time", value: 92, fullMark: 100 },
  { metric: "Follow-up Rate", value: 78, fullMark: 100 },
  { metric: "Email Efficiency", value: 88, fullMark: 100 },
  { metric: "Task Completion", value: 82, fullMark: 100 },
  { metric: "Client Satisfaction", value: 90, fullMark: 100 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-xl border">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs text-muted-foreground mt-1">
            {entry.name}:{" "}
            <span className="font-medium text-foreground">{entry.value}%</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AIInsightsCharts({
  className = "",
}: AIInsightsChartsProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Optimal Calling Times Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 hover-lift relative overflow-hidden">
          {/* Subtle blue glow overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <div className="relative z-10 flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <PhoneCall className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  Optimal Calling Windows
                </h3>
                <p className="text-xs text-muted-foreground">
                  Success rate by hour
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              2-3 PM Peak
            </Badge>
          </div>

          <div className="h-[200px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={callSuccessData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--c-border)" />
                <XAxis
                  dataKey="hour"
                  tick={{ fontSize: 10, fill: "var(--c-text-secondary)" }}
                  axisLine={{ stroke: "var(--c-border)" }}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "var(--c-text-secondary)" }}
                  axisLine={{ stroke: "var(--c-border)" }}
                  domain={[0, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
                  {callSuccessData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.optimal ? "var(--c-primary)" : "var(--c-border)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <motion.div
            className="flex items-center gap-4 mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Target className="h-4 w-4 text-primary" />
            <p className="text-sm text-primary font-medium">
              Jennifer typically answers between 2-3 PM (78% success rate)
            </p>
          </motion.div>
        </Card>
      </motion.div>

      {/* Energy & Conversion Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="p-6 hover-lift relative overflow-hidden">
          {/* Subtle blue glow overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <div className="relative z-10 flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Battery className="h-5 w-5 text-warning" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  Energy Management
                </h3>
                <p className="text-xs text-muted-foreground">
                  Energy vs Conversion rate
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-warning text-xs">
              <AlertCircle className="h-3 w-3 mr-1" />3 PM Dip
            </Badge>
          </div>

          <div className="h-[200px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--c-border)" />
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 10, fill: "var(--c-text-secondary)" }}
                  axisLine={{ stroke: "var(--c-border)" }}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "var(--c-text-secondary)" }}
                  axisLine={{ stroke: "var(--c-border)" }}
                  domain={[0, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="energy"
                  stroke="var(--c-warning)"
                  strokeWidth={2}
                  dot={{ fill: "var(--c-warning)", r: 3 }}
                  name="Energy Level"
                />
                <Line
                  type="monotone"
                  dataKey="conversion"
                  stroke="var(--c-primary)"
                  strokeWidth={2}
                  dot={{ fill: "var(--c-primary)", r: 3 }}
                  name="Conversion Rate"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <motion.div
            className="flex items-center gap-4 mt-4 p-3 bg-warning/5 rounded-lg border border-warning/10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Zap className="h-4 w-4 text-warning" />
            <p className="text-sm text-warning font-medium">
              Schedule high-priority calls before 3 PM for 40% better conversion
            </p>
          </motion.div>
        </Card>
      </motion.div>

      {/* Performance Radar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="p-6 hover-lift relative overflow-hidden">
          {/* Subtle blue glow overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <div className="relative z-10 flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Brain className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  Performance Analysis
                </h3>
                <p className="text-xs text-muted-foreground">
                  Multi-dimensional view
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              Top 10%
            </Badge>
          </div>

          <div className="h-[220px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={performanceRadarData}>
                <PolarGrid
                  gridType="polygon"
                  stroke="var(--c-border)"
                  radialLines={false}
                />
                <PolarAngleAxis
                  dataKey="metric"
                  tick={{ fontSize: 10, fill: "var(--c-text-secondary)" }}
                />
                <PolarRadiusAxis
                  domain={[0, 100]}
                  tick={false}
                  axisLine={false}
                />
                <Radar
                  name="Performance"
                  dataKey="value"
                  stroke="var(--c-primary)"
                  fill="var(--c-primary)"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
