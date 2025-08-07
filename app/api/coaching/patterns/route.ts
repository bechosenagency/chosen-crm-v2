import { NextResponse } from "next/server";

export async function GET() {
  const patterns = {
    behavioral: {
      peakPerformanceDays: {
        primary: "Tuesday",
        secondary: "Thursday",
        insight: "Your conversion rate is 40% higher on these days",
        recommendation: "Schedule important calls on Tuesdays and Thursdays",
      },
      optimalCallTimes: {
        morning: { window: "10-11 AM", successRate: 78 },
        afternoon: { window: "2-3 PM", successRate: 72 },
        avoid: { window: "After 3 PM", reason: "Conversion drops by 40%" },
      },
      energyPatterns: {
        highEnergy: ["9 AM - 11 AM", "2 PM - 3 PM"],
        lowEnergy: ["12 PM - 1 PM", "4 PM - 5 PM"],
        recommendation: "Schedule breaks during low energy periods",
      },
    },
    performance: {
      callsToMeetingRatio: {
        current: 5.2,
        target: 4.0,
        trend: "improving",
        insight: "You're getting better at qualifying leads",
      },
      meetingToApplicationRatio: {
        current: 2.8,
        target: 2.5,
        trend: "stable",
        insight: "Close to optimal - focus on quality over quantity",
      },
      averageResponseTime: {
        current: "12 minutes",
        benchmark: "15 minutes",
        percentile: 85,
        insight: "Your quick responses contribute to higher conversion",
      },
    },
    content: {
      bestPerformingTypes: ["Video", "Market Updates", "Success Stories"],
      optimalPostingTimes: ["Tuesday 10 AM", "Thursday 2 PM", "Friday 11 AM"],
      engagementMultiplier: 2.3,
      leadGenerationRate: "8-10 leads per 5 posts",
    },
    improvement: {
      strengths: [
        "Follow-up consistency (92% on-time rate)",
        "Response time (top 15%)",
        "Video content engagement",
      ],
      opportunities: [
        "Increase content frequency to 5 posts/week",
        "Morning productivity could improve by 20%",
        "Weekend touchpoints generate 30% more referrals",
      ],
    },
  };

  return NextResponse.json(patterns);
}
