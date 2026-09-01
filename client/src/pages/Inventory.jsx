import React, { useState, useEffect } from 'react';
import apiClient from '../utils/apiClient';

const Inventory = () => {
  const [stock, setStock] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ ingredient: '', qty: '', status: 'Good' });

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    try {
      const res = await apiClient.get('/inventory');
      setStock(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/inventory', {
        itemName: formData.ingredient,
        currentStock: Number(formData.qty),
        unit: 'pcs',
        minStockLevel: 10
      });
      setShowModal(false);
      fetchStock();
    } catch (error) {
      alert("Failed to update stock");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Inventory & Stock</h1>
        <button onClick={() => setShowModal(true)} className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700">Add Stock Item</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Ingredient</th>
              <th className="p-4 font-semibold text-gray-600">Current Stock</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {stock.map(item => (
              <tr key={item._id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-4 font-medium">{item.itemName}</td>
                <td className="p-4 font-mono text-gray-700">{item.currentStock} {item.unit}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${item.currentStock > item.minStockLevel ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {item.currentStock > item.minStockLevel ? 'Good' : 'Low Stock'}
                  </span>
                </td>
              </tr>
            ))}
            {stock.length === 0 && (
              <tr><td colSpan="3" className="p-8 text-center text-gray-500">No inventory found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-xl font-bold mb-4">Add Inventory Item</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Item Name</label>
                <input required type="text" className="w-full border p-2 rounded" value={formData.ingredient} onChange={e => setFormData({...formData, ingredient: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Quantity</label>
                <input required type="number" className="w-full border p-2 rounded" value={formData.qty} onChange={e => setFormData({...formData, qty: e.target.value})} />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">Save Item</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
