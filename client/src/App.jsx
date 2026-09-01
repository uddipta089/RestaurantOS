import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import POS from './pages/POS';
import KDS from './pages/KDS';
import Tables from './pages/Tables';
import MenuManager from './pages/MenuManager';
import Inventory from './pages/Inventory';
import Employees from './pages/Employees';
import Customers from './pages/Customers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Dashboard Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pos" element={<POS />} />
          <Route path="/kds" element={<KDS />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/menu" element={<MenuManager />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/customers" element={<Customers />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
