// src/components/modals/ClaimDetailsModal.jsx
import React from "react";
import { X, User, FileText, Calendar, DollarSign, Tag, Clipboard, MessageSquare, Briefcase, Image as ImageIcon, History } from "lucide-react"; // Added ImageIcon and History

const ClaimDetailsModal = ({ claim, onClose }) => {
  if (!claim) return null; // Don't render if no claim is provided

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "Pending Review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl transform transition-all scale-100 opacity-100 relative max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-insurance-neutral-dark">Claim Details: {claim.id}</h2>
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
            <User className="w-5 h-5 text-insurance-orange mr-3" />
            <div>
              <p className="text-sm font-medium">Client Name</p>
              <p className="font-semibold">{claim.clientName}</p>
            </div>
          </div>
          <div className="flex items-center">
            <FileText className="w-5 h-5 text-insurance-orange mr-3" />
            <div>
              <p className="text-sm font-medium">Policy Type</p>
              <p className="font-semibold">{claim.policyType}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-insurance-orange mr-3" />
            <div>
              <p className="text-sm font-medium">Date Filed</p>
              <p className="font-semibold">{claim.dateFiled}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Briefcase className="w-5 h-5 text-insurance-orange mr-3" />
            <div>
              <p className="text-sm font-medium">Assigned Agent</p>
              <p className="font-semibold">{claim.assignedAgent}</p>
            </div>
          </div>
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 text-insurance-orange mr-3" />
            <div>
              <p className="text-sm font-medium">Amount Claimed</p>
              <p className="font-semibold text-green-700">{claim.amountClaimed}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Tag className="w-5 h-5 text-insurance-orange mr-3" />
            <div>
              <p className="text-sm font-medium">Status</p>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusClass(claim.status)}`}>
                {claim.status}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <History className="w-5 h-5 text-insurance-orange mr-3" />
            <div>
              <p className="text-sm font-medium">Last Updated</p>
              <p className="font-semibold">{claim.lastUpdated}</p>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 flex items-start">
            <Clipboard className="w-5 h-5 text-insurance-orange mt-1 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">Description</p>
              <p className="text-gray-800">{claim.description}</p>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 flex items-start">
            <MessageSquare className="w-5 h-5 text-insurance-orange mt-1 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">Internal Notes</p>
              <p className="text-gray-800 italic">{claim.notes || "No notes available."}</p>
            </div>
          </div>

          {claim.images && claim.images.length > 0 && (
            <div className="col-span-1 md:col-span-2 mt-4">
              <div className="flex items-center mb-3">
                <ImageIcon className="w-5 h-5 text-insurance-orange mr-3" />
                <p className="text-sm font-medium text-insurance-neutral-dark">Supporting Images</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {claim.images.map((image, index) => (
                  <div key={index} className="w-full h-24 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-100">
                    <img
                      src={image}
                      alt={`Claim image ${index + 1}`}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
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

export default ClaimDetailsModal;