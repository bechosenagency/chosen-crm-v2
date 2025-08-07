"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Calendar,
  Award,
  Target,
  Brain,
  ChevronUp,
  ChevronDown,
  Download,
  Share2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import CoachingInsightCard from "./CoachingInsightCard";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

// Mock data for 90-day performance
const performanceData = [
  { month: "Month 1", calls: 280, meetings: 45, closings: 8, score: 72 },
  { month: "Month 2", calls: 320, meetings: 52, closings: 12, score: 85 },
  { month: "Month 3", calls: 350, meetings: 58, closings: 15, score: 92 },
];

const trendData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  productivity: 65 + Math.random() * 35 + i * 0.8,
  benchmark: 75,
}));

const skillRadarData = [
  { skill: "Calls", value: 85, fullMark: 100 },
  { skill: "Follow-ups", value: 92, fullMark: 100 },
  { skill: "Conversions", value: 78, fullMark: 100 },
  { skill: "Time Mgmt", value: 70, fullMark: 100 },
  { skill: "Content", value: 65, fullMark: 100 },
  { skill: "Networking", value: 88, fullMark: 100 },
];

const leaderboardData = [
  { rank: 1, name: "Sarah Johnson", points: 12500, change: "up" },
  { rank: 2, name: "Mike Chen", points: 11800, change: "up" },
  { rank: 3, name: "You", points: 11200, change: "down", isYou: true },
  { rank: 4, name: "Lisa Rodriguez", points: 10900, change: "up" },
  { rank: 5, name: "James Smith", points: 10500, change: "same" },
];

