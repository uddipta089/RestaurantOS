import React, { useState } from 'react';

const MenuManager = () => {
  const [items] = useState([
    { id: 1, name: 'Classic Burger', category: 'Mains', price: 12.99, isAvailable: true },
    { id: 2, name: 'Fries', category: 'Sides', price: 4.99, isAvailable: true }
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Menu Manager</h1>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700">Add Item</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Item Name</th>
              <th className="p-4 font-semibold text-gray-600">Category</th>
              <th className="p-4 font-semibold text-gray-600">Price</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
              <th className="p-4 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-4 font-medium">{item.name}</td>
                <td className="p-4 text-gray-600">{item.category}</td>
                <td className="p-4 text-gray-900">${item.price}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${item.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {item.isAvailable ? 'Active' : 'Hidden'}
                  </span>
                </td>
                <td className="p-4 text-blue-600 hover:underline cursor-pointer">Edit</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MenuManager;
