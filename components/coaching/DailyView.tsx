"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Clock,
  CheckCircle2,
  Circle,
  Bell,
  Flame,
  Award,
  Target,
  Coffee,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import ActivityScoreboard from "./ActivityScoreboard";
import CoachingInsightCard from "./CoachingInsightCard";
import MicroCelebration from "./MicroCelebration";
import { format } from "date-fns";

interface Task {
  id: string;
  title: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
  points: number;
}

export default function DailyView() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Call back Jennifer about refinance options",
      priority: "high",
      completed: false,
      points: 50,
    },
    {
      id: "2",
      title: "Send VA loan information to Michael",
      priority: "high",
      completed: false,
      points: 40,
    },
    {
      id: "3",
      title: "Follow up with the Johnson family",
      priority: "medium",
      completed: false,
      points: 30,
    },
  ]);

  const [showCelebration, setShowCelebration] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hourlyNudge, setHourlyNudge] = useState("");
  const [streak, setStreak] = useState(7);
  const [totalPoints, setTotalPoints] = useState(850);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Simulate hourly nudges
  useEffect(() => {
    const hour = currentTime.getHours();
    if (hour === 11) {
      setHourlyNudge(
        "You usually complete 5 calls by 11 AM. You've done 3 so far - 2 more to go!",
      );
    } else if (hour === 14) {
      setHourlyNudge(
        "Post-lunch is your power hour! Time to tackle those follow-ups.",
      );
    } else if (hour === 16) {
      setHourlyNudge(
        "Energy dip detected. Take a 5-minute break, then finish strong!",
      );
    }
  }, [currentTime]);

  const handleTaskComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId && !task.completed) {
          setShowCelebration(true);
          setTotalPoints((p) => p + task.points);
          return { ...task, completed: true };
        }
        return task;
      }),
    );
  };

  const completedTasks = tasks.filter((t) => t.completed).length;
  const completionPercentage = (completedTasks / tasks.length) * 100;

  return (
    <div className="space-y-6">
      {/* Morning Push Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary rounded-lg">
              <Sun className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Good Morning! Your 3 Must-Do Activities Today
              </h3>
              <div className="space-y-2">
                {tasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <Button
                      size="sm"
                      variant="ghost"
                      className="p-1 h-auto"
                      onClick={() => handleTaskComplete(task.id)}
                    >
                      {task.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-secondary" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </Button>
                    <span
                      className={`flex-1 ${task.completed ? "line-through text-muted-foreground" : ""}`}
                    >
                      {task.title}
                    </span>
                    <Badge
                      variant={
                        task.priority === "high" ? "destructive" : "secondary"
                      }
                    >
                      +{task.points} pts
                    </Badge>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-4">
                <Progress
                  value={completionPercentage}
                  className="flex-1"
                  indicatorClassName="bg-primary"
                />
                <span className="text-sm font-medium">
                  {completedTasks}/{tasks.length}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Hourly Nudge */}
      <AnimatePresence>
        {hourlyNudge && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="p-4 bg-warning/10 border-warning/20">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-warning" />
                <p className="text-sm font-medium">{hourlyNudge}</p>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setHourlyNudge("")}
                  className="ml-auto"
                >
                  Dismiss
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Scoreboard */}
        <ActivityScoreboard />

        {/* Stats Cards */}
        <div className="space-y-4">
          {/* Streak Card */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-destructive/10 rounded-lg">
                  <Flame className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    Daily Streak
                  </h4>
                  <p className="text-2xl font-bold text-destructive">
                    {streak} Days
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-destructive">
                🔥 On Fire!
              </Badge>
            </div>
          </Card>

          {/* Points Card */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    Total Points
                  </h4>
                  <p className="text-2xl font-bold text-primary">
                    {totalPoints.toLocaleString()}
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-primary">
                Level 12
              </Badge>
            </div>
          </Card>
        </div>
      </div>

      {/* AI Insights */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          AI Coaching Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CoachingInsightCard
            title="Optimal Calling Time"
            insight="Jennifer usually answers calls between 2-3 PM. You have a 78% success rate during this window."
            type="timing"
            priority="high"
            actionable="Schedule call for 2 PM"
          />
          <CoachingInsightCard
            title="Energy Management"
            insight="Your conversion rate drops by 40% after 3 PM. Consider scheduling high-priority calls before lunch."
            type="energy"
            priority="medium"
            actionable="Reorganize schedule"
          />
        </div>
      </div>

      {/* End of Day Summary (shown after 5 PM) */}
      {currentTime.getHours() >= 17 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 bg-gradient-to-r from-secondary/5 to-secondary/10 border-secondary/20">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              End of Day Summary - {format(currentTime, "MMMM d, yyyy")}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold text-secondary">
                  {Math.round(completionPercentage)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Points Earned</p>
                <p className="text-2xl font-bold text-primary">+120</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Calls Made</p>
                <p className="text-2xl font-bold text-foreground">18</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Streak Status</p>
                <p className="text-2xl font-bold text-destructive">
                  🔥 {streak + 1}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Great job today! You maintained your streak and exceeded your call
              goal. Tomorrow, focus on following up with the Smith family about
              their pre-approval.
            </p>
          </Card>
        </motion.div>
      )}

      {/* Micro Celebration */}
      <MicroCelebration
        show={showCelebration}
        message="Task Completed! +Points"
        onComplete={() => setShowCelebration(false)}
      />
    </div>
  );
}
