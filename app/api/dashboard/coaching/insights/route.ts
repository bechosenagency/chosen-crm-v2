import { NextResponse } from "next/server";

// Generate personalized coaching insights based on performance
function generateCoachingInsights() {
  const hour = new Date().getHours();
  const dayOfWeek = new Date().getDay();
  
  // Time-based patterns
  const timePatterns = [
    "Your conversion rate peaks between 10-11 AM",
    "You close 35% more deals on Thursday calls",
    "Morning appointments have 2x higher show rates",
    "Your email response rate is highest before noon",
    "Friday afternoons show lower engagement - plan accordingly"
  ];
  
  // Performance patterns
  const performancePatterns = [
    "You excel at refinance opportunities (78% close rate)",
    "First-time buyers respond best to your consultation style",
    "Your follow-up timing is optimal at 48-hour intervals",
    "Video calls increase your close rate by 23%",
    "Referral leads have your highest lifetime value"
  ];
  
  // Behavioral insights
  const behavioralInsights = [
    "Taking 5-minute breaks between calls improves your energy",
    "Your most productive days follow morning team meetings",
    "Preparing notes the night before increases next-day conversions",
    "Your enthusiasm is contagious after coffee meetings",
    "Walking meetings generate creative solutions"
  ];
  
  // Dynamic predictions based on current data
  const predictions = generatePredictions();
  
  // Celebrations and achievements
  const celebrations = generateCelebrations();
  
  return {
    patterns: selectRandom(timePatterns.concat(performancePatterns), 3),
    predictions: predictions,
    celebrations: celebrations,
    behavioralInsights: selectRandom(behavioralInsights, 2),
    coachingMode: determineCoachingMode(),
    focusArea: determineFocusArea(hour, dayOfWeek),
    motivationalQuote: getMotivationalQuote()
  };
}

function selectRandom<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generatePredictions() {
  const baseConversion = 0.2 + Math.random() * 0.15;
  const dealsInPipeline = Math.floor(Math.random() * 10) + 5;
  const likelyCloses = Math.floor(dealsInPipeline * baseConversion);
  
  return [
    `Based on current pace, you'll hit ${85 + Math.floor(Math.random() * 15)}% of monthly target`,
    `${likelyCloses} deals likely to close next week ($${likelyCloses * 380}K volume)`,
    "Pipeline velocity suggests strong Q2 performance ahead",
    `Current activity level projects ${Math.floor(Math.random() * 5) + 12} new leads this week`,
    "Your referral network is primed for 2-3 introductions this month"
  ].slice(0, 3);
}

function generateCelebrations() {
  const achievements = [
    "5-day activity streak! Personal best 🔥",
    "Fastest application turnaround this month",
    "Top 10% conversion rate this week",
    "3 five-star reviews in the last 7 days",
    "Hit daily call goal 4 days straight",
    "Best email response rate this quarter",
    "Exceeded weekly pipeline target by 20%",
    "Shortest average call-to-close time"
  ];
  
  return selectRandom(achievements, 3);
}

function determineCoachingMode(): 'sprint' | 'standard' | 'cruise' {
  const performance = Math.random();
  if (performance < 0.3) return 'sprint';
  if (performance < 0.7) return 'standard';
  return 'cruise';
}

function determineFocusArea(hour: number, dayOfWeek: number) {
  if (hour < 12) {
    return {
      area: "Morning Momentum",
      suggestion: "Prime time for prospecting calls. Your energy is contagious!",
      actions: ["Call top 3 hot leads", "Send follow-up emails", "Review daily priorities"]
    };
  } else if (hour < 15) {
    return {
      area: "Afternoon Push",
      suggestion: "Perfect for application reviews and document collection",
      actions: ["Process pending applications", "Schedule tomorrow's appointments", "Update CRM notes"]
    };
  } else {
    return {
      area: "Evening Wrap-up",
      suggestion: "Ideal for planning and relationship building",
      actions: ["Plan tomorrow's priorities", "Send thank you notes", "Review weekly goals"]
    };
  }
}

function getMotivationalQuote() {
  const quotes = [
    "Every conversation is an opportunity to change someone's life",
    "Your expertise turns dreams into addresses",
    "Persistence today pays dividends tomorrow",
    "Trust is your greatest currency",
    "Small actions compound into remarkable results"
  ];
  
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export async function GET() {
  try {
    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const insights = generateCoachingInsights();
    
    return NextResponse.json({
      success: true,
      data: insights,
      accountabilityScore: Math.floor(Math.random() * 30) + 65, // 65-95 range
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to generate coaching insights" },
      { status: 500 }
    );
  }
}