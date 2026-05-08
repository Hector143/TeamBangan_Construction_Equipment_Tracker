import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Download, Calendar, Filter } from 'lucide-react';
import { Card, CardBody } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { toast } from 'sonner';

const logs = [
  {
    id: 1,
    timestamp: '2026-05-08T10:30:00',
    equipment: 'Excavator CAT-320',
    action: 'Check Out',
    operator: 'Mike Johnson',
    site: 'Downtown Plaza',
    duration: 'In Progress',
    notes: 'Foundation excavation work'
  },
  {
    id: 2,
    timestamp: '2026-05-08T09:15:00',
    equipment: 'Bulldozer D6T',
    action: 'Maintenance Start',
    operator: 'Service Team A',
    site: 'Central Depot',
    duration: '2h 15m',
    notes: 'Routine 500-hour service'
  },
  {
    id: 3,
    timestamp: '2026-05-08T08:45:00',
    equipment: 'Crane TC-5613',
    action: 'Check In',
    operator: 'Sarah Chen',
    site: 'Riverside Project',
    duration: '6h 30m',
    notes: 'Completed steel beam installation'
  },
  {
    id: 4,
    timestamp: '2026-05-08T08:00:00',
    equipment: 'Loader 950M',
    action: 'Fuel Refill',
    operator: 'Auto System',
    site: 'Central Depot',
    duration: '15m',
    notes: 'Automated fuel monitoring alert'
  },
  {
    id: 5,
    timestamp: '2026-05-07T16:30:00',
    equipment: 'Dump Truck 773G',
    action: 'Check In',
    operator: 'Tom Rodriguez',
    site: 'Highway 101',
    duration: '8h 15m',
    notes: 'Material transport completed'
  },
  {
    id: 6,
    timestamp: '2026-05-07T14:20:00',
    equipment: 'Excavator 336',
    action: 'Maintenance Alert',
    operator: 'System',
    site: 'East Industrial',
    duration: 'N/A',
    notes: 'Service due in 50 operating hours'
  },
  {
    id: 7,
    timestamp: '2026-05-07T12:00:00',
    equipment: 'Crane Liebherr',
    action: 'Safety Inspection',
    operator: 'Inspector Davis',
    site: 'Central Depot',
    duration: '1h 30m',
    notes: 'Annual safety certification passed'
  },
  {
    id: 8,
    timestamp: '2026-05-07T09:30:00',
    equipment: 'Bulldozer D8T',
    action: 'Check Out',
    operator: 'James Wilson',
    site: 'West Valley',
    duration: '7h 45m',
    notes: 'Land clearing operations'
  }
];

const actionColors: Record<string, 'success' | 'warning' | 'info' | 'danger'> = {
  'Check Out': 'info',
  'Check In': 'success',
  'Maintenance Start': 'warning',
  'Maintenance Alert': 'danger',
  'Fuel Refill': 'info',
  'Safety Inspection': 'warning'
};

export function LogsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = logs.filter((log) =>
    log.equipment.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.operator.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.action.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Activity Logs</h1>
            <p className="text-slate-600">Complete history of equipment operations and events</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="lg" className="gap-2" onClick={() => toast.info('Date range picker coming soon')}>
              <Calendar className="w-5 h-5" />
              Date Range
            </Button>
            <Button size="lg" className="gap-2" onClick={() => toast.success('Exporting activity logs...')}>
              <Download className="w-5 h-5" />
              Export
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by equipment, operator, or action..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-lg border-2 border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
            />
          </div>
          <Button variant="outline" size="lg" className="gap-2" onClick={() => toast.info('Advanced filters coming soon')}>
            <Filter className="w-5 h-5" />
            Filters
          </Button>
        </div>
      </div>

      {/* Logs Table */}
      <Card>
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Equipment
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Operator
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Site
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLogs.map((log, index) => {
                  const { date, time } = formatTimestamp(log.timestamp);

                  return (
                    <motion.tr
                      key={log.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{date}</div>
                        <div className="text-xs text-slate-500">{time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{log.equipment}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={actionColors[log.action] || 'default'}>
                          {log.action}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{log.operator}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-600">{log.site}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{log.duration}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-600 max-w-xs truncate">
                          {log.notes}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500">No logs found matching your search</p>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Showing <span className="font-medium">{filteredLogs.length}</span> of{' '}
          <span className="font-medium">{logs.length}</span> logs
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.info('No previous page')}>Previous</Button>
          <Button variant="outline" size="sm" onClick={() => toast.info('No next page')}>Next</Button>
        </div>
      </div>
    </div>
  );
}
