import { NextResponse } from "next/server";

export async function GET() {
  // Mock daily plan data
  const dailyPlan = {
    date: new Date().toISOString(),
    mustDoActivities: [
      {
        id: "1",
        title: "Call back Jennifer about refinance options",
        priority: "high",
        estimatedTime: 15,
        bestTime: "2:00 PM - 3:00 PM",
        reason: "78% answer rate during this window",
        points: 50,
      },
      {
        id: "2",
        title: "Send VA loan information to Michael",
        priority: "high",
        estimatedTime: 10,
        bestTime: "Before lunch",
        reason: "Higher email open rates in the morning",
        points: 40,
      },
      {
        id: "3",
        title: "Follow up with the Johnson family",
        priority: "medium",
        estimatedTime: 20,
        bestTime: "4:00 PM",
        reason: "They mentioned being available after work",
        points: 30,
      },
    ],
    insights: {
      energyPeak: "9:00 AM - 11:00 AM",
      conversionWindow: "Your conversion rate is 40% higher on Tuesdays",
      focusRecommendation: "Schedule high-priority calls before 3 PM",
    },
    currentStreak: 7,
    totalPointsToday: 0,
  };

  return NextResponse.json(dailyPlan);
}
