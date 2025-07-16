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
                  isActive 
                    ? 'text-sm font-medium text-red-600 border-b-2 border-red-600 pb-1' 
                    : 'text-sm font-medium text-gray-700 hover:text-red-600 border-b-2 border-transparent pb-1 transition-colors'
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/service"
                className={({ isActive }) =>
                  isActive 
                    ? 'text-sm font-medium text-red-600 border-b-2 border-red-600 pb-1' 
                    : 'text-sm font-medium text-gray-700 hover:text-red-600 border-b-2 border-transparent pb-1 transition-colors'
                }
              >
                Employee Services
              </NavLink>
              <NavLink
                to="/resources"
                className={({ isActive }) =>
                  isActive 
                    ? 'text-sm font-medium text-red-600 border-b-2 border-red-600 pb-1' 
                    : 'text-sm font-medium text-gray-700 hover:text-red-600 border-b-2 border-transparent pb-1 transition-colors'
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
            <Route path="/resources" element={<div className="py-6" id="company-resources-page">
              <div className="mb-6">
                <h2 className="text-2xl font-medium text-gray-900 mb-2" id="company-resources-title">Company Resources</h2>
                <p className="text-gray-600">Access tools, information, and support resources</p>
              </div>
              
              <div className="space-y-6">
                {/* Employee Information */}
                <div className="bg-white border border-gray-200 rounded-md p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Employee Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-100 rounded-md hover:border-gray-200 transition-colors" id="employee-handbook-card">
                      <div className="flex items-center mb-2">
                        <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <h4 className="font-medium text-gray-900" id="employee-handbook-title">Employee Handbook</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3" id="employee-handbook-description">Policies, procedures, and company guidelines</p>
                      <button className="text-sm text-red-600 hover:text-red-700 font-medium" id="employee-handbook-button" data-pendo="employee-handbook-access">Access handbook</button>
                    </div>
                    
                    <div className="p-4 border border-gray-100 rounded-md hover:border-gray-200 transition-colors" id="employee-directory-card">
                      <div className="flex items-center mb-2">
                        <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h4 className="font-medium text-gray-900" id="employee-directory-title">Employee Directory</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3" id="employee-directory-description">Find contact information for colleagues</p>
                      <button className="text-sm text-red-600 hover:text-red-700 font-medium" id="employee-directory-button" data-pendo="employee-directory-search">Search directory</button>
                    </div>
                  </div>
                </div>

                {/* Benefits & HR */}
                <div className="bg-white border border-gray-200 rounded-md p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Benefits & HR</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-100 rounded-md hover:border-gray-200 transition-colors" id="benefits-portal-card">
                      <div className="flex items-center mb-2">
                        <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <h4 className="font-medium text-gray-900" id="benefits-portal-title">Benefits Portal</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3" id="benefits-portal-description">Health insurance, retirement plans, wellness programs</p>
                      <button className="text-sm text-red-600 hover:text-red-700 font-medium" id="benefits-portal-button" data-pendo="benefits-portal-access">View benefits</button>
                    </div>
                    
                    <div className="p-4 border border-gray-100 rounded-md hover:border-gray-200 transition-colors" id="training-development-card">
                      <div className="flex items-center mb-2">
                        <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <h4 className="font-medium text-gray-900" id="training-development-title">Learning & Development</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3" id="training-development-description">Training courses, certifications, career resources</p>
                      <button className="text-sm text-red-600 hover:text-red-700 font-medium" id="training-development-button" data-pendo="training-development-access">Browse courses</button>
                    </div>
                  </div>
                </div>

                {/* Technical Resources */}
                <div className="bg-white border border-gray-200 rounded-md p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Technical Resources</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-100 rounded-md hover:border-gray-200 transition-colors" id="it-resources-card">
                      <div className="flex items-center mb-2">
                        <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <h4 className="font-medium text-gray-900" id="it-resources-title">IT Resources</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3" id="it-resources-description">Software downloads, VPN setup, technical guides</p>
                      <button className="text-sm text-red-600 hover:text-red-700 font-medium" id="it-resources-button" data-pendo="it-resources-access">Access tools</button>
                    </div>
                    
                    <div className="p-4 border border-gray-100 rounded-md hover:border-gray-200 transition-colors" id="company-news-card">
                      <div className="flex items-center mb-2">
                        <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        <h4 className="font-medium text-gray-900" id="company-news-title">Company Updates</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3" id="company-news-description">Latest announcements, news, and policy updates</p>
                      <button className="text-sm text-red-600 hover:text-red-700 font-medium" id="company-news-button" data-pendo="company-news-read">View updates</button>
                    </div>
                  </div>
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