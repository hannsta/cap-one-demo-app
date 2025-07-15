import { BrowserRouter, NavLink, Route, Routes, Link } from 'react-router-dom';
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
              <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <img 
                  src="/caponelogo.png" 
                  alt="Capital One Logo" 
                  className="h-8 w-auto object-contain"
                />
                <div className="border-l border-gray-300 pl-3">
                  <p className="text-sm font-medium text-gray-900">Internal Systems Portal</p>
                </div>
              </Link>
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
                to="/resources"
                className={({ isActive }) =>
                  isActive ? 'font-semibold text-red-600 border-b-2 border-red-600 pb-1' : 'text-gray-700 hover:text-red-600 transition-colors'
                }
              >
                Company Resources
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
            <Route path="/resources" element={<div className="py-8" id="company-resources-page">
              <h2 className="text-3xl font-bold text-gray-900 mb-8" id="company-resources-title">Company Resources</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="resources-grid">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow" id="employee-handbook-card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3" id="employee-handbook-title">Employee Handbook</h3>
                  <p className="text-gray-600 mb-4" id="employee-handbook-description">Company policies, procedures, and guidelines</p>
                  <button className="text-red-600 hover:text-red-700 font-medium" id="employee-handbook-button" data-pendo="employee-handbook-access">Access Handbook →</button>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow" id="benefits-portal-card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3" id="benefits-portal-title">Benefits Portal</h3>
                  <p className="text-gray-600 mb-4" id="benefits-portal-description">Health insurance, retirement, and other benefits</p>
                  <button className="text-red-600 hover:text-red-700 font-medium" id="benefits-portal-button" data-pendo="benefits-portal-access">View Benefits →</button>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow" id="employee-directory-card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3" id="employee-directory-title">Employee Directory</h3>
                  <p className="text-gray-600 mb-4" id="employee-directory-description">Find contact information for colleagues</p>
                  <button className="text-red-600 hover:text-red-700 font-medium" id="employee-directory-button" data-pendo="employee-directory-search">Search Directory →</button>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow" id="training-development-card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3" id="training-development-title">Training & Development</h3>
                  <p className="text-gray-600 mb-4" id="training-development-description">Professional development and learning resources</p>
                  <button className="text-red-600 hover:text-red-700 font-medium" id="training-development-button" data-pendo="training-development-access">View Courses →</button>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow" id="company-news-card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3" id="company-news-title">Company News</h3>
                  <p className="text-gray-600 mb-4" id="company-news-description">Latest announcements and updates</p>
                  <button className="text-red-600 hover:text-red-700 font-medium" id="company-news-button" data-pendo="company-news-read">Read News →</button>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow" id="it-resources-card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3" id="it-resources-title">IT Resources</h3>
                  <p className="text-gray-600 mb-4" id="it-resources-description">Software downloads, VPN setup, and tech guides</p>
                  <button className="text-red-600 hover:text-red-700 font-medium" id="it-resources-button" data-pendo="it-resources-access">Access IT Tools →</button>
                </div>
              </div>
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