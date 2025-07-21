// src/components/modals/CompanyDetailsModal.jsx
import React from "react";
import { X, Building, User, Mail, Phone, Calendar, BarChart, Clock, Globe, Info, ExternalLink, FileText, Tag } from "lucide-react";

const CompanyDetailsModal = ({ company, onClose }) => {
  if (!company) return null;

  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "Inactive":
        return "bg-red-100 text-red-800 border-red-200";
      case "Pending Review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all scale-100 opacity-100 relative max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-insurance-neutral-dark">Company Details: {company.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-gray-700">
          <div className="flex items-center">
            <Building className="w-5 h-5 text-insurance-orange mr-3" />
            <div>
              <p className="text-sm font-medium">Company ID</p>
              <p className="font-semibold">{company.id}</p>
            </div>
          </div>
          <div className="flex items-center">
            <User className="w-5 h-5 text-insurance-orange mr-3" />
            <div>
              <p className="text-sm font-medium">Contact Person</p>
              <p className="font-semibold">{company.contactPerson}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-insurance-orange mr-3" />
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="font-semibold">{company.email}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-insurance-orange mr-3" />
            <div>
              <p className="text-sm font-medium">Phone</p>
              <p className="font-semibold">{company.phone}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-insurance-orange mr-3" />
            <div>
              <p className="text-sm font-medium">Joined Date</p>
              <p className="font-semibold">{company.joinedDate}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-insurance-orange mr-3" />
            <div>
              <p className="text-sm font-medium">Last Activity</p>
              <p className="font-semibold">{company.lastActivity}</p>
            </div>
          </div>
          <div className="flex items-center">
            <BarChart className="w-5 h-5 text-insurance-orange mr-3" />
            <div>
              <p className="text-sm font-medium">Products Offered</p>
              <p className="font-semibold">{company.productsCount}</p>
            </div>
          </div>
          <div className="flex items-center">
            <FileText className="w-5 h-5 text-insurance-orange mr-3" />
            <div>
              <p className="text-sm font-medium">Active Policies</p>
              <p className="font-semibold">{company.activePolicies.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center col-span-1 md:col-span-2">
            <Tag className="w-5 h-5 text-insurance-orange mr-3" /> {/* Tag icon from lucide-react */}
            <div>
              <p className="text-sm font-medium">Status</p>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusClass(company.status)}`}>
                {company.status}
              </span>
            </div>
          </div>
          {company.website && (
            <div className="flex items-center col-span-1 md:col-span-2">
              <Globe className="w-5 h-5 text-insurance-orange mr-3" />
              <div>
                <p className="text-sm font-medium">Website</p>
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline flex items-center">
                  {company.website} <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          )}
          <div className="col-span-1 md:col-span-2 flex items-start">
            <Info className="w-5 h-5 text-insurance-orange mt-1 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">Description</p>
              <p className="text-gray-800">{company.description || "No description provided."}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="btn-outline-primary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsModal;