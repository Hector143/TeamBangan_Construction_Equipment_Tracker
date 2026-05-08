import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Plus, MapPin, Activity as ActivityIcon } from 'lucide-react';
import { Card, CardBody } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter } from '../ui/Dialog';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { toast } from 'sonner';
import * as Tabs from '@radix-ui/react-tabs';

type Equipment = {
  id: number;
  equipmentName: string;
  assetId: string;
  type: string;
  status: string;
  siteId: number | null;
};

const statusConfig: Record<string, { variant: any; label: string }> = {
  AVAILABLE: { variant: 'success', label: 'Available' },
  ON_SITE: { variant: 'info', label: 'On Site' },
  MAINTENANCE: { variant: 'warning', label: 'Maintenance' },
  AVAILABLE__DEFAULT: { variant: 'success', label: 'Available' }
};

const statusToBadge = (status: string) => {
  const key = (status || '').toUpperCase();
  return statusConfig[key] ?? statusConfig.AVAILABLE__DEFAULT;
};

export function EquipmentPage() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/equipment');
        if (!res.ok) throw new Error(`Failed to load equipment (${res.status})`);
        const data = (await res.json()) as any[];

        // Backend uses camelCase getters for JSON (equipmentName, assetId, siteId)
        // but we defensively normalize a bit.
        const normalized: Equipment[] = data.map((d) => ({
          id: d.id,
          equipmentName: d.equipmentName ?? d.name ?? '',
          assetId: d.assetId ?? d.asset_id ?? '',
          type: d.type ?? '',
          status: d.status ?? '',
          siteId: d.siteId ?? d.site_id ?? null
        }));

        if (alive) setEquipment(normalized);
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

  const filteredEquipment = useMemo(() => {
    return equipment.filter((item) => {
      const matchesSearch =
        item.equipmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.assetId.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTab =
        activeTab === 'all' || item.status.toUpperCase() === String(activeTab).toUpperCase();

      return matchesSearch && matchesTab;
    });
  }, [equipment, searchQuery, activeTab]);

  const handleAddEquipment = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Add equipment UI not wired yet.');
    setIsAddDialogOpen(false);
  };

  const handleViewDetails = (item: Equipment) => {
    setSelectedEquipment(item);
    setIsDetailsDialogOpen(true);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Equipment Management</h1>
            <p className="text-slate-600">Track and manage construction equipment inventory</p>
          </div>
          <Button size="lg" className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-5 h-5" />
            Add Equipment
          </Button>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, type, or asset ID..."
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

      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List className="flex gap-2 mb-6 border-b border-slate-200">
          {[
            { value: 'all', label: 'All Equipment', count: equipment.length },
            { value: 'AVAILABLE', label: 'Available', count: equipment.filter((e) => (e.status || '').toUpperCase() === 'AVAILABLE').length },
            { value: 'ON_SITE', label: 'On Site', count: equipment.filter((e) => (e.status || '').toUpperCase() === 'ON_SITE').length },
            { value: 'MAINTENANCE', label: 'Maintenance', count: equipment.filter((e) => (e.status || '').toUpperCase() === 'MAINTENANCE').length }
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

        {loading ? (
          <div className="py-12 text-center text-slate-600">Loading equipment...</div>
        ) : error ? (
          <div className="py-12 text-center text-red-600">{error}</div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEquipment.map((item, index) => {
                  const badge = statusToBadge(item.status);

                  return (
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
                              <h3 className="font-bold text-lg text-slate-900 mb-1">{item.equipmentName}</h3>
                              <p className="text-sm text-slate-600">Asset ID: {item.assetId}</p>
                            </div>
                            <Badge variant={badge.variant}>{badge.label}</Badge>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <MapPin className="w-4 h-4 text-slate-400" />
                              <span>{item.siteId ? `Site #${item.siteId}` : 'No site assigned'}</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <ActivityIcon className="w-4 h-4 text-slate-400" />
                              <span>Type: {item.type}</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <span className="text-slate-500">Status:</span>
                              <span className="font-medium">{item.status}</span>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewDetails(item)}>
                              View Details
                            </Button>
                            <Button variant="ghost" size="sm" className="flex-1" onClick={() => toast.info('Edit coming soon')}>
                              Edit
                            </Button>
                          </div>
                        </CardBody>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {filteredEquipment.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-500">No equipment found matching your criteria</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </Tabs.Root>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Equipment</DialogTitle>
            <DialogDescription>Enter the details of the new equipment to add to your inventory.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddEquipment}>
            <DialogBody className="space-y-4">
              <Input label="Equipment Name" placeholder="e.g., Caterpillar 320" required />
              <Input label="Asset ID" placeholder="e.g., CAT-001" required />
              <Select
                label="Equipment Type"
                options={[
                  { value: 'Excavator', label: 'Excavator' },
                  { value: 'Crane', label: 'Crane' },
                  { value: 'Bulldozer', label: 'Bulldozer' },
                  { value: 'Loader', label: 'Loader' },
                  { value: 'Dump Truck', label: 'Dump Truck' }
                ]}
                required
              />
              <Select
                label="Status"
                options={[
                  { value: 'AVAILABLE', label: 'AVAILABLE' },
                  { value: 'ON_SITE', label: 'ON_SITE' },
                  { value: 'MAINTENANCE', label: 'MAINTENANCE' }
                ]}
                required
              />
              <Input label="Site ID (optional)" placeholder="e.g., 1" />
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

      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent>
          {selectedEquipment && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedEquipment.equipmentName}</DialogTitle>
                <DialogDescription>Asset ID: {selectedEquipment.assetId}</DialogDescription>
              </DialogHeader>
              <DialogBody className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Status</p>
                    <Badge variant={statusToBadge(selectedEquipment.status).variant}>
                      {statusToBadge(selectedEquipment.status).label}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Type</p>
                    <p className="text-sm font-medium text-slate-900">{selectedEquipment.type}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-slate-500 mb-1">Site</p>
                    <p className="text-sm font-medium text-slate-900">
                      {selectedEquipment.siteId ? `Site #${selectedEquipment.siteId}` : 'No site assigned'}
                    </p>
                  </div>
                </div>
              </DialogBody>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setIsDetailsDialogOpen(false);
                    toast.info('Check-out functionality coming soon');
                  }}
                >
                  Check Out Equipment
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

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
                label="Equipment Status"
                options={[
                  { value: 'all', label: 'All Statuses' },
                  { value: 'AVAILABLE', label: 'AVAILABLE' },
                  { value: 'ON_SITE', label: 'ON_SITE' },
                  { value: 'MAINTENANCE', label: 'MAINTENANCE' }
                ]}
              />
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => setIsFilterOpen(false)}>
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    toast.success('Filters applied');
                    setIsFilterOpen(false);
                  }}
                >
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

