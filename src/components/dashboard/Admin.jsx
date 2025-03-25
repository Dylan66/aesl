// components/dashboard/Admin.jsx
import { Link, Outlet } from 'react-router-dom';

const Admin = () => {
  return (
    <div className="dashboard">
      <header>
        <h2>AESL Admin Dashboard</h2>
        <nav>
          <Link to="/admin/users">Manage Users</Link>
          <Link to="/admin/reports">Reports</Link>
          <Link to="/admin/settings">Settings</Link>
        </nav>
      </header>
      
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;