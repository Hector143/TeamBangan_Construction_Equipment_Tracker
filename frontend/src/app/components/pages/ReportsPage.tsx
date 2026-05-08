import { useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter } from '../ui/Dialog';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import { toast } from 'sonner';
import { FileText, Download, Calendar, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const costData = [
  { month: 'Jan', maintenance: 45000, fuel: 32000, labor: 125000 },
  { month: 'Feb', maintenance: 38000, fuel: 29000, labor: 118000 },
  { month: 'Mar', maintenance: 52000, fuel: 35000, labor: 132000 },
  { month: 'Apr', maintenance: 41000, fuel: 31000, labor: 128000 },
  { month: 'May', maintenance: 48000, fuel: 33000, labor: 135000 }
];

const reports = [
  {
    id: 1,
    title: 'Monthly Equipment Usage Report',
    description: 'Comprehensive usage statistics for all equipment',
    date: '2026-05-01',
    type: 'Usage',
    size: '2.4 MB'
  },
  {
    id: 2,
    title: 'Maintenance Cost Analysis Q1 2026',
    description: 'Quarterly breakdown of maintenance expenses',
    date: '2026-04-30',
    type: 'Financial',
    size: '1.8 MB'
  },
  {
    id: 3,
    title: 'Safety Compliance Report',
    description: 'Safety inspections and compliance status',
    date: '2026-04-28',
    type: 'Safety',
    size: '3.1 MB'
  },
  {
    id: 4,
    title: 'Crew Performance Metrics',
    description: 'Productivity and efficiency analysis',
    date: '2026-04-25',
    type: 'Performance',
    size: '1.5 MB'
  },
  {
    id: 5,
    title: 'Site Progress Dashboard',
    description: 'Project timelines and completion rates',
    date: '2026-04-20',
    type: 'Progress',
    size: '2.9 MB'
  }
];

export function ReportsPage() {
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);

  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Report generation started! You will be notified when it\'s ready.');
    setIsGenerateDialogOpen(false);
  };

  const handleDownload = (reportTitle: string) => {
    toast.success(`Downloading ${reportTitle}...`);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Reports & Analytics</h1>
            <p className="text-slate-600">Comprehensive insights and performance metrics</p>
          </div>
          <Button size="lg" className="gap-2" onClick={() => setIsGenerateDialogOpen(true)}>
            <FileText className="w-5 h-5" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Cost Analysis Chart */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Cost Analysis Overview</CardTitle>
                <p className="text-sm text-slate-600 mt-1">Monthly breakdown by category</p>
              </div>
              <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.success('Exporting chart data...')}>
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                />
                <Bar dataKey="maintenance" fill="#f97316" radius={[4, 4, 0, 0]} />
                <Bar dataKey="fuel" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="labor" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                <span className="text-sm text-slate-600">Maintenance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-sm text-slate-600">Fuel</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-sm text-slate-600">Labor</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Revenue', value: '$4.2M', change: '+12.5%', positive: true },
          { label: 'Operating Costs', value: '$2.1M', change: '-3.2%', positive: true },
          { label: 'Equipment ROI', value: '185%', change: '+8.1%', positive: true },
          { label: 'Utilization Rate', value: '76%', change: '+4.3%', positive: true }
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardBody className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <TrendingUp className={`w-5 h-5 ${metric.positive ? 'text-green-500' : 'text-red-500'}`} />
                  <span className={`text-sm font-medium ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</div>
                <div className="text-sm text-slate-600">{metric.label}</div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <p className="text-sm text-slate-600 mt-1">Access and download generated reports</p>
        </CardHeader>
        <CardBody className="p-0">
          <div className="divide-y divide-slate-100">
            {reports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="px-6 py-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <FileText className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-slate-900 mb-1">{report.title}</h4>
                    <p className="text-sm text-slate-600 mb-2">{report.description}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(report.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}</span>
                      </div>
                      <span>•</span>
                      <span>{report.type}</span>
                      <span>•</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-2" onClick={() => handleDownload(report.title)}>
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => toast.info('Report viewer coming soon')}>
                      View
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Generate Report Dialog */}
      <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate New Report</DialogTitle>
            <DialogDescription>Create a custom report based on your selected parameters.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleGenerateReport}>
            <DialogBody className="space-y-4">
              <Select
                label="Report Type"
                options={[
                  { value: 'usage', label: 'Equipment Usage Report' },
                  { value: 'financial', label: 'Financial Analysis' },
                  { value: 'safety', label: 'Safety Compliance' },
                  { value: 'performance', label: 'Performance Metrics' },
                  { value: 'progress', label: 'Site Progress Report' }
                ]}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Start Date" type="date" required />
                <Input label="End Date" type="date" required />
              </div>
              <Select
                label="Format"
                options={[
                  { value: 'pdf', label: 'PDF Document' },
                  { value: 'excel', label: 'Excel Spreadsheet' },
                  { value: 'csv', label: 'CSV File' }
                ]}
                required
              />
              <Select
                label="Include Data For"
                options={[
                  { value: 'all', label: 'All Sites & Equipment' },
                  { value: 'site-specific', label: 'Specific Site' },
                  { value: 'equipment-type', label: 'Equipment Type' }
                ]}
                required
              />
            </DialogBody>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsGenerateDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Generate Report</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
