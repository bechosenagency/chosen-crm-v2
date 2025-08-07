import { NextResponse } from "next/server";

export async function GET() {
  const weeklyVision = {
    weekNumber:
      Math.floor(
        (Date.now() - new Date(new Date().getFullYear(), 0, 1).getTime()) /
          604800000,
      ) + 1,
    goals: [
      {
        id: "1",
        title: "Call 20 warm leads",
        category: "calls",
        priority: "high",
        timeEstimate: 120,
        progress: 65,
        aiInsight: "Focus on Tuesday/Thursday for best results",
      },
      {
        id: "2",
        title: "Create VA loan video content",
        category: "content",
        priority: "medium",
        timeEstimate: 45,
        progress: 0,
        aiInsight: "5 prospects need this information",
      },
      {
        id: "3",
        title: "Meeting with realtor partners",
        category: "meetings",
        priority: "high",
        timeEstimate: 60,
        progress: 100,
        aiInsight: "Completed - generated 3 referrals!",
      },
      {
        id: "4",
        title: "Follow up on pending applications",
        category: "follow-ups",
        priority: "medium",
        timeEstimate: 90,
        progress: 40,
        aiInsight: "3 applications need documents",
      },
      {
        id: "5",
        title: "Write blog post on refinancing",
        category: "content",
        priority: "low",
        timeEstimate: 30,
        progress: 20,
        aiInsight: "Schedule for Friday afternoon",
      },
    ],
    patterns: {
      bestDays: ["Tuesday", "Thursday"],
      productiveHours: "9 AM - 11 AM",
      conversionTrend: "+15% when posting content before calls",
      weeklyStreak: 4,
    },
    contentSuggestions: [
      {
        day: "Monday",
        topic: "First-Time Buyer Tips",
        reason: "5 prospects are first-time buyers",
      },
      {
        day: "Wednesday",
        topic: "Market Update",
        reason: "Rates changed this week",
      },
      {
        day: "Friday",
        topic: "Success Story",
        reason: "Johnson family just closed",
      },
    ],
  };

  return NextResponse.json(weeklyVision);
}

export async function PUT(request: Request) {
  // Handle goal updates/reordering
  const body = await request.json();

  // In a real app, this would update the database
  return NextResponse.json({
    success: true,
    message: "Goals updated successfully",
    updatedGoals: body.goals,
  });
}
