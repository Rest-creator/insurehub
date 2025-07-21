// src/pages/admin/AdminSettings.jsx
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Container from "../../components/ui/Container";
import FadeIn from "../../components/animations/FadeIn";
import { useToast } from "../../hooks/use-toast"; // Assuming you have a useToast hook for notifications
import {
  Settings,
  Globe,        // For general settings
  Shield,       // For security/user account settings
  Bell,         // For notification settings
  Save,         // For save button
  ToggleLeft,   // For toggle/checkbox if not using a custom switch component
} from "lucide-react";

const AdminSettings = () => {
  const { toast } = useToast();

  // State for General Settings
  const [platformName, setPlatformName] = useState("InsureHub");
  const [defaultCurrency, setDefaultCurrency] = useState("USD");
  const [dateFormat, setDateFormat] = useState("YYYY-MM-DD");

  // State for User Account Settings
  const [defaultNewUserRole, setDefaultNewUserRole] = useState("Client");
  const [minPasswordLength, setMinPasswordLength] = useState(8);
  const [enableAdmin2FA, setEnableAdmin2FA] = useState(true);

  // State for Notification Settings
  const [enableEmailNotifications, setEnableEmailNotifications] = useState(true);
  const [adminAlertEmail, setAdminAlertEmail] = useState("admin@insurehub.com");

  // State for System Maintenance
  const [maintenanceMode, setMaintenanceMode] = useState(false);


  const handleSaveChanges = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend API
    console.log("Saving settings:", {
      platformName,
      defaultCurrency,
      dateFormat,
      defaultNewUserRole,
      minPasswordLength,
      enableAdmin2FA,
      enableEmailNotifications,
      adminAlertEmail,
      maintenanceMode,
    });

    // Simulate API call success
    toast({
      title: "Settings Saved!",
      description: "Your administration settings have been updated.",
      variant: "success", // Assuming you have a success variant for toast
    });
  };

  return (
    <>
      <Helmet>
        <title>Administration Settings - InsureHub Admin</title>
        <meta
          name="description"
          content="Configure global administration settings for the InsureHub platform."
        />
      </Helmet>

      <div className="pt-4 pb-8 md:pt-6 md:pb-12">
        <Container>
          <FadeIn direction="up">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="heading-2 text-insurance-neutral-dark mb-2">
                  Administration Settings
                </h1>
                <p className="text-gray-600">
                  Manage core configurations for the InsureHub platform.
                </p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </div>

      <section className="py-8">
        <Container>
          <FadeIn direction="up" delay={200}>
            <form onSubmit={handleSaveChanges} className="glass-card rounded-xl p-6 space-y-8">

              {/* General Settings */}
              <div>
                <h3 className="text-xl font-semibold text-insurance-neutral-dark mb-4 flex items-center">
                  <Globe className="w-6 h-6 mr-3 text-insurance-orange" /> General Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="platformName" className="block text-sm font-medium text-gray-700 mb-1">
                      Platform Name
                    </label>
                    <input
                      type="text"
                      id="platformName"
                      className="form-input"
                      value={platformName}
                      onChange={(e) => setPlatformName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="defaultCurrency" className="block text-sm font-medium text-gray-700 mb-1">
                      Default Currency
                    </label>
                    <select
                      id="defaultCurrency"
                      className="form-select"
                      value={defaultCurrency}
                      onChange={(e) => setDefaultCurrency(e.target.value)}
                    >
                      <option value="USD">USD - United States Dollar</option>
                      <option value="ZWL">ZWL - Zimbabwean Dollar</option>
                      <option value="GBP">GBP - British Pound</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700 mb-1">
                      Date Format
                    </label>
                    <select
                      id="dateFormat"
                      className="form-select"
                      value={dateFormat}
                      onChange={(e) => setDateFormat(e.target.value)}
                    >
                      <option value="YYYY-MM-DD">YYYY-MM-DD (2025-07-18)</option>
                      <option value="DD-MM-YYYY">DD-MM-YYYY (18-07-2025)</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY (07/18/2025)</option>
                    </select>
                  </div>
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* User Account Settings */}
              <div>
                <h3 className="text-xl font-semibold text-insurance-neutral-dark mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-insurance-orange" /> User Account Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="defaultNewUserRole" className="block text-sm font-medium text-gray-700 mb-1">
                      Default New User Role
                    </label>
                    <select
                      id="defaultNewUserRole"
                      className="form-select"
                      value={defaultNewUserRole}
                      onChange={(e) => setDefaultNewUserRole(e.target.value)}
                    >
                      <option value="Client">Client</option>
                      <option value="Agent">Agent</option>
                      <option value="Company Admin">Company Admin</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="minPasswordLength" className="block text-sm font-medium text-gray-700 mb-1">
                      Minimum Password Length
                    </label>
                    <input
                      type="number"
                      id="minPasswordLength"
                      className="form-input"
                      value={minPasswordLength}
                      onChange={(e) => setMinPasswordLength(Number(e.target.value))}
                      min="6"
                      max="32"
                    />
                  </div>
                  <div className="flex items-center mt-2 md:col-span-2">
                    <input
                      type="checkbox"
                      id="enableAdmin2FA"
                      className="form-checkbox h-5 w-5 text-insurance-orange rounded focus:ring-insurance-orange"
                      checked={enableAdmin2FA}
                      onChange={(e) => setEnableAdmin2FA(e.target.checked)}
                    />
                    <label htmlFor="enableAdmin2FA" className="ml-2 block text-sm font-medium text-gray-700">
                      Enable Two-Factor Authentication for Admins
                    </label>
                  </div>
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* Notification Settings */}
              <div>
                <h3 className="text-xl font-semibold text-insurance-neutral-dark mb-4 flex items-center">
                  <Bell className="w-6 h-6 mr-3 text-insurance-orange" /> Notification Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      id="enableEmailNotifications"
                      className="form-checkbox h-5 w-5 text-insurance-orange rounded focus:ring-insurance-orange"
                      checked={enableEmailNotifications}
                      onChange={(e) => setEnableEmailNotifications(e.target.checked)}
                    />
                    <label htmlFor="enableEmailNotifications" className="ml-2 block text-sm font-medium text-gray-700">
                      Enable System Email Notifications
                    </label>
                  </div>
                  <div>
                    <label htmlFor="adminAlertEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Admin Alert Email Address
                    </label>
                    <input
                      type="email"
                      id="adminAlertEmail"
                      className="form-input"
                      value={adminAlertEmail}
                      onChange={(e) => setAdminAlertEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* System Maintenance */}
              <div>
                <h3 className="text-xl font-semibold text-insurance-neutral-dark mb-4 flex items-center">
                  <ToggleLeft className="w-6 h-6 mr-3 text-insurance-orange" /> System Maintenance
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      id="maintenanceMode"
                      className="form-checkbox h-5 w-5 text-red-500 rounded focus:ring-red-500" // Red for caution
                      checked={maintenanceMode}
                      onChange={(e) => setMaintenanceMode(e.target.checked)}
                    />
                    <label htmlFor="maintenanceMode" className="ml-2 block text-sm font-medium text-gray-700">
                      Enable Maintenance Mode (Platform will be inaccessible)
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 md:col-span-2">
                    * Enabling maintenance mode will make the public-facing InsureHub platform unavailable to users. Only administrators can access.
                  </p>
                </div>
              </div>


              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  className="btn-primary flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </form>
          </FadeIn>
        </Container>
      </section>
    </>
  );
};

export default AdminSettings;