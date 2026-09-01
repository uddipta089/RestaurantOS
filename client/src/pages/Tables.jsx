import React, { useState, useEffect } from 'react';
import apiClient from '../utils/apiClient';

const Tables = () => {
  const [tables, setTables] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ tableNumber: '', capacity: '' });

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const res = await apiClient.get('/tables');
      setTables(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch tables:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/tables', { 
        tableNumber: formData.tableNumber,
        capacity: Number(formData.capacity)
      });
      setShowModal(false);
      setFormData({ tableNumber: '', capacity: '' });
      fetchTables();
    } catch (error) {
      alert("Failed to add table");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await apiClient.put(`/tables/${id}/status`, { status });
      fetchTables();
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Available': return 'bg-green-100 text-green-800 border-green-300';
      case 'Occupied': return 'bg-red-100 text-red-800 border-red-300';
      case 'Reserved': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Needs Cleaning': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Table Management</h1>
        <button onClick={() => setShowModal(true)} className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700">Add Table</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {tables.map(table => (
          <div key={table._id} onClick={() => updateStatus(table._id, table.status === 'Available' ? 'Occupied' : 'Available')} className={`border-2 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition ${getStatusColor(table.status)}`}>
            <span className="text-3xl font-black mb-2">{table.tableNumber}</span>
            <span className="text-sm font-medium mb-1">{table.capacity} Seats</span>
            <span className="text-xs uppercase font-bold tracking-wider">{table.status}</span>
          </div>
        ))}
        {tables.length === 0 && (
          <div className="col-span-full p-8 text-center text-gray-500">No tables found. Click Add Table to create one.</div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-xl font-bold mb-4">Add Table</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Table Identifier (e.g. T-01)</label>
                <input required type="text" className="w-full border p-2 rounded" value={formData.tableNumber} onChange={e => setFormData({...formData, tableNumber: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Seat Capacity</label>
                <input required type="number" className="w-full border p-2 rounded" value={formData.capacity} onChange={e => setFormData({...formData, capacity: e.target.value})} />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">Save Table</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tables;
