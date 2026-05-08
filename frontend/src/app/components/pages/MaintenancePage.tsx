import { useState } from 'react';
import { Badge } from '../ui/Badge';
import { Card, CardBody, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter } from '../ui/Dialog';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { Calendar, Clock, AlertCircle, CheckCircle, Plus } from 'lucide-react';

const maintenanceSchedule = [
  {
    id: 1,
    equipment: 'Excavator CAT-336',
    type: 'Routine Service',
    priority: 'medium',
    dueDate: '2026-05-10',
    estimatedHours: 4,
    assignedTo: 'Service Team A',
    status: 'scheduled',
    lastService: '2026-02-10'
  },
  {
    id: 2,
    equipment: 'Crane Liebherr',
    type: 'Safety Inspection',
    priority: 'high',
    dueDate: '2026-05-11',
    estimatedHours: 2,
    assignedTo: 'Inspector Davis',
    status: 'scheduled',
    lastService: '2025-05-11'
  },
  {
    id: 3,
    equipment: 'Bulldozer D8T',
    type: 'Oil Change',
    priority: 'low',
    dueDate: '2026-05-12',
    estimatedHours: 1.5,
    assignedTo: 'Service Team B',
    status: 'scheduled',
    lastService: '2026-02-12'
  },
  {
    id: 4,
    equipment: 'Loader 980M',
    type: 'Tire Replacement',
    priority: 'high',
    dueDate: '2026-05-13',
    estimatedHours: 3,
    assignedTo: 'Service Team A',
    status: 'overdue',
    lastService: '2025-11-13'
  },
  {
    id: 5,
    equipment: 'Bulldozer D6T',
    type: '500-Hour Service',
    priority: 'medium',
    dueDate: '2026-05-08',
    estimatedHours: 6,
    assignedTo: 'Service Team A',
    status: 'in-progress',
    lastService: '2026-01-05'
  },
  {
    id: 6,
    equipment: 'Dump Truck 773G',
    type: 'Brake System Check',
    priority: 'high',
    dueDate: '2026-05-15',
    estimatedHours: 2.5,
    assignedTo: 'Service Team B',
    status: 'scheduled',
    lastService: '2026-01-15'
  }
];

const statusConfig = {
  scheduled: { variant: 'info' as const, label: 'Scheduled', icon: Calendar },
  'in-progress': { variant: 'warning' as const, label: 'In Progress', icon: Clock },
  overdue: { variant: 'danger' as const, label: 'Overdue', icon: AlertCircle },
  completed: { variant: 'success' as const, label: 'Completed', icon: CheckCircle }
};

const priorityConfig = {
  high: { variant: 'danger' as const, label: 'High Priority' },
  medium: { variant: 'warning' as const, label: 'Medium' },
  low: { variant: 'default' as const, label: 'Low' }
};

