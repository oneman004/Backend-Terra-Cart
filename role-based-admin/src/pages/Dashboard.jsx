import Layout from '../components/Layout';
import SuperAdminDashboard from './dashboards/SuperAdminDashboard';
import FranchiseAdminDashboard from './dashboards/FranchiseAdminDashboard';
import CartAdminDashboard from './dashboards/CartAdminDashboard';

const Dashboard = ({ user, onLogout }) => {
  const renderDashboard = () => {
    switch (user.role) {
      case 'super_admin':
        return <SuperAdminDashboard />;
      case 'franchise_admin':
        return <FranchiseAdminDashboard />;
      case 'cart_admin':
        return <CartAdminDashboard />;
      default:
        return <p>No dashboard available for this role.</p>;
    }
  };

  return (
    <Layout role={user.role} onLogout={onLogout}>
      {renderDashboard()}
    </Layout>
  );
};

export default Dashboard;