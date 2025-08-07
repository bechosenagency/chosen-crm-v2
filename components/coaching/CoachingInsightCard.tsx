"use client";

import { motion } from "framer-motion";
import { Brain, Lightbulb, TrendingUp, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CoachingInsightCardProps {
  title: string;
  insight: string;
  type?: "behavioral" | "timing" | "energy" | "content";
  priority?: "high" | "medium" | "low";
  actionable?: string;
}

export default function CoachingInsightCard({
  title,
  insight,
  type = "behavioral",
  priority = "medium",
  actionable,
}: CoachingInsightCardProps) {
  const typeConfig = {
    behavioral: {
      icon: <Brain className="h-5 w-5" />,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    timing: {
      icon: <AlertCircle className="h-5 w-5" />,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    energy: {
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    content: {
      icon: <Lightbulb className="h-5 w-5" />,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  };

  const priorityColors = {
    high: "destructive",
    medium: "secondary",
    low: "outline",
  };

  const config = typeConfig[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="p-8 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-start gap-6">
          <div className={`p-4 rounded-xl ${config.bgColor} backdrop-blur-sm`}>
            <div className={config.color}>{config.icon}</div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-lg text-foreground">{title}</h4>
              <Badge
                variant={priorityColors[priority] as any}
                className="text-xs"
              >
                {priority}
              </Badge>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              {insight}
            </p>
            {actionable && (
              <motion.button
                whileHover={{ x: 5 }}
                className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1 mt-2"
              >
                {actionable} →
              </motion.button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
