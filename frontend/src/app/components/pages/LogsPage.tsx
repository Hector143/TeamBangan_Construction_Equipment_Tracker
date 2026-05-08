import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Search, Download, Calendar, Filter } from 'lucide-react';
import { Card, CardBody } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { toast } from 'sonner';

type AuditLog = {
  id: number;
  userName: string;
  equipmentName: string;
  assetId: string;
  actionType: string;
  logDate: string | null;
  statusAtTime: string | null;
};

const actionColor: Record<string, 'success' | 'warning' | 'info' | 'danger'> = {
  CHECK_OUT: 'info',
  CHECK_IN: 'success',
};

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return {
    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  };
};

export function LogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/logs');
        if (!res.ok) throw new Error(`Failed to load logs (${res.status})`);
        const data = (await res.json()) as any[];

        const normalized: AuditLog[] = data.map((d) => ({
          id: d.id,
          userName: d.userName ?? d.user_name ?? '',
          equipmentName: d.equipmentName ?? d.equipment_name ?? '',
          assetId: d.assetId ?? d.asset_id ?? '',
          actionType: d.actionType ?? d.action_type ?? '',
          logDate: d.logDate ?? d.log_date ?? null,
          statusAtTime: d.statusAtTime ?? d.status_at_time ?? null,
        }));

        if (alive) setLogs(normalized);
      } catch (e: any) {
        if (alive) setError(e?.message ?? 'Unknown error');
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const filteredLogs = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return logs.filter((log) => {
      return (
        log.equipmentName.toLowerCase().includes(q) ||
        log.userName.toLowerCase().includes(q) ||
        log.actionType.toLowerCase().includes(q) ||
        log.assetId.toLowerCase().includes(q)
      );
    });
  }, [logs, searchQuery]);

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Activity Logs</h1>
            <p className="text-slate-600">Audit trail of equipment operations and events</p>
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

        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by equipment, user, action, or asset ID..."
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

      {loading ? (
        <div className="text-center py-12 text-slate-600">Loading logs...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-600">{error}</div>
      ) : (
        <Card>
          <CardBody className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Equipment</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Action</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Asset ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Status At Time</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredLogs.map((log, index) => {
                    const formatted = log.logDate ? formatTimestamp(log.logDate) : { date: 'N/A', time: '' };
                    const actionKey = (log.actionType || '').toUpperCase();
                    const badgeVariant = actionColor[actionKey] ?? 'info';

                    return (
                      <motion.tr
                        key={log.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-900">{formatted.date}</div>
                          <div className="text-xs text-slate-500">{formatted.time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-900">{log.equipmentName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant={badgeVariant}>{actionKey || log.actionType || 'N/A'}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900">{log.userName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-600">{log.assetId}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-600 max-w-xs truncate">{log.statusAtTime ?? 'N/A'}</div>
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
      )}

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Showing <span className="font-medium">{filteredLogs.length}</span> logs
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.info('No previous page')}>Previous</Button>
          <Button variant="outline" size="sm" onClick={() => toast.info('No next page')}>Next</Button>
        </div>
      </div>
    </div>
  );
}

