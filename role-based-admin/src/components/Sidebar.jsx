import {
  HomeIcon,
  BuildingStorefrontIcon,
  CogIcon,
  CubeIcon,
  BookOpenIcon,
  UsersIcon,
  QueueListIcon,
  PencilSquareIcon,
  TableCellsIcon,
  ClockIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const superAdminLinks = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Franchisees', href: '#', icon: BuildingStorefrontIcon, current: false },
  { name: 'System Settings', href: '#', icon: CogIcon, current: false },
];

const franchiseAdminLinks = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'My Carts', href: '#', icon: CubeIcon, current: false },
  { name: 'Menu Management', href: '#', icon: BookOpenIcon, current: false },
  { name: 'Employee Management', href: '#', icon: UsersIcon, current: false },
];

const cartAdminLinks = [
  { name: 'Live Orders', href: '#', icon: QueueListIcon, current: true },
  { name: 'Menu Editor', href: '#', icon: PencilSquareIcon, current: false },
  { name: 'Table Management', href: '#', icon: TableCellsIcon, current: false },
  { name: 'Order History', href: '#', icon: ClockIcon, current: false },
];

const roleLinks = {
  super_admin: superAdminLinks,
  franchise_admin: franchiseAdminLinks,
  cart_admin: cartAdminLinks,
};

// --- FIX IS HERE ---
// This function now returns the correct title for each role.
const getRoleName = (role) => {
    switch (role) {
        case 'super_admin': return 'Super Admin';
        case 'franchise_admin': return 'Franchise Admin';
        case 'cart_admin': return 'Cart Manager';
        default: return 'Admin Panel';
    }
}

const Sidebar = ({ role, isOpen, setIsOpen }) => {
  const navigation = roleLinks[role] || [];
  const roleName = getRoleName(role);

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 flex flex-col w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out z-30`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">{roleName}</h1>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                item.current
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <item.icon className="mr-3 h-6 w-6" />
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;