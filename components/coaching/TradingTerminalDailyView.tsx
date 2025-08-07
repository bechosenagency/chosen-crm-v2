"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DailyPerformanceGauge from "./DailyPerformanceGauge";
import PriorityTimeline from "./PriorityTimeline";
import AIInsightsCharts from "./AIInsightsCharts";
import RadialActivityScoreboard from "./RadialActivityScoreboard";
import MicroCelebration from "./MicroCelebration";
import TaskCounter from "./TaskCounter";
import StreakCounter from "./StreakCounter";
import CommissionDisplay from "./CommissionDisplay";
import MorningGreeting from "./MorningGreeting";
import { AnimatedBackground } from "@/components/animated-background";

interface Task {
  id: string;
  title: string;
  type: "call" | "email" | "meeting" | "document" | "follow-up";
  priority: "high" | "medium" | "low";
  time: string;
  duration: number;
  completed: boolean;
  points: number;
  aiOptimized?: boolean;
  successRate?: number;
}

export default function TradingTerminalDailyView() {
  const [productivityScore, setProductivityScore] = useState(92);
  const [previousScore] = useState(87);
  const [showCelebration, setShowCelebration] = useState(false);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [currentStreak] = useState(7);
  const [personalBest] = useState(12);
  const [monthlyCommission] = useState(42750);
  const [pipelineValue] = useState(2345678);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Call Jennifer - Refinance Options",
      type: "call",
      priority: "high",
      time: "09:00",
      duration: 30,
      completed: false,
      points: 50,
      aiOptimized: true,
      successRate: 78,
    },
    {
      id: "2",
      title: "Send VA loan docs to Michael",
      type: "email",
      priority: "high",
      time: "10:30",
      duration: 20,
      completed: false,
      points: 40,
      aiOptimized: false,
    },
    {
      id: "3",
      title: "Team sync - Weekly pipeline review",
      type: "meeting",
      priority: "medium",
      time: "11:00",
      duration: 45,
      completed: false,
      points: 30,
      aiOptimized: false,
    },
    {
      id: "4",
      title: "Follow up with Johnson family",
      type: "follow-up",
      priority: "high",
      time: "14:00",
      duration: 25,
      completed: false,
      points: 45,
      aiOptimized: true,
      successRate: 82,
    },
    {
      id: "5",
      title: "Review closing documents",
      type: "document",
      priority: "medium",
      time: "15:30",
      duration: 40,
      completed: false,
      points: 35,
      aiOptimized: false,
    },
  ]);

  const handleTaskComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId && !task.completed) {
          setShowCelebration(true);
          setCompletedTasks((c) => c + 1);
          // Update productivity score
          setProductivityScore((s) => Math.min(100, s + 2));
          return { ...task, completed: true };
        }
        return task;
      }),
    );
  };

  // Add subtle noise texture for premium feel
  const noiseTexture = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E`;

  return (
    <>
      <AnimatedBackground />
      <div
        className="min-h-screen relative"
        style={{
          backgroundImage: `url("${noiseTexture}")`,
          backgroundBlendMode: "overlay",
        }}
      >
        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

        <div className="relative z-10 space-y-8 p-6">
          {/* Premium Header with Morning Greeting */}
          <MorningGreeting userName="Sarah" className="mb-12" />

          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <TaskCounter completed={completedTasks} total={tasks.length} />
            <StreakCounter
              currentStreak={currentStreak}
              personalBest={personalBest}
            />
            <DailyPerformanceGauge
              score={productivityScore}
              previousScore={previousScore}
              className="lg:col-span-1 md:col-span-2"
            />
          </div>

          {/* Commission and Pipeline */}
          <CommissionDisplay
            monthlyCommission={monthlyCommission}
            pipelineValue={pipelineValue}
            lastMonthCommission={38500}
            className="mb-8"
          />

          {/* Main Grid Layout */}
          <div className="grid grid-cols-12 gap-6">
            {/* Full Width - Priority Timeline */}
            <div className="col-span-12">
              <PriorityTimeline
                tasks={tasks}
                onTaskComplete={handleTaskComplete}
              />
            </div>

            {/* Bottom Row - Scoreboard and AI Insights */}
            <div className="col-span-12 lg:col-span-6">
              <RadialActivityScoreboard />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <AIInsightsCharts />
            </div>
          </div>

          {/* Micro Celebration */}
          <MicroCelebration
            show={showCelebration}
            message="Task Completed! +Points"
            onComplete={() => setShowCelebration(false)}
          />
        </div>
      </div>
    </>
  );
}
