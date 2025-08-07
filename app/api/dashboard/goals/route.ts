import { NextResponse } from "next/server";

// Calculate days left in period
function getDaysLeft(period: 'month' | 'quarter' | 'year') {
  const now = new Date();
  let endDate = new Date();
  
  switch (period) {
    case 'month':
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      break;
    case 'quarter':
      const currentQuarter = Math.floor(now.getMonth() / 3);
      endDate = new Date(now.getFullYear(), (currentQuarter + 1) * 3, 0);
      break;
    case 'year':
      endDate = new Date(now.getFullYear(), 11, 31);
      break;
  }
  
  const timeDiff = endDate.getTime() - now.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

// Generate goal progress data
function generateGoalData() {
  const monthlyTarget = 250000;
  const quarterlyTarget = 750000;
  const yearlyTarget = 3000000;
  
  const monthlyProgress = 0.5 + Math.random() * 0.4; // 50-90%
  const quarterlyProgress = 0.4 + Math.random() * 0.4; // 40-80%
  const yearlyProgress = 0.3 + Math.random() * 0.3; // 30-60%
  
  return {
    monthly: {
      target: monthlyTarget,
      current: Math.floor(monthlyTarget * monthlyProgress),
      percentage: Math.floor(monthlyProgress * 100),
      daysLeft: getDaysLeft('month'),
      projection: Math.floor(monthlyTarget * (monthlyProgress + 0.15)),
      milestones: [
        { name: 'First $50K', completed: true },
        { name: 'Half Way', completed: monthlyProgress >= 0.5 },
        { name: 'Final Sprint', completed: monthlyProgress >= 0.8 }
      ]
    },
    quarterly: {
      target: quarterlyTarget,
      current: Math.floor(quarterlyTarget * quarterlyProgress),
      percentage: Math.floor(quarterlyProgress * 100),
      daysLeft: getDaysLeft('quarter'),
      pace: quarterlyProgress > 0.6 ? 'ahead' : 'behind',
      topPerformers: generateTopPerformers()
    },
    yearly: {
      target: yearlyTarget,
      current: Math.floor(yearlyTarget * yearlyProgress),
      percentage: Math.floor(yearlyProgress * 100),
      daysLeft: getDaysLeft('year'),
      rank: Math.floor(Math.random() * 20) + 1,
      totalTeamMembers: 25
    },
    personal: {
      loansTarget: 20,
      loansCurrent: Math.floor(Math.random() * 15) + 5,
      referralsTarget: 10,
      referralsCurrent: Math.floor(Math.random() * 8) + 2,
      reviewsTarget: 15,
      reviewsCurrent: Math.floor(Math.random() * 12) + 3
    }
  };
}

function generateTopPerformers() {
  const names = ['Sarah Chen', 'Mike Johnson', 'Lisa Rodriguez', 'David Kim', 'Emma Wilson'];
  return names.slice(0, 3).map((name, index) => ({
    name,
    achievement: `$${Math.floor(Math.random() * 100 + 200)}K`,
    rank: index + 1
  }));
}

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const goalData = generateGoalData();
    
    return NextResponse.json({
      success: true,
      data: goalData,
      insights: {
        momentum: goalData.monthly.percentage > 70 ? 'strong' : 'moderate',
        recommendation: goalData.monthly.percentage > 70 
          ? 'Great progress! Focus on high-value opportunities to exceed your target.'
          : 'Pick up the pace with 3 additional calls daily to hit your goal.',
        nextMilestone: `$${Math.ceil(goalData.monthly.current / 50000) * 50000}`
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch goals data" },
      { status: 500 }
    );
  }
}