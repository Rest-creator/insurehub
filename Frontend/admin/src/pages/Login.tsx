import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/ui/Container";
import FadeIn from "../components/animations/FadeIn";
import Server from "@/components/server/Server";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Assuming user_type is needed for some reason
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = { email, password };
    // For demonstration, we're just redirecting to dashboard without actual authentication
    Server.signin(data)
      .then((response) => {
        localStorage.setItem("userData", JSON.stringify(response.data));
        console.log(response.data);

        const userType = response.data.userType;

        if (userType === "individual") {
          navigate("/dashboard");
        } else if (userType === "business") {
          navigate("/admin/edit-company-profile");
        } else if (userType === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("Login failed. Please check your credentials.");
      })
      .finally(() => {
        setLoading(false);
      });
    }
    return (
      <>
        <Helmet>
          <title>Login - InsureHub</title>
          <meta
            name="description"
            content="Log in to your InsureHub account to manage your insurance policies, claims, and more."
          />
        </Helmet>

        <main className="min-h-screen flex flex-col">
          <Navbar />

          <div className="flex-grow flex items-center justify-center py-16">
            <Container>
              <div className="max-w-md mx-auto">
                <FadeIn direction="up">
                  <div className="text-center mb-8">
                    <h1 className="heading-2 mb-3 text-insurance-orange">
                      Welcome back Admin
                    </h1>
                  </div>

                  <div className="glass-card p-8 rounded-xl">
                    <form onSubmit={handleLogin}>
                      <div className="space-y-6">
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Admin Email Address
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
                              placeholder="you@example.com"
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
                          {/* <div className="flex items-center">
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
                          </div> */}

                          <a
                            href="#"
                            className="text-sm text-insurance-orange hover:text-insurance-orange-dark"
                          >
                            Forgot password? contact system administrator with your work email
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
                              <Loader className="animate-spin mr-2" />{" "}
                              Logging in...
                            </span>
                          ) : (
                            "Log in"
                          )}
                        </button>
                        </div>
                      </div>
                    </form>
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
