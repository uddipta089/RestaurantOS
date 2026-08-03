import React from 'react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric Cards */}
        {[
          { title: 'Total Sales Today', value: '$4,289.00', trend: '+12%', color: 'text-green-500' },
          { title: 'Orders', value: '142', trend: '+5%', color: 'text-green-500' },
          { title: 'Active Tables', value: '18/24', trend: '75%', color: 'text-blue-500' },
          { title: 'Pending KDS', value: '12', trend: '-2', color: 'text-red-500' },
        ].map((metric, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <h3 className="text-gray-500 text-sm font-medium">{metric.title}</h3>
            <div className="mt-2 flex items-baseline justify-between">
              <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
              <span className={`text-sm font-semibold ${metric.color}`}>{metric.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Placeholder */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2 min-h-[400px]">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Revenue Trend</h3>
          <div className="h-full w-full flex items-center justify-center bg-gray-50 rounded border border-dashed border-gray-200">
            <p className="text-gray-400">Chart rendering canvas (Recharts/Chart.js)</p>
          </div>
        </div>

        {/* Recent Orders List */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-semibold text-gray-800">Order #10{i}4</p>
                  <p className="text-sm text-gray-500">Table {i + 2} • 3 items</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">${(i * 12.50).toFixed(2)}</p>
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full mt-1">Paid</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