export function MaintenancePage() {
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const handleScheduleMaintenance = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Maintenance scheduled successfully!');
    setIsScheduleDialogOpen(false);
  };

  const handleStartMaintenance = (task: any) => {
    toast.success(`Maintenance started for ${task.equipment}`);
  };

  const handleMarkComplete = (task: any) => {
    toast.success(`Maintenance completed for ${task.equipment}`);
  };

  const stats = [
    { label: 'Due This Week', value: '6', color: 'from-orange-500 to-orange-600' },
    { label: 'In Progress', value: '1', color: 'from-blue-500 to-blue-600' },
    { label: 'Overdue', value: '1', color: 'from-red-500 to-red-600' },
    { label: 'Completed This Month', value: '24', color: 'from-green-500 to-green-600' }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Maintenance Schedule</h1>
            <p className="text-slate-600">Manage and track equipment maintenance tasks</p>
          </div>
          <Button size="lg" className="gap-2" onClick={() => setIsScheduleDialogOpen(true)}>
            <Plus className="w-5 h-5" />
            Schedule Maintenance
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardBody className="p-4">
                  <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${stat.color} mb-2`}>
                    <div className="w-4 h-4 bg-white/30 rounded"></div>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Maintenance List */}
      <div className="space-y-4">
        {maintenanceSchedule.map((item, index) => {
          const StatusIcon = statusConfig[item.status as keyof typeof statusConfig].icon;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card hover>
                <CardBody className="p-6">
                  <div className="flex items-start gap-6">
                    {/* Status Icon */}
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${
                      item.status === 'scheduled' ? 'from-blue-500 to-blue-600' :
                      item.status === 'in-progress' ? 'from-yellow-500 to-yellow-600' :
                      item.status === 'overdue' ? 'from-red-500 to-red-600' :
                      'from-green-500 to-green-600'
                    } shadow-lg`}>
                      <StatusIcon className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 mb-1">{item.equipment}</h3>
                          <p className="text-slate-600">{item.type}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant={priorityConfig[item.priority as keyof typeof priorityConfig].variant}>
                            {priorityConfig[item.priority as keyof typeof priorityConfig].label}
                          </Badge>
                          <Badge variant={statusConfig[item.status as keyof typeof statusConfig].variant}>
                            {statusConfig[item.status as keyof typeof statusConfig].label}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Due Date</p>
                          <p className="text-sm font-medium text-slate-900">
                            {new Date(item.dueDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Estimated Time</p>
                          <p className="text-sm font-medium text-slate-900">{item.estimatedHours}h</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Assigned To</p>
                          <p className="text-sm font-medium text-slate-900">{item.assignedTo}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Last Service</p>
                          <p className="text-sm font-medium text-slate-900">
                            {new Date(item.lastService).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => {
                          setSelectedTask(item);
                        }}>View Details</Button>
                        {item.status === 'scheduled' && (
                          <Button size="sm" variant="primary" onClick={() => handleStartMaintenance(item)}>Start Maintenance</Button>
                        )}
                        {item.status === 'in-progress' && (
                          <Button size="sm" variant="primary" onClick={() => handleMarkComplete(item)}>Mark Complete</Button>
                        )}
                        {item.status === 'overdue' && (
                          <Button size="sm" variant="danger" onClick={() => setIsScheduleDialogOpen(true)}>Reschedule</Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Schedule Maintenance Dialog */}
      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Maintenance</DialogTitle>
            <DialogDescription>Schedule a maintenance task for your equipment.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleScheduleMaintenance}>
            <DialogBody className="space-y-4">
              <Select
                label="Equipment"
                options={[
                  { value: 'cat-320', label: 'Excavator CAT-320' },
                  { value: 'd6t', label: 'Bulldozer D6T' },
                  { value: 'crane', label: 'Crane TC-5613' },
                  { value: 'loader', label: 'Loader 950M' }
                ]}
                required
              />
              <Select
                label="Maintenance Type"
                options={[
                  { value: 'routine', label: 'Routine Service' },
                  { value: 'inspection', label: 'Safety Inspection' },
                  { value: 'oil-change', label: 'Oil Change' },
                  { value: 'tire', label: 'Tire Replacement' },
                  { value: 'brake', label: 'Brake System Check' },
                  { value: 'other', label: 'Other' }
                ]}
                required
              />
              <Select
                label="Priority"
                options={[
                  { value: 'low', label: 'Low' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'high', label: 'High' }
                ]}
                required
              />
              <Input label="Due Date" type="date" required />
              <Input label="Estimated Hours" type="number" placeholder="e.g., 4" required />
              <Select
                label="Assign To"
                options={[
                  { value: 'team-a', label: 'Service Team A' },
                  { value: 'team-b', label: 'Service Team B' },
                  { value: 'inspector', label: 'Inspector Davis' }
                ]}
                required
              />
              <Textarea label="Notes" placeholder="Additional details about the maintenance task..." rows={3} />
            </DialogBody>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Schedule</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
