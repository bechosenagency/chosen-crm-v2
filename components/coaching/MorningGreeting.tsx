"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Coffee, Zap, Trophy } from "lucide-react";

interface MorningGreetingProps {
  userName?: string;
  className?: string;
}

export default function MorningGreeting({
  userName = "Champion",
  className = "",
}: MorningGreetingProps) {
  const [greeting, setGreeting] = useState("");
  const [motivation, setMotivation] = useState("");
  const [icon, setIcon] = useState<any>(Sun);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    const day = currentTime.toLocaleDateString("en-US", { weekday: "long" });

    // Set greeting based on time
    if (hour < 12) {
      setGreeting(`Good morning, ${userName}`);
      setIcon(Coffee);
    } else if (hour < 17) {
      setGreeting(`Good afternoon, ${userName}`);
      setIcon(Sun);
    } else if (hour < 20) {
      setGreeting(`Good evening, ${userName}`);
      setIcon(Zap);
    } else {
      setGreeting(`Still crushing it, ${userName}?`);
      setIcon(Moon);
    }

    // Set motivational message based on day and time
    const motivations = {
      Monday: [
        "Fresh week, fresh opportunities. Let's dominate! 💪",
        "Monday momentum sets the tone. You've got this! 🚀",
        "New week, new deals, new records to break! 🏆",
      ],
      Tuesday: [
        "Building on yesterday's wins. Keep pushing! 🔥",
        "Tuesday hustle mode activated. Let's go! ⚡",
        "Momentum is building. Time to accelerate! 🎯",
      ],
      Wednesday: [
        "Halfway there! Your consistency is paying off! 📈",
        "Wednesday warrior mode. Nothing can stop you! 💫",
        "Mid-week milestone. You're crushing it! 🌟",
      ],
      Thursday: [
        "Almost there! Finish strong! 🏃‍♂️",
        "Thursday thunder! Your energy is contagious! ⚡",
        "One more push before the weekend sprint! 🚀",
      ],
      Friday: [
        "Victory Friday! Time to close those deals! 🎉",
        "Finish line in sight. Sprint to the weekend! 🏁",
        "Friday finisher! Make these last hours count! 💰",
      ],
      Saturday: [
        "Weekend warrior! Your dedication is unmatched! 🦾",
        "Saturday success mode. Leaders never rest! 👑",
        "While others rest, champions persist! 🏆",
      ],
      Sunday: [
        "Sunday strategist! Planning for domination! 📊",
        "Rest day? More like best day to get ahead! 🎯",
        "Sunday prep for Monday success! 🚀",
      ],
    };

    const dayMotivations =
      motivations[day as keyof typeof motivations] || motivations.Monday;
    const randomIndex = Math.floor(Math.random() * dayMotivations.length);
    setMotivation(dayMotivations[randomIndex]);
  }, [currentTime, userName]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`text-center space-y-4 ${className}`}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="inline-flex items-center gap-4"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 5,
          }}
          className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl"
        >
          {icon && <icon className="h-8 w-8 text-primary" />}
        </motion.div>

        <div className="text-left">
          <motion.h1
            className="text-3xl font-light text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {greeting}
          </motion.h1>

          <motion.p
            className="text-lg text-muted-foreground mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {motivation}
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
        className="flex items-center justify-center gap-6 text-sm"
      >
        <div className="flex items-center gap-2 text-muted-foreground">
          <Trophy className="h-4 w-4 text-primary" />
          <span>Top 10% this week</span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2 text-muted-foreground">
          <Zap className="h-4 w-4 text-warning" />
          <span>92% productivity</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
