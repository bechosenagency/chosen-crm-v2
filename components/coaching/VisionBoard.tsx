"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, GripVertical, Target, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface Goal {
  id: string;
  title: string;
  category: "calls" | "meetings" | "content" | "follow-ups";
  priority: "high" | "medium" | "low";
  timeEstimate: number; // in minutes
}

interface SortableGoalProps {
  goal: Goal;
}

function SortableGoal({ goal }: SortableGoalProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: goal.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const categoryColors = {
    calls: "bg-primary",
    meetings: "bg-secondary",
    content: "bg-warning",
    "follow-ups": "bg-primary",
  };

  const priorityColors = {
    high: "destructive",
    medium: "secondary",
    low: "outline",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${isDragging ? "opacity-50" : ""}`}
    >
      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3">
          <button
            className="cursor-grab hover:cursor-grabbing touch-none"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </button>
          <div
            className={`w-1 h-12 rounded-full ${categoryColors[goal.category]}`}
          />
          <div className="flex-1">
            <h4 className="font-medium text-foreground">{goal.title}</h4>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                variant={priorityColors[goal.priority] as any}
                className="text-xs"
              >
                {goal.priority}
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {goal.timeEstimate} min
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function VisionBoard() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Call 20 warm leads",
      category: "calls",
      priority: "high",
      timeEstimate: 120,
    },
    {
      id: "2",
      title: "Create VA loan video content",
      category: "content",
      priority: "medium",
      timeEstimate: 45,
    },
    {
      id: "3",
      title: "Meeting with realtor partners",
      category: "meetings",
      priority: "high",
      timeEstimate: 60,
    },
    {
      id: "4",
      title: "Follow up on pending applications",
      category: "follow-ups",
      priority: "medium",
      timeEstimate: 90,
    },
    {
      id: "5",
      title: "Write blog post on refinancing",
      category: "content",
      priority: "low",
      timeEstimate: 30,
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setGoals((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const totalTime = goals.reduce((acc, goal) => acc + goal.timeEstimate, 0);
  const totalHours = Math.floor(totalTime / 60);
  const totalMinutes = totalTime % 60;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Weekly Vision Board
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Drag to prioritize your goals for the week
          </p>
        </div>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Goal
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={goals} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {goals.map((goal) => (
              <SortableGoal key={goal.id} goal={goal} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="font-medium text-foreground">
              Total Time Planned:
            </span>
          </div>
          <span className="text-lg font-bold text-primary">
            {totalHours}h {totalMinutes}m
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Pro tip: Your most productive hours are 9-11 AM. Schedule
          high-priority tasks first!
        </p>
      </motion.div>
    </Card>
  );
}
