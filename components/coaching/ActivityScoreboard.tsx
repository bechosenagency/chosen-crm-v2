"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MessageSquare,
  Users,
  Target,
  TrendingUp,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Activity {
  icon: React.ReactNode;
  label: string;
  current: number;
  goal: number;
  color: string;
}

interface ActivityScoreboardProps {
  activities?: Activity[];
}

const defaultActivities: Activity[] = [
  {
    icon: <Phone className="h-5 w-5" />,
    label: "Calls",
    current: 12,
    goal: 20,
    color: "bg-primary",
  },
  {
    icon: <Mail className="h-5 w-5" />,
    label: "Emails",
    current: 8,
    goal: 15,
    color: "bg-secondary",
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    label: "Texts",
    current: 5,
    goal: 10,
    color: "bg-warning",
  },
  {
    icon: <Users className="h-5 w-5" />,
    label: "Meetings",
    current: 2,
    goal: 3,
    color: "bg-primary",
  },
  {
    icon: <Target className="h-5 w-5" />,
    label: "Follow-ups",
    current: 6,
    goal: 8,
    color: "bg-secondary",
  },
];

export default function ActivityScoreboard({
  activities = defaultActivities,
}: ActivityScoreboardProps) {
  const totalScore =
    activities.reduce(
      (acc, activity) =>
        acc + Math.min((activity.current / activity.goal) * 100, 100),
      0,
    ) / activities.length;

  return (
    <Card className="p-8 hover:shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-light text-foreground flex items-center gap-3">
          <TrendingUp className="h-6 w-6 text-primary" />
          Live Activity Scoreboard
        </h3>
        <div className="text-right">
          <div className="text-5xl font-thin text-primary">
            {Math.round(totalScore)}%
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            Overall Progress
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const percentage = Math.min(
            (activity.current / activity.goal) * 100,
            100,
          );

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 rounded-xl ${activity.color}/10 backdrop-blur-sm`}
                  >
                    {React.cloneElement(activity.icon, {
                      className: `h-6 w-6 ${activity.color.replace("bg-", "text-")}`,
                    })}
                  </div>
                  <span className="font-medium text-foreground">
                    {activity.label}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-foreground">
                    {activity.current}
                  </span>
                  <span className="text-muted-foreground">
                    {" "}
                    / {activity.goal}
                  </span>
                </div>
              </div>
              <Progress
                value={percentage}
                className="h-2"
                indicatorClassName={activity.color}
              />
            </motion.div>
          );
        })}
      </div>

      {totalScore >= 100 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mt-8 p-6 bg-secondary/10 rounded-xl border border-secondary/20 backdrop-blur-sm"
        >
          <p className="text-center font-semibold text-secondary">
            🎉 Daily Goals Achieved! Keep up the amazing work!
          </p>
        </motion.div>
      )}
    </Card>
  );
}
