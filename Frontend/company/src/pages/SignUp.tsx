import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import {
  Building,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  Loader,
  User,
  Phone,
  Globe,
  FileText,
  Landmark,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/ui/Container";
import FadeIn from "../components/animations/FadeIn";
import Server from "@/components/server/Server";
import { toast } from "sonner";
import { IndexedDB } from "../constants/indexedDB"; // Ensure this path is correct

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    password: "",
    confirmPassword: "",
    contactPerson: "",
    phoneNumber: "",
    website: "",
    companyType: "",
    registrationNumber: "",
    taxId: "",
    yearFounded: "",
    numberOfEmployees: "",
    address: "",
    country: "",
    insuranceLicenseNumber: "",
    regulatoryBody: "",
    description: "",
    agreed_tnc: false,
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    // Prepare data for backend API
    const submissionData = {
      email: formData.companyEmail,
      password: formData.password,
      first_name: formData.contactPerson || formData.companyName || "",
      last_name: formData.companyName || "Company",
      company_name: formData.companyName,
      contact_person: formData.contactPerson,
      contact_phonenumber: formData.phoneNumber,
      company_website: formData.website,
      company_type: formData.companyType,
      company_registration_number: formData.registrationNumber,
      year_founded: formData.yearFounded,
      tax_identification_number: formData.taxId,
      insurance_license_number: formData.insuranceLicenseNumber,
      regulatory_body: formData.regulatoryBody,
      employees_range: formData.numberOfEmployees,
      country: formData.country,
      company_address: formData.address,
      company_description: formData.description,
      company_code: "", // Optional or generate as needed
    };

    try {
      const response = await fetch("http://localhost:8000/company/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.detail || data.message || "Registration successful");
        setTimeout(() => {
          navigate("/"); // Navigate to home or a success page
        }, 3000);
      } else {
        toast.error(data.detail || data.message || data.error || "Error during registration. Please check your details.");
      }
    } catch (error) {
      console.error("Error registering company:", error);
      toast.error("An error occurred while submitting your registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Company Registration - InsureHub</title>
        <meta
          name="description"
          content="Register your insurance company on InsureHub to access our platform and services."
        />
      </Helmet>

      <main className="min-h-screen flex flex-col">
        <Navbar />

        <div className="flex-grow flex items-center justify-center py-16">
          <Container>
            <div className="max-w-3xl mx-auto">
              <FadeIn direction="up">
                <div className="text-center mb-8">
                  <h1 className="heading-2 text-insurance-neutral-dark mb-3">
                    Company Registration
                  </h1>
                  <p className="text-gray-600">
                    Complete this form to register your insurance company for
                    platform access
                  </p>
                  <div className="mt-4 flex justify-center">
                    <div className="flex items-center">
                      {[1, 2, 3].map((stepNumber) => (
                        <div key={stepNumber} className="flex items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              step === stepNumber
                                ? "bg-insurance-orange text-white"
                                : step > stepNumber
                                ? "bg-insurance-green-dark text-white"
                                : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {stepNumber}
                          </div>
                          {stepNumber < 3 && (
                            <div
                              className={`w-16 h-1 ${
                                step > stepNumber
                                  ? "bg-insurance-green-dark"
                                  : "bg-gray-200"
                              }`}
                            ></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="glass-card p-8 rounded-xl">
                  <form onSubmit={handleSubmit}>
                    {step === 1 && (
                      <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-insurance-neutral-dark mb-4">
                          Basic Information
                        </h2>

                        <div>
                          <label
                            htmlFor="companyName"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Company Legal Name
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Building className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              id="companyName"
                              name="companyName"
                              type="text"
                              required
                              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-insurance-orange/20 focus:border-insurance-orange/20"
                              placeholder="Your Company Ltd."
                              value={formData.companyName}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="companyEmail"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Company Email
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              id="companyEmail"
                              name="companyEmail"
                              type="email"
                              required
                              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-insurance-orange/20 focus:border-insurance-orange/20"
                              placeholder="admin@company.com"
                              value={formData.companyEmail}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="contactPerson"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Primary Contact Person
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              id="contactPerson"
                              name="contactPerson"
                              type="text"
                              required
                              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-insurance-orange/20 focus:border-insurance-orange/20"
                              placeholder="John Doe"
                              value={formData.contactPerson}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="phoneNumber"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Contact Phone Number
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Phone className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              id="phoneNumber"
                              name="phoneNumber"
                              type="tel"
                              required
                              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-insurance-orange/20 focus:border-insurance-orange/20"
                              placeholder="+1234567890"
                              value={formData.phoneNumber}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="website"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Company Website
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Globe className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              id="website"
                              name="website"
                              type="url"
                              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-insurance-orange/20 focus:border-insurance-orange/20"
                              placeholder="https://www.company.com"
                              value={formData.website}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={nextStep}
                            className="btn-primary"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-insurance-neutral-dark mb-4">
                          Legal & Regulatory Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label
                              htmlFor="companyType"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Company Type
                            </label>
                            <select
                              id="companyType"
                              name="companyType"
                              required
                              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-insurance-orange/20 focus:border-insurance-orange/20"
                              value={formData.companyType}
                              onChange={handleChange}
                            >
                              <option value="">Select company type</option>
                              <option value="insurance_provider">
                                Insurance Provider
                              </option>
                              <option value="broker">Broker</option>
                              <option value="reinsurance">
                                Reinsurance Company
                              </option>
                              <option value="mga">
                                MGA (Managing General Agent)
                              </option>
                              <option value="other">Other</option>
                            </select>
                          </div>

                          <div>
                            <label
                              htmlFor="registrationNumber"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Company Registration Number
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FileText className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                id="registrationNumber"
                                name="registrationNumber"
                                type="text"
                                required
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-insurance-orange/20 focus:border-insurance-orange/20"
                                placeholder="Registration number"
                                value={formData.registrationNumber}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="taxId"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Tax Identification Number
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Landmark className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                id="taxId"
                                name="taxId"
                                type="text"
                                required
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-insurance-orange/20 focus:border-insurance-orange/20"
                                placeholder="Tax ID"
                                value={formData.taxId}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="yearFounded"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Year Founded
                            </label>
                            <input
                              id="yearFounded"
                              name="yearFounded"
                              type="number"
                              min="1900"
                              max={new Date().getFullYear()}
                              className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-insurance-orange/20 focus:border-insurance-orange/20"
                              placeholder="Year"
                              value={formData.yearFounded}
                              onChange={handleChange}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="insuranceLicenseNumber"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Insurance License Number
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FileText className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                id="insuranceLicenseNumber"
                                name="insuranceLicenseNumber"
                                type="text"
                                required
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-insurance-orange/20 focus:border-insurance-orange/20"
                                placeholder="License number"
                                value={formData.insuranceLicenseNumber}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="regulatoryBody"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Primary Regulatory Body
                            </label>
                            <input
                              id="regulatoryBody"
                              name="regulatoryBody"
                              type="text"
                              required
                              className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-insurance-orange/20 focus:border-insurance-orange/20"
                              placeholder="e.g., FCA, NAIC, etc."
                              value={formData.regulatoryBody}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <button
                            type="button"
                            onClick={prevStep}
                            className="btn-secondary"
                          >
                            Back
                          </button>
                          <button
                            type="button"
                            onClick={nextStep}
                            className="btn-primary"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-insurance-neutral-dark mb-4">
                          Additional Information & Account Setup
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label
                              htmlFor="numberOfEmployees"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Number of Employees
                            </label>
                            <select
                              id="numberOfEmployees"
                              name="numberOfEmployees"
                              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-insurance-orange/20 focus:border-insurance-orange/20"
                              value={formData.numberOfEmployees}
                              onChange={handleChange}
                            >
                              <option value="">Select range</option>
                              <option value="1-10">1-10</option>
                              <option value="11-50">11-50</option>
                              <option value="51-200">51-200</option>
                              <option value="201-500">201-500</option>
                              <option value="501-1000">501-1000</option>
                              <option value="1000+">1000+</option>
                            </select>
                          </div>

                          <div>
                            <label
                              htmlFor="country"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Country of Operation
                            </label>
                            <input
                              id="country"
                              name="country"
                              type="text"
                              required
                              className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-insurance-orange/20 focus:border-insurance-orange/20"
                              placeholder="Country"
                              value={formData.country}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="address"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Company Address
                          </label>
                          <textarea
                            id="address"
                            name="address"
                            rows={3}
                            className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-insurance-orange/20 focus:border-insurance-orange/20"
                            placeholder="Full company address"
                            value={formData.address}
                            onChange={handleChange}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Company Description
                          </label>
                          <textarea
                            id="description"
                            name="description"
                            rows={4}
                            className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-insurance-orange/20 focus:border-insurance-orange/20"
                            placeholder="Brief description of your company and services"
                            value={formData.description}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-insurance-neutral-dark">
                            Account Credentials
                          </h3>

                          <div>
                            <label
                              htmlFor="password"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Password
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-insurance-orange/20 focus:border-insurance-orange/20"
                                placeholder="Create a strong password"
                                value={formData.password}
                                onChange={handleChange}
                              />
                              <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-5 w-5 text-gray-400" />
                                ) : (
                                  <Eye className="h-5 w-5 text-gray-400" />
                                )}
                              </button>
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="confirmPassword"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Confirm Password
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                required
                                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-insurance-orange/20 focus:border-insurance-orange/20"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <p className="text-sm font-medium text-gray-700">
                              Password must include:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <div className="flex items-center text-sm">
                                <Check className="h-4 w-4 text-insurance-green-dark mr-2" />
                                <span className="text-gray-600">
                                  At least 8 characters
                                </span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Check className="h-4 w-4 text-insurance-green-dark mr-2" />
                                <span className="text-gray-600">
                                  One uppercase letter
                                </span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Check className="h-4 w-4 text-insurance-green-dark mr-2" />
                                <span className="text-gray-600">
                                  One number
                                </span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Check className="h-4 w-4 text-insurance-green-dark mr-2" />
                                <span className="text-gray-600">
                                  One special character
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="agreed_tnc"
                              name="agreed_tnc"
                              type="checkbox"
                              required
                              checked={formData.agreed_tnc}
                              onChange={handleChange}
                              className="h-4 w-4 text-insurance-orange focus:ring-insurance-orange/20 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="agreed_tnc"
                              className="text-gray-600"
                            >
                              I certify that all information provided is
                              accurate and agree to the{" "}
                              <a
                                href="#"
                                className="text-insurance-orange hover:text-insurance-orange-dark"
                              >
                                Terms of Service
                              </a>{" "}
                              and{" "}
                              <a
                                href="#"
                                className="text-insurance-orange hover:text-insurance-orange-dark"
                              >
                                Privacy Policy
                              </a>
                            </label>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <button
                            type="button"
                            onClick={prevStep}
                            className="btn-secondary"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className="btn-primary flex items-center justify-center"
                            disabled={loading}
                          >
                            {loading ? (
                              <span className="flex">
                                <Loader className="animate-spin mr-2" />{" "}
                                Submitting...
                              </span>
                            ) : (
                              "Submit for Review"
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </form>

                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">
                          Already have an account?
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <Link
                        to="/company/login"
                        className="text-sm text-insurance-orange hover:text-insurance-orange-dark"
                      >
                        Log in to your company account
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </Container>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default SignUp;
