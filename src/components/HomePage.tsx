// src/pages/HomePage.tsx
import React from 'react';
import welcomeImage from '../assets/pendo.jpg';
import { InitPendo } from '../pendoHelper';

const HomePage: React.FC = () => {
  InitPendo();
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to Capital One Internal Systems
            </h1>
            <p className="text-gray-600 text-lg">
              Access your tools and services from the employee portal
            </p>
          </div>
          <img
            src={welcomeImage}
            alt="Capital One Systems"
            className="w-32 h-32 rounded-lg shadow-md object-cover"
          />
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-red-600 font-bold text-xl">HR</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 ml-4">Human Resources</h3>
          </div>
          <p className="text-gray-600">Access benefits, time off, and HR services</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xl">IT</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 ml-4">IT Services</h3>
          </div>
          <p className="text-gray-600">Submit tickets, access tools, and get support</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-bold text-xl">$</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 ml-4">Financial Systems</h3>
          </div>
          <p className="text-gray-600">Expense reports, budget tracking, and approvals</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">System Maintenance Notification</p>
              <p className="text-sm text-gray-600">Scheduled maintenance window this weekend</p>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">New Policy Update</p>
              <p className="text-sm text-gray-600">Remote work policy has been updated</p>
            </div>
            <span className="text-sm text-gray-500">1 day ago</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">Training Reminder</p>
              <p className="text-sm text-gray-600">Complete your quarterly security training</p>
            </div>
            <span className="text-sm text-gray-500">3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;