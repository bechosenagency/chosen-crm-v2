import { NextResponse } from "next/server";

interface AssistantPrompt {
  timeOfDay: "morning" | "afternoon" | "evening";
  userMode: "Sprint" | "Standard" | "Cruise";
  pipelineStatus: string;
  activityGap: "behind" | "onTrack" | "ahead";
  prompt: string;
  quickActions: string[];
  tone: "urgent" | "encouraging" | "celebratory";
}

// Generate contextual AI assistant prompts
function generateAssistantPrompt(): AssistantPrompt {
  const hour = new Date().getHours();
  const timeOfDay = getTimeOfDay(hour);
  
  // Simulate user performance data
  const performance = Math.random();
  const userMode = performance < 0.3 ? "Sprint" : performance < 0.7 ? "Standard" : "Cruise";
  const activityGap = performance < 0.4 ? "behind" : performance < 0.8 ? "onTrack" : "ahead";
  
  const hotLeads = Math.floor(Math.random() * 10) + 3;
  const pipelineStatus = `${hotLeads} hot leads ready`;
  
  // Generate appropriate prompt based on context
  const promptData = generateContextualPrompt(timeOfDay, userMode, activityGap, hotLeads);
  
  return {
    timeOfDay,
    userMode,
    pipelineStatus,
    activityGap,
    ...promptData
  };
}

