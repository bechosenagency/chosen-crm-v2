"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Phone,
  Mail,
  Users,
  FileText,
  TrendingUp,
  Trophy,
  Target,
  Zap,
} from "lucide-react";

interface Activity {
  id: string;
  name: string;
  icon: React.ElementType;
  current: number;
  goal: number;
  color: string;
  trend: number; // percentage change from yesterday
}

interface RadialActivityScoreboardProps {
  className?: string;
}

const activities: Activity[] = [
  {
    id: "calls",
    name: "Calls Made",
    icon: Phone,
    current: 12,
    goal: 20,
    color: "var(--c-primary)",
    trend: 15,
  },
  {
    id: "emails",
    name: "Emails Sent",
    icon: Mail,
    current: 28,
    goal: 30,
    color: "var(--c-success)",
    trend: -5,
  },
  {
    id: "meetings",
    name: "Meetings",
    icon: Users,
    current: 3,
    goal: 4,
    color: "var(--c-warning)",
    trend: 0,
  },
  {
    id: "documents",
    name: "Documents",
    icon: FileText,
    current: 8,
    goal: 10,
    color: "var(--c-secondary)",
    trend: 25,
  },
];

function AnimatedCounter({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const animation = animate(count, value, {
      duration: 1.5,
      ease: "easeOut",
    });
    return animation.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
}

function RadialProgress({ activity }: { activity: Activity }) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const percentage = (activity.current / activity.goal) * 100;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 100);
    return () => clearTimeout(timeout);
  }, [percentage]);

  const data = [
    {
      name: activity.name,
      value: animatedPercentage,
      fill: activity.color,
    },
  ];

  const Icon = activity.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <Card className="p-6 hover-lift">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${activity.color}20` }}
            >
              <Icon className="h-4 w-4" style={{ color: activity.color }} />
            </div>
            <span className="text-sm font-medium text-foreground">
              {activity.name}
            </span>
          </div>
          <Badge
            variant="outline"
            className={`text-xs ${
              activity.trend > 0
                ? "text-secondary border-secondary/30"
                : activity.trend < 0
                  ? "text-destructive border-destructive/30"
                  : "text-muted-foreground border-muted-foreground/30"
            }`}
          >
            {activity.trend > 0 ? "+" : ""}
            {activity.trend}%
          </Badge>
        </div>

        <div className="relative h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="90%"
              startAngle={90}
              endAngle={-270}
              data={data}
            >
              <defs>
                <linearGradient
                  id={`gradient-${activity.id}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor={activity.color}
                    stopOpacity={1}
                  />
                  <stop
                    offset="100%"
                    stopColor={activity.color}
                    stopOpacity={0.6}
                  />
                </linearGradient>
              </defs>
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                dataKey="value"
                cornerRadius={10}
                fill={`url(#gradient-${activity.id})`}
                background={{ fill: "var(--c-border)" }}
                className="transition-all duration-1000"
              />
            </RadialBarChart>
          </ResponsiveContainer>

          {/* Center display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-metric-md font-ultralight text-foreground text-metric">
                <AnimatedCounter value={activity.current} />
                <span className="text-lg font-thin text-muted-foreground">
                  /{activity.goal}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wide">
                {Math.round(percentage)}% complete
              </p>
            </div>
          </div>

          {/* Achievement indicator */}
          {percentage >= 100 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-0 right-0"
            >
              <div className="p-1.5 bg-secondary rounded-full">
                <Trophy className="h-3 w-3 text-white" />
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

export default function RadialActivityScoreboard({
  className = "",
}: RadialActivityScoreboardProps) {
  const totalCurrent = activities.reduce((sum, a) => sum + a.current, 0);
  const totalGoal = activities.reduce((sum, a) => sum + a.goal, 0);
  const overallPercentage = Math.round((totalCurrent / totalGoal) * 100);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header with overall progress */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h3 className="text-xl font-light text-foreground flex items-center gap-3">
            <Target className="h-6 w-6 text-primary" />
            Live Activity Scoreboard
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time progress tracking
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="text-sm px-3 py-1.5">
            <Zap className="h-3 w-3 mr-1" />
            {overallPercentage}% Daily Progress
          </Badge>
          {overallPercentage >= 80 && (
            <Badge
              variant="outline"
              className="text-secondary text-sm px-3 py-1.5"
            >
              <Trophy className="h-3 w-3 mr-1" />
              On Fire!
            </Badge>
          )}
        </div>
      </motion.div>

      {/* Activity cards grid */}
      <div className="grid grid-cols-2 gap-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <RadialProgress activity={activity} />
          </motion.div>
        ))}
      </div>

      {/* Daily streak indicator with flame */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="p-4 bg-gradient-to-r from-orange-500/10 to-red-500/5 border-orange-500/20 hover-lift">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className="text-3xl"
              >
                🔥
              </motion.div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Daily Streak
                </p>
                <p className="text-xs text-muted-foreground">
                  Keep the fire burning!
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-metric-md font-ultralight text-foreground text-metric">
                7 <span className="text-lg font-thin">days</span>
              </p>
              <p className="text-xs text-orange-600 font-medium">
                Personal best: 12
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
