"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface DailyPerformanceGaugeProps {
  score?: number;
  previousScore?: number;
  className?: string;
}

export default function DailyPerformanceGauge({
  score = 0,
  previousScore = 0,
  className = "",
}: DailyPerformanceGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const motionScore = useMotionValue(0);
  const displayScore = useTransform(motionScore, (latest) =>
    Math.round(latest),
  );

  useEffect(() => {
    const animation = animate(motionScore, score, {
      duration: 2,
      ease: "easeOut",
    });

    const timeout = setTimeout(() => {
      setAnimatedScore(score);
    }, 100);

    return () => {
      animation.stop();
      clearTimeout(timeout);
    };
  }, [score, motionScore]);

  /** pick CSS-var colour based on score */
  const getScoreColor = (value: number): string => {
    if (value >= 90) return "var(--c-success)";   // Excellent
    if (value >= 75) return "var(--c-primary)";   // Good
    if (value >= 60) return "var(--c-warning)";   // Average
    return "var(--c-error)";                      // Needs Improvement
  };

  const getScoreLabel = (value: number): string => {
    if (value >= 90) return "Peak Performance";
    if (value >= 75) return "High Efficiency";
    if (value >= 60) return "On Track";
    return "Warming Up";
  };

  const data = [
    {
      name: "Score",
      value: animatedScore,
      fill: getScoreColor(animatedScore),
    },
  ];

  const scoreDiff = score - previousScore;
  const trend: "up" | "down" | "neutral" =
    scoreDiff > 0 ? "up" : scoreDiff < 0 ? "down" : "neutral";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="p-8 bg-white/90 backdrop-blur-md border-white/20 shadow-[0_20px_25px_-5px_rgb(0_0_0_/_0.1),_0_8px_10px_-6px_rgb(0_0_0_/_0.1)]">
        {/* header */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-light text-foreground mb-2">
            Daily Performance
          </h3>

          <div className="flex items-center justify-center gap-2">
            <Badge
              variant="outline"
              className={`text-sm px-3 py-1 ${
                trend === "up"
                  ? "text-secondary border-secondary/30"
                  : trend === "down"
                  ? "text-destructive border-destructive/30"
                  : "text-muted-foreground border-muted-foreground/30"
              }`}
            >
              {trend === "up" && <TrendingUp className="h-3 w-3 mr-1" />}
              {trend === "down" && <TrendingDown className="h-3 w-3 mr-1" />}
              {trend === "neutral" && <Minus className="h-3 w-3 mr-1" />}
              {scoreDiff > 0 ? "+" : ""}
              {scoreDiff}% from yesterday
            </Badge>
          </div>
        </div>

        {/* gauge */}
        <div className="relative h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="90%"
              startAngle={180}
              endAngle={0}
              data={data}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                dataKey="value"
                cornerRadius={10}
                fill={getScoreColor(animatedScore)}
                className="drop-shadow-lg"
              />
            </RadialBarChart>
          </ResponsiveContainer>

          {/* centre number */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center mb-8">
              <div className="text-metric-xl font-ultralight text-foreground">
                <motion.span>{displayScore}</motion.span>
                <span className="text-2xl font-thin text-muted-foreground ml-1">
                  %
                </span>
              </div>
              <p className="text-sm font-medium text-muted-foreground mt-2">
                Productivity Score
              </p>
            </div>
          </div>

          {/* background zones */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 200 100">
              <path
                d="M 20 100 A 80 80 0 0 1 35 35"
                fill="none"
                stroke="var(--c-error)"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <path
                d="M 35 35 A 80 80 0 0 1 80 15"
                fill="none"
                stroke="var(--c-warning)"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <path
                d="M 80 15 A 80 80 0 0 1 120 15"
                fill="none"
                stroke="var(--c-primary)"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <path
                d="M 120 15 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="var(--c-success)"
                strokeWidth="0.5"
                opacity="0.3"
              />

              {/* labels */}
              <text x="30" y="95" className="text-[8px] fill-muted-foreground" opacity="0.5">
                0
              </text>
              <text x="50" y="25" className="text-[8px] fill-muted-foreground" opacity="0.5">
                60
              </text>
              <text x="100" y="10" className="text-[8px] fill-muted-foreground" opacity="0.5">
                75
              </text>
              <text x="150" y="25" className="text-[8px] fill-muted-foreground" opacity="0.5">
                90
              </text>
              <text x="170" y="95" className="text-[8px] fill-muted-foreground" opacity="0.5">
                100
              </text>
            </svg>
          </div>
        </div>

        {/* footer */}
        <div className="text-center mt-6">
          <p className="text-lg font-medium text-foreground">{getScoreLabel(score)}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Keep pushing to reach the green zone!
          </p>
        </div>

        {/* mini breakdown */}
        <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border/20">
          {[
            { label: "Call Success", value: "87%" },
            { label: "Task Completion", value: "92%" },
            { label: "Response Time", value: "78%" },
          ].map((item) => (
            <div key={item.label} className="text-center group transition-premium">
              <p className="text-metric-md font-thin text-foreground group-hover:scale-105 transition-transform">
                {item.value}
              </p>
              <p className="text-xs text-muted-foreground mt-2 font-medium uppercase tracking-wide">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
