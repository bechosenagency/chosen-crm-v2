import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Clock, DollarSign } from 'lucide-react'

export function HeroSection() {
  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening'
  
  return (
    <Card className="bg-white shadow-lg p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {greeting}, Sarah! 👋
          </h1>
          <p className="text-slate-600 mt-1">
            Your AI coach has identified 3 high-impact actions for today
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">Pipeline Velocity</p>
              <p className="text-xs text-slate-600">+23% vs last month</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">Optimal Call Time</p>
              <p className="text-xs text-slate-600">Next 2 hours (87% answer rate)</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <DollarSign className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">Commission Goal</p>
              <p className="text-xs text-slate-600">$6,150 to hit $30K</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
        <div className="flex items-start gap-3">
          <div className="p-1 bg-blue-100 rounded">
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-900">
              🎯 AI Insight: Your Wednesday close rate is 45% higher than average
            </p>
            <p className="text-xs text-blue-700 mt-1">
              Stack your most important calls today. Johnson and Martinez are both ready to move forward.
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
