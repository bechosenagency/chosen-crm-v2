import { NextResponse } from "next/server";

export async function GET() {
  const hour = new Date().getHours();

  // Generate contextual nudges based on time of day
  const nudges = [
    {
      id: "morning",
      time: "9:00 AM",
      message:
        "Good morning! Your energy is highest now. Perfect time for those important calls!",
      type: "energy",
      active: hour >= 9 && hour < 11,
    },
    {
      id: "midmorning",
      time: "11:00 AM",
      message:
        "You usually complete 5 calls by 11 AM. You've done 3 so far - 2 more to go!",
      type: "progress",
      active: hour === 11,
    },
    {
      id: "lunch",
      time: "12:00 PM",
      message:
        "Lunch break reminder! Taking breaks improves afternoon productivity by 23%.",
      type: "wellness",
      active: hour === 12,
    },
    {
      id: "afternoon",
      time: "2:00 PM",
      message:
        "Post-lunch is your power hour! Time to tackle those follow-ups.",
      type: "energy",
      active: hour === 14,
    },
    {
      id: "lateafternoon",
      time: "4:00 PM",
      message:
        "Energy dip detected. Take a 5-minute break, then finish strong!",
      type: "wellness",
      active: hour === 16,
    },
    {
      id: "endofday",
      time: "5:00 PM",
      message: "Great work today! Remember to log your wins for bonus points.",
      type: "celebration",
      active: hour >= 17,
    },
  ];

  const activeNudge = nudges.find((n) => n.active) || null;

  return NextResponse.json({
    currentNudge: activeNudge,
    allNudges: nudges,
    personalizedInsight:
      "Your best calling hours today are 2-3 PM based on past success rates.",
  });
}
