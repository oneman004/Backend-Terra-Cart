import { useState } from 'react';
import Sidebar from './Sidebar';
import { Bars3Icon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const Layout = ({ role, onLogout, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getTitle = () => {
    switch (role) {
      case 'super_admin': return 'Admin Panel';
      case 'franchise_admin': return 'Admin Panel';
      case 'cart_admin': return 'Admin Panel';
      default: return 'Admin Panel';
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role={role} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200 lg:justify-end">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-500 focus:outline-none lg:hidden">
            <Bars3Icon className="h-6 w-6" />
          </button>
          <div className="flex items-center">
            <button
              onClick={onLogout}
              className="flex items-center text-sm font-medium text-gray-700 hover:text-red-600 transition-colors duration-200"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
              Log Out
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;