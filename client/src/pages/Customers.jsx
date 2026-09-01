import React from 'react';

const Customers = () => {
  const customers = [
    { id: 1, name: 'Bruce Wayne', visits: 45, spent: 4500, tier: 'VIP' },
    { id: 2, name: 'Clark Kent', visits: 4, spent: 120, tier: 'Regular' },
    { id: 3, name: 'Diana Prince', visits: 12, spent: 850, tier: 'Regular' },
    { id: 4, name: 'Tony Stark', visits: 89, spent: 12400, tier: 'VIP' }
  ];

  const exportCSV = () => {
    const headers = ['ID,Name,Total Visits,Total Spent,Tier'];
    const rows = customers.map(c => `${c.id},${c.name},${c.visits},${c.spent},${c.tier}`);
    const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
    const encodedUri = encodeURI(csvContent);
    
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "restaurant_customers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 pt-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Customer CRM</h1>
        <button onClick={exportCSV} className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700">Export CSV</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Customer</th>
              <th className="p-4 font-semibold text-gray-600">Total Visits</th>
              <th className="p-4 font-semibold text-gray-600">Total Spent</th>
              <th className="p-4 font-semibold text-gray-600">Segment</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-4 font-medium">{c.name}</td>
                <td className="p-4 text-gray-600">{c.visits}</td>
                <td className="p-4 text-gray-600">${c.spent}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${c.tier === 'VIP' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                    {c.tier}
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

export default Customers;
