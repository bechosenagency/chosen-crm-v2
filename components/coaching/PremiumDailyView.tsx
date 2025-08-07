"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
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

function Counter({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const animation = animate(count, value, { duration: 2 });
    return animation.stop;
  }, [value]);

  return <motion.span>{rounded}</motion.span>;
}

export default function PremiumDailyView() {
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

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

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
    <div className="space-y-8">
      {/* Premium Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5 }}
          className="relative"
        >
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <Target className="h-8 w-8 text-primary" />
              <Badge variant="secondary" className="text-xs">
                Daily
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Tasks Completed
              </p>
              <p className="text-6xl font-thin tracking-tight text-foreground">
                <Counter value={completedTasks} />
                <span className="text-2xl text-muted-foreground">
                  /{tasks.length}
                </span>
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -5 }}
        >
          <Card className="p-8 bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20 hover:shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <Flame className="h-8 w-8 text-destructive" />
              <Badge variant="outline" className="text-destructive text-xs">
                🔥 Hot Streak
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Current Streak
              </p>
              <p className="text-6xl font-thin tracking-tight text-foreground">
                <Counter value={streak} />
                <span className="text-2xl text-muted-foreground"> days</span>
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -5 }}
        >
          <Card className="p-8 bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20 hover:shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <Award className="h-8 w-8 text-secondary" />
              <Badge variant="secondary" className="text-xs">
                Level 12
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Total Points
              </p>
              <p className="text-6xl font-thin tracking-tight text-foreground">
                <Counter value={totalPoints} />
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -5 }}
        >
          <Card className="p-8 bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20 hover:shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <Zap className="h-8 w-8 text-warning" />
              <Badge variant="outline" className="text-warning text-xs">
                Top 10%
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Productivity Score
              </p>
              <p className="text-6xl font-thin tracking-tight text-foreground">
                92<span className="text-2xl text-muted-foreground">%</span>
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Morning Push Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-10 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-start gap-6">
            <div className="p-4 bg-primary/20 rounded-2xl backdrop-blur-sm">
              <Sun className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-light text-foreground mb-6">
                Your 3 Must-Do Activities Today
              </h3>
              <div className="space-y-4">
                {tasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/50 transition-colors"
                  >
                    <Button
                      size="sm"
                      variant="ghost"
                      className="p-2 h-auto hover:bg-primary/10"
                      onClick={() => handleTaskComplete(task.id)}
                    >
                      {task.completed ? (
                        <CheckCircle2 className="h-6 w-6 text-secondary" />
                      ) : (
                        <Circle className="h-6 w-6 text-muted-foreground" />
                      )}
                    </Button>
                    <span
                      className={`flex-1 text-lg ${task.completed ? "line-through text-muted-foreground" : ""}`}
                    >
                      {task.title}
                    </span>
                    <Badge
                      variant={
                        task.priority === "high" ? "destructive" : "secondary"
                      }
                      className="text-sm px-3 py-1"
                    >
                      +{task.points} pts
                    </Badge>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">
                    {completedTasks}/{tasks.length} completed
                  </span>
                </div>
                <Progress
                  value={completionPercentage}
                  className="h-3"
                  indicatorClassName="bg-primary"
                />
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
            <Card className="p-6 bg-warning/10 border-warning/20">
              <div className="flex items-center gap-4">
                <Bell className="h-6 w-6 text-warning" />
                <p className="text-base font-medium flex-1">{hourlyNudge}</p>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setHourlyNudge("")}
                  className="hover:bg-warning/10"
                >
                  Dismiss
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activity Scoreboard */}
        <ActivityScoreboard />

        {/* AI Insights */}
        <div className="space-y-6">
          <h3 className="text-xl font-light text-foreground flex items-center gap-3">
            <Zap className="h-6 w-6 text-primary" />
            AI Coaching Insights
          </h3>
          <div className="space-y-4">
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
      </div>

      {/* Micro Celebration */}
      <MicroCelebration
        show={showCelebration}
        message="Task Completed! +Points"
        onComplete={() => setShowCelebration(false)}
      />
    </div>
  );
}
