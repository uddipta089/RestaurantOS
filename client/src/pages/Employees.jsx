import React, { useState, useEffect } from 'react';
import apiClient from '../utils/apiClient';

const Employees = () => {
  const [staff, setStaff] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: 'Cashier', email: '' });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await apiClient.get('/employees');
      setStaff(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch staff:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/employees', {
        firstName: formData.name.split(' ')[0],
        lastName: formData.name.split(' ')[1] || '',
        role: formData.role,
        email: formData.email,
        phone: '1234567890'
      });
      setShowModal(false);
      fetchStaff();
    } catch (error) {
      alert("Failed to add employee");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">HR & Staff</h1>
        <button onClick={() => setShowModal(true)} className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700">Add Employee</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Employee Name</th>
              <th className="p-4 font-semibold text-gray-600">Role</th>
              <th className="p-4 font-semibold text-gray-600">Email</th>
            </tr>
          </thead>
          <tbody>
            {staff.map(emp => (
              <tr key={emp._id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-4 font-medium">{emp.firstName} {emp.lastName}</td>
                <td className="p-4 text-gray-600">{emp.role}</td>
                <td className="p-4 text-gray-600">{emp.email}</td>
              </tr>
            ))}
            {staff.length === 0 && (
              <tr><td colSpan="3" className="p-8 text-center text-gray-500">No employees found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-xl font-bold mb-4">Add Employee</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input required type="text" className="w-full border p-2 rounded" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input required type="email" className="w-full border p-2 rounded" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select className="w-full border p-2 rounded" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                  <option>Cashier</option>
                  <option>Chef</option>
                  <option>Restaurant Manager</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">Save Employee</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
