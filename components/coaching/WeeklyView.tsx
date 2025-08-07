"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  Brain,
  Award,
  Target,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import VisionBoard from "./VisionBoard";
import ProgressThermometer from "./ProgressThermometer";
import CoachingInsightCard from "./CoachingInsightCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const peerBenchmarkData = [
  { name: "You", value: 85, color: "var(--c-primary)" },
  { name: "Team Avg", value: 72, color: "var(--c-success)" },
  { name: "Top 10%", value: 95, color: "var(--c-warning)" },
];

export default function WeeklyView() {
  const weeklyGoals = {
    calls: { current: 85, goal: 100 },
    meetings: { current: 12, goal: 15 },
    applications: { current: 8, goal: 10 },
  };

  return (
    <div className="space-y-6">
      {/* Vision Board */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <VisionBoard />
      </motion.div>

      {/* Progress Thermometers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Weekly Progress Tracking
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProgressThermometer
              current={weeklyGoals.calls.current}
              goal={weeklyGoals.calls.goal}
              label="Calls Made"
            />
            <ProgressThermometer
              current={weeklyGoals.meetings.current}
              goal={weeklyGoals.meetings.goal}
              label="Meetings Scheduled"
            />
            <ProgressThermometer
              current={weeklyGoals.applications.current}
              goal={weeklyGoals.applications.goal}
              label="Applications Started"
            />
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Peer Benchmarking */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Peer Benchmarking
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={peerBenchmarkData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--c-border)" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {peerBenchmarkData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-foreground">
                You&apos;re performing 18% above team average! Keep it up! 💪
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Pattern Recognition */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              AI Pattern Recognition
            </h3>
            <div className="space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Best Performance Days</span>
                  <Badge variant="secondary">Tuesday &amp; Thursday</Badge>
                </div>
                <Progress
                  value={85}
                  className="h-2"
                  indicatorClassName="bg-primary"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Your conversion rate is 40% higher on these days
                </p>
              </div>
              <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Optimal Call Times</span>
                  <Badge variant="outline" className="text-warning">
                    10-11&nbsp;AM
                  </Badge>
                </div>
                <Progress
                  value={72}
                  className="h-2"
                  indicatorClassName="bg-warning"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  78% answer rate during this window
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Content Calendar Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            AI-Suggested Content Calendar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CoachingInsightCard
              title="Monday: First-Time Buyer Tips"
              insight="5 prospects in your pipeline are first-time buyers. Create a video about down-payment assistance programs."
              type="content"
              priority="high"
              actionable="Create video script"
            />
            <CoachingInsightCard
              title="Wednesday: Market Update"
              insight="Interest rates changed this week. Share an update to stay top-of-mind with your 47 active leads."
              type="content"
              priority="medium"
              actionable="Draft market update"
            />
            <CoachingInsightCard
              title="Friday: Success Story"
              insight="The Johnson family just closed! Share their story to build social proof and attract similar clients."
              type="content"
              priority="medium"
              actionable="Request testimonial"
            />
          </div>
        </div>
      </motion.div>

      {/* Weekly Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            This Week&apos;s Achievements
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl mb-2">🎯</div>
              <p className="font-medium">Goal Crusher</p>
              <p className="text-sm text-muted-foreground">
                Hit daily goals 4/5 days
              </p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl mb-2">📞</div>
              <p className="font-medium">Call Champion</p>
              <p className="text-sm text-muted-foreground">85 calls made</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl mb-2">🤝</div>
              <p className="font-medium">Meeting Master</p>
              <p className="text-sm text-muted-foreground">
                12 meetings booked
              </p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl mb-2">🔥</div>
              <p className="font-medium">On Fire</p>
              <p className="text-sm text-muted-foreground">7-day streak</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
