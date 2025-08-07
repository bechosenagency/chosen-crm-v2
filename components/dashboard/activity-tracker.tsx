import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Phone, Mail, FileText, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react'

interface Activity {
  id: string
  type: 'call' | 'email' | 'meeting' | 'application'
  client: string
  action: string
  time: string
  status: 'completed' | 'scheduled' | 'overdue'
  outcome?: string
  nextStep?: string
}

const todayActivities: Activity[] = [
  {
    id: '1',
    type: 'call',
    client: 'Michael Johnson',
    action: 'Rate lock discussion',
    time: '9:30 AM',
    status: 'completed',
    outcome: 'Agreed to lock rate - sending docs',
    nextStep: 'Follow up with application tomorrow'
  },
  {
    id: '2',
    type: 'email',
    client: 'Sarah Martinez',
    action: 'Document request follow-up',
    time: '11:15 AM',
    status: 'completed',
    outcome: 'Received W2s and bank statements',
    nextStep: 'Submit to underwriting today'
  },
  {
    id: '3',
    type: 'call',
    client: 'David Chen',
    action: 'Investment property consultation',
    time: '2:00 PM',
    status: 'scheduled'
  },
  {
    id: '4',
    type: 'meeting',
    client: 'Lisa Thompson',
    action: 'Closing preparation meeting',
    time: '3:30 PM',
    status: 'scheduled'
  },
  {
    id: '5',
    type: 'call',
    client: 'Robert Wilson',
    action: 'Application status update',
    time: '10:00 AM',
    status: 'overdue',
    nextStep: 'Reschedule for tomorrow morning'
  }
]

const dailyGoals = {
  calls: { completed: 3, target: 8, label: 'Calls' },
  emails: { completed: 12, target: 15, label: 'Emails' },
  applications: { completed: 1, target: 2, label: 'Applications' },
  meetings: { completed: 0, target: 3, label: 'Meetings' }
}

function ActivityItem({ activity }: { activity: Activity }) {
  const typeConfig = {
    call: { icon: Phone, color: 'text-blue-600' },
    email: { icon: Mail, color: 'text-green-600' },
    meeting: { icon: Calendar, color: 'text-purple-600' },
    application: { icon: FileText, color: 'text-orange-600' }
  }
  
  const statusConfig = {
    completed: { 
      icon: CheckCircle, 
      color: 'text-green-600', 
      bg: 'bg-green-50', 
      border: 'border-green-200' 
    },
    scheduled: { 
      icon: Clock, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50', 
      border: 'border-blue-200' 
    },
    overdue: { 
      icon: AlertCircle, 
      color: 'text-red-600', 
      bg: 'bg-red-50', 
      border: 'border-red-200' 
    }
  }
  
  const typeConf = typeConfig[activity.type]
  const statusConf = statusConfig[activity.status]
  const TypeIcon = typeConf.icon
  const StatusIcon = statusConf.icon
  
  return (
    <div className={`p-3 rounded-lg border ${statusConf.border} ${statusConf.bg}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <TypeIcon className={`h-4 w-4 ${typeConf.color}`} />
          <span className="font-medium text-slate-900">{activity.client}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">{activity.time}</span>
          <StatusIcon className={`h-4 w-4 ${statusConf.color}`} />
        </div>
      </div>
      
      <p className="text-sm text-slate-700 mb-2">{activity.action}</p>
      
      {activity.outcome && (
        <div className="text-xs text-green-700 mb-1">
          <strong>Outcome:</strong> {activity.outcome}
        </div>
      )}
      
      {activity.nextStep && (
        <div className="text-xs text-slate-600">
          <strong>Next:</strong> {activity.nextStep}
        </div>
      )}
    </div>
  )
}

function DailyGoalProgress({ goal, completed, target, label }: { 
  goal: string
  completed: number
  target: number
  label: string 
}) {
  const percentage = Math.round((completed / target) * 100)
  const isOnTrack = percentage >= 60 // 60% by current time is considered on track
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-900">{label}</span>
        <span className={`text-xs font-medium ${isOnTrack ? 'text-green-600' : 'text-orange-600'}`}>
          {completed}/{target}
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
      <div className="flex justify-between text-xs text-slate-500">
        <span>{percentage}% complete</span>
        <span>{target - completed} to go</span>
      </div>
    </div>
  )
}

export function ActivityTracker() {
  const completedToday = todayActivities.filter(a => a.status === 'completed').length
  const scheduledToday = todayActivities.filter(a => a.status === 'scheduled').length
  const overdueToday = todayActivities.filter(a => a.status === 'overdue').length
  
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Today's Activity</CardTitle>
            <p className="text-sm text-slate-600 mt-1">
              Real-time progress tracking and goal monitoring
            </p>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-green-100 text-green-700">
              {completedToday} completed
            </Badge>
            <Badge className="bg-blue-100 text-blue-700">
              {scheduledToday} scheduled
            </Badge>
            {overdueToday > 0 && (
              <Badge className="bg-red-100 text-red-700">
                {overdueToday} overdue
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Daily Goals Progress */}
        <div>
          <h3 className="font-medium text-slate-900 mb-4">Daily Goals Progress</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(dailyGoals).map(([key, goal]) => (
              <DailyGoalProgress
                key={key}
                goal={key}
                completed={goal.completed}
                target={goal.target}
                label={goal.label}
              />
            ))}
          </div>
        </div>
        
        {/* Activity Timeline */}
        <div>
          <h3 className="font-medium text-slate-900 mb-4">Activity Timeline</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {todayActivities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
        
        {/* Performance Summary */}
        <div className="p-4 bg-slate-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="font-medium text-slate-900">Today's Performance</span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-600">{completedToday}</div>
              <div className="text-xs text-slate-500">Completed</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">{scheduledToday}</div>
              <div className="text-xs text-slate-500">Upcoming</div>
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900">
                {Math.round((completedToday / todayActivities.length) * 100)}%
              </div>
              <div className="text-xs text-slate-500">Completion Rate</div>
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-3 text-center">
            You're {completedToday >= 3 ? 'ahead of' : 'behind'} your typical Wednesday pace. 
            {completedToday >= 3 ? ' Keep up the momentum!' : ' Focus on high-priority calls to catch up.'}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
