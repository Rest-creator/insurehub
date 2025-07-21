import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/ui/Container";
import FadeIn from "../components/animations/FadeIn";
// import Server from "@/components/server/Server"; // No longer needed
import { toast } from "sonner"; // Assuming you have sonner for toasts
import { IndexedDB } from "../constants/indexedDB"; // Make sure path is correct and it includes company functions

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mimic successful login by storing dummy user data
      setTimeout(() => {
        toast.success("Logged in successfully!");
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Company Login - InsureHub</title>
        <meta
          name="description"
          content="Log in to your company's InsureHub account to manage policies, claims, and employee benefits."
        />
      </Helmet>

      <main className="min-h-screen flex flex-col">
        <Navbar />

        <div className="flex-grow flex items-center justify-center py-16">
          <Container>
            <div className="max-w-md mx-auto">
              <FadeIn direction="up">
                <div className="text-center mb-8">
                  <h1 className="heading-2 text-insurance-neutral-dark mb-3">
                    Company Portal
                  </h1>
                  <p className="text-gray-600">
                    Log in to manage your corporate insurance portfolio
                  </p>
                </div>

                <div className="glass-card p-8 rounded-xl">
                  <form onSubmit={handleLogin}>
                    <div className="space-y-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Work Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-insurance-orange/20 focus:border-insurance-orange/20"
                            placeholder="your.company@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>

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
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            id="remember_me"
                            name="remember_me"
                            type="checkbox"
                            className="h-4 w-4 text-insurance-orange focus:ring-insurance-orange/20 border-gray-300 rounded"
                          />
                          <label
                            htmlFor="remember_me"
                            className="ml-2 block text-sm text-gray-700"
                          >
                            Remember me
                          </label>
                        </div>

                        <a
                          href="#"
                          className="text-sm text-insurance-orange hover:text-insurance-orange-dark"
                        >
                          Forgot password?
                        </a>
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="w-full btn-primary flex items-center justify-center"
                          disabled={loading}
                        >
                          {loading ? (
                            <span className="flex">
                              <Loader className="animate-spin mr-2" />
                              Logging in...
                            </span>
                          ) : (
                            "Log in to Company Portal"
                          )}
                        </button>
                      </div>
                    </div>
                  </form>

                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">
                          Need help?
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <Link
                        to="/company-sign-up" // Adjusted link to match your company sign up
                        className="text-sm text-insurance-orange hover:text-insurance-orange-dark"
                      >
                        Create a company account
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

export default Login;