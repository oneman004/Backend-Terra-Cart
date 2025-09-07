import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  // User state now just holds the logged-in status and role
  const [user, setUser] = useState({ isLoggedIn: false, role: null });

  const handleLogin = (role) => {
    setUser({ isLoggedIn: true, role: role });
  };

  const handleLogout = () => {
    setUser({ isLoggedIn: false, role: null });
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            user.isLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/"
          element={
            user.isLoggedIn ? (
              <Dashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to={user.isLoggedIn ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;