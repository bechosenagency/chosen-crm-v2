"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Phone,
  Mail,
  Users,
  FileText,
  CheckCircle2,
  Circle,
  AlertCircle,
  Sparkles,
  Target,
} from "lucide-react";
import { format } from "date-fns";

interface Task {
  id: string;
  title: string;
  type: "call" | "email" | "meeting" | "document" | "follow-up";
  priority: "high" | "medium" | "low";
  time: string; // 24-hour format "14:00"
  duration: number; // minutes
  completed: boolean;
  points: number;
  aiOptimized?: boolean;
  successRate?: number;
}

interface PriorityTimelineProps {
  tasks?: Task[];
  onTaskComplete?: (taskId: string) => void;
  className?: string;
}

const defaultTasks: Task[] = [
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
];

const getTaskIcon = (type: Task["type"]) => {
  switch (type) {
    case "call":
      return Phone;
    case "email":
      return Mail;
    case "meeting":
      return Users;
    case "document":
      return FileText;
    case "follow-up":
      return Target;
    default:
      return Circle;
  }
};

const getTaskColor = (type: Task["type"]) => {
  switch (type) {
    case "call":
      return "text-primary border-primary/20 bg-primary/5";
    case "email":
      return "text-secondary border-secondary/20 bg-secondary/5";
    case "meeting":
      return "text-warning border-warning/20 bg-warning/5";
    case "document":
      return "text-purple-600 border-purple-600/20 bg-purple-600/5";
    case "follow-up":
      return "text-emerald-600 border-emerald-600/20 bg-emerald-600/5";
    default:
      return "text-muted-foreground border-muted-foreground/20 bg-muted-foreground/5";
  }
};

export default function PriorityTimeline({
  tasks = defaultTasks,
  onTaskComplete,
  className = "",
}: PriorityTimelineProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hoveredTask, setHoveredTask] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const hours = Array.from({ length: 11 }, (_, i) => 8 + i); // 8 AM to 6 PM
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const currentTimePosition =
    (((currentHour - 8) * 60 + currentMinute) / 600) * 100; // percentage

  const getTaskPosition = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return (((hours - 8) * 60 + minutes) / 600) * 100; // percentage
  };

  const getTaskWidth = (duration: number) => {
    return (duration / 600) * 100; // percentage
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="p-8 bg-white/90 backdrop-blur-md border-white/20 shadow-[0_20px_25px_-5px_rgb(0_0_0_/_0.1),_0_8px_10px_-6px_rgb(0_0_0_/_0.1)]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-light text-foreground">
              Priority Timeline
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              AI-optimized schedule for maximum productivity
            </p>
          </div>
          <Badge variant="outline" className="text-sm px-3 py-1">
            <Clock className="h-3 w-3 mr-1" />
            {format(currentTime, "h:mm a")}
          </Badge>
        </div>

        {/* Timeline container */}
        <div className="relative">
          {/* Hour markers */}
          <div className="flex justify-between mb-8">
            {hours.map((hour) => (
              <div key={hour} className="text-center flex-1">
                <div className="text-xs font-medium text-muted-foreground">
                  {hour === 12
                    ? "12 PM"
                    : hour < 12
                      ? `${hour} AM`
                      : `${hour - 12} PM`}
                </div>
              </div>
            ))}
          </div>

          {/* Timeline track */}
          <div className="relative h-32 bg-muted/20 rounded-lg overflow-hidden">
            {/* Hour grid lines */}
            {hours.map((_, i) => (
              <div
                key={i}
                className="absolute top-0 bottom-0 w-px bg-muted/30"
                style={{ left: `${(i / 10) * 100}%` }}
              />
            ))}

            {/* Current time indicator */}
            {currentTimePosition >= 0 && currentTimePosition <= 100 && (
              <motion.div
                className="absolute top-0 bottom-0 w-0.5 bg-destructive z-20"
                style={{ left: `${currentTimePosition}%` }}
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                  <div className="w-2 h-2 bg-destructive rounded-full" />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                  <div className="w-2 h-2 bg-destructive rounded-full" />
                </div>
              </motion.div>
            )}

            {/* Tasks */}
            <AnimatePresence>
              {tasks.map((task, index) => {
                const position = getTaskPosition(task.time);
                const width = getTaskWidth(task.duration);
                const Icon = getTaskIcon(task.type);
                const isHovered = hoveredTask === task.id;
                const isPast = position + width < currentTimePosition;

                return (
                  <motion.div
                    key={task.id}
                    className={`absolute cursor-pointer ${getTaskColor(task.type)} 
                      ${task.completed ? "opacity-50" : ""} 
                      ${isPast && !task.completed ? "animate-pulse" : ""}
                      rounded-md border transition-all`}
                    style={{
                      left: `${position}%`,
                      width: `${Math.max(width, 5)}%`, // minimum width for visibility
                      top: `${20 + (index % 3) * 30}px`,
                      height: "24px",
                      zIndex: isHovered ? 10 : 1,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    onMouseEnter={() => setHoveredTask(task.id)}
                    onMouseLeave={() => setHoveredTask(null)}
                    onClick={() => onTaskComplete?.(task.id)}
                  >
                    <div className="flex items-center h-full px-2">
                      {task.completed ? (
                        <CheckCircle2 className="h-3 w-3 shrink-0" />
                      ) : (
                        <Icon className="h-3 w-3 shrink-0" />
                      )}
                      {width > 10 && (
                        <span className="ml-1 text-[10px] font-medium truncate">
                          {task.title.split(" - ")[0]}
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Task details on hover */}
          <AnimatePresence>
            {hoveredTask && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute z-30 mt-4 p-4 bg-white rounded-lg shadow-xl border max-w-sm"
              >
                {(() => {
                  const task = tasks.find((t) => t.id === hoveredTask);
                  if (!task) return null;
                  const Icon = getTaskIcon(task.type);

                  return (
                    <>
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className={`p-2 rounded-lg ${getTaskColor(task.type)}`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{task.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {task.time} • {task.duration} min
                          </p>
                        </div>
                        <Badge
                          variant={
                            task.priority === "high"
                              ? "destructive"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          +{task.points} pts
                        </Badge>
                      </div>

                      {task.aiOptimized && (
                        <div className="flex items-center gap-2 p-2 bg-primary/5 rounded-md">
                          <Sparkles className="h-3 w-3 text-primary" />
                          <span className="text-xs text-primary font-medium">
                            AI: {task.successRate}% success rate at this time
                          </span>
                        </div>
                      )}

                      {!task.completed && (
                        <Button
                          size="sm"
                          className="w-full mt-3"
                          onClick={(e) => {
                            e.stopPropagation();
                            onTaskComplete?.(task.id);
                          }}
                        >
                          Mark Complete
                        </Button>
                      )}
                    </>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-6 pt-6 border-t">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Phone className="h-3 w-3 text-primary" />
            <span>Calls</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mail className="h-3 w-3 text-secondary" />
            <span>Emails</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="h-3 w-3 text-warning" />
            <span>Meetings</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary" />
            <span>AI Optimized</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
