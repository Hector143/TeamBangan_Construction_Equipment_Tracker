import { useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { toast } from 'sonner';
import * as Tabs from '@radix-ui/react-tabs';
import * as Switch from '@radix-ui/react-switch';
import { Bell, Lock, User, Building2, Palette, Database } from 'lucide-react';

export function SettingsPage() {
  const [selectedTheme, setSelectedTheme] = useState('Light');
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Settings</h1>
        <p className="text-slate-600">Manage your account and application preferences</p>
      </div>

      <Tabs.Root defaultValue="profile">
        <Tabs.List className="flex gap-2 mb-6 border-b border-slate-200">
          {[
            { value: 'profile', label: 'Profile', icon: User },
            { value: 'company', label: 'Company', icon: Building2 },
            { value: 'notifications', label: 'Notifications', icon: Bell },
            { value: 'security', label: 'Security', icon: Lock },
            { value: 'appearance', label: 'Appearance', icon: Palette },
            { value: 'data', label: 'Data', icon: Database }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <Tabs.Trigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:text-orange-600 transition-all"
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>

        {/* Profile Tab */}
        <Tabs.Content value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-2xl">
                  JD
                </div>
                <div>
                  <Button variant="outline" size="sm" onClick={() => toast.info('Photo upload coming soon')}>Change Photo</Button>
                  <p className="text-xs text-slate-500 mt-2">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" defaultValue="John" />
                <Input label="Last Name" defaultValue="Doe" />
              </div>
              <Input label="Email Address" type="email" defaultValue="john.doe@equiptrack.com" />
              <Input label="Phone Number" type="tel" defaultValue="+1 (555) 123-4567" />
              <Input label="Job Title" defaultValue="Site Manager" />
              <div className="pt-4">
                <Button onClick={() => toast.success('Profile updated successfully!')}>Save Changes</Button>
              </div>
            </CardBody>
          </Card>
        </Tabs.Content>

        {/* Company Tab */}
        <Tabs.Content value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Details</CardTitle>
            </CardHeader>
            <CardBody className="space-y-4">
              <Input label="Company Name" defaultValue="EquipTrack Pro" />
              <Input label="Business Registration Number" defaultValue="REG-2024-12345" />
              <Input label="Address" defaultValue="123 Construction Ave" />
              <div className="grid grid-cols-3 gap-4">
                <Input label="City" defaultValue="San Francisco" />
                <Input label="State" defaultValue="CA" />
                <Input label="ZIP Code" defaultValue="94102" />
              </div>
              <Input label="Phone" defaultValue="+1 (555) 000-0000" />
              <Input label="Website" defaultValue="www.equiptrackpro.com" />
              <div className="pt-4">
                <Button onClick={() => toast.success('Company information updated!')}>Update Company Info</Button>
              </div>
            </CardBody>
          </Card>
        </Tabs.Content>

        {/* Notifications Tab */}
        <Tabs.Content value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardBody className="space-y-6">
              {[
                { id: 'equipment', label: 'Equipment Alerts', description: 'Get notified when equipment status changes', defaultChecked: true },
                { id: 'maintenance', label: 'Maintenance Reminders', description: 'Receive alerts for upcoming maintenance', defaultChecked: true },
                { id: 'crew', label: 'Crew Updates', description: 'Notifications about crew assignments and changes', defaultChecked: false },
                { id: 'reports', label: 'Report Generation', description: 'Get notified when reports are ready', defaultChecked: true },
                { id: 'safety', label: 'Safety Alerts', description: 'Critical safety and compliance notifications', defaultChecked: true }
              ].map((item) => (
                <div key={item.id} className="flex items-start justify-between py-3 border-b border-slate-100 last:border-0">
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900 mb-1">{item.label}</h4>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </div>
                  <Switch.Root
                    defaultChecked={item.defaultChecked}
                    className="w-11 h-6 bg-slate-200 rounded-full relative data-[state=checked]:bg-orange-500 transition-colors"
                  >
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                  </Switch.Root>
                </div>
              ))}
            </CardBody>
          </Card>
        </Tabs.Content>

        {/* Security Tab */}
        <Tabs.Content value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardBody className="space-y-4">
              <Input label="Current Password" type="password" />
              <Input label="New Password" type="password" />
              <Input label="Confirm New Password" type="password" />
              <div className="pt-4">
                <Button onClick={() => toast.success('Password updated successfully!')}>Update Password</Button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <p className="text-sm text-slate-600 mt-1">Add an extra layer of security to your account</p>
            </CardHeader>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="success">Enabled</Badge>
                  <p className="text-sm text-slate-600 mt-2">SMS-based authentication is active</p>
                </div>
                <Button variant="outline" onClick={() => toast.info('2FA configuration coming soon')}>Configure</Button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
            </CardHeader>
            <CardBody className="space-y-3">
              {[
                { device: 'Chrome on Windows', location: 'San Francisco, CA', current: true },
                { device: 'Safari on iPhone', location: 'San Francisco, CA', current: false },
                { device: 'Chrome on MacBook', location: 'San Francisco, CA', current: false }
              ].map((session, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                  <div>
                    <p className="font-medium text-slate-900">
                      {session.device}
                      {session.current && <Badge variant="success" className="ml-2">Current</Badge>}
                    </p>
                    <p className="text-sm text-slate-600">{session.location}</p>
                  </div>
                  {!session.current && (
                    <Button variant="outline" size="sm" onClick={() => toast.success('Session revoked')}>Revoke</Button>
                  )}
                </div>
              ))}
            </CardBody>
          </Card>
        </Tabs.Content>

        {/* Appearance Tab */}
        <Tabs.Content value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-3 gap-4">
                {['Light', 'Dark', 'Auto'].map((theme) => (
                  <button
                    key={theme}
                    onClick={() => {
                      setSelectedTheme(theme);
                      toast.success(`Theme changed to ${theme}`);
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      theme === selectedTheme
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="aspect-video bg-slate-200 rounded mb-2"></div>
                    <p className="font-medium text-sm">{theme}</p>
                  </button>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Display Preferences</CardTitle>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">Compact Mode</p>
                  <p className="text-sm text-slate-600">Show more content in less space</p>
                </div>
                <Switch.Root className="w-11 h-6 bg-slate-200 rounded-full relative data-[state=checked]:bg-orange-500 transition-colors">
                  <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                </Switch.Root>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                  <p className="font-medium text-slate-900">Show Animations</p>
                  <p className="text-sm text-slate-600">Enable smooth transitions and effects</p>
                </div>
                <Switch.Root defaultChecked className="w-11 h-6 bg-slate-200 rounded-full relative data-[state=checked]:bg-orange-500 transition-colors">
                  <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                </Switch.Root>
              </div>
            </CardBody>
          </Card>
        </Tabs.Content>

        {/* Data Tab */}
        <Tabs.Content value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <div>
                  <p className="font-medium text-slate-900">Export Data</p>
                  <p className="text-sm text-slate-600">Download all your data in CSV format</p>
                </div>
                <Button variant="outline" onClick={() => toast.success('Data export started...')}>Export</Button>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <div>
                  <p className="font-medium text-slate-900">Backup Data</p>
                  <p className="text-sm text-slate-600">Create a backup of your information</p>
                </div>
                <Button variant="outline" onClick={() => toast.success('Backup created successfully!')}>Create Backup</Button>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-red-600">Delete Account</p>
                  <p className="text-sm text-slate-600">Permanently remove your account and data</p>
                </div>
                <Button variant="danger" onClick={() => toast.error('Account deletion requires confirmation')}>Delete</Button>
              </div>
            </CardBody>
          </Card>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