function getTimeOfDay(hour: number): "morning" | "afternoon" | "evening" {
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

function generateContextualPrompt(
  timeOfDay: "morning" | "afternoon" | "evening",
  userMode: "Sprint" | "Standard" | "Cruise",
  activityGap: "behind" | "onTrack" | "ahead",
  hotLeads: number
): Pick<AssistantPrompt, "prompt" | "quickActions" | "tone"> {
  const prompts = {
    morning: {
      Sprint: {
        behind: {
          prompt: `🚀 Time to catch up! You have ${hotLeads} hot leads waiting. Let's turn this day around with focused action.`,
          quickActions: ["call-hot-leads", "quick-follow-ups", "energy-boost"],
          tone: "urgent" as const
        },
        onTrack: {
          prompt: `💪 Good morning! You're building momentum. ${hotLeads} opportunities await your expertise today.`,
          quickActions: ["priority-calls", "pipeline-review", "team-check-in"],
          tone: "encouraging" as const
        },
        ahead: {
          prompt: `⭐ Exceptional start! You're ahead of schedule with ${hotLeads} warm opportunities. Keep the energy high!`,
          quickActions: ["strategic-planning", "mentor-team", "expand-network"],
          tone: "celebratory" as const
        }
      },
      Standard: {
        behind: {
          prompt: `☕ Morning momentum time! ${hotLeads} leads are ready for your attention. Start with your highest value opportunity.`,
          quickActions: ["top-3-calls", "email-blast", "calendar-review"],
          tone: "encouraging" as const
        },
        onTrack: {
          prompt: `📊 Solid morning! You're on pace with ${hotLeads} active opportunities. Time to make them count.`,
          quickActions: ["lead-qualification", "document-prep", "rate-updates"],
          tone: "encouraging" as const
        },
        ahead: {
          prompt: `🌟 Great progress! You're ahead with ${hotLeads} leads in play. Perfect time for strategic outreach.`,
          quickActions: ["referral-requests", "content-creation", "relationship-building"],
          tone: "celebratory" as const
        }
      },
      Cruise: {
        behind: {
          prompt: `🎯 Easy does it! Even cruise mode needs direction. ${hotLeads} leads await your seasoned approach.`,
          quickActions: ["selective-calls", "automation-setup", "delegate-tasks"],
          tone: "encouraging" as const
        },
        onTrack: {
          prompt: `😎 Cruising nicely! ${hotLeads} opportunities are perfectly positioned for your expertise.`,
          quickActions: ["high-value-focus", "team-development", "strategic-partnerships"],
          tone: "encouraging" as const
        },
        ahead: {
          prompt: `🏆 Master class performance! ${hotLeads} leads, and you're making it look easy. Time to mentor others?`,
          quickActions: ["share-wins", "coach-teammates", "innovation-time"],
          tone: "celebratory" as const
        }
      }
    },
    afternoon: {
      Sprint: {
        behind: {
          prompt: `⚡ Afternoon surge needed! ${hotLeads} leads still need attention. You can close the gap!`,
          quickActions: ["power-hour", "quick-wins", "energy-snack"],
          tone: "urgent" as const
        },
        onTrack: {
          prompt: `📈 Solid afternoon pace! Keep pushing with ${hotLeads} active opportunities.`,
          quickActions: ["follow-through", "application-push", "team-sync"],
          tone: "encouraging" as const
        },
        ahead: {
          prompt: `🚀 Crushing it! ${hotLeads} leads and you're in the zone. Finish strong!`,
          quickActions: ["close-deals", "celebrate-wins", "plan-tomorrow"],
          tone: "celebratory" as const
        }
      },
      Standard: {
        behind: {
          prompt: `🎯 Afternoon focus time! ${hotLeads} opportunities need your attention. Small wins add up.`,
          quickActions: ["priority-shift", "quick-touches", "status-updates"],
          tone: "encouraging" as const
        },
        onTrack: {
          prompt: `✅ Right on track! Managing ${hotLeads} leads like a pro. Keep the momentum.`,
          quickActions: ["document-collection", "rate-locks", "evening-prep"],
          tone: "encouraging" as const
        },
        ahead: {
          prompt: `💎 Premium performance! ${hotLeads} opportunities and you're ahead. Time to exceed expectations.`,
          quickActions: ["upsell-opportunities", "referral-mining", "content-planning"],
          tone: "celebratory" as const
        }
      },
      Cruise: {
        behind: {
          prompt: `🌅 Gentle afternoon push. ${hotLeads} leads could use your wisdom. Quality over quantity.`,
          quickActions: ["strategic-calls", "delegate-admin", "relationship-nurture"],
          tone: "encouraging" as const
        },
        onTrack: {
          prompt: `☀️ Smooth sailing! ${hotLeads} opportunities align with your efficient approach.`,
          quickActions: ["key-decisions", "team-empowerment", "long-term-planning"],
          tone: "encouraging" as const
        },
        ahead: {
          prompt: `👑 Masterful execution! ${hotLeads} leads handled with finesse. Share your secrets!`,
          quickActions: ["knowledge-sharing", "process-optimization", "strategic-vision"],
          tone: "celebratory" as const
        }
      }
    },
    evening: {
      Sprint: {
        behind: {
          prompt: `🌙 Evening hustle! ${hotLeads} leads still viable. Quick actions can save the day.`,
          quickActions: ["urgent-texts", "tomorrow-prep", "quick-emails"],
          tone: "urgent" as const
        },
        onTrack: {
          prompt: `📱 Strong finish! Wrap up with ${hotLeads} leads positioned for tomorrow.`,
          quickActions: ["day-summary", "client-thanks", "team-recognition"],
          tone: "encouraging" as const
        },
        ahead: {
          prompt: `🌟 Stellar day! ${hotLeads} leads conquered. Time to recharge for tomorrow's wins.`,
          quickActions: ["celebrate-team", "strategic-review", "rest-mode"],
          tone: "celebratory" as const
        }
      },
      Standard: {
        behind: {
          prompt: `🌆 Evening wrap-up. ${hotLeads} leads to revisit tomorrow. Plan your comeback.`,
          quickActions: ["priority-list", "follow-up-schedule", "reflection-time"],
          tone: "encouraging" as const
        },
        onTrack: {
          prompt: `✨ Good evening! ${hotLeads} opportunities well-managed. Prep for tomorrow's success.`,
          quickActions: ["crmNotes", "calendar-review", "gratitude-practice"],
          tone: "encouraging" as const
        },
        ahead: {
          prompt: `🏅 Outstanding day! ${hotLeads} leads advanced. Rest well, champion!`,
          quickActions: ["share-success", "mentor-message", "family-time"],
          tone: "celebratory" as const
        }
      },
      Cruise: {
        behind: {
          prompt: `🌃 Reflective evening. ${hotLeads} opportunities await your refreshed perspective tomorrow.`,
          quickActions: ["strategic-notes", "delegation-plan", "mindfulness"],
          tone: "encouraging" as const
        },
        onTrack: {
          prompt: `🌠 Balanced day complete! ${hotLeads} leads progressed efficiently. Well done.`,
          quickActions: ["wisdom-sharing", "process-review", "relaxation"],
          tone: "encouraging" as const
        },
        ahead: {
          prompt: `💫 Legendary performance! ${hotLeads} leads mastered. Your success inspires the team.`,
          quickActions: ["legacy-building", "team-celebration", "vision-planning"],
          tone: "celebratory" as const
        }
      }
    }
  };
  
  return prompts[timeOfDay][userMode][activityGap];
}

// Additional quick action definitions
const quickActionDefinitions = {
  "call-hot-leads": "Call top 3 hot leads",
  "quick-follow-ups": "Send 5 quick follow-up texts",
  "energy-boost": "Take a 5-min walk",
  "priority-calls": "Make priority calls",
  "pipeline-review": "Review pipeline health",
  "team-check-in": "Check in with team",
  "strategic-planning": "Plan quarterly strategy",
  "mentor-team": "Mentor junior team member",
  "expand-network": "Reach out to new partners",
  // ... add all other quick actions
};

export async function GET() {
  try {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const promptData = generateAssistantPrompt();
    
    return NextResponse.json({
      success: true,
      data: promptData,
      quickActionDetails: promptData.quickActions.map(action => ({
        id: action,
        label: quickActionDefinitions[action as keyof typeof quickActionDefinitions] || action,
        estimated_time: "5-10 min"
      })),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to generate assistant prompt" },
      { status: 500 }
    );
  }
}