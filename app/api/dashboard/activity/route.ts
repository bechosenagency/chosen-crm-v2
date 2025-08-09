import { NextResponse } from "next/server";

// Generate realistic activity data based on time of day
function generateActivityData() {
  const hour = new Date().getHours();
  const isWorkingHours = hour >= 9 && hour <= 17;
  
  // Base values with time-based variations
  const callsBase = isWorkingHours ? 25 : 10;
  const emailsBase = isWorkingHours ? 60 : 30;
  const appointmentsBase = isWorkingHours ? 3 : 1;
  
  return {
    calls: {
      actual: callsBase + Math.floor(Math.random() * 15),
      goal: 50,
      hourlyBreakdown: generateHourlyBreakdown('calls')
    },
    emails: {
      actual: emailsBase + Math.floor(Math.random() * 30),
      goal: 100,
      templates: ['Rate Update', 'Follow-up', 'Application Status', 'Document Request']
    },
    appointments: {
      actual: appointmentsBase + Math.floor(Math.random() * 2),
      goal: 5,
      upcoming: generateUpcomingAppointments()
    },
    texts: {
      sent: Math.floor(Math.random() * 20) + 10,
      received: Math.floor(Math.random() * 15) + 5,
      responseRate: 0.75 + Math.random() * 0.2
    },
    applications: {
      submitted: Math.floor(Math.random() * 3) + 1,
      inProgress: Math.floor(Math.random() * 5) + 2,
      documentsNeeded: Math.floor(Math.random() * 4)
    }
  };
}

function generateHourlyBreakdown(type: string) {
  const breakdown: { hour: string; count: number }[] = [];
  const currentHour = new Date().getHours();
  
  for (let i = 9; i <= currentHour && i <= 17; i++) {
    breakdown.push({
      hour: `${i}:00`,
      count: type === 'calls' ? Math.floor(Math.random() * 8) + 1 : Math.floor(Math.random() * 15) + 5
    });
  }
  
  return breakdown;
}

function generateUpcomingAppointments() {
  const appointments = [
    { time: '2:00 PM', client: 'Johnson - Refinance Review', type: 'video' },
    { time: '3:30 PM', client: 'Martinez - Application', type: 'in-person' },
    { time: '4:15 PM', client: 'Chen - Rate Discussion', type: 'phone' }
  ];
  
  return appointments.slice(0, Math.floor(Math.random() * 3) + 1);
}

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const activityData = generateActivityData();
    
    return NextResponse.json({
      success: true,
      data: {
        today: activityData,
        streak: {
          current: Math.floor(Math.random() * 10) + 5,
          best: 15,
          goalsMet: Math.random() > 0.3
        },
        productivity: {
          score: Math.floor(Math.random() * 20) + 70,
          peakHour: '10:00 AM - 11:00 AM',
          suggestion: 'Your conversion rate is highest during morning calls'
        }
      },
      timestamp: new Date().toISOString()
    });
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch activity data" },
      { status: 500 }
    );
  }
}