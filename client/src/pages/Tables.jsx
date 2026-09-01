import React, { useState } from 'react';

const Tables = () => {
  const [tables] = useState([
    { id: 'T-01', capacity: 2, status: 'Available' },
    { id: 'T-02', capacity: 4, status: 'Occupied' },
    { id: 'T-03', capacity: 6, status: 'Reserved' },
    { id: 'T-04', capacity: 2, status: 'Needs Cleaning' }
  ]);

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
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700">Add Table</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {tables.map(table => (
          <div key={table.id} className={`border-2 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition ${getStatusColor(table.status)}`}>
            <span className="text-3xl font-black mb-2">{table.id}</span>
            <span className="text-sm font-medium mb-1">{table.capacity} Seats</span>
            <span className="text-xs uppercase font-bold tracking-wider">{table.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tables;
