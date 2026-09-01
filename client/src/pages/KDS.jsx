import React, { useState, useEffect } from 'react';

const KDS = () => {
  const [orders, setOrders] = useState([
    { id: 'ORD-101', table: 'T-12', time: '12:05 PM', status: 'Pending', items: [{ name: 'Classic Burger', qty: 2 }, { name: 'Fries', qty: 1 }] },
    { id: 'ORD-102', table: 'T-04', time: '12:10 PM', status: 'Preparing', items: [{ name: 'Vegan Bowl', qty: 1 }] }
  ]);

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Kitchen Display System (KDS)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map(order => (
          <div key={order.id} className={`p-4 rounded-xl shadow-md border-t-4 ${order.status === 'Pending' ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'}`}>
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-lg">{order.id}</span>
              <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm">{order.table}</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Time: {order.time}</p>
            <ul className="space-y-2 mb-6">
              {order.items.map((item, idx) => (
                <li key={idx} className="flex justify-between font-medium">
                  <span>{item.qty}x {item.name}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-end gap-2">
              {order.status === 'Pending' && (
                <button onClick={() => updateStatus(order.id, 'Preparing')} className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 w-full">Start Preparing</button>
              )}
              {order.status === 'Preparing' && (
                <button onClick={() => updateStatus(order.id, 'Completed')} className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 w-full">Mark Complete</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KDS;
