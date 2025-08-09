import { NextResponse } from "next/server";

// Mock data generator for pipeline summary
function generatePipelineSummary() {
  const baseLeads = 128;
  const variation = Math.floor(Math.random() * 20) - 10;
  
  return {
    totalLeads: baseLeads + variation,
    hotLeads: 9 + Math.floor(Math.random() * 5),
    inProgress: 43 + Math.floor(Math.random() * 10),
    closedWon: 12 + Math.floor(Math.random() * 3),
    closedLost: 6 + Math.floor(Math.random() * 2),
    conversionRate: 0.23 + (Math.random() * 0.05 - 0.025),
    avgDaysInPipeline: 18 + Math.floor(Math.random() * 4) - 2,
    pipelineValue: 2847000 + Math.floor(Math.random() * 300000) - 150000,
    newLeadsToday: {
      total: Math.floor(Math.random() * 8) + 2,
      sources: {
        web: Math.floor(Math.random() * 3) + 1,
        referral: Math.floor(Math.random() * 2) + 1,
        phone: Math.floor(Math.random() * 2),
        walkin: Math.floor(Math.random() * 2)
      }
    },
    weeklyTrend: {
      dates: getPastWeekDates(),
      values: getPastWeekValues()
    }
  };
}

function getPastWeekDates() {
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  }
  return dates;
}

function getPastWeekValues() {
  return Array.from({ length: 7 }, () => Math.floor(Math.random() * 50) + 80);
}

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const summary = generatePipelineSummary();
    
    return NextResponse.json({
      success: true,
      data: summary,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch dashboard summary" },
      { status: 500 }
    );
  }
}