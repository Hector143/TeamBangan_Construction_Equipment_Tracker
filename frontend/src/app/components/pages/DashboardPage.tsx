import { motion } from 'motion/react';
import {
  Truck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  TrendingDown,
  Activity
} from 'lucide-react';
import { Card, CardBody, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const stats = [
  {
    icon: Truck,
    label: 'Total Equipment',
    value: '247',
    change: '+12',
    trend: 'up',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: CheckCircle2,
    label: 'Active',
    value: '189',
    change: '+8',
    trend: 'up',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: AlertTriangle,
    label: 'Needs Maintenance',
    value: '24',
    change: '-3',
    trend: 'down',
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: Clock,
    label: 'In Maintenance',
    value: '34',
    change: '+2',
    trend: 'up',
    color: 'from-purple-500 to-purple-600'
  }
];

const equipmentUsageData = [
  { month: 'Jan', hours: 4200 },
  { month: 'Feb', hours: 3800 },
  { month: 'Mar', hours: 5100 },
  { month: 'Apr', hours: 4600 },
  { month: 'May', hours: 5400 },
  { month: 'Jun', hours: 4900 }
];

const equipmentByType = [
  { name: 'Excavators', value: 45, color: '#f59e0b' },
  { name: 'Bulldozers', value: 32, color: '#3b82f6' },
  { name: 'Cranes', value: 28, color: '#10b981' },
  { name: 'Loaders', value: 38, color: '#8b5cf6' },
  { name: 'Dump Trucks', value: 54, color: '#ef4444' },
  { name: 'Other', value: 50, color: '#6b7280' }
];

const recentActivity = [
  { id: 1, equipment: 'Excavator CAT-320', action: 'Checked Out', site: 'Downtown Plaza', time: '10 mins ago', status: 'success' },
  { id: 2, equipment: 'Bulldozer D6T', action: 'Maintenance Scheduled', site: 'Highway 101', time: '25 mins ago', status: 'warning' },
  { id: 3, equipment: 'Crane TC-5613', action: 'Checked In', site: 'Riverside Project', time: '1 hour ago', status: 'info' },
  { id: 4, equipment: 'Loader 950M', action: 'Maintenance Complete', site: 'Central Depot', time: '2 hours ago', status: 'success' },
  { id: 5, equipment: 'Dump Truck 773G', action: 'Fuel Refilled', site: 'North Site', time: '3 hours ago', status: 'info' }
];

const upcomingMaintenance = [
  { id: 1, equipment: 'Excavator CAT-336', type: 'Routine Service', date: 'May 10, 2026', priority: 'medium' },
  { id: 2, equipment: 'Crane Liebherr', type: 'Safety Inspection', date: 'May 11, 2026', priority: 'high' },
  { id: 3, equipment: 'Bulldozer D8T', type: 'Oil Change', date: 'May 12, 2026', priority: 'low' },
  { id: 4, equipment: 'Loader 980M', type: 'Tire Replacement', date: 'May 13, 2026', priority: 'high' }
];

export function DashboardPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard Overview</h1>
        <p className="text-slate-600">Welcome back! Here's what's happening with your equipment today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="overflow-hidden">
                <CardBody className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <TrendIcon className="w-4 h-4" />
                      {stat.change}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </CardBody>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Usage Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Equipment Usage Trend</CardTitle>
              <p className="text-sm text-slate-600 mt-1">Total operating hours per month</p>
            </CardHeader>
            <CardBody>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={equipmentUsageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="hours"
                    stroke="#f97316"
                    strokeWidth={3}
                    dot={{ fill: '#f97316', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </motion.div>

        {/* Equipment by Type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Equipment by Type</CardTitle>
              <p className="text-sm text-slate-600 mt-1">Distribution across categories</p>
            </CardHeader>
            <CardBody>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={equipmentByType}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {equipmentByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {equipmentByType.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-slate-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <p className="text-sm text-slate-600 mt-1">Latest equipment operations</p>
                </div>
                <Activity className="w-5 h-5 text-slate-400" />
              </div>
            </CardHeader>
            <CardBody className="p-0">
              <div className="divide-y divide-slate-100">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 mb-1">{activity.equipment}</p>
                        <p className="text-sm text-slate-600 mb-1">{activity.action}</p>
                        <p className="text-xs text-slate-500">
                          {activity.site} • {activity.time}
                        </p>
                      </div>
                      <Badge
                        variant={
                          activity.status === 'success' ? 'success' :
                          activity.status === 'warning' ? 'warning' : 'info'
                        }
                      >
                        {activity.action.split(' ')[0]}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Upcoming Maintenance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upcoming Maintenance</CardTitle>
                  <p className="text-sm text-slate-600 mt-1">Scheduled service tasks</p>
                </div>
                <AlertTriangle className="w-5 h-5 text-orange-500" />
              </div>
            </CardHeader>
            <CardBody className="p-0">
              <div className="divide-y divide-slate-100">
                {upcomingMaintenance.map((item) => (
                  <div key={item.id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 mb-1">{item.equipment}</p>
                        <p className="text-sm text-slate-600 mb-1">{item.type}</p>
                        <p className="text-xs text-slate-500">{item.date}</p>
                      </div>
                      <Badge
                        variant={
                          item.priority === 'high' ? 'danger' :
                          item.priority === 'medium' ? 'warning' : 'default'
                        }
                      >
                        {item.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
