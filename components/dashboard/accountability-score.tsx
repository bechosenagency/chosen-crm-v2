import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Phone, Mail, RotateCcw, FileText, TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface MetricProps {
  icon: React.ReactNode
  label: string
  current: number
  target: number
  status: 'ahead' | 'on-track' | 'behind'
  insight?: string
}

function AccountabilityMetric({ icon, label, current, target, status, insight }: MetricProps) {
  const percentage = Math.round((current / target) * 100)
  const remaining = target - current
  
  const statusConfig = {
    ahead: { color: 'text-green-600', bg: 'bg-green-100', icon: TrendingUp, text: 'Ahead of goal' },
    'on-track': { color: 'text-blue-600', bg: 'bg-blue-100', icon: Minus, text: 'On track' },
    behind: { color: 'text-red-600', bg: 'bg-red-100', icon: TrendingDown, text: 'Behind pace' }
  }
  
  const config = statusConfig[status]
  const StatusIcon = config.icon
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium text-slate-900">{label}</span>
        </div>
        <Badge variant="outline" className={`${config.color} ${config.bg} border-0`}>
          <StatusIcon className="h-3 w-3 mr-1" />
          {config.text}
        </Badge>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">
            {current}/{target} ({percentage}%)
          </span>
          <span className={`font-medium ${config.color}`}>
            {remaining > 0 ? `${remaining} to go` : `+${Math.abs(remaining)} over`}
          </span>
        </div>
        <Progress 
          value={percentage} 
          className="h-2"
        />
      </div>
      
      {insight && (
        <p className="text-xs text-slate-500 italic">{insight}</p>
      )}
    </div>
  )
}

export function AccountabilityScore() {
  const overallScore = 78
  
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Accountability Score</CardTitle>
          <div className="text-right">
            <div className="text-2xl font-bold text-slate-900">{overallScore}%</div>
            <div className="text-xs text-slate-500">This Week</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <AccountabilityMetric
          icon={<Phone className="h-4 w-4 text-blue-600" />}
          label="Calls"
          current={39}
          target={50}
          status="behind"
          insight="Need 11 more calls by Friday - focus on warm leads first"
        />
        
        <AccountabilityMetric
          icon={<Mail className="h-4 w-4 text-green-600" />}
          label="Emails"
          current={84}
          target={100}
          status="on-track"
          insight="Great pace! 16 more emails to hit weekly target"
        />
        
        <AccountabilityMetric
          icon={<RotateCcw className="h-4 w-4 text-red-600" />}
          label="Follow-ups"
          current={3}
          target={5}
          status="behind"
          insight="Critical: 2 follow-ups overdue - conversion drops 40% after 72hrs"
        />
        
        <AccountabilityMetric
          icon={<FileText className="h-4 w-4 text-emerald-600" />}
          label="Applications"
          current={2}
          target={2}
          status="ahead"
          insight="Perfect! Both apps submitted on time"
        />
        
        <div className="pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Weekly Goal Progress</span>
            <span className="font-medium text-slate-900">
              {overallScore}% complete
            </span>
          </div>
          <Progress value={overallScore} className="mt-2 h-3" />
          <p className="text-xs text-slate-500 mt-2">
            Focus on follow-ups and calls to reach 85% by Friday
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
