// components/dashboard/AdminReports.jsx
import React, { useState } from 'react';
import { format } from 'date-fns';

const AdminReports = () => {
  const [activeReport, setActiveReport] = useState('supplier');

  // Simulated supplier data
  const supplierReports = [
    {
      id: 1,
      supplierName: "Kangoki",
      date: format(new Date(2024, 2, 15), 'yyyy-MM-dd'),
      batchNumber: "202403001",
      weighbridge: 1500.50,
      guniaSorted: 200,
      guniaDusted: 180.75,
      plasticBagSorted: 300,
      plasticBagShredded: 275.25,
      plasticBagDried: 250.00,
      lamps: 45,
      status: "verified"
    },
    {
      id: 2,
      supplierName: "Boredo",
      date: format(new Date(2024, 2, 16), 'yyyy-MM-dd'),
      batchNumber: "202403002",
      weighbridge: 2000.00,
      guniaSorted: 250,
      guniaDusted: 225.50,
      plasticBagSorted: 350,
      plasticBagShredded: 320.75,
      plasticBagDried: 300.00,
      lamps: 60,
      status: "pending"
    },
    {
      id: 3,
      supplierName: "Alison",
      date: format(new Date(2024, 2, 17), 'yyyy-MM-dd'),
      batchNumber: "202403003",
      weighbridge: 1750.25,
      guniaSorted: 180,
      guniaDusted: 160.25,
      plasticBagSorted: 280,
      plasticBagShredded: 250.50,
      plasticBagDried: 230.75,
      lamps: 35,
      status: "verified"
    }
  ];

  return (
    <div className="admin-reports">
      <div className="report-controls">
        <button 
          className={`report-tab ${activeReport === 'supplier' ? 'active' : ''}`}
          onClick={() => setActiveReport('supplier')}
        >
          Supplier Reports
        </button>
        <button
          className={`report-tab ${activeReport === 'production' ? 'active' : ''}`}
          onClick={() => setActiveReport('production')}
        >
          Production Reports
        </button>
      </div>

      {activeReport === 'supplier' && (
        <div className="supplier-report">
          <table className="data-table">
            <thead>
              <tr>
                <th>Supplier</th>
                <th>Date</th>
                <th>Batch No.</th>
                <th>Total Weight</th>
                <th>Sorted Gunia</th>
                <th>Dusted Gunia</th>
                <th>Sorted Bags</th>
                <th>Shredded Bags</th>
                <th>Dried Bags</th>
                <th>Lamps</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {supplierReports.map((report, index) => (
                <tr key={report.id} className={`data-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                  <td className="supplier-cell">{report.supplierName}</td>
                  <td>{report.date}</td>
                  <td className="batch-cell">{report.batchNumber}</td>
                  <td>{report.weighbridge.toFixed(2)} kg</td>
                  <td>{report.guniaSorted}</td>
                  <td>{report.guniaDusted.toFixed(2)} kg</td>
                  <td>{report.plasticBagSorted}</td>
                  <td>{report.plasticBagShredded.toFixed(2)} kg</td>
                  <td>{report.plasticBagDried.toFixed(2)} kg</td>
                  <td>{report.lamps}</td>
                  <td>
                    <span className={`status-badge ${report.status}`}>
                      {report.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeReport === 'production' && (
        <div className="production-report">
          <h3>Production Reports</h3>
          <p>Production data will be available soon</p>
        </div>
      )}
    </div>
  );
};

export default AdminReports;