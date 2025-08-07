import { NextResponse } from "next/server";

export async function GET() {
  // Mock real-time activity data
  const scoreboardData = {
    timestamp: new Date().toISOString(),
    activities: [
      {
        type: "calls",
        label: "Calls",
        current: Math.floor(Math.random() * 15) + 5,
        goal: 20,
        trend: "up",
        lastUpdated: new Date(
          Date.now() - Math.random() * 3600000,
        ).toISOString(),
      },
      {
        type: "emails",
        label: "Emails",
        current: Math.floor(Math.random() * 10) + 5,
        goal: 15,
        trend: "stable",
        lastUpdated: new Date(
          Date.now() - Math.random() * 3600000,
        ).toISOString(),
      },
      {
        type: "texts",
        label: "Texts",
        current: Math.floor(Math.random() * 8) + 2,
        goal: 10,
        trend: "up",
        lastUpdated: new Date(
          Date.now() - Math.random() * 3600000,
        ).toISOString(),
      },
      {
        type: "meetings",
        label: "Meetings",
        current: Math.floor(Math.random() * 3) + 1,
        goal: 3,
        trend: "stable",
        lastUpdated: new Date(
          Date.now() - Math.random() * 3600000,
        ).toISOString(),
      },
      {
        type: "followups",
        label: "Follow-ups",
        current: Math.floor(Math.random() * 6) + 2,
        goal: 8,
        trend: "down",
        lastUpdated: new Date(
          Date.now() - Math.random() * 3600000,
        ).toISOString(),
      },
    ],
    overallProgress: 73,
    rank: 3,
    teamAverage: 65,
  };

  return NextResponse.json(scoreboardData);
}
