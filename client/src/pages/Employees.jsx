import React from 'react';

const Employees = () => {
  const staff = [
    { id: 1, name: 'Alice Smith', role: 'Restaurant Manager', shift: 'Morning' },
    { id: 2, name: 'John Doe', role: 'Cashier', shift: 'Morning' },
    { id: 3, name: 'Gordon Ramsay', role: 'Chef', shift: 'Evening' }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">HR & Staff</h1>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700">Add Employee</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Employee Name</th>
              <th className="p-4 font-semibold text-gray-600">Role</th>
              <th className="p-4 font-semibold text-gray-600">Current Shift</th>
              <th className="p-4 font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {staff.map(emp => (
              <tr key={emp.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-4 font-medium">{emp.name}</td>
                <td className="p-4 text-gray-600">{emp.role}</td>
                <td className="p-4 text-gray-600">{emp.shift}</td>
                <td className="p-4 text-blue-600 hover:underline cursor-pointer">View Schedule</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;
