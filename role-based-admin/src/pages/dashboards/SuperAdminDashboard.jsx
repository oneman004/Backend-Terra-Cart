const SuperAdminDashboard = () => {
  const franchisees = [
    { name: 'Franchise A', email: 'admin.a@example.com', status: 'Active' },
    { name: 'Franchise B', email: 'admin.b@example.com', status: 'Inactive' },
    { name: 'Franchise C', email: 'admin.c@example.com', status: 'Active' },
    { name: 'Franchise D', email: 'admin.d@example.com', status: 'Active' },
    { name: 'Franchise E', email: 'admin.e@example.com', status: 'Inactive' },
    { name: 'Franchise F', email: 'admin.f@example.com', status: 'Active' },
  ];

  const stats = [
    { label: 'Total Franchisees', value: '120' },
    { label: 'Total Revenue', value: '$500,000' },
    { label: 'New Signups (Month)', value: '25' },
    { label: 'Active Carts', value: '15' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-gray-500 mt-1">Welcome back, Super Admin!</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Franchisees Table */}
      <div className="mt-8 bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800">Franchisees</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Franchisee Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {franchisees.map((franchise, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{franchise.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{franchise.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${franchise.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {franchise.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button className="text-gray-600 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md transition">Manage</button>
                    {franchise.status === 'Active' && (
                       <button className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition">Deactivate</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;