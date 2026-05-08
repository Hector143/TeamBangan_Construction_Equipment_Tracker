import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Plus, MapPin, Calendar, Activity as ActivityIcon } from 'lucide-react';
import { Card, CardBody } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter } from '../ui/Dialog';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { toast } from 'sonner';
import * as Tabs from '@radix-ui/react-tabs';

const equipment = [
  {
    id: 1,
    name: 'Excavator CAT-320',
    type: 'Excavator',
    model: 'CAT 320',
    status: 'active',
    location: 'Downtown Plaza',
    lastMaintenance: '2026-04-15',
    nextMaintenance: '2026-07-15',
    hoursUsed: 1247,
    operator: 'Mike Johnson'
  },
  {
    id: 2,
    name: 'Bulldozer D6T',
    type: 'Bulldozer',
    model: 'CAT D6T',
    status: 'maintenance',
    location: 'Central Depot',
    lastMaintenance: '2026-05-01',
    nextMaintenance: '2026-05-15',
    hoursUsed: 3421,
    operator: 'N/A'
  },
  {
    id: 3,
    name: 'Crane TC-5613',
    type: 'Crane',
    model: 'Terex TC-5613',
    status: 'active',
    location: 'Riverside Project',
    lastMaintenance: '2026-03-20',
    nextMaintenance: '2026-06-20',
    hoursUsed: 892,
    operator: 'Sarah Chen'
  },
  {
    id: 4,
    name: 'Loader 950M',
    type: 'Loader',
    model: 'CAT 950M',
    status: 'idle',
    location: 'North Site',
    lastMaintenance: '2026-04-10',
    nextMaintenance: '2026-07-10',
    hoursUsed: 2103,
    operator: 'N/A'
  },
  {
    id: 5,
    name: 'Dump Truck 773G',
    type: 'Dump Truck',
    model: 'CAT 773G',
    status: 'active',
    location: 'Highway 101',
    lastMaintenance: '2026-04-25',
    nextMaintenance: '2026-07-25',
    hoursUsed: 1856,
    operator: 'Tom Rodriguez'
  },
  {
    id: 6,
    name: 'Excavator 336',
    type: 'Excavator',
    model: 'CAT 336',
    status: 'warning',
    location: 'East Industrial',
    lastMaintenance: '2026-02-14',
    nextMaintenance: '2026-05-10',
    hoursUsed: 4201,
    operator: 'David Park'
  }
];

const statusConfig = {
  active: { variant: 'success' as const, label: 'Active' },
  idle: { variant: 'default' as const, label: 'Idle' },
  maintenance: { variant: 'warning' as const, label: 'Maintenance' },
  warning: { variant: 'danger' as const, label: 'Needs Service' }
};

