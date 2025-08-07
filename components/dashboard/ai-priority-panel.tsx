"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle2,
  Clock,
  MessageSquare,
  Video,
  FileText,
  Phone,
} from "lucide-react";

interface AIPriorityItem {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  type: "follow-up" | "content" | "meeting" | "document";
  icon: React.ReactNode;
}

const priorityItems: AIPriorityItem[] = [
  {
    id: "1",
    title: "Follow up with Jane Doe",
    description: "Scheduled home viewing last week - ready for next steps",
    priority: "high",
    type: "follow-up",
    icon: <Phone className="h-4 w-4" />,
  },
  {
    id: "2",
    title: "Create market update video",
    description: "Q1 market trends content for social media channels",
    priority: "high",
    type: "content",
    icon: <Video className="h-4 w-4" />,
  },
  {
    id: "3",
    title: "Review Smith family application",
    description: "Pre-approval documents received - needs review",
    priority: "medium",
    type: "document",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: "4",
    title: "Schedule Johnson consultation",
    description: "New lead from website - interested in downtown properties",
    priority: "medium",
    type: "meeting",
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    id: "5",
    title: "Update CRM notes for Wilson deal",
    description: "Closing scheduled for next week - update pipeline status",
    priority: "low",
    type: "document",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
];

export function AIPriorityPanel() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-200 bg-red-50";
      case "medium":
        return "border-amber-200 bg-amber-50";
      case "low":
        return "border-green-200 bg-green-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  const getPriorityDot = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-amber-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-[#0891b2]" />
          AI Priority Panel
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {priorityItems.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-lg border transition-all hover:shadow-sm cursor-pointer ${getPriorityColor(
                item.priority,
              )}`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-[#0c4a6e]">{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-[#0c4a6e] truncate">
                      {item.title}
                    </h4>
                    <div
                      className={`h-2 w-2 rounded-full flex-shrink-0 ${getPriorityDot(
                        item.priority,
                      )}`}
                    />
                  </div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
