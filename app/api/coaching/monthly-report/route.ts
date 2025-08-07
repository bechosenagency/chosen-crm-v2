import { NextResponse } from "next/server";

export async function GET() {
  const monthlyReport = {
    period: {
      month: new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
      startDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1,
      ).toISOString(),
      endDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0,
      ).toISOString(),
    },
    summary: {
      overallScore: 92,
      percentile: 89,
      trend: "up",
      improvementRate: 27,
    },
    metrics: {
      calls: { total: 350, goal: 300, achievement: 117, trend: "+25%" },
      meetings: { total: 58, goal: 50, achievement: 116, trend: "+15%" },
      applications: { total: 22, goal: 20, achievement: 110, trend: "+22%" },
      closings: { total: 15, goal: 12, achievement: 125, trend: "+30%" },
      conversionRate: {
        value: 24,
        benchmark: 20,
        achievement: 120,
        trend: "+4%",
      },
    },
    achievements: [
      {
        id: "top-performer",
        title: "Top Performer",
        description: "Ranked #3 in team",
        icon: "🏆",
      },
      {
        id: "perfect-week",
        title: "Perfect Week",
        description: "Hit all goals in Week 2 & 4",
        icon: "💯",
      },
      {
        id: "rapid-growth",
        title: "Rapid Growth",
        description: "+30% improvement",
        icon: "🚀",
      },
      {
        id: "goal-crusher",
        title: "Goal Crusher",
        description: "All monthly goals achieved",
        icon: "🎯",
      },
      {
        id: "speed-demon",
        title: "Speed Demon",
        description: "Fastest response time",
        icon: "⚡",
      },
    ],
    insights: {
      strengths: [
        "Exceptional follow-up rate (92% on-time)",
        "Tuesday/Thursday performance 40% above average",
        "Video content engagement 2.3x industry standard",
      ],
      opportunities: [
        "Content creation frequency (current: 3/week, target: 5/week)",
        "Morning productivity could increase by 20%",
        "Weekend touchpoints show 30% higher referral rate",
      ],
      recommendations: [
        {
          title: "Increase Content Frequency",
          description:
            "Move from 3 to 5 posts per week to generate 8-10 more warm leads",
          impact: "high",
          effort: "medium",
        },
        {
          title: "Optimize Morning Routine",
          description:
            "Start calls 30 minutes earlier to capture high-energy window",
          impact: "medium",
          effort: "low",
        },
        {
          title: "Weekend Check-ins",
          description:
            "Add Saturday morning touchpoints for 30% more referrals",
          impact: "high",
          effort: "medium",
        },
      ],
    },
    goalAdjustments: [
      {
        metric: "Daily Calls",
        current: 20,
        suggested: 25,
        reason: "Improved efficiency allows for more volume",
      },
      {
        metric: "Weekly Meetings",
        current: 15,
        suggested: 18,
        reason: "Higher call-to-meeting conversion",
      },
      {
        metric: "Content Posts",
        current: 3,
        suggested: 5,
        reason: "High ROI on content engagement",
      },
    ],
    nextMonthFocus: {
      primary: "Refinance Opportunities",
      reason: "Rate drop expected - 23 past clients could benefit",
      action: "Schedule check-in calls in week 1",
      targetOutcome: "5-8 refinance applications",
    },
  };

  return NextResponse.json(monthlyReport);
}
