import { useState } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

// Mock user database
const mockUsers = {
  'super@example.com': { password: 'password123', role: 'super_admin' },
  'franchise@example.com': { password: 'password123', role: 'franchise_admin' },
  'cart@example.com': { password: 'password123', role: 'cart_admin' },
};

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    const user = mockUsers[email];

    if (user && user.password === password) {
      onLogin(user.role); // Pass the role to the parent component
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <div className="p-3 rounded-full bg-gray-100">
            <ExclamationTriangleIcon className="w-8 h-8 text-gray-600" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-center text-gray-900">
            Admin Panel Login
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Welcome back! Please enter your details.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-200 rounded-lg focus:ring-green-500 focus:border-green-500"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-200 rounded-lg focus:ring-green-500 focus:border-green-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-sm text-center text-red-500">{error}</p>}

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="remember-me" className="block ml-2 text-gray-900">
                Remember me
              </label>
            </div>
            <a href="#" className="font-medium text-green-600 hover:text-green-500">
              Forgot your password?
            </a>
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;