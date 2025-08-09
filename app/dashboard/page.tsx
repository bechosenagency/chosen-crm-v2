'use client';

import MainLayout from '@/components/ui/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Phone,
  FileText,
  Users,
  Calendar,
  Megaphone,
  TrendingUp,
  Clock,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Trophy,
  Flame,
  Star,
  Building2,
  FileWarning,
  UserCheck,
  Award,
  Mail,
  AlertTriangle,
  Crown,
  DollarSign,
  
  ArrowUp,
  ArrowDown,
  Minus,
  Lightbulb,
  Flag,
  Zap,
  Send,
  Handshake,
  Quote,
  Activity,
  ChevronRight
} from 'lucide-react';

export default function DashboardPage() {
  const userName = "Sarah";
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const quickStats = {
    streak: 12,
    score: 8.5,
    rank: 3,
    points: 2450
  };

  const aiTasks = [
    {
      id: 1,
      priority: 'high',
      action: 'Follow up with Johnson family on pre-approval',
      points: 50,
      time: '15 min',
      type: 'call'
    },
    {
      id: 2,
      priority: 'medium',
      action: 'Review and submit Miller loan application',
      points: 100,
      time: '30 min',
      type: 'document'
    },
    {
      id: 3,
      priority: 'medium',
      action: 'Schedule property tour for the Andersons',
      points: 75,
      time: '20 min',
      type: 'calendar'
    }
  ];

  const recentActivities = [
    { id: 1, type: 'call', description: 'Called lead Jennifer Smith', time: '5 min ago' },
    { id: 2, type: 'document', description: 'Submitted loan #4521', time: '1 hour ago' },
    { id: 3, type: 'meeting', description: 'Met with the Williams family', time: '2 hours ago' },
    { id: 4, type: 'email', description: 'Sent follow-up to 5 prospects', time: '3 hours ago' }
  ];

  

  const missingDocuments = [
    { id: 1, type: "Driver's License", client: 'Johnson Family', dueDate: 'Today', status: 'urgent' },
    { id: 2, type: 'VOE (Verification of Employment)', client: 'Miller, Robert', dueDate: 'Tomorrow', status: 'warning' },
    { id: 3, type: 'Bank Statements', client: 'Anderson, Lisa', dueDate: 'In 3 days', status: 'normal' }
  ];

  const complianceFlags = [
    { id: 1, issue: 'LOE Required', description: 'Large deposit needs explanation', client: 'Smith, Jennifer', status: 'high' },
    { id: 2, issue: 'Appraisal Delay', description: 'Property appraisal pending', client: 'Williams Family', status: 'medium' }
  ];

  const referralPartners = [
    { 
      id: 1, 
      name: 'Michael Chen', 
      company: 'Premier Realty Group', 
      referrals: 8, 
      timestamp: '2 hours ago',
      isTopPartner: true 
    },
    { 
      id: 2, 
      name: 'Jessica Martinez', 
      company: 'Sunset Properties', 
      referrals: 5, 
      timestamp: '1 day ago',
      isTopPartner: false 
    },
    { 
      id: 3, 
      name: 'David Thompson', 
      company: 'Urban Living Realtors', 
      referrals: 3, 
      timestamp: '2 days ago',
      isTopPartner: false 
    }
  ];

  const aiLeadPriorities = [
    {
      id: 1,
      name: 'Robert Johnson',
      score: 92,
      urgency: 'hot',
      lastContact: '2 days ago',
      loanAmount: '$450,000',
      stage: 'Pre-approval'
    },
    {
      id: 2,
      name: 'Emily Davis',
      score: 87,
      urgency: 'warm',
      lastContact: '4 days ago',
      loanAmount: '$325,000',
      stage: 'Application'
    },
    {
      id: 3,
      name: 'Marcus Williams',
      score: 82,
      urgency: 'warm',
      lastContact: '1 week ago',
      loanAmount: '$275,000',
      stage: 'Initial Contact'
    }
  ];

  const weeklyLeaderboard = [
    { id: 1, rank: 1, name: 'Sarah Johnson', loans: 12, volume: '$4.2M', trend: 'up', avatar: 'SJ' },
    { id: 2, rank: 2, name: 'Mike Chen', loans: 10, volume: '$3.8M', trend: 'up', avatar: 'MC' },
    { id: 3, rank: 3, name: 'Lisa Park', loans: 9, volume: '$3.5M', trend: 'same', avatar: 'LP' },
    { id: 4, rank: 4, name: 'Tom Wilson', loans: 8, volume: '$3.1M', trend: 'down', avatar: 'TW' },
    { id: 5, rank: 5, name: 'Ana Garcia', loans: 7, volume: '$2.9M', trend: 'up', avatar: 'AG' }
  ];

  const pipelineAlerts = [
    {
      id: 1,
      type: 'stale',
      client: 'Thompson Family',
      stage: 'Processing',
      daysStuck: 14,
      reason: 'Awaiting income verification'
    },
    {
      id: 2,
      type: 'expiring',
      client: 'Rodriguez, Maria',
      stage: 'Pre-Approval',
      daysLeft: 3,
      reason: 'Pre-approval expires soon'
    },
    {
      id: 3,
      type: 'stuck',
      client: 'Anderson Trust',
      stage: 'Underwriting',
      daysStuck: 7,
      reason: 'Additional docs requested'
    }
  ];

  const commissionData = {
    thisMonth: 18750,
    ytd: 142500,
    annualGoal: 250000,
    pace: 'behind',
    paceAmount: 8000,
    status: 'warning' // 'success', 'warning', 'danger'
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-bg">
        <div className="container mx-auto p-4 lg:p-6 space-y-6">
          {/* Header Section */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-prestige-gold">Good morning, {userName}!</h1>
                <p className="text-text-secondary">{currentDate}</p>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-md hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500/10 rounded-lg">
                      <Flame className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Streak</p>
                      <p className="text-lg font-bold text-prestige-gold">{quickStats.streak} days</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-md hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <Star className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Score</p>
                      <p className="text-lg font-bold text-prestige-gold">{quickStats.score}/10</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-md hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500/10 rounded-lg">
                      <Trophy className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Rank</p>
                      <p className="text-lg font-bold text-prestige-gold">#{quickStats.rank}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-md hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <Sparkles className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Points</p>
                      <p className="text-lg font-bold text-prestige-gold">{quickStats.points}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Coach Max Summary */}
            <div className="bg-gradient-to-r from-prestige-gold/10 to-prestige-rose-gold/10 border border-prestige-gold/30 rounded-xl p-4 flex items-start gap-3 max-w-md">
              <Trophy className="h-5 w-5 text-prestige-gold mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-prestige-gold mb-1">Coach Max</p>
                <p className="text-sm text-slate-800">
                  You&apos;re on pace to exceed your monthly goals — keep up the streak!
                </p>
              </div>
            </div>
          </div>

          {/* Assistant Ava Lead Priority Card */}
          <Card className="bg-white border-slate-200 shadow-md rounded-2xl hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Sparkles className="h-5 w-5 text-prestige-titanium" />
                Assistant Ava&apos;s Lead Priority – Contact These Leads Today
              </CardTitle>
              <CardDescription>Your highest-scoring leads based on pipeline analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aiLeadPriorities.map((lead) => (
                  <div 
                    key={lead.id} 
                    className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:border-primary/50 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-sm">{lead.name}</h4>
                        <p className="text-xs text-slate-400">{lead.stage}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={lead.urgency === 'hot' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {lead.urgency}
                        </Badge>
                        <div className="text-right">
                          <p className="text-lg font-bold text-blue-500">{lead.score}</p>
                          <p className="text-xs text-slate-400">score</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-1 mb-4">
                      <p className="text-sm text-slate-600">{lead.loanAmount}</p>
                      <p className="text-xs text-slate-400">Last contact: {lead.lastContact}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Mail className="h-3 w-3 mr-1" />
                        Email
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Coach Max Focus Section */}
          <Card className="bg-white border-slate-200 shadow-md rounded-2xl hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Trophy className="h-5 w-5 text-prestige-gold" />
                Coach Max&apos;s Focus – Today&apos;s Top Priorities
              </CardTitle>
              <CardDescription>Complete these tasks to maximize your productivity and earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aiTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:border-primary/50 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <Badge 
                        variant={task.priority === 'high' ? 'destructive' : 'secondary'}
                        className="text-xs font-medium"
                      >
                        {task.priority} priority
                      </Badge>
                      <span className="text-sm font-bold text-green-500">+{task.points} pts</span>
                    </div>
                    
                    <p className="text-sm font-medium text-slate-800 mb-4">{task.action}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-slate-400">
                        <Clock className="h-3 w-3" />
                        <span className="text-xs">{task.time}</span>
                      </div>
                      <Button size="sm" className="h-8 px-4">
                        Start <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Daily Coaching */}
              <Card className="bg-white border-slate-200 shadow-md rounded-2xl hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Daily Coaching</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer group">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-lg bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
                        <Lightbulb className="h-5 w-5 text-amber-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-2">Tip of the Day</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Focus on converting your warm leads today. The Johnson family is ready to move forward!
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer group">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                        <Trophy className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-2">Success Celebration</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          You closed 3 loans last week! That&apos;s $450K in volume. Keep up the momentum!
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Smart Scheduling */}
              <Card className="bg-white border-slate-200 shadow-md rounded-2xl hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Smart Scheduling</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                          <Clock className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold">Best time for calls</p>
                          <p className="text-xs text-slate-400">2:00 PM - 4:00 PM today</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4 border border-warning/30 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
                          <AlertCircle className="h-5 w-5 text-amber-500" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-amber-500">Schedule conflict</p>
                          <p className="text-xs text-slate-400">Double booking at 3:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Momentum Builder - New */}
              <Card className="bg-white border-slate-200 shadow-md rounded-2xl hover:shadow-lg transition-shadow duration-200 animate-fade-in">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Flame className="h-5 w-5 text-amber-500" />
                    Momentum Builder
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-200 ease-out cursor-pointer">
                    <div className="space-y-4">
                      {/* Motivation Message */}
                      <div>
                        <p className="text-lg font-semibold text-slate-800 leading-tight">
                          You&apos;ve doubled last week&apos;s production pace!
                        </p>
                        <p className="text-sm text-slate-600 mt-1">
                          Stay consistent to hit your monthly goal.
                        </p>
                      </div>
                      
                      {/* Quote of the Day */}
                      <div className="flex items-start gap-3 pt-3 border-t border-slate-200">
                        <Quote className="h-4 w-4 text-slate-400 mt-1 flex-shrink-0" />
                        <p className="text-sm italic text-slate-600 leading-relaxed">
                          <q>Success is the sum of small efforts repeated daily.</q>
                        </p>
                      </div>
                      
                      {/* Streak Boost Badge - shows when streak > 10 */}
                      {quickStats.streak > 10 && (
                        <div className="flex items-center justify-center pt-3">
                          <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 border-warning/20">
                            <Flame className="h-3 w-3 mr-1" />
                            {quickStats.streak} Day Streak Champion!
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Middle Column */}
            <div className="space-y-6">
              {/* Performance Metrics */}
              <Card className="bg-white border-slate-200 shadow-md rounded-2xl hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer group">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                          <TrendingUp className="h-4 w-4 text-blue-500" />
                        </div>
                        <span className="text-sm font-medium">Pipeline Value</span>
                      </div>
                      <span className="text-lg font-bold text-blue-500">$6.6M</span>
                    </div>
                    <div className="relative">
                      <Progress value={66} className="h-2" />
                      <span className="absolute -top-6 right-0 text-xs text-slate-400">66%</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer group">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                          <Flag className="h-4 w-4 text-green-500" />
                        </div>
                        <span className="text-sm font-medium">Monthly Goal</span>
                      </div>
                      <span className="text-lg font-bold text-green-500">75%</span>
                    </div>
                    <div className="relative">
                      <Progress value={75} className="h-2" />
                      <span className="absolute -top-6 right-0 text-xs text-slate-400">On track</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer group">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
                          <Zap className="h-4 w-4 text-amber-500" />
                        </div>
                        <span className="text-sm font-medium">Activity Score</span>
                      </div>
                      <span className="text-lg font-bold text-amber-500">8.5/10</span>
                    </div>
                    <div className="relative">
                      <Progress value={85} className="h-2" />
                      <span className="absolute -top-6 right-0 text-xs text-slate-400">Excellent</span>
                    </div>
                  </div>
                  
                  {/* View Report CTA */}
                  <button className="text-sm text-slate-400 hover:text-blue-500 transition-colors flex items-center gap-1 ml-auto mt-2">
                    View Report
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </CardContent>
              </Card>

              {/* Commission Tracker - New */}
              <Card className="bg-white border-slate-200 shadow-md rounded-2xl hover:shadow-lg transition-shadow duration-200 animate-fade-in">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    Commission Tracker
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wide">This Month</p>
                        <p className="text-3xl font-bold text-blue-500">${commissionData.thisMonth.toLocaleString()}</p>
                      </div>
                      <Badge 
                        variant={commissionData.status === 'success' ? 'default' : commissionData.status === 'warning' ? 'secondary' : 'destructive'}
                        className="text-xs"
                      >
                        {commissionData.pace === 'behind' ? 'Behind Pace' : commissionData.pace === 'ahead' ? 'Ahead of Pace' : 'On Track'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-slate-600">YTD Commission</span>
                          <span className="text-sm font-bold">${commissionData.ytd.toLocaleString()}</span>
                        </div>
                        <Progress 
                          value={(commissionData.ytd / commissionData.annualGoal) * 100} 
                          className="h-2"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                        <div>
                          <p className="text-xs text-slate-400">Annual Goal</p>
                          <p className="text-sm font-semibold">${commissionData.annualGoal.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-400">Pace Status</p>
                          <p className={`text-sm font-semibold ${
                            commissionData.pace === 'behind' ? 'text-amber-500' : 
                            commissionData.pace === 'ahead' ? 'text-green-500' : 
                            'text-blue-500'
                          }`}>
                            ${commissionData.paceAmount.toLocaleString()} {commissionData.pace}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* View Report CTA */}
                  <button className="text-sm text-slate-400 hover:text-blue-500 transition-colors flex items-center gap-1 ml-auto mt-2">
                    View Report
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </CardContent>
              </Card>

              {/* Recent Activity Feed */}
              <Card className="bg-white border-slate-200 shadow-md rounded-2xl hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Recent Activity Feed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                    
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="relative flex items-center gap-4 group">
                          {/* Timeline dot */}
                          <div className="relative z-10">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center shadow-sm transition-all duration-200 group-hover:scale-110 ${
                              activity.type === 'call' ? 'bg-green-500/10 border-2 border-success/20' :
                              activity.type === 'document' ? 'bg-blue-500/10 border-2 border-primary/20' :
                              activity.type === 'meeting' ? 'bg-green-500/10 border-2 border-secondary/20' :
                              'bg-amber-500/10 border-2 border-warning/20'
                            }`}>
                              {activity.type === 'call' && <Phone className="h-4 w-4 text-green-500" />}
                              {activity.type === 'document' && <FileText className="h-4 w-4 text-blue-500" />}
                              {activity.type === 'meeting' && <Handshake className="h-4 w-4 text-green-500" />}
                              {activity.type === 'email' && <Send className="h-4 w-4 text-amber-500" />}
                            </div>
                          </div>
                          
                          <div className="flex-1 bg-white rounded-xl p-3 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
                            <p className="text-sm font-medium">{activity.description}</p>
                            <p className="text-xs text-slate-400 mt-1" title={`Completed at ${new Date().toLocaleTimeString()}`}>
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* View Report CTA */}
                  <button className="text-sm text-slate-400 hover:text-blue-500 transition-colors flex items-center gap-1 ml-auto mt-2">
                    View Report
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Weekly Leaderboard - New */}
              <Card className="bg-white border-slate-200 shadow-md rounded-2xl hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Crown className="h-5 w-5 text-amber-500" />
                    Weekly Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {weeklyLeaderboard.map((member) => (
                      <div 
                        key={member.id} 
                        className={`flex items-center gap-3 p-2 rounded-lg ${
                          member.rank === 1 ? 'bg-amber-500/10 border border-warning/20' : ''
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-[60px]">
                          <span className="text-lg font-bold text-slate-400">#{member.rank}</span>
                          {member.trend === 'up' && <ArrowUp className="h-3 w-3 text-green-500" />}
                          {member.trend === 'down' && <ArrowDown className="h-3 w-3 text-red-500" />}
                          {member.trend === 'same' && <Minus className="h-3 w-3 text-slate-400" />}
                        </div>
                        
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs bg-blue-500/10">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-xs text-slate-400">{member.loans} loans</p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm font-bold text-blue-500">{member.volume}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* View Report CTA */}
                  <button className="text-sm text-slate-400 hover:text-blue-500 transition-colors flex items-center gap-1 ml-auto mt-2">
                    View Report
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-white border-slate-200 shadow-md rounded-2xl hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="h-20 flex flex-col items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 ease-out group">
                      <div className="p-2.5 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                        <Phone className="h-5 w-5 text-green-500" />
                      </div>
                      <span className="text-xs font-medium text-slate-800">Make Calls</span>
                    </button>
                    <button className="h-20 flex flex-col items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 ease-out group">
                      <div className="p-2.5 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                        <FileText className="h-5 w-5 text-blue-500" />
                      </div>
                      <span className="text-xs font-medium text-slate-800">Process Apps</span>
                    </button>
                    <button className="h-20 flex flex-col items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 ease-out group">
                      <div className="p-2.5 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                        <Users className="h-5 w-5 text-green-500" />
                      </div>
                      <span className="text-xs font-medium text-slate-800">Add Leads</span>
                    </button>
                    <button className="h-20 flex flex-col items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 ease-out group">
                      <div className="p-2.5 rounded-lg bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
                        <Calendar className="h-5 w-5 text-amber-500" />
                      </div>
                      <span className="text-xs font-medium text-slate-800">Schedule</span>
                    </button>
                    <button className="h-20 flex flex-col items-center justify-center gap-2 col-span-2 rounded-xl bg-white border border-slate-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 ease-out group">
                      <div className="p-2.5 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                        <Megaphone className="h-5 w-5 text-red-500" />
                      </div>
                      <span className="text-xs font-medium text-slate-800">Launch Campaign</span>
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Campaign Snapshot - New */}
              <Card className="bg-white border-slate-200 shadow-md rounded-2xl hover:shadow-lg transition-shadow duration-200 animate-fade-in">
                <CardHeader className="pb-4 border-b-2 border-primary/10">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Megaphone className="h-5 w-5 text-blue-500" />
                    Marketing Campaigns
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    {/* Tab Toggle */}
                    <div className="flex gap-2 p-1 bg-slate-50 rounded-lg">
                      <button className="flex-1 px-3 py-1.5 text-xs font-medium bg-white rounded-md shadow-sm transition-all">
                        Email
                      </button>
                      <button className="flex-1 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-800 transition-all">
                        SMS
                      </button>
                      <button className="flex-1 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-800 transition-all">
                        Social
                      </button>
                    </div>
                    
                    {/* Active Campaign */}
                    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200 ease-out">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-sm">Free Rate Check</h4>
                          <p className="text-xs text-slate-400 mt-0.5">Active campaign</p>
                        </div>
                        <Badge variant="default" className="text-xs bg-blue-500/10 text-blue-500 border-primary/20">
                          Live
                        </Badge>
                      </div>
                      
                      {/* Campaign Stats */}
                      <div className="flex items-center gap-4 text-sm mb-3">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3 text-slate-400" />
                          <span className="font-medium">112</span>
                          <span className="text-slate-400">opens</span>
                        </div>
                        <span className="text-slate-400">·</span>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-slate-400" />
                          <span className="font-medium text-green-500">8</span>
                          <span className="text-slate-400">new leads</span>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400">Engagement Goal</span>
                          <span className="font-medium">40%</span>
                        </div>
                        <Progress value={40} className="h-2" />
                      </div>
                    </div>
                    
                    {/* CTA Button */}
                    <button className="w-full py-3 rounded-xl bg-white border border-slate-200 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out group">
                      <div className="flex items-center justify-center gap-2">
                        <div className="p-1.5 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                          <Activity className="h-4 w-4 text-blue-500" />
                        </div>
                        <span className="text-sm font-semibold text-slate-800">Launch New Campaign</span>
                      </div>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Pipeline Alerts Card - New */}
          <Card className="bg-white border-slate-200 shadow-md rounded-2xl hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Pipeline Alerts
              </CardTitle>
              <CardDescription>Loans requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pipelineAlerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`p-4 rounded-xl border ${
                      alert.type === 'expiring' 
                        ? 'bg-red-500/5 border-error/20' 
                        : 'bg-amber-500/5 border-warning/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        alert.type === 'expiring' ? 'bg-red-500/10' : 'bg-amber-500/10'
                      }`}>
                        <AlertCircle className={`h-4 w-4 ${
                          alert.type === 'expiring' ? 'text-red-500' : 'text-amber-500'
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium text-sm">{alert.client}</p>
                            <p className="text-xs text-slate-400">{alert.stage}</p>
                          </div>
                          <Badge 
                            variant={alert.type === 'expiring' ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {alert.type === 'expiring' 
                              ? `${alert.daysLeft} days left` 
                              : `${alert.daysStuck} days stuck`
                            }
                          </Badge>
                        </div>
                        
                        <p className="text-xs text-slate-600 mb-3">{alert.reason}</p>
                        
                        <Button size="sm" variant="outline" className="w-full">
                          Take Action
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Document & Compliance Tracker */}
          <Card className="bg-white border-slate-200 shadow-md rounded-2xl hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileWarning className="h-5 w-5 text-amber-500" />
                Document & Compliance Tracker
              </CardTitle>
              <CardDescription>Stay on top of required documents and compliance issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Missing Documents */}
                <div>
                  <h3 className="font-medium text-sm mb-4 text-slate-600">Missing Documents</h3>
                  <div className="space-y-3">
                    {missingDocuments.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-primary/20 transition-colors">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{doc.type}</p>
                          <p className="text-xs text-slate-400">{doc.client}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-400">Due: {doc.dueDate}</span>
                          <Badge 
                            variant={doc.status === 'urgent' ? 'destructive' : doc.status === 'warning' ? 'secondary' : 'outline'}
                            className="text-xs"
                          >
                            {doc.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compliance Flags */}
                <div>
                  <h3 className="font-medium text-sm mb-4 text-slate-600">Compliance Flags</h3>
                  <div className="space-y-3">
                    {complianceFlags.map((flag) => (
                      <div key={flag.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-primary/20 transition-colors">
                        <div className="p-2 bg-amber-500/10 rounded-lg">
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{flag.issue}</p>
                          <p className="text-xs text-slate-400">{flag.description}</p>
                          <p className="text-xs text-slate-400 mt-1">Client: {flag.client}</p>
                        </div>
                        <Badge 
                          variant={flag.status === 'high' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {flag.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Referral Partner Feed */}
          <Card className="bg-white border-slate-200 shadow-md rounded-2xl hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <UserCheck className="h-5 w-5 text-blue-500" />
                Referral Partner Feed
              </CardTitle>
              <CardDescription>Your top performing referral partners this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {referralPartners.map((partner) => (
                  <div 
                    key={partner.id} 
                    className={`p-4 rounded-xl border transition-all duration-200 ${
                      partner.isTopPartner 
                        ? 'bg-blue-500/5 border-primary/20 hover:border-primary/40' 
                        : 'bg-slate-50 border-slate-200 hover:border-primary/20'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          partner.isTopPartner ? 'bg-blue-500/10' : 'bg-white'
                        }`}>
                          <Building2 className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{partner.name}</p>
                          <p className="text-xs text-slate-400">{partner.company}</p>
                        </div>
                      </div>
                      {partner.isTopPartner && (
                        <Badge variant="default" className="text-xs">
                          <Award className="h-3 w-3 mr-1" />
                          Top Partner
                        </Badge>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-2xl font-bold text-blue-500">{partner.referrals}</p>
                        <p className="text-xs text-slate-400">leads referred</p>
                      </div>
                      <span className="text-xs text-slate-400">{partner.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}