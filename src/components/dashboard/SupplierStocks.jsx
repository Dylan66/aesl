import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

const SupplierStocks = () => {
  const [formData, setFormData] = useState({
    supplierName: '',
    weighbridge: '',
    guniaSorted: '',
    guniaDusted: '',
    plasticBagSorted: '',
    plasticBagShredded: '',
    plasticBagDried: '',
    lamps: '',
    selectedDate: format(new Date(), 'yyyy-MM-dd')
  });

  const [batchNumber, setBatchNumber] = useState('');
  const navigate = useNavigate();

  // Generate sequential batch number
  const getNextBatchNumber = () => {
    const now = new Date();
    const monthKey = format(now, 'yyyyMM');
    const lastBatch = localStorage.getItem('lastBatch');
    
    if (lastBatch && lastBatch.startsWith(monthKey)) {
      const lastNumber = parseInt(lastBatch.slice(6), 10);
      return `${monthKey}${(lastNumber + 1).toString().padStart(3, '0')}`;
    }
    return `${monthKey}001`;
  };

  useEffect(() => {
    const newBatch = getNextBatchNumber();
    setBatchNumber(newBatch);
    localStorage.setItem('lastBatch', newBatch);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Calculate waste metrics
  const calculateWaste = () => {
    const weighbridgeValue = parseFloat(formData.weighbridge) || 0;
    const guniaDustedValue = parseFloat(formData.guniaDusted) || 0;
    const plasticBagDriedValue = parseFloat(formData.plasticBagDried) || 0;

    const totalWaste = weighbridgeValue - (guniaDustedValue + plasticBagDriedValue);
    const percentageWaste = weighbridgeValue > 0 
      ? (totalWaste / weighbridgeValue) * 100 
      : 0;

    return {
      totalWaste: totalWaste >= 0 ? totalWaste.toFixed(2) : 'N/A',
      percentageWaste: totalWaste >= 0 ? percentageWaste.toFixed(2) : 'N/A'
    };
  };

  const { totalWaste, percentageWaste } = calculateWaste();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      ...formData,
      batchNumber,
      date: format(parseISO(formData.selectedDate), 'dd-MM-yyyy'),
      totalWaste,
      percentageWaste
    });
    navigate('/staff');
  };

  return (
    <div className="supplier-form">
      <h3>Supplier Stocks Entry Form</h3>
      <div className="batch-info">
        <div className="date-picker">
          <label>Select Date: </label>
          <input
            type="date"
            name="selectedDate"
            value={formData.selectedDate}
            onChange={handleInputChange}
            max={format(new Date(), 'yyyy-MM-dd')}
          />
        </div>
        <div className="batch-number">
          <span>Batch Number: {batchNumber}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Supplier Name:</label>
          <input
            type="text"
            name="supplierName"
            required
            value={formData.supplierName}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Total Weight (Weighbridge kg):</label>
          <input
            type="number"
            name="weighbridge"
            required
            step="0.01"
            value={formData.weighbridge}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-section">
          <h4>Gunia Metrics</h4>
          <div className="form-group">
            <label>Sorted Gunia (units):</label>
            <input
              type="number"
              name="guniaSorted"
              required
              value={formData.guniaSorted}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Dusted Gunia (kg):</label>
            <input
              type="number"
              name="guniaDusted"
              required
              step="0.01"
              value={formData.guniaDusted}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-section">
          <h4>Plastic Bag Metrics</h4>
          <div className="form-group">
            <label>Sorted Plastic Bags (units):</label>
            <input
              type="number"
              name="plasticBagSorted"
              required
              value={formData.plasticBagSorted}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Shredded Plastic Bags (kg):</label>
            <input
              type="number"
              name="plasticBagShredded"
              required
              step="0.01"
              value={formData.plasticBagShredded}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Dried Plastic Bags (kg):</label>
            <input
              type="number"
              name="plasticBagDried"
              required
              step="0.01"
              value={formData.plasticBagDried}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Lamps (units):</label>
          <input
            type="number"
            name="lamps"
            required
            value={formData.lamps}
            onChange={handleInputChange}
          />
        </div>

        <div className="calculation-section">
          <div className="form-group">
            <label>Total Waste (kg):</label>
            <input
              type="text"
              value={totalWaste}
              readOnly
              className="calculation-field"
            />
          </div>
          <div className="form-group">
            <label>Percentage Waste:</label>
            <input
              type="text"
              value={`${percentageWaste}%`}
              readOnly
              className="calculation-field"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Save Entry
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate('/staff')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SupplierStocks;