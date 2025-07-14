import { Home, Car, Heart, Shield } from "lucide-react"; // Import your icons

const PolicyCard = ({ policies }) => {
  // Get appropriate icon based on policy type
  const getPolicyIcon = (policyType) => {
    switch (policyType.toLowerCase()) {
      case "home":
        return <Home className="w-6 h-6 text-insurance-orange" />;
      case "auto":
      case "car":
        return <Car className="w-6 h-6 text-insurance-orange" />;
      case "health":
        return <Heart className="w-6 h-6 text-insurance-orange" />;
      case "life":
        return <Shield className="w-6 h-6 text-insurance-orange" />;
      default:
        return <Home className="w-6 h-6 text-insurance-orange" />;
    }
  };

  // Format coverage amount to currency
  const formatCoverage = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!policies || policies.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">You don't have any active policies yet.</p>
        <button className="mt-4 px-4 py-2 bg-insurance-orange text-white rounded-md hover:bg-insurance-orange-dark">
          Get a Quote
        </button>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {policies.map((policy) => (
        <div key={policy.policy_number} className="p-6 flex items-center">
          <div className="w-12 h-12 rounded-full bg-insurance-orange-light/50 flex items-center justify-center mr-4">
            {getPolicyIcon(policy.policy_type)}
          </div>
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-semibold text-insurance-neutral-dark">
                  {policy.policy_type} Insurance
                </h3>
                <p className="text-sm text-gray-500">
                  Policy #{policy.policy_number}
                </p>
              </div>
              <div className="flex flex-col md:items-end mt-2 md:mt-0">
                <span
                  className={`text-sm font-medium ${
                    policy.status === "Active"
                      ? "text-insurance-green-dark"
                      : "text-insurance-red-dark"
                  }`}
                >
                  {policy.status}
                </span>
                {policy.renewal_days > 0 && (
                  <span className="text-sm text-gray-500">
                    Renews in {policy.renewal_days} days
                  </span>
                )}
              </div>
            </div>
            <div className="mt-3 flex flex-col md:flex-row md:items-center md:justify-between">
              <span className="text-gray-600 text-sm">
                Coverage: {formatCoverage(policy.coverage_amount)}
              </span>
              <div className="flex space-x-2 mt-2 md:mt-0">
                <button className="text-sm text-gray-600 hover:text-insurance-orange">
                  View Details
                </button>
                <button className="text-sm text-insurance-orange hover:text-insurance-orange-dark">
                  File Claim
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PolicyCard;