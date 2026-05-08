import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Plus, Phone, Mail, MapPin, Briefcase } from 'lucide-react';
import { Card, CardBody } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter } from '../ui/Dialog';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { toast } from 'sonner';

const crewMembers = [
  {
    id: 1,
    name: 'Mike Johnson',
    role: 'Heavy Equipment Operator',
    phone: '+1 (555) 123-4567',
    email: 'mike.johnson@equiptrack.com',
    currentSite: 'Downtown Plaza',
    currentEquipment: 'Excavator CAT-320',
    status: 'active',
    certifications: ['Excavator', 'Loader', 'Safety Level 3'],
    hoursThisWeek: 38
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Crane Operator',
    phone: '+1 (555) 234-5678',
    email: 'sarah.chen@equiptrack.com',
    currentSite: 'Riverside Project',
    currentEquipment: 'Crane TC-5613',
    status: 'active',
    certifications: ['Crane', 'Rigging', 'Safety Level 4'],
    hoursThisWeek: 40
  },
  {
    id: 3,
    name: 'Tom Rodriguez',
    role: 'Truck Driver',
    phone: '+1 (555) 345-6789',
    email: 'tom.rodriguez@equiptrack.com',
    currentSite: 'Highway 101',
    currentEquipment: 'Dump Truck 773G',
    status: 'active',
    certifications: ['CDL Class A', 'Heavy Vehicle', 'Safety Level 2'],
    hoursThisWeek: 42
  },
  {
    id: 4,
    name: 'David Park',
    role: 'Equipment Operator',
    phone: '+1 (555) 456-7890',
    email: 'david.park@equiptrack.com',
    currentSite: 'East Industrial',
    currentEquipment: 'Excavator 336',
    status: 'on-break',
    certifications: ['Excavator', 'Bulldozer', 'Safety Level 3'],
    hoursThisWeek: 35
  },
  {
    id: 5,
    name: 'James Wilson',
    role: 'Bulldozer Operator',
    phone: '+1 (555) 567-8901',
    email: 'james.wilson@equiptrack.com',
    currentSite: 'West Valley',
    currentEquipment: 'Bulldozer D8T',
    status: 'active',
    certifications: ['Bulldozer', 'Grader', 'Safety Level 3'],
    hoursThisWeek: 39
  },
  {
    id: 6,
    name: 'Emily Martinez',
    role: 'Site Supervisor',
    phone: '+1 (555) 678-9012',
    email: 'emily.martinez@equiptrack.com',
    currentSite: 'Multiple Sites',
    currentEquipment: 'N/A',
    status: 'active',
    certifications: ['Site Management', 'Safety Level 5', 'OSHA 30'],
    hoursThisWeek: 45
  }
];

const statusConfig = {
  active: { variant: 'success' as const, label: 'On Duty' },
  'on-break': { variant: 'warning' as const, label: 'On Break' },
  offline: { variant: 'default' as const, label: 'Off Duty' }
};

export function CrewPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const handleAddCrewMember = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Crew member added successfully!');
    setIsAddDialogOpen(false);
  };

  const filteredCrew = crewMembers.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.currentSite.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Crew Members</h1>
            <p className="text-slate-600">Manage your construction team and assignments</p>
          </div>
          <Button size="lg" className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-5 h-5" />
            Add Crew Member
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, role, or site..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-lg border-2 border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardBody className="p-4">
            <div className="text-2xl font-bold text-slate-900">6</div>
            <div className="text-sm text-slate-600">Total Crew</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="p-4">
            <div className="text-2xl font-bold text-green-600">5</div>
            <div className="text-sm text-slate-600">On Duty</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="p-4">
            <div className="text-2xl font-bold text-orange-600">239</div>
            <div className="text-sm text-slate-600">Hours This Week</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="p-4">
            <div className="text-2xl font-bold text-blue-600">98%</div>
            <div className="text-sm text-slate-600">Attendance Rate</div>
          </CardBody>
        </Card>
      </div>

      {/* Crew Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCrew.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card hover className="h-full">
              <CardBody className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-xl">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-bold text-lg text-slate-900">{member.name}</h3>
                      <Badge variant={statusConfig[member.status as keyof typeof statusConfig].variant}>
                        {statusConfig[member.status as keyof typeof statusConfig].label}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{member.role}</p>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Briefcase className="w-3 h-3" />
                      <span>{member.hoursThisWeek}h this week</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{member.currentSite}</span>
                  </div>
                </div>

                {member.currentEquipment !== 'N/A' && (
                  <div className="bg-slate-50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-slate-500 mb-1">Currently Operating</p>
                    <p className="text-sm font-medium text-slate-900">{member.currentEquipment}</p>
                  </div>
                )}

                <div className="mb-4">
                  <p className="text-xs text-slate-500 mb-2">Certifications</p>
                  <div className="flex flex-wrap gap-1">
                    {member.certifications.map((cert) => (
                      <Badge key={cert} variant="default">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => setSelectedMember(member)}>
                    View Profile
                  </Button>
                  <Button size="sm" variant="ghost" className="flex-1" onClick={() => {
                    window.location.href = `mailto:${member.email}`;
                  }}>
                    Contact
                  </Button>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredCrew.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No crew members found matching your search</p>
        </div>
      )}

      {/* Add Crew Member Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Crew Member</DialogTitle>
            <DialogDescription>Add a new team member to your construction crew.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddCrewMember}>
            <DialogBody className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" placeholder="John" required />
                <Input label="Last Name" placeholder="Doe" required />
              </div>
              <Input label="Email" type="email" placeholder="john.doe@example.com" required />
              <Input label="Phone" type="tel" placeholder="+1 (555) 123-4567" required />
              <Select
                label="Role"
                options={[
                  { value: 'operator', label: 'Heavy Equipment Operator' },
                  { value: 'crane', label: 'Crane Operator' },
                  { value: 'driver', label: 'Truck Driver' },
                  { value: 'supervisor', label: 'Site Supervisor' },
                  { value: 'other', label: 'Other' }
                ]}
                required
              />
              <Select
                label="Current Site"
                options={[
                  { value: 'downtown', label: 'Downtown Plaza' },
                  { value: 'highway', label: 'Highway 101' },
                  { value: 'riverside', label: 'Riverside Project' },
                  { value: 'multiple', label: 'Multiple Sites' }
                ]}
                required
              />
              <Input label="Certifications (comma-separated)" placeholder="Excavator, Loader, Safety Level 3" />
            </DialogBody>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Crew Member</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
