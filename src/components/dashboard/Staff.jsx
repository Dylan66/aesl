import { Outlet, useNavigate } from 'react-router-dom';

const Staff = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <header>
        <h2>AESL Staff Dashboard</h2>
        <nav>
          <button 
            onClick={() => navigate('/staff/supplier-stocks')}
            className="nav-btn"
          >
            Supplier Stocks
          </button>
          <button 
            onClick={() => navigate('/staff/production')}
            className="nav-btn"
          >
            Production
          </button>
          <button 
            onClick={() => navigate('/login')}
            className="nav-btn"
          >
            Logout
          </button>
        </nav>
      </header>
      
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Staff;