// src/components/common/NotificationsModal.jsx
import React from "react";
import { X, Info, AlertTriangle, CheckCircle, Bell } from "lucide-react";

const NotificationsModal = ({ notifications, onClose, onMarkAsRead, onClearAll }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-insurance-neutral-dark flex items-center">
            <Bell className="w-6 h-6 mr-3 text-insurance-orange" />
            Notifications
            <span className="ml-3 bg-insurance-orange text-white text-xs rounded-full px-3 py-1">
                {notifications.filter(n => !n.read).length} Unread
            </span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              <p className="text-lg mb-2">No new notifications.</p>
              <p className="text-sm">You're all caught up!</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start p-4 rounded-lg transition-colors duration-200 ${
                  notification.read ? "bg-gray-50 text-gray-500" : "bg-blue-50 text-insurance-neutral-dark hover:bg-blue-100"
                }`}
              >
                {notification.type === "info" && (
                  <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5 mr-3" />
                )}
                {notification.type === "warning" && (
                  <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5 mr-3" />
                )}
                {notification.type === "alert" && (
                  <Bell className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5 mr-3" />
                )}
                 {notification.type === "success" && (
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 mr-3" />
                )}
                <div className="flex-grow">
                  <p className={`font-medium ${notification.read ? 'text-gray-600' : 'text-insurance-neutral-dark'}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                </div>
                {!notification.read && (
                  <button
                    onClick={() => onMarkAsRead(notification.id)}
                    className="ml-4 px-3 py-1 bg-white border border-gray-300 rounded-md text-xs text-gray-600 hover:bg-gray-100 transition-colors flex-shrink-0"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {notifications.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
            <button
              onClick={onClearAll}
              className="btn-outline-primary text-sm px-4 py-2"
            >
              Clear All Notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsModal;