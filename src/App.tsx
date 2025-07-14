import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import InputForm from './components/InputForm';
import HomePage from './components/HomePage';
import UserMenu from './components/UserMenu';

//@ts-ignore
import { initialize } from '@pendo/agent';
import { UserProvider } from './components/UserContext';

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
      <div className="min-h-screen w-full bg-gray-50 text-gray-900">
        {/* NavBar */}
        <nav className="bg-white shadow-lg border-b border-gray-200">
          <div className="mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <img 
                  src="/caponelogo.png" 
                  alt="Capital One Logo" 
                  className="h-8 w-auto object-contain"
                />
                <div className="border-l border-gray-300 pl-3">
                  <p className="text-sm font-medium text-gray-900">Internal Systems Portal</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-8 items-center">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'font-semibold text-red-600 border-b-2 border-red-600 pb-1' : 'text-gray-700 hover:text-red-600 transition-colors'
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/service"
                className={({ isActive }) =>
                  isActive ? 'font-semibold text-red-600 border-b-2 border-red-600 pb-1' : 'text-gray-700 hover:text-red-600 transition-colors'
                }
              >
                Employee Services
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? 'font-semibold text-red-600 border-b-2 border-red-600 pb-1' : 'text-gray-700 hover:text-red-600 transition-colors'
                }
              >
                System Status
              </NavLink>
            </div>

            {/* User Profile Menu */}
            <UserMenu />
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/service" element={<InputForm />} />
            <Route path="/contact" element={<div className="text-center py-20">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">System Status</h2>
              <p className="text-gray-600">All systems operational</p>
            </div>} />
          </Routes>
        </main>

        {/* Pendo Status UI */}
        {/* <PendoStatusMenu /> */}
      </div>
      </UserProvider>
    </BrowserRouter>
  );
}