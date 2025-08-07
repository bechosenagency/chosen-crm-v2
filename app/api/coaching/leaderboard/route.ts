import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeframe = searchParams.get("timeframe") || "monthly";
  const limit = parseInt(searchParams.get("limit") || "10");

  // Mock leaderboard data
  const players = [
    {
      id: "1",
      name: "Sarah Johnson",
      points: 12500,
      avatar: "SJ",
      change: "up",
      rank: 1,
      badges: 15,
    },
    {
      id: "2",
      name: "Mike Chen",
      points: 11800,
      avatar: "MC",
      change: "up",
      rank: 2,
      badges: 12,
    },
    {
      id: "3",
      name: "You",
      points: 11200,
      avatar: "YO",
      change: "down",
      rank: 3,
      badges: 14,
      isCurrentUser: true,
    },
    {
      id: "4",
      name: "Lisa Rodriguez",
      points: 10900,
      avatar: "LR",
      change: "up",
      rank: 4,
      badges: 11,
    },
    {
      id: "5",
      name: "James Smith",
      points: 10500,
      avatar: "JS",
      change: "same",
      rank: 5,
      badges: 10,
    },
    {
      id: "6",
      name: "Emily Davis",
      points: 10200,
      avatar: "ED",
      change: "down",
      rank: 6,
      badges: 9,
    },
    {
      id: "7",
      name: "Robert Wilson",
      points: 9800,
      avatar: "RW",
      change: "up",
      rank: 7,
      badges: 8,
    },
    {
      id: "8",
      name: "Jessica Brown",
      points: 9500,
      avatar: "JB",
      change: "up",
      rank: 8,
      badges: 8,
    },
    {
      id: "9",
      name: "David Miller",
      points: 9200,
      avatar: "DM",
      change: "down",
      rank: 9,
      badges: 7,
    },
    {
      id: "10",
      name: "Amanda Taylor",
      points: 8900,
      avatar: "AT",
      change: "same",
      rank: 10,
      badges: 7,
    },
  ];

  const leaderboardData = {
    timeframe,
    lastUpdated: new Date().toISOString(),
    players: players.slice(0, limit),
    currentUser: {
      rank: 3,
      points: 11200,
      pointsToNext: 600,
      percentile: 89,
      trend: {
        direction: "up",
        change: 15,
        timeframe: "vs last week",
      },
    },
    teamStats: {
      averagePoints: 10420,
      topPerformer: players[0],
      mostImproved: {
        name: "Mike Chen",
        improvement: "+2,300 points",
        percentChange: 24,
      },
    },
    categories: [
      { name: "Calls", leader: "Sarah Johnson", points: 3500 },
      { name: "Meetings", leader: "You", points: 2800 },
      { name: "Closings", leader: "Mike Chen", points: 3200 },
      { name: "Content", leader: "Lisa Rodriguez", points: 1800 },
    ],
  };

  return NextResponse.json(leaderboardData);
}
