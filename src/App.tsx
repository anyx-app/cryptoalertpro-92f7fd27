import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Dashboard />} />
        <Route path="alerts" element={<div className="text-white text-2xl p-10">Alerts Page (Coming Soon)</div>} />
        <Route path="market" element={<div className="text-white text-2xl p-10">Market Page (Coming Soon)</div>} />
        <Route path="settings" element={<div className="text-white text-2xl p-10">Settings Page (Coming Soon)</div>} />
        <Route path="*" element={<div className="text-white p-10">404 - Not Found</div>} />
      </Route>
    </Routes>
  );
}
