import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Toaster } from 'sonner';
import { LoginPage } from './components/LoginPage';
import { DashboardLayout } from './components/DashboardLayout';
import { DashboardPage } from './components/pages/DashboardPage';
import { EquipmentPage } from './components/pages/EquipmentPage';
import { LogsPage } from './components/pages/LogsPage';
import { MaintenancePage } from './components/pages/MaintenancePage';
import { CrewPage } from './components/pages/CrewPage';
import { SitesPage } from './components/pages/SitesPage';
import { ReportsPage } from './components/pages/ReportsPage';
import { SettingsPage } from './components/pages/SettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <DashboardPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/equipment"
          element={
            <DashboardLayout>
              <EquipmentPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/logs"
          element={
            <DashboardLayout>
              <LogsPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/maintenance"
          element={
            <DashboardLayout>
              <MaintenancePage />
            </DashboardLayout>
          }
        />
        <Route
          path="/crew"
          element={
            <DashboardLayout>
              <CrewPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/sites"
          element={
            <DashboardLayout>
              <SitesPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/reports"
          element={
            <DashboardLayout>
              <ReportsPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <DashboardLayout>
              <SettingsPage />
            </DashboardLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
