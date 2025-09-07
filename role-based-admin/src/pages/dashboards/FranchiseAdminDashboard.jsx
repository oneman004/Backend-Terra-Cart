const FranchiseAdminDashboard = () => {
    const carts = [
      { name: 'Cart 1', address: '123 Main St, Anytown', manager: 'Alex Johnson', status: 'Active' },
      { name: 'Cart 2', address: '456 Oak Ave, Anytown', manager: 'Sophia Clark', status: 'Inactive' },
      { name: 'Cart 3', address: '789 Pine Ln, Anytown', manager: 'Ethan Davis', status: 'Active' },
      { name: 'Cart 4', address: '101 Elm Rd, Anytown', manager: 'Olivia Wilson', status: 'Active' },
      { name: 'Cart 5', address: '222 Maple Dr, Anytown', manager: 'Liam Brown', status: 'Inactive' },
    ];
  
    const stats = [
      { label: 'Total Carts', value: '25' },
      { label: 'Total Sales (Today)', value: '$12,500' },
      { label: 'Total Orders (Today)', value: '150' },
      { label: 'Top Performing Cart', value: 'Cart 7' },
    ];
  
    return (
      <div>
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-500 mt-1">Franchise: Franchise A</p>
            </div>
            <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">
                + Add New Cart
            </button>
        </div>
  
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>
  
        {/* Carts Table */}
        <div className="mt-8 bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800">Carts</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cart Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cart Manager</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {carts.map((cart, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cart.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cart.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cart.manager}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${cart.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {cart.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button className="text-green-600 hover:text-green-900 transition">Edit Menu</button>
                      <button className="text-green-600 hover:text-green-900 transition">View Orders</button>
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
  
  export default FranchiseAdminDashboard;