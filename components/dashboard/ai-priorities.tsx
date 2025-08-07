import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Phone, Mail, Clock, DollarSign, AlertTriangle, Flame, TrendingUp, RotateCcw, FileText } from 'lucide-react'

interface PriorityTask {
  id: string
  type: 'call' | 'email' | 'follow-up' | 'application'
  client: string
  action: string
  urgency: 'critical' | 'high' | 'medium'
  reasoning: string
  timing: string
  impact: {
    probability: number
    commission: number
  }
  context: string
}

const priorityTasks: PriorityTask[] = [
  {
    id: '1',
    type: 'call',
    client: 'Michael Johnson',
    action: 'Rate lock expiration call',
    urgency: 'critical',
    reasoning: 'Rate lock expires in 18 hours',
    timing: 'Call at 2:00 PM (73% answer rate)',
    impact: { probability: 85, commission: 4200 },
    context: 'Pre-approved for $450K • Rates up 0.25% since lock'
  },
  {
    id: '2',
    type: 'follow-up',
    client: 'Sarah Martinez',
    action: 'Decision timeline follow-up',
    urgency: 'high',
    reasoning: 'Takes avg 4.2 days to decide - day 4 today',
    timing: 'Text preferred (85% response vs 23% calls)',
    impact: { probability: 72, commission: 3800 },
    context: 'Comparing 3 lenders • Mentioned timeline pressure yesterday'
  },
  {
    id: '3',
    type: 'call',
    client: 'David Chen',
    action: 'Hot lead conversion',
    urgency: 'high',
    reasoning: 'Contacted 3 lenders today - high intent',
    timing: 'Call before 5 PM (business owner)',
    impact: { probability: 68, commission: 5200 },
    context: 'Investment property • $680K loan • Needs quick close'
  },
  {
    id: '4',
    type: 'email',
    client: 'Lisa Thompson',
    action: 'Document reminder',
    urgency: 'medium',
    reasoning: '48hrs since last contact',
    timing: 'Send by 3 PM for same-day response',
    impact: { probability: 45, commission: 2900 },
    context: 'Missing W2s • Processor waiting • Close date 2 weeks'
  }
]

function PriorityTaskCard({ task }: { task: PriorityTask }) {
  const urgencyConfig = {
    critical: { 
      color: 'bg-red-500', 
      textColor: 'text-red-700', 
      bgColor: 'bg-red-50',
      icon: AlertTriangle,
      label: 'CRITICAL - Today'
    },
    high: { 
      color: 'bg-orange-500', 
      textColor: 'text-orange-700', 
      bgColor: 'bg-orange-50',
      icon: Flame,
      label: 'HIGH - Tomorrow'
    },
    medium: { 
      color: 'bg-yellow-500', 
      textColor: 'text-yellow-700', 
      bgColor: 'bg-yellow-50',
      icon: Clock,
      label: 'MEDIUM - This Week'
    }
  }
  
  const config = urgencyConfig[task.urgency]
  const UrgencyIcon = config.icon
  
  const typeIcons = {
    call: Phone,
    email: Mail,
    'follow-up': RotateCcw,
    application: FileText
  }
  
  const TypeIcon = typeIcons[task.type] || Phone
  
  return (
    <div className={`p-4 rounded-lg border-l-4 ${config.color} ${config.bgColor}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <TypeIcon className={`h-4 w-4 ${config.textColor}`} />
          <span className="font-medium text-slate-900">{task.client}</span>
        </div>
        <Badge variant="outline" className={`${config.textColor} ${config.bgColor} border-0 text-xs`}>
          <UrgencyIcon className="h-3 w-3 mr-1" />
          {config.label}
        </Badge>
      </div>
      
      <h4 className="font-medium text-slate-900 mb-2">{task.action}</h4>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <Clock className="h-3 w-3 text-slate-500" />
          <span className="text-slate-600">{task.timing}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="text-slate-500">Close probability:</span>
            <span className="font-medium text-green-600">{task.impact.probability}%</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-3 w-3 text-emerald-600" />
            <span className="font-medium text-emerald-600">
              ${task.impact.commission.toLocaleString()}
            </span>
          </div>
        </div>
        
        <p className="text-sm text-slate-600 italic">"{task.reasoning}"</p>
        <p className="text-xs text-slate-500">{task.context}</p>
      </div>
      
      <div className="flex gap-2 mt-3">
        <Button size="sm" className="flex-1">
          Take Action
        </Button>
        <Button size="sm" variant="outline">
          Snooze
        </Button>
      </div>
    </div>
  )
}

export function AiPriorities() {
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">AI Priority Queue</CardTitle>
          <Badge className="bg-blue-100 text-blue-700">
            4 actions • $16.1K at stake
          </Badge>
        </div>
        <p className="text-sm text-slate-600">
          Smart prioritization based on timing, probability, and commission impact
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {priorityTasks.map((task) => (
            <PriorityTaskCard key={task.id} task={task} />
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1 bg-blue-100 rounded">
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </div>
            <span className="font-medium text-slate-900">AI Coaching Tip</span>
          </div>
          <p className="text-sm text-slate-600">
            Complete Johnson's call first - rate locks create urgency that increases close rates by 34%. 
            Use the rate increase as leverage: "Rates went up 0.25% since your lock - you're saving $180/month by acting now."
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
