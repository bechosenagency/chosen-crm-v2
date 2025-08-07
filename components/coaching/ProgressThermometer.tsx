"use client";

import { motion } from "framer-motion";
import { Thermometer, TrendingUp, Target } from "lucide-react";

interface ProgressThermometerProps {
  current: number;
  goal: number;
  label: string;
  unit?: string;
}

export default function ProgressThermometer({
  current,
  goal,
  label,
  unit = "",
}: ProgressThermometerProps) {
  const percentage = Math.min((current / goal) * 100, 100);
  const isComplete = current >= goal;

  const getColor = () => {
    if (percentage >= 100) return "bg-secondary";
    if (percentage >= 75) return "bg-primary";
    if (percentage >= 50) return "bg-warning";
    return "bg-destructive";
  };

  const getGradient = () => {
    if (percentage >= 100) return "from-secondary/20 to-secondary";
    if (percentage >= 75) return "from-primary/20 to-primary";
    if (percentage >= 50) return "from-warning/20 to-warning";
    return "from-destructive/20 to-destructive";
  };

  return (
    <div className="relative flex items-center justify-center">
      <div className="relative w-24 h-64">
        {/* Thermometer Background */}
        <div className="absolute inset-0 bg-muted rounded-full" />

        {/* Thermometer Fill */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`absolute bottom-0 left-0 right-0 rounded-full bg-gradient-to-t ${getGradient()}`}
        />

        {/* Thermometer Bulb */}
        <div
          className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full ${getColor()}`}
        >
          <div className="flex items-center justify-center h-full">
            <Thermometer className="h-12 w-12 text-white" />
          </div>
        </div>

        {/* Scale Marks */}
        <div className="absolute inset-y-0 -right-8 flex flex-col justify-between py-4">
          <span className="text-xs text-muted-foreground">
            {goal}
            {unit}
          </span>
          <span className="text-xs text-muted-foreground">
            {Math.round(goal * 0.75)}
            {unit}
          </span>
          <span className="text-xs text-muted-foreground">
            {Math.round(goal * 0.5)}
            {unit}
          </span>
          <span className="text-xs text-muted-foreground">
            {Math.round(goal * 0.25)}
            {unit}
          </span>
          <span className="text-xs text-muted-foreground">0{unit}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="ml-16 space-y-4">
        <div>
          <h4 className="text-lg font-semibold text-foreground">{label}</h4>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold text-foreground">
              {current}
            </span>
            <span className="text-muted-foreground">
              / {goal}
              {unit}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className={`h-2 w-2 rounded-full ${getColor()}`} />
            <span className="text-sm font-medium">
              {Math.round(percentage)}% Complete
            </span>
          </div>
        </div>

        {isComplete && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2 p-3 bg-secondary/10 rounded-lg"
          >
            <Target className="h-5 w-5 text-secondary" />
            <span className="text-sm font-medium text-secondary">
              Goal Achieved!
            </span>
          </motion.div>
        )}

        {!isComplete && percentage >= 75 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <TrendingUp className="h-4 w-4" />
            <span>
              Almost there! {goal - current}
              {unit} to go
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
