import { useState, useRef, useEffect } from 'react';
import { useUser } from './UserContext';

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const [showSwitchUser, setShowSwitchUser] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useUser();

  const toggleMenu = () => setOpen(!open);

  const handleSwitchUser = () => {
    setOpen(false);
    setShowSwitchUser(true);
  };

  const handleProfileSettings = () => {
    setOpen(false);
    console.log('Profile settings clicked');
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!currentUser) return null;

  const initials = currentUser.name.split(' ').map(n => n[0]).join('');

  return (
    <>
      <div className="relative flex items-center gap-3" ref={menuRef}>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
          <p className="text-xs text-gray-600">{currentUser.role}</p>
        </div>
        <button
          onClick={toggleMenu}
          className="w-10 h-10 rounded-full border-2 border-gray-300 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <span className="text-white font-bold text-lg">{initials}</span>
        </button>

        {open && (
          <div className="absolute right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20" style={{ top: '60px' }}>
            <div className="p-3 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
              <p className="text-xs text-gray-600">{currentUser.email}</p>
              <p className="text-xs text-gray-600">ID: {currentUser.employeeId}</p>
              <p className="text-xs text-gray-600">{currentUser.department}</p>
            </div>
            <div className="py-1">
              <button 
                onClick={handleProfileSettings}
                className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Profile Settings
              </button>
              <button 
                onClick={handleSwitchUser}
                className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Switch User
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Switch User Popup */}
      {showSwitchUser && (
        <SwitchUserPopup 
          onClose={() => setShowSwitchUser(false)} 
        />
      )}
    </>
  );
}

// Switch User Popup Component
function SwitchUserPopup({ onClose }: { onClose: () => void }) {
  const [userName, setUserName] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('Employee');
  const { setCurrentUser } = useUser();
  const modalRef = useRef<HTMLDivElement>(null);

  const departments = [
    'Technology',
    'Digital',
    'Risk Management',
    'Finance',
    'Human Resources',
    'Marketing',
    'Operations',
    'Legal',
    'Cybersecurity',
    'Data Science'
  ];

  const roles = ['Employee', 'Manager', 'Director', 'Admin'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !department) return;

    // Generate a user ID from the name
    const userId = userName.toLowerCase().replace(/\s+/g, '.');
    const email = `${userId}@capitalone.com`;
    const employeeId = `C1${Math.floor(Math.random() * 900000) + 100000}`;

    const newUser = {
      id: userId,
      name: userName.trim(),
      email,
      employeeId,
      role: role as any,
      department
    };

    // Update user context and force refresh
    setCurrentUser(newUser);
    
    // Force page refresh to reinitialize everything
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Switch User</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Enter your information to switch to a new user
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              {roles.map((roleOption) => (
                <option key={roleOption} value={roleOption}>
                  {roleOption}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Switch User
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
          <p className="text-xs text-gray-600">
            💡 This will create a new user profile and refresh the page to update Pendo
          </p>
        </div>
      </div>
    </div>
  );
}