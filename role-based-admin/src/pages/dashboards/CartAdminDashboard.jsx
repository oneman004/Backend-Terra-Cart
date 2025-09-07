import React from 'react';

const OrderCard = ({ order }) => (
  <div className="bg-white rounded-lg shadow-md p-5 mb-4">
    <div className="flex justify-between items-center mb-3">
      <h4 className="font-bold text-lg text-gray-800">Order #{order.id}</h4>
      <p className="text-sm text-gray-500">{order.time}</p>
    </div>
    <p className="text-sm text-gray-600 mb-4">Customer: {order.customer}</p>
    <ul className="space-y-2">
      {order.items.map((item, index) => (
        <li key={index} className="flex justify-between text-sm">
          <span className="font-semibold text-gray-700">{item.qty}x</span>
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
    {order.status === 'New' && (
      <button className="mt-5 w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">
        Accept
      </button>
    )}
  </div>
);

const CartAdminDashboard = () => {
  const newOrders = [
    { id: '1234', customer: 'Alex Johnson', time: '2 min ago', status: 'New', items: [{ qty: 2, name: 'Burrito Bowl' }, { qty: 1, name: 'Chips & Guac' }] },
    { id: '5678', customer: 'Sarah Williams', time: '5 min ago', status: 'New', items: [{ qty: 3, name: 'Tacos al Pastor' }, { qty: 1, name: 'Horchata' }, { qty: 1, name: 'Churros' }] },
    { id: '9012', customer: 'David Lee', time: '8 min ago', status: 'New', items: [{ qty: 1, name: 'Quesadilla' }] },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Live Orders</h1>
      <p className="text-gray-500 mt-1">Cart Manager: Cart 7</p>

      <div className="mt-6">
        {/* Order Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <a href="#" className="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm text-green-600 border-green-500">
              New Orders
            </a>
            <a href="#" className="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Preparing Orders
            </a>
            <a href="#" className="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Ready for Pickup
            </a>
          </nav>
        </div>

        {/* Order Columns */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* New Orders Column */}
          <div className="col-span-3"> {/* For this demo, we only show the New Orders column */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {newOrders.map(order => <OrderCard key={order.id} order={order} />)}
            </div>
          </div>
          {/* In a real app, you would map over preparing and ready orders here */}
        </div>
      </div>
    </div>
  );
};

export default CartAdminDashboard;