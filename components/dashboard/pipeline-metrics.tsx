import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { DollarSign, TrendingUp, AlertTriangle, Target, Users, Clock } from 'lucide-react'

const pipelineData = [
  { stage: 'Leads', count: 24, value: 1200000 },
  { stage: 'Qualified', count: 18, value: 950000 },
  { stage: 'Application', count: 12, value: 680000 },
  { stage: 'Processing', count: 8, value: 420000 },
  { stage: 'Closing', count: 4, value: 280000 }
]

const riskData = [
  { name: 'Healthy', value: 1800000, color: '#10B981' },
  { name: 'At Risk', value: 420000, color: '#F59E0B' },
  { name: 'Critical', value: 180000, color: '#EF4444' }
]

export function PipelineMetrics() {
  const totalPipeline = 2800000
  const projectedCommission = 24850
  const monthlyGoal = 30000
  const goalProgress = (projectedCommission / monthlyGoal) * 100
  const atRiskRevenue = 420000
  
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Pipeline Overview</CardTitle>
            <p className="text-sm text-slate-600 mt-1">
              Real-time commission tracking and deal analysis
            </p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">
                ${(totalPipeline / 1000000).toFixed(1)}M
              </div>
              <div className="text-xs text-slate-500">Total Pipeline</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">
                ${projectedCommission.toLocaleString()}
              </div>
              <div className="text-xs text-slate-500">Projected Commission</div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Goal Progress */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-900">Monthly Goal Progress</span>
            </div>
            <Badge className="bg-blue-100 text-blue-700">
              ${(monthlyGoal - projectedCommission).toLocaleString()} to go
            </Badge>
          </div>
          <Progress value={goalProgress} className="h-3 mb-2" />
          <div className="flex justify-between text-sm">
            <span className="text-blue-700">
              ${projectedCommission.toLocaleString()} / ${monthlyGoal.toLocaleString()}
            </span>
            <span className="font-medium text-blue-900">
              {goalProgress.toFixed(0)}% complete
            </span>
          </div>
          <p className="text-xs text-blue-600 mt-2">
            💡 Close Johnson + Martinez deals = ${8400} commission (28% of remaining goal)
          </p>
        </div>

        {/* Pipeline Stages */}
        <div>
          <h3 className="font-medium text-slate-900 mb-4 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Pipeline by Stage
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineData}>
                <XAxis dataKey="stage" />
                <YAxis />
                <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-slate-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              Risk Analysis
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-slate-900 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Critical Actions
            </h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-red-900">At-Risk Revenue</span>
                  <span className="text-red-700 font-bold">
                    ${(atRiskRevenue / 1000).toFixed(0)}K
                  </span>
                </div>
                <p className="text-xs text-red-600">
                  2 deals going cold • No contact 72+ hours
                </p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-green-900">Hot Opportunities</span>
                  <span className="text-green-700 font-bold">3 deals</span>
                </div>
                <p className="text-xs text-green-600">
                  Ready to close • High engagement scores
                </p>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-blue-900">This Week's Focus</span>
                  <span className="text-blue-700 font-bold">$12.4K</span>
                </div>
                <p className="text-xs text-blue-600">
                  Potential commission from 3 closing deals
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
