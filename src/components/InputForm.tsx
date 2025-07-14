import { useState } from 'react';
//@ts-ignore
import { initialize } from '@pendo/agent';
import { InitPendo } from '../pendoHelper';

interface PendingRequest {
  id: string;
  employeeName: string;
  department: string;
  requestType: string;
  priority: string;
  description: string;
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
}

function InputForm() {
  InitPendo();
  const [currentStep, setCurrentStep] = useState(1);
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);
  const [isFormExpanded, setIsFormExpanded] = useState(true);
  const [isPendingExpanded, setIsPendingExpanded] = useState(false);
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeId: '',
    department: '',
    manager: '',
    requestType: '',
    priority: '',
    description: '',
    approvalNeeded: false
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: fieldValue }));
  };

  const handleStepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Employee service request submitted:', formData);
    
    // Create new request
    const newRequest: PendingRequest = {
      id: `REQ-${Date.now()}`,
      employeeName: formData.employeeName,
      department: formData.department,
      requestType: formData.requestType,
      priority: formData.priority,
      description: formData.description,
      submittedAt: new Date(),
      status: 'pending'
    };

    // Add to pending requests
    setPendingRequests(prev => [newRequest, ...prev]);
    
    // Reset form and manage panel states
    setCurrentStep(1);
    setFormData({
      employeeName: '',
      employeeId: '',
      department: '',
      manager: '',
      requestType: '',
      priority: '',
      description: '',
      approvalNeeded: false
    });
    
    // Collapse form and expand pending requests
    setIsFormExpanded(false);
    setIsPendingExpanded(true);
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleActionClick = (action: string) => {
    console.log(`Action performed: ${action}`);
  };

  const isStep1Valid = formData.employeeName.trim() && formData.employeeId.trim() && formData.department && formData.manager.trim();
  const isStep2Valid = formData.requestType && formData.priority;
  const isStep3Valid = formData.description.trim();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRequestTypeLabel = (type: string) => {
    switch (type) {
      case 'it-support': return 'IT Support & Equipment';
      case 'hr-request': return 'HR Services';
      case 'facilities': return 'Facilities & Workspace';
      case 'access-request': return 'System Access Request';
      default: return type;
    }
  };

  // Update panel states based on requests
  const shouldFormBeExpanded = pendingRequests.length === 0 || isFormExpanded;
  const shouldPendingBeExpanded = pendingRequests.length > 0 && isPendingExpanded;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Pending Requests Section */}
        <div className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
          <div 
            className="p-6 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between"
            onClick={() => setIsPendingExpanded(!isPendingExpanded)}
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900">My Pending Requests</h2>
              <p className="text-sm text-gray-600 mt-1">
                {pendingRequests.length} {pendingRequests.length === 1 ? 'request' : 'requests'} pending
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {pendingRequests.length > 0 && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {pendingRequests.length}
                </span>
              )}
              <svg 
                className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                  shouldPendingBeExpanded ? 'rotate-180' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          <div className={`transition-all duration-500 ease-in-out ${
            shouldPendingBeExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}>
            <div className="px-6 pb-6">
              {pendingRequests.length > 0 ? (
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {pendingRequests.map((request) => (
                    <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-900">Request ID: {request.id}</span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                            {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)} Priority
                          </span>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Employee:</span> {request.employeeName}
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Department:</span> {request.department}
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Request Type:</span> {getRequestTypeLabel(request.requestType)}
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Submitted:</span> {request.submittedAt.toLocaleDateString()}
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium text-gray-700">Description:</span> {request.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p>No pending requests</p>
                  <p className="text-sm">Submit a new request below to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* New Request Form Section */}
        <div className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
          <div 
            className="p-6 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between"
            onClick={() => setIsFormExpanded(!isFormExpanded)}
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900">New Service Request</h2>
              <p className="text-sm text-gray-600 mt-1">
                Submit requests for HR, IT, facilities, or other internal services
              </p>
            </div>
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                shouldFormBeExpanded ? 'rotate-180' : ''
              }`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          <div className={`transition-all duration-500 ease-in-out ${
            shouldFormBeExpanded ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}>
            <div className="px-6 pb-6">
              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      currentStep >= 1 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {currentStep > 1 ? '✓' : '1'}
                    </div>
                    <span className={`text-sm font-medium ${
                      currentStep >= 1 ? 'text-red-600' : 'text-gray-500'
                    }`}>Personal Information</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      currentStep >= 2 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {currentStep > 2 ? '✓' : '2'}
                    </div>
                    <span className={`text-sm font-medium ${
                      currentStep >= 2 ? 'text-red-600' : 'text-gray-500'
                    }`}>Request Details</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      currentStep >= 3 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      3
                    </div>
                    <span className={`text-sm font-medium ${
                      currentStep >= 3 ? 'text-red-600' : 'text-gray-500'
                    }`}>Description & Submit</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <form onSubmit={handleStepSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 1: Personal Information</h3>
                    <p className="text-gray-600 mb-6">Please provide your employee details</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Employee Name *</label>
                      <input
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        type="text"
                        name="employeeName"
                        value={formData.employeeName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        data-pendo="employee-name-field"
                        id="employee-name-input"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID *</label>
                      <input
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        type="text"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        placeholder="C1XXXXXXX"
                        required
                        data-pendo="employee-id-field"
                        id="employee-id-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        data-pendo="department-select"
                        id="department-select"
                      >
                        <option value="">-- Select Department --</option>
                        <option value="technology">Technology</option>
                        <option value="digital">Digital</option>
                        <option value="risk">Risk Management</option>
                        <option value="finance">Finance</option>
                        <option value="hr">Human Resources</option>
                        <option value="marketing">Marketing</option>
                        <option value="operations">Operations</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Manager/Supervisor *</label>
                      <input
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        type="text"
                        name="manager"
                        value={formData.manager}
                        onChange={handleChange}
                        placeholder="Manager's name"
                        required
                        data-pendo="manager-field"
                        id="manager-input"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-6">
                    <div className="flex flex-col items-end">
                      {!isStep1Valid && (
                        <p className="text-sm text-gray-500 mb-2">
                          Please complete all required fields (*)
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={!isStep1Valid}
                        className="bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50 transition-colors font-medium pendo-submit-button"
                        data-pendo="submit-step1-personal-info"
                        id="pendo-step1-submit"
                      >
                        Save & Continue
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Step 2: Request Details */}
              {currentStep === 2 && (
                <form onSubmit={handleStepSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 2: Request Details</h3>
                    <p className="text-gray-600 mb-6">Specify the type and priority of your request</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">Request Type *</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="flex items-center p-4 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="requestType"
                          value="it-support"
                          onChange={handleChange}
                          checked={formData.requestType === 'it-support'}
                          className="mr-3 text-red-600 focus:ring-red-500"
                          data-pendo="request-type-it-support"
                          id="request-type-it-support"
                        />
                        <div>
                          <p className="font-medium">IT Support & Equipment</p>
                          <p className="text-sm text-gray-600">Hardware, software, or technical support</p>
                        </div>
                      </label>
                      <label className="flex items-center p-4 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="requestType"
                          value="hr-request"
                          onChange={handleChange}
                          checked={formData.requestType === 'hr-request'}
                          className="mr-3 text-red-600 focus:ring-red-500"
                          data-pendo="request-type-hr-request"
                          id="request-type-hr-request"
                        />
                        <div>
                          <p className="font-medium">HR Services</p>
                          <p className="text-sm text-gray-600">Benefits, payroll, or personnel matters</p>
                        </div>
                      </label>
                      <label className="flex items-center p-4 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="requestType"
                          value="facilities"
                          onChange={handleChange}
                          checked={formData.requestType === 'facilities'}
                          className="mr-3 text-red-600 focus:ring-red-500"
                          data-pendo="request-type-facilities"
                          id="request-type-facilities"
                        />
                        <div>
                          <p className="font-medium">Facilities & Workspace</p>
                          <p className="text-sm text-gray-600">Office space, maintenance, or supplies</p>
                        </div>
                      </label>
                      <label className="flex items-center p-4 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="requestType"
                          value="access-request"
                          onChange={handleChange}
                          checked={formData.requestType === 'access-request'}
                          className="mr-3 text-red-600 focus:ring-red-500"
                          data-pendo="request-type-access-request"
                          id="request-type-access-request"
                        />
                        <div>
                          <p className="font-medium">System Access Request</p>
                          <p className="text-sm text-gray-600">Application access or permissions</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level *</label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      data-pendo="priority-select"
                      id="priority-select"
                    >
                      <option value="">-- Select Priority --</option>
                      <option value="low">Low - General request</option>
                      <option value="medium">Medium - Business impact</option>
                      <option value="high">High - Critical business need</option>
                      <option value="urgent">Urgent - System down/blocking</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center p-4 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        name="approvalNeeded"
                        checked={formData.approvalNeeded}
                        onChange={handleChange}
                        className="mr-3 text-red-600 focus:ring-red-500"
                        data-pendo="approval-checkbox"
                        id="approval-checkbox"
                      />
                      <span className="text-sm text-gray-700">This request requires manager approval</span>
                    </label>
                  </div>

                  <div className="flex justify-between pt-6">
                    <button
                      type="button"
                      onClick={handleBackStep}
                      className="bg-gray-200 text-gray-800 py-3 px-6 rounded-md hover:bg-gray-300 transition-colors font-medium"
                      data-pendo="back-button-step2"
                      id="back-button-step2"
                    >
                      Back
                    </button>
                    <div className="flex flex-col items-end">
                      {!isStep2Valid && (
                        <p className="text-sm text-gray-500 mb-2">
                          Please select request type and priority
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={!isStep2Valid}
                        className="bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50 transition-colors font-medium pendo-submit-button"
                        data-pendo="submit-step2-request-details"
                        id="pendo-step2-submit"
                      >
                        Save & Continue
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Step 3: Description & Submit */}
              {currentStep === 3 && (
                <form onSubmit={handleFinalSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 3: Description & Review</h3>
                    <p className="text-gray-600 mb-6">Provide additional details and review your request</p>
                  </div>

                  {/* Request Summary */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Request Summary</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Employee:</span> {formData.employeeName}
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Department:</span> {formData.department}
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Request Type:</span> {getRequestTypeLabel(formData.requestType)}
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Priority:</span> {formData.priority}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Request Description *</label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Please provide detailed information about your request..."
                      required
                      data-pendo="description-textarea"
                      id="description-textarea"
                    />
                  </div>

                  <div className="flex justify-between pt-6">
                    <button
                      type="button"
                      onClick={handleBackStep}
                      className="bg-gray-200 text-gray-800 py-3 px-6 rounded-md hover:bg-gray-300 transition-colors font-medium"
                      data-pendo="back-button-step3"
                      id="back-button-step3"
                    >
                      Back
                    </button>
                    <div className="flex flex-col items-end">
                      {!isStep3Valid && (
                        <p className="text-sm text-gray-500 mb-2">
                          Please provide a description to submit your request
                        </p>
                      )}
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => console.log('Save as draft')}
                          className="bg-gray-200 text-gray-800 py-3 px-6 rounded-md hover:bg-gray-300 transition-colors font-medium"
                          data-pendo="save-draft-button"
                          id="save-draft-button"
                        >
                          Save as Draft
                        </button>
                        <button
                          type="submit"
                          disabled={!isStep3Valid}
                          className="bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50 transition-colors font-medium pendo-submit-button"
                          data-pendo="submit-step3-final-request"
                          id="pendo-step3-submit"
                        >
                          Submit Request
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'View My Requests', color: 'bg-blue-600 hover:bg-blue-700' },
              { label: 'Download Expense Report', color: 'bg-green-600 hover:bg-green-700' },
              { label: 'Update Profile', color: 'bg-purple-600 hover:bg-purple-700' },
              { label: 'Request Time Off', color: 'bg-orange-600 hover:bg-orange-700' },
              { label: 'IT Help Desk', color: 'bg-cyan-600 hover:bg-cyan-700' },
              { label: 'Emergency Contact', color: 'bg-red-600 hover:bg-red-700' },
            ].map((action, index) => (
              <button
                key={index}
                onClick={() => handleActionClick(action.label)}
                className={`${action.color} text-white py-3 px-4 rounded-md transition-colors font-medium text-sm`}
                data-pendo={`btn-${action.label.toLowerCase().replace(/\s+/g, '-')}`}
                id={`quick-action-${action.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pendo targeting styles */}
      <style>{`
        .pendo-submit-button {
          position: relative;
          z-index: 10;
        }
        
        .pendo-submit-button::before {
          content: '';
          position: absolute;
          inset: -2px;
          border: 2px solid transparent;
          border-radius: 8px;
          pointer-events: none;
        }
        
        /* Disabled button styling - no hover effects */
        .pendo-submit-button:disabled {
          background-color: #9ca3af !important;
          cursor: not-allowed !important;
          opacity: 0.5 !important;
          pointer-events: none !important;
        }
        
        .pendo-submit-button:disabled:hover {
          background-color: #9ca3af !important;
          transform: none !important;
          box-shadow: none !important;
        }
        
        /* Disable hover effects when Pendo is active */
        body[data-pendo-designer-mode] .pendo-submit-button:hover {
          background-color: inherit !important;
          transition: none !important;
        }
        
        /* Enhanced targeting for Pendo */
        .pendo-submit-button[data-pendo-target] {
          outline: 1px solid transparent;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}

export default InputForm;