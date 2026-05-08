import { Link, useLocation, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  Truck,
  FileText,
  Wrench,
  Users,
  MapPin,
  BarChart3,
  Settings,
  HardHat,
  LogOut
} from 'lucide-react';
import { clsx } from 'clsx';
import { toast } from 'sonner';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Truck, label: 'Equipment', path: '/equipment' },
  { icon: FileText, label: 'Activity Logs', path: '/logs' },
  { icon: Wrench, label: 'Maintenance', path: '/maintenance' },
  { icon: Users, label: 'Crew Members', path: '/crew' },
  { icon: MapPin, label: 'Sites', path: '/sites' },
  { icon: BarChart3, label: 'Reports', path: '/reports' },
  { icon: Settings, label: 'Settings', path: '/settings' }
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-lg">
            <HardHat className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg">EquipTrack Pro</h1>
            <p className="text-xs text-slate-400">Construction Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={clsx(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer relative',
                    isActive
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className="w-5 h-5 relative z-10" />
                  <span className="font-medium relative z-10">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800 mb-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center font-bold">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">John Doe</p>
            <p className="text-xs text-slate-400 truncate">Site Manager</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Sign Out</span>
        </motion.button>
      </div>
    </div>
  );
}
