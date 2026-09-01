import React from 'react';

const Inventory = () => {
  const stock = [
    { id: 1, ingredient: 'Beef Patties', qty: '45 pcs', status: 'Low Stock' },
    { id: 2, ingredient: 'Burger Buns', qty: '120 pcs', status: 'Good' },
    { id: 3, ingredient: 'Lettuce', qty: '5 kg', status: 'Good' }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Inventory & Stock</h1>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700">Receive Goods (GRN)</button>
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
              <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-4 font-medium">{item.ingredient}</td>
                <td className="p-4 font-mono text-gray-700">{item.qty}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${item.status === 'Good' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
