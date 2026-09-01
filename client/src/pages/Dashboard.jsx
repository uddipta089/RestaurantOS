import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const data = [
    { name: 'Mon', revenue: 2400 },
    { name: 'Tue', revenue: 1398 },
    { name: 'Wed', revenue: 9800 },
    { name: 'Thu', revenue: 3908 },
    { name: 'Fri', revenue: 4800 },
    { name: 'Sat', revenue: 3800 },
    { name: 'Sun', revenue: 4300 },
  ];

  return (
    <div className="space-y-6 p-6 pt-0">
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
        {/* Real Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2 min-h-[400px]">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Revenue Trend</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
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
