import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Users, Truck, Plus } from 'lucide-react';
import { Card, CardBody, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter } from '../ui/Dialog';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { toast } from 'sonner';

type Site = {
  id: number;
  siteName: string;
  location: string;
  latitude: number;
  longitude: number;
  siteManager: string | null;
  status: string | null;
};

const statusConfig: Record<string, { variant: any; label: string; color?: string }> = {
  ACTIVE: { variant: 'success', label: 'Active' },
  COMPLETED: { variant: 'default', label: 'Completed' },
  ON_HOLD: { variant: 'warning', label: 'On Hold' },
};

const normalizeStatus = (s: string | null | undefined) => (s ? String(s).toUpperCase() : '');
const getStatusBadge = (status: string | null | undefined) => {
  const key = normalizeStatus(status);
  return statusConfig[key] ?? { variant: 'default', label: status ? status : 'Unknown' };
};

export function SitesPage() {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/sites');
        if (!res.ok) throw new Error(`Failed to load sites (${res.status})`);
        const data = (await res.json()) as any[];

        const normalized: Site[] = data.map((d) => ({
          id: d.id,
          siteName: d.siteName ?? d.site_name ?? '',
          location: d.location ?? '',
          latitude: Number(d.latitude),
          longitude: Number(d.longitude),
          siteManager: d.siteManager ?? d.site_manager ?? null,
          status: d.status ?? null,
        }));

        if (alive) setSites(normalized);
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

  const totalSites = sites.length;
  const activeCount = useMemo(
    () => sites.filter((s) => normalizeStatus(s.status) === 'ACTIVE').length,
    [sites]
  );

  const handleAddSite = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Add Site UI not wired yet.');
    setIsAddDialogOpen(false);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Construction Sites</h1>
            <p className="text-slate-600">Overview of all sites from the database</p>
          </div>
          <Button size="lg" className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-5 h-5" />
            Add New Site
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardBody className="p-4">
              <div className="text-2xl font-bold text-slate-900">{totalSites}</div>
              <div className="text-sm text-slate-600">Total Sites</div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-4">
              <div className="text-2xl font-bold text-green-600">{activeCount}</div>
              <div className="text-sm text-slate-600">Active</div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-4">
              <div className="text-2xl font-bold text-blue-600">{sites.filter((s) => normalizeStatus(s.status) === 'COMPLETED').length}</div>
              <div className="text-sm text-slate-600">Completed</div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-4">
              <div className="text-2xl font-bold text-orange-600">{sites.filter((s) => normalizeStatus(s.status) === 'ON_HOLD').length}</div>
              <div className="text-sm text-slate-600">On Hold</div>
            </CardBody>
          </Card>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-600">Loading sites...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sites.map((site, index) => {
            const badge = getStatusBadge(site.status);

            return (
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
                        <CardTitle className="mb-2">{site.siteName}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <MapPin className="w-4 h-4" />
                          <span>{site.location}</span>
                        </div>
                      </div>
                      <Badge variant={badge.variant}>{badge.label}</Badge>
                    </div>
                  </CardHeader>

                  <CardBody className="p-6">
                    <div className="mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Truck className="w-4 h-4 text-orange-600" />
                        <span>Latitude: {site.latitude}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 mt-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span>Longitude: {site.longitude}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Site Manager</span>
                        <span className="font-medium text-slate-900">{site.siteManager ?? 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Status</span>
                        <span className="font-medium text-slate-900">{site.status ?? 'N/A'}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-slate-100">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => toast.info('Site details view coming soon')}
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="flex-1"
                        onClick={() => toast.info('Site management coming soon')}
                      >
                        Manage
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Construction Site</DialogTitle>
            <DialogDescription>Register a new construction site in your system.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddSite}>
            <DialogBody className="space-y-4">
              <Input label="Site Name" placeholder="e.g., Downtown Plaza" required />
              <Input label="Location" placeholder="Physical address" required />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Latitude" placeholder="e.g., 7.0707" required />
                <Input label="Longitude" placeholder="e.g., 125.6087" required />
              </div>
              <Input label="Site Manager" placeholder="e.g., Hector Salera" />
              <Input label="Status" placeholder="ACTIVE | COMPLETED | ON_HOLD" />
              <Textarea label="Notes" placeholder="(UI placeholder; not stored in DB schema yet)" rows={3} />
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