export function EquipmentPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleAddEquipment = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Equipment added successfully!');
    setIsAddDialogOpen(false);
  };

  const handleViewDetails = (item: any) => {
    setSelectedEquipment(item);
    setIsDetailsDialogOpen(true);
  };

  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || item.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Equipment Management</h1>
            <p className="text-slate-600">Track and manage all construction equipment</p>
          </div>
          <Button size="lg" className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-5 h-5" />
            Add Equipment
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search equipment by name or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-lg border-2 border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
            />
          </div>
          <Button variant="outline" size="lg" className="gap-2" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <Filter className="w-5 h-5" />
            Filters
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List className="flex gap-2 mb-6 border-b border-slate-200">
          {[
            { value: 'all', label: 'All Equipment', count: equipment.length },
            { value: 'active', label: 'Active', count: equipment.filter(e => e.status === 'active').length },
            { value: 'idle', label: 'Idle', count: equipment.filter(e => e.status === 'idle').length },
            { value: 'maintenance', label: 'Maintenance', count: equipment.filter(e => e.status === 'maintenance').length },
            { value: 'warning', label: 'Needs Service', count: equipment.filter(e => e.status === 'warning').length }
          ].map((tab) => (
            <Tabs.Trigger
              key={tab.value}
              value={tab.value}
              className="px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:text-orange-600 transition-all"
            >
              {tab.label} ({tab.count})
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEquipment.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card hover className="h-full">
                    <CardBody className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-slate-900 mb-1">{item.name}</h3>
                          <p className="text-sm text-slate-600">{item.model}</p>
                        </div>
                        <Badge variant={statusConfig[item.status as keyof typeof statusConfig].variant}>
                          {statusConfig[item.status as keyof typeof statusConfig].label}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span>{item.location}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <ActivityIcon className="w-4 h-4 text-slate-400" />
                          <span>{item.hoursUsed.toLocaleString()} hours used</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span>Next service: {new Date(item.nextMaintenance).toLocaleDateString()}</span>
                        </div>

                        {item.operator !== 'N/A' && (
                          <div className="pt-3 border-t border-slate-100">
                            <p className="text-xs text-slate-500 mb-1">Current Operator</p>
                            <p className="text-sm font-medium text-slate-900">{item.operator}</p>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewDetails(item)}>
                          View Details
                        </Button>
                        <Button variant="ghost" size="sm" className="flex-1" onClick={() => toast.info('Edit functionality coming soon')}>
                          Edit
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredEquipment.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-500">No equipment found matching your criteria</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </Tabs.Root>

      {/* Add Equipment Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Equipment</DialogTitle>
            <DialogDescription>Enter the details of the new equipment to add to your inventory.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddEquipment}>
            <DialogBody className="space-y-4">
              <Input label="Equipment Name" placeholder="e.g., Excavator CAT-320" required />
              <Select
                label="Equipment Type"
                options={[
                  { value: 'excavator', label: 'Excavator' },
                  { value: 'bulldozer', label: 'Bulldozer' },
                  { value: 'crane', label: 'Crane' },
                  { value: 'loader', label: 'Loader' },
                  { value: 'dump-truck', label: 'Dump Truck' },
                  { value: 'other', label: 'Other' }
                ]}
                required
              />
              <Input label="Model" placeholder="e.g., CAT 320" required />
              <Select
                label="Current Location"
                options={[
                  { value: 'downtown', label: 'Downtown Plaza' },
                  { value: 'highway', label: 'Highway 101' },
                  { value: 'riverside', label: 'Riverside Project' },
                  { value: 'depot', label: 'Central Depot' }
                ]}
                required
              />
              <Input label="Serial Number" placeholder="SN-123456" />
              <Input label="Purchase Date" type="date" />
              <Textarea label="Notes" placeholder="Additional information..." rows={3} />
            </DialogBody>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Equipment</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Equipment Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent>
          {selectedEquipment && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedEquipment.name}</DialogTitle>
                <DialogDescription>{selectedEquipment.model}</DialogDescription>
              </DialogHeader>
              <DialogBody className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Status</p>
                    <Badge variant={statusConfig[selectedEquipment.status as keyof typeof statusConfig].variant}>
                      {statusConfig[selectedEquipment.status as keyof typeof statusConfig].label}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Type</p>
                    <p className="text-sm font-medium text-slate-900">{selectedEquipment.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Location</p>
                    <p className="text-sm font-medium text-slate-900">{selectedEquipment.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Hours Used</p>
                    <p className="text-sm font-medium text-slate-900">{selectedEquipment.hoursUsed.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Last Maintenance</p>
                    <p className="text-sm font-medium text-slate-900">
                      {new Date(selectedEquipment.lastMaintenance).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Next Maintenance</p>
                    <p className="text-sm font-medium text-slate-900">
                      {new Date(selectedEquipment.nextMaintenance).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {selectedEquipment.operator !== 'N/A' && (
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-sm text-slate-500 mb-1">Current Operator</p>
                    <p className="font-medium text-slate-900">{selectedEquipment.operator}</p>
                  </div>
                )}
              </DialogBody>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => {
                  setIsDetailsDialogOpen(false);
                  toast.info('Check-out functionality coming soon');
                }}>
                  Check Out Equipment
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-8 z-40 bg-white rounded-xl shadow-2xl border border-slate-200 p-6 w-80"
          >
            <h3 className="font-bold text-lg text-slate-900 mb-4">Filters</h3>
            <div className="space-y-4">
              <Select
                label="Equipment Type"
                options={[
                  { value: 'all', label: 'All Types' },
                  { value: 'excavator', label: 'Excavators' },
                  { value: 'bulldozer', label: 'Bulldozers' },
                  { value: 'crane', label: 'Cranes' },
                  { value: 'loader', label: 'Loaders' }
                ]}
              />
              <Select
                label="Location"
                options={[
                  { value: 'all', label: 'All Locations' },
                  { value: 'downtown', label: 'Downtown Plaza' },
                  { value: 'highway', label: 'Highway 101' },
                  { value: 'riverside', label: 'Riverside Project' }
                ]}
              />
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => setIsFilterOpen(false)}>
                  Cancel
                </Button>
                <Button size="sm" className="flex-1" onClick={() => {
                  toast.success('Filters applied');
                  setIsFilterOpen(false);
                }}>
                  Apply
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
