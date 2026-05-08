import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Users, Truck, Calendar, AlertCircle, Plus } from 'lucide-react';
import { Card, CardBody, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter } from '../ui/Dialog';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { toast } from 'sonner';

const sites = [
  {
    id: 1,
    name: 'Downtown Plaza',
    address: '123 Main Street, Downtown',
    status: 'active',
    startDate: '2026-03-01',
    expectedCompletion: '2026-08-15',
    progress: 65,
    equipment: 12,
    crew: 8,
    supervisor: 'Emily Martinez',
    type: 'Commercial',
    budget: '$2.4M'
  },
  {
    id: 2,
    name: 'Highway 101 Expansion',
    address: 'Highway 101, Mile Marker 45',
    status: 'active',
    startDate: '2026-02-15',
    expectedCompletion: '2026-09-30',
    progress: 42,
    equipment: 18,
    crew: 15,
    supervisor: 'Robert Chang',
    type: 'Infrastructure',
    budget: '$5.8M'
  },
  {
    id: 3,
    name: 'Riverside Project',
    address: '456 River Road, Riverside',
    status: 'active',
    startDate: '2026-04-01',
    expectedCompletion: '2026-10-15',
    progress: 28,
    equipment: 8,
    crew: 6,
    supervisor: 'Jessica Lee',
    type: 'Residential',
    budget: '$1.9M'
  },
  {
    id: 4,
    name: 'East Industrial Complex',
    address: '789 Industrial Blvd, East Zone',
    status: 'planning',
    startDate: '2026-06-01',
    expectedCompletion: '2027-02-28',
    progress: 5,
    equipment: 0,
    crew: 2,
    supervisor: 'Michael Brown',
    type: 'Industrial',
    budget: '$8.2M'
  },
  {
    id: 5,
    name: 'West Valley Development',
    address: 'West Valley Road, Plot 12',
    status: 'active',
    startDate: '2026-01-10',
    expectedCompletion: '2026-07-20',
    progress: 78,
    equipment: 6,
    crew: 5,
    supervisor: 'David Martinez',
    type: 'Mixed-Use',
    budget: '$3.5M'
  },
  {
    id: 6,
    name: 'North Site Renovation',
    address: '321 North Avenue, Building C',
    status: 'on-hold',
    startDate: '2026-03-15',
    expectedCompletion: '2026-06-30',
    progress: 45,
    equipment: 3,
    crew: 0,
    supervisor: 'Sarah Thompson',
    type: 'Renovation',
    budget: '$1.2M'
  }
];

const statusConfig = {
  active: { variant: 'success' as const, label: 'Active', color: 'bg-green-500' },
  planning: { variant: 'info' as const, label: 'Planning', color: 'bg-blue-500' },
  'on-hold': { variant: 'warning' as const, label: 'On Hold', color: 'bg-yellow-500' },
  completed: { variant: 'default' as const, label: 'Completed', color: 'bg-slate-500' }
};

export function SitesPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddSite = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Construction site added successfully!');
    setIsAddDialogOpen(false);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Construction Sites</h1>
            <p className="text-slate-600">Overview of all active and planned construction sites</p>
          </div>
          <Button size="lg" className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-5 h-5" />
            Add New Site
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardBody className="p-4">
              <div className="text-2xl font-bold text-slate-900">6</div>
              <div className="text-sm text-slate-600">Total Sites</div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-4">
              <div className="text-2xl font-bold text-green-600">4</div>
              <div className="text-sm text-slate-600">Active</div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-4">
              <div className="text-2xl font-bold text-blue-600">1</div>
              <div className="text-sm text-slate-600">Planning</div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-4">
              <div className="text-2xl font-bold text-orange-600">$23M</div>
              <div className="text-sm text-slate-600">Total Budget</div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Sites Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sites.map((site, index) => (
          <motion.div
            key={site.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover className="h-full">
              <CardHeader className="bg-gradient-to-br from-slate-50 to-white">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="mb-2">{site.name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span>{site.address}</span>
                    </div>
                  </div>
                  <Badge variant={statusConfig[site.status as keyof typeof statusConfig].variant}>
                    {statusConfig[site.status as keyof typeof statusConfig].label}
                  </Badge>
                </div>
              </CardHeader>

              <CardBody className="p-6">
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Progress</span>
                    <span className="text-sm font-bold text-slate-900">{site.progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${site.progress}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      className={`h-full ${statusConfig[site.status as keyof typeof statusConfig].color}`}
                    />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Truck className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Equipment</p>
                      <p className="text-sm font-bold text-slate-900">{site.equipment}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Crew</p>
                      <p className="text-sm font-bold text-slate-900">{site.crew}</p>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Type</span>
                    <span className="font-medium text-slate-900">{site.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Budget</span>
                    <span className="font-medium text-slate-900">{site.budget}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Supervisor</span>
                    <span className="font-medium text-slate-900">{site.supervisor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Start Date</span>
                    <span className="font-medium text-slate-900">
                      {new Date(site.startDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Expected Completion</span>
                    <span className="font-medium text-slate-900">
                      {new Date(site.expectedCompletion).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-slate-100">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => toast.info('Site details view coming soon')}>
                    View Details
                  </Button>
                  <Button size="sm" variant="ghost" className="flex-1" onClick={() => toast.info('Site management coming soon')}>
                    Manage
                  </Button>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add Site Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Construction Site</DialogTitle>
            <DialogDescription>Register a new construction site in your system.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddSite}>
            <DialogBody className="space-y-4">
              <Input label="Site Name" placeholder="e.g., Downtown Plaza" required />
              <Input label="Address" placeholder="123 Main Street" required />
              <div className="grid grid-cols-3 gap-4">
                <Input label="City" placeholder="San Francisco" required />
                <Input label="State" placeholder="CA" required />
                <Input label="ZIP" placeholder="94102" required />
              </div>
              <Select
                label="Site Type"
                options={[
                  { value: 'commercial', label: 'Commercial' },
                  { value: 'residential', label: 'Residential' },
                  { value: 'industrial', label: 'Industrial' },
                  { value: 'infrastructure', label: 'Infrastructure' },
                  { value: 'mixed', label: 'Mixed-Use' }
                ]}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Start Date" type="date" required />
                <Input label="Expected Completion" type="date" required />
              </div>
              <Input label="Budget" placeholder="$2,400,000" required />
              <Select
                label="Site Supervisor"
                options={[
                  { value: 'martinez', label: 'Emily Martinez' },
                  { value: 'chang', label: 'Robert Chang' },
                  { value: 'lee', label: 'Jessica Lee' },
                  { value: 'brown', label: 'Michael Brown' }
                ]}
                required
              />
              <Textarea label="Description" placeholder="Project details and notes..." rows={3} />
            </DialogBody>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Site</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
