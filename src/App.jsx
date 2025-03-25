import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './utils/auth';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Staff from './components/dashboard/Staff';
import Admin from './components/dashboard/Admin';
import SupplierStocks from './components/dashboard/SupplierStocks';
import Production from './components/dashboard/Production';
import AdminReports from './components/dashboard/AdminReports';

export default function App() {
  const [isAuth, setIsAuth] = useState(isAuthenticated());
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('aesl-auth-token');
    if(token) {
      const role = token.includes('admin') ? 'admin' : 'staff';
      setUserRole(role);
      setIsAuth(true);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route 
        path="/login" 
        element={isAuth ? 
          <Navigate to={userRole === 'admin' ? '/admin' : '/staff'} /> : 
          <Login setAuth={setIsAuth} setRole={setUserRole} />} 
      />
      <Route path="/register" element={<Register />} />
      
      {/* Staff Routes */}
      <Route 
        path="/staff"
        element={isAuth && userRole === 'staff' ? <Staff /> : <Navigate to="/login" replace />}
      >
        <Route index element={<SupplierStocks />} /> {/* Fixed line */}
        <Route path="supplier-stocks" element={<SupplierStocks />} />
        <Route path="production" element={<Production />} />
      </Route>

      {/* Admin Routes */}
      <Route 
        path="/admin"
        element={isAuth && userRole === 'admin' ? <Admin /> : <Navigate to="/login" replace />}
      >
        <Route index element={<Navigate to="reports" replace />} />
        <Route path="users" element={<div>User Management</div>} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<div>System Settings</div>} />
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}