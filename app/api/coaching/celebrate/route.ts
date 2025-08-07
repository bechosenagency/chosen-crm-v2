import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { type, taskId, points, achievement } = body;

  // In a real app, this would update the database and trigger notifications
  const celebration = {
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toISOString(),
    type,
    taskId,
    points: points || 0,
    achievement,
    message: getRandomCelebrationMessage(type),
    newTotalPoints: Math.floor(Math.random() * 1000) + 10000, // Mock total
    streakUpdate: {
      current: 7,
      milestone: type === "daily-complete" ? 7 : null,
    },
    unlocked:
      type === "achievement"
        ? {
            badge: "early-bird",
            title: "Early Bird",
            description: "Complete morning tasks before 10 AM",
          }
        : null,
  };

  return NextResponse.json(celebration);
}

function getRandomCelebrationMessage(type: string): string {
  const messages = {
    "task-complete": [
      "Great job! Keep the momentum going! 🚀",
      "Another one done! You're on fire! 🔥",
      "Excellent work! Your consistency is paying off! 💪",
      "Task crushed! You're unstoppable! ⚡",
    ],
    "daily-complete": [
      "Daily goals achieved! Time to celebrate! 🎉",
      "Perfect day! You're a productivity machine! 🏆",
      "All done for today! Rest well, champion! 🌟",
      "100% completion! Outstanding performance! 💯",
    ],
    achievement: [
      "New achievement unlocked! You're leveling up! 🎮",
      "Milestone reached! Your hard work is showing! 🏅",
      "Achievement earned! You're making great progress! 📈",
      "Congratulations! Another badge for your collection! 🎖️",
    ],
  };

  const messageArray =
    messages[type as keyof typeof messages] || messages["task-complete"];
  return messageArray[Math.floor(Math.random() * messageArray.length)];
}
