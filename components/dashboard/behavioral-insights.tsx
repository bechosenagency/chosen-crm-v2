import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Phone, MessageSquare, Calendar, TrendingUp, Lightbulb, Target } from 'lucide-react'

interface InsightCard {
  id: string
  type: 'timing' | 'communication' | 'behavior' | 'strategy'
  title: string
  insight: string
  impact: string
  action: string
  confidence: number
}

const insights: InsightCard[] = [
  {
    id: '1',
    type: 'timing',
    title: 'Optimal Call Windows',
    insight: 'You close 3x more deals when calling before 10am',
    impact: 'Close rate: 67% vs 23% afternoon calls',
    action: 'Schedule Johnson and Chen calls for 9:30 AM tomorrow',
    confidence: 94
  },
  {
    id: '2',
    type: 'communication',
    title: 'Client Preferences',
    insight: 'Martinez prefers texts - 85% response rate vs 23% for calls',
    impact: 'Response time: 12 min vs 4.2 hours',
    action: 'Send follow-up text instead of calling',
    confidence: 89
  },
  {
    id: '3',
    type: 'behavior',
    title: 'Weekly Performance Pattern',
    insight: 'Your Wednesday close rate is 45% higher than average',
    impact: 'Wednesday: 78% close rate vs 54% other days',
    action: 'Stack important calls on Wednesdays',
    confidence: 87
  },
  {
    id: '4',
    type: 'strategy',
    title: 'Decision Timeline Analysis',
    insight: 'Chen takes avg 4.2 days to decide - follow up tomorrow for best results',
    impact: 'Day 4-5 follow-ups have 73% success rate',
    action: 'Set reminder for tomorrow 2 PM follow-up',
    confidence: 91
  }
]

function InsightCard({ insight }: { insight: InsightCard }) {
  const typeConfig = {
    timing: { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
    communication: { icon: MessageSquare, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
    behavior: { icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
    strategy: { icon: Target, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' }
  }
  
  const config = typeConfig[insight.type]
  const Icon = config.icon
  
  return (
    <div className={`p-4 rounded-lg border ${config.border} ${config.bg}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${config.color}`} />
          <span className="font-medium text-slate-900">{insight.title}</span>
        </div>
        <Badge variant="outline" className="text-xs">
          {insight.confidence}% confidence
        </Badge>
      </div>
      
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-900">
          💡 {insight.insight}
        </p>
        
        <div className="text-xs text-slate-600 space-y-1">
          <p><strong>Impact:</strong> {insight.impact}</p>
          <p><strong>Recommended Action:</strong> {insight.action}</p>
        </div>
      </div>
    </div>
  )
}

export function BehavioralInsights() {
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              AI Behavioral Insights
            </CardTitle>
            <p className="text-sm text-slate-600 mt-1">
              Personalized coaching based on your performance patterns
            </p>
          </div>
          <Badge className="bg-yellow-100 text-yellow-700">
            4 insights • High impact
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-slate-900 mb-2">
                🎯 Weekly Performance Prediction
              </h4>
              <p className="text-sm text-slate-700 mb-2">
                Based on current patterns, you're projected to close <strong>3.2 deals this week</strong> 
                with <strong>$11,400 commission</strong>.
              </p>
              <p className="text-xs text-slate-600">
                To hit your $15K weekly target: Focus on Johnson (85% close probability) and 
                Martinez (72% probability). Both respond best to your proven Wednesday timing strategy.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