export default function MonthlyView() {
  const monthlyStats = {
    totalCalls: 350,
    totalMeetings: 58,
    totalClosings: 15,
    conversionRate: 24,
    averageScore: 92,
    streak: 28,
  };

  const goalAdjustments = [
    {
      metric: "Daily Calls",
      current: 20,
      suggested: 25,
      reason: "Your answer rate is improving",
    },
    {
      metric: "Weekly Meetings",
      current: 15,
      suggested: 18,
      reason: "You have capacity for more",
    },
    {
      metric: "Content Posts",
      current: 3,
      suggested: 5,
      reason: "High engagement on your posts",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 90-Day Performance Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              90-Day Performance Cycle
            </h3>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button size="sm" variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Calls</p>
              <p className="text-2xl font-bold text-foreground">
                {monthlyStats.totalCalls}
              </p>
              <Badge variant="outline" className="mt-1 text-secondary">
                +25%
              </Badge>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Meetings</p>
              <p className="text-2xl font-bold text-foreground">
                {monthlyStats.totalMeetings}
              </p>
              <Badge variant="outline" className="mt-1 text-secondary">
                +15%
              </Badge>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Closings</p>
              <p className="text-2xl font-bold text-foreground">
                {monthlyStats.totalClosings}
              </p>
              <Badge variant="outline" className="mt-1 text-secondary">
                +30%
              </Badge>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Conversion</p>
              <p className="text-2xl font-bold text-foreground">
                {monthlyStats.conversionRate}%
              </p>
              <Badge variant="outline" className="mt-1 text-primary">
                Best Yet
              </Badge>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Avg Score</p>
              <p className="text-2xl font-bold text-foreground">
                {monthlyStats.averageScore}
              </p>
              <Badge variant="outline" className="mt-1 text-warning">
                Top 10%
              </Badge>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Streak</p>
              <p className="text-2xl font-bold text-foreground">
                {monthlyStats.streak}d
              </p>
              <Badge variant="outline" className="mt-1 text-destructive">
                🔥 Hot
              </Badge>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--c-border)" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="calls"
                stackId="1"
                stroke="var(--c-primary)"
                fill="var(--c-primary)"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="meetings"
                stackId="1"
                stroke="var(--c-success)"
                fill="var(--c-success)"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="closings"
                stackId="1"
                stroke="var(--c-warning)"
                fill="var(--c-warning)"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      {/* Trend Analysis & Skill Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Productivity Trend Analysis
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--c-border)" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="productivity"
                  stroke="var(--c-primary)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="benchmark"
                  stroke="var(--c-success)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-foreground">
                Your productivity increased by 27% this month. Peak performance
                on Tuesdays and Thursdays.
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Skill Performance Radar
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={skillRadarData}>
                <PolarGrid stroke="var(--c-border)" />
                <PolarAngleAxis dataKey="skill" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="Your Skills"
                  dataKey="value"
                  stroke="var(--c-primary)"
                  fill="var(--c-primary)"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Strongest Skill:</span>
                <Badge variant="secondary">Follow-ups (92%)</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Focus Area:</span>
                <Badge variant="outline">Content Creation (65%)</Badge>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* AI Goal Adjustments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            AI-Recommended Goal Adjustments
          </h3>
          <div className="space-y-4">
            {goalAdjustments.map((goal, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{goal.metric}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {goal.reason}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Current</p>
                    <p className="text-lg font-semibold">{goal.current}</p>
                  </div>
                  <ChevronUp className="h-5 w-5 text-secondary" />
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Suggested</p>
                    <p className="text-lg font-semibold text-secondary">
                      {goal.suggested}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Apply
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Achievement Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Monthly Achievement Gallery
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-2">🏆</div>
              <p className="font-medium text-sm">Top Performer</p>
              <p className="text-xs text-muted-foreground">Month 3</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-2">💯</div>
              <p className="font-medium text-sm">Perfect Week</p>
              <p className="text-xs text-muted-foreground">Week 2 & 4</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-2">🚀</div>
              <p className="font-medium text-sm">Rapid Growth</p>
              <p className="text-xs text-muted-foreground">+30% improvement</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-2">🎯</div>
              <p className="font-medium text-sm">Goal Crusher</p>
              <p className="text-xs text-muted-foreground">All goals met</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-2">⚡</div>
              <p className="font-medium text-sm">Speed Demon</p>
              <p className="text-xs text-muted-foreground">Fastest response</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Team Leaderboard - Top 5
          </h3>
          <div className="space-y-2">
            {leaderboardData.map((player) => (
              <div
                key={player.rank}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  player.isYou
                    ? "bg-primary/10 border border-primary/20"
                    : "bg-muted/50 border"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`text-2xl font-bold ${player.rank <= 3 ? "text-primary" : "text-muted-foreground"}`}
                  >
                    #{player.rank}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {player.name}{" "}
                      {player.isYou && (
                        <Badge variant="secondary" className="ml-2">
                          You
                        </Badge>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {player.points.toLocaleString()} points
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {player.change === "up" && (
                    <ChevronUp className="h-4 w-4 text-secondary" />
                  )}
                  {player.change === "down" && (
                    <ChevronDown className="h-4 w-4 text-destructive" />
                  )}
                  {player.rank === 1 && <span className="text-2xl">🥇</span>}
                  {player.rank === 2 && <span className="text-2xl">🥈</span>}
                  {player.rank === 3 && <span className="text-2xl">🥉</span>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Comprehensive Coaching Report */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Comprehensive Monthly Coaching Report
          </h3>
          <div className="space-y-4">
            <CoachingInsightCard
              title="Performance Summary"
              insight="Outstanding month! You've shown consistent improvement across all metrics. Your call-to-meeting conversion rate improved by 15%, and you're closing deals 3 days faster on average."
              type="behavioral"
              priority="high"
            />
            <CoachingInsightCard
              title="Key Strengths"
              insight="Your follow-up game is exceptional - 92% of your leads receive timely follow-ups. Your Tuesday and Thursday performance continues to outpace other days by 40%."
              type="behavioral"
              priority="medium"
            />
            <CoachingInsightCard
              title="Growth Opportunities"
              insight="Content creation is your biggest opportunity. Increasing your social media posts from 3 to 5 per week could generate 8-10 more warm leads monthly based on your engagement rates."
              type="content"
              priority="high"
              actionable="Create content calendar"
            />
            <CoachingInsightCard
              title="Next Month's Focus"
              insight="With rates expected to drop, focus on refinance opportunities. You have 23 past clients who could benefit. Schedule check-in calls in week 1."
              type="timing"
              priority="high"
              actionable="Schedule refinance calls"
            />
          </div>
          <div className="mt-6 flex justify-center">
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Download Full Report (PDF)
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
