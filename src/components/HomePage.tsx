// src/pages/HomePage.tsx
import React from 'react';
import { InitPendo } from '../pendoHelper';

const HomePage: React.FC = () => {
  InitPendo();
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white border border-gray-200 rounded-md p-6">
        <div className="max-w-3xl">
          <h1 className="text-2xl font-medium text-gray-900 mb-2">
            Employee Portal Dashboard
          </h1>
          <p className="text-gray-600">
            Access your workplace tools and submit service requests
          </p>
        </div>
      </div>

      {/* Key Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-md p-5 hover:border-gray-300 transition-colors">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-red-50 rounded flex items-center justify-center mt-0.5">
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-gray-900">Employee Services</h3>
              <p className="text-sm text-gray-600 mt-1">HR requests, benefits, time off</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-md p-5 hover:border-gray-300 transition-colors">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-blue-50 rounded flex items-center justify-center mt-0.5">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-gray-900">IT Support</h3>
              <p className="text-sm text-gray-600 mt-1">Technical assistance, equipment requests</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-md p-5 hover:border-gray-300 transition-colors">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-green-50 rounded flex items-center justify-center mt-0.5">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-gray-900">Facilities</h3>
              <p className="text-sm text-gray-600 mt-1">Workspace needs, building services</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-md p-4">
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900">2</div>
            <div className="text-sm text-gray-600">Pending Requests</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-md p-4">
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900">7</div>
            <div className="text-sm text-gray-600">This Month</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-md p-4">
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900">24h</div>
            <div className="text-sm text-gray-600">Avg Response</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-md p-4">
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900">96%</div>
            <div className="text-sm text-gray-600">System Uptime</div>
          </div>
        </div>
      </div>

      {/* Recent Updates */}
      <div className="bg-white border border-gray-200 rounded-md p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Updates</h2>
        <div className="space-y-3">
          <div className="flex items-start py-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">System maintenance completed</p>
              <p className="text-xs text-gray-600">All services restored - no action required</p>
              <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start py-2">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">New employee onboarding resources</p>
              <p className="text-xs text-gray-600">Updated guides available in Company Resources</p>
              <p className="text-xs text-gray-500 mt-1">1 day ago</p>
            </div>
          </div>
          <div className="flex items-start py-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Security awareness training reminder</p>
              <p className="text-xs text-gray-600">Complete by end of month - 15 minutes required</p>
              <p className="text-xs text-gray-500 mt-1">3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;