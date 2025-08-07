import { NextResponse } from "next/server";

interface Priority {
  id: string;
  task: string;
  reason: string;
  timeEstimate: string;
  impact: "High" | "Medium" | "Low";
  revenue: number;
  category: string;
  urgency: number; // 1-10 scale
  aiConfidence: number; // 0-1 probability
}

// Generate AI-prioritized action items
function generateSmartPriorities(): Priority[] {
  const hour = new Date().getHours();
  const priorities: Priority[] = [];
  
  // High-value lead follow-ups
  const hotLeads = generateHotLeadPriorities();
  priorities.push(...hotLeads);
  
  // Time-sensitive tasks
  const timeSensitive = generateTimeSensitivePriorities();
  priorities.push(...timeSensitive);
  
  // Relationship building
  const relationships = generateRelationshipPriorities(hour);
  priorities.push(...relationships);
  
  // Administrative necessities
  const admin = generateAdminPriorities();
  priorities.push(...admin);
  
  // Sort by AI-calculated priority score
  return priorities
    .sort((a, b) => calculatePriorityScore(b) - calculatePriorityScore(a))
    .slice(0, 5);
}

function generateHotLeadPriorities(): Priority[] {
  const leads = [
    {
      name: "Johnson",
      amount: 420000,
      stage: "Pre-qualified",
      probability: 0.78,
      daysInPipeline: 3
    },
    {
      name: "Martinez", 
      amount: 325000,
      stage: "Application",
      probability: 0.65,
      daysInPipeline: 5
    },
    {
      name: "Chen",
      amount: 550000,
      stage: "Processing",
      probability: 0.82,
      daysInPipeline: 12
    },
    {
      name: "Williams",
      amount: 380000,
      stage: "Initial Contact",
      probability: 0.45,
      daysInPipeline: 1
    }
  ];
  
  return leads.map((lead, index) => ({
    id: `lead-${index + 1}`,
    task: `Call ${lead.name} - ${lead.stage} $${(lead.amount / 1000).toFixed(0)}K`,
    reason: `${Math.floor(lead.probability * 100)}% close probability${lead.daysInPipeline > 10 ? ', aging opportunity' : ''}`,
    timeEstimate: lead.stage === "Initial Contact" ? "15 min" : "10 min",
    impact: lead.probability > 0.7 ? "High" : lead.probability > 0.5 ? "Medium" : "Low",
    revenue: Math.floor(lead.amount * 0.02), // 2% commission estimate
    category: "Lead Follow-up",
    urgency: Math.floor(lead.probability * 10),
    aiConfidence: lead.probability
  }));
}

function generateTimeSensitivePriorities(): Priority[] {
  const tasks = [
    {
      task: "Submit Davis loan to underwriting",
      reason: "Lock expiring in 48 hours",
      revenue: 6800,
      urgency: 9
    },
    {
      task: "Collect tax returns from Thompson",
      reason: "Conditional approval waiting",
      revenue: 5200,
      urgency: 8
    },
    {
      task: "Review appraisal for Miller property",
      reason: "Closing scheduled next week",
      revenue: 7500,
      urgency: 7
    }
  ];
  
  return tasks.map((task, index) => ({
    id: `urgent-${index + 1}`,
    task: task.task,
    reason: task.reason,
    timeEstimate: "20 min",
    impact: "High" as const,
    revenue: task.revenue,
    category: "Time Sensitive",
    urgency: task.urgency,
    aiConfidence: 0.9
  }));
}

function generateRelationshipPriorities(hour: number): Priority[] {
  const isOptimalTime = hour >= 10 && hour <= 16;
  
  const tasks = [
    {
      task: "Text 3 past clients for check-in",
      reason: "Maintain relationships for referrals",
      timeEstimate: "5 min",
      revenue: 0, // Indirect value
      urgency: 3
    },
    {
      task: "Send market update to sphere",
      reason: "Weekly touchpoint maintains top-of-mind",
      timeEstimate: "15 min",
      revenue: 0,
      urgency: 4
    },
    {
      task: "Connect with realtor partner Johnson",
      reason: "Mentioned potential referral yesterday",
      timeEstimate: "10 min",
      revenue: 0,
      urgency: 6
    }
  ];
  
  return tasks
    .filter(() => isOptimalTime || Math.random() > 0.5)
    .map((task, index) => ({
      id: `relationship-${index + 1}`,
      ...task,
      impact: task.urgency > 5 ? "Medium" : "Low" as const,
      category: "Relationship Building",
      aiConfidence: 0.7
    }));
}

function generateAdminPriorities(): Priority[] {
  const tasks = [
    {
      task: "Update pipeline stages for 5 leads",
      reason: "Maintain accurate forecasting",
      timeEstimate: "20 min",
      impact: "Medium" as const,
      revenue: 0,
      urgency: 5,
      aiConfidence: 0.6
    },
    {
      task: "Complete compliance training module",
      reason: "Due by end of week",
      timeEstimate: "30 min",
      impact: "Low" as const,
      revenue: 0,
      urgency: 4,
      aiConfidence: 0.5
    }
  ];
  
  return tasks.map((task, index) => ({
    id: `admin-${index + 1}`,
    ...task,
    category: "Administrative"
  }));
}

function calculatePriorityScore(priority: Priority): number {
  const revenueScore = priority.revenue / 1000; // Normalize to 0-10 range
  const urgencyScore = priority.urgency;
  const confidenceScore = priority.aiConfidence * 10;
  const impactMultiplier = priority.impact === "High" ? 1.5 : priority.impact === "Medium" ? 1.0 : 0.5;
  
  return (revenueScore + urgencyScore + confidenceScore) * impactMultiplier;
}

export async function GET() {
  try {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const priorities = generateSmartPriorities();
    
    // Calculate total potential revenue
    const totalRevenue = priorities.reduce((sum, p) => sum + p.revenue, 0);
    
    return NextResponse.json({
      success: true,
      data: {
        priorities,
        summary: {
          totalTasks: priorities.length,
          totalRevenue,
          estimatedTime: priorities.reduce((sum, p) => {
            const minutes = parseInt(p.timeEstimate);
            return sum + (isNaN(minutes) ? 0 : minutes);
          }, 0),
          highImpactCount: priorities.filter(p => p.impact === "High").length
        },
        insights: {
          focusRecommendation: "Start with high-revenue opportunities while your energy is peak",
          completionProbability: 0.85,
          suggestedOrder: priorities.map(p => p.id)
        }
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to generate smart priorities" },
      { status: 500 }
    );
  }
}