import {
  X,
  ShieldCheck,
  Clock,
  TrendingUp,
  Check,
  ArrowRight,
} from "lucide-react";
import FadeIn from "../components/animations/FadeIn";
import { useNavigate } from "react-router-dom";

const InsuranceProductModal = ({ product, onClose }) => {
  if (!product) return null;
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            className="absolute inset-0 bg-gray-500 opacity-75"
            onClick={onClose}
          ></div>
        </div>

        {/* Modal container */}
        <FadeIn direction="up">
          <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
            <div className="bg-white px-6 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-insurance-neutral-dark">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Provided by{" "}
                    <span className="font-medium">{product.provider}</span>
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-4 flex items-center">
                <div className="flex items-center bg-insurance-green-light/50 text-insurance-green-dark px-3 py-1 rounded-md text-sm">
                  <span className="mr-1">{product.rating}</span>
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="ml-3 text-sm text-gray-500">
                  {product.reviews} reviews
                </span>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Coverage Details
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="mt-1 mr-3 p-1.5 rounded-full bg-insurance-orange/10 text-insurance-orange">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          Coverage Amount
                        </p>
                        <p className="text-gray-600">
                          {product.coverageAmount}
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 mr-3 p-1.5 rounded-full bg-insurance-orange/10 text-insurance-orange">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Policy Term</p>
                        <p className="text-gray-600">{product.term}</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 mr-3 p-1.5 rounded-full bg-insurance-orange/10 text-insurance-orange">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Deductible</p>
                        <p className="text-gray-600">{product.deductible}</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Key Features
                  </h4>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mt-1 mr-3 p-1.5 rounded-full bg-insurance-orange/10 text-insurance-orange">
                          <Check className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-gray-800">{feature}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3">Pricing</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500">Monthly Premium</p>
                  <p className="text-2xl font-bold text-insurance-neutral-dark">
                    {product.price}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500">Annual Savings</p>
                  <p className="text-2xl font-bold text-insurance-green-dark">
                    {product.annualSavings}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-3 py-1 text-xs bg-insurance-orange/10 text-insurance-orange rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 rounded-b-xl">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-500">
                  Ready to get started? Click below to proceed with the
                  application.
                </p>
                <button
                  className="btn-primary w-full sm:w-auto inline-flex items-center justify-center"
                  onClick={() =>
                    navigate("/insurance-docs", {
                      state: { selectedProduct: product },
                    })
                  }
                >
                  Get Covered Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default InsuranceProductModal;
