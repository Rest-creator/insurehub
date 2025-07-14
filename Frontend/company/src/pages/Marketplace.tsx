import { Helmet } from "react-helmet-async";
import {
  Search,
  Filter,
  Tag,
  TrendingUp,
  ShieldCheck,
  BadgePercent,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/ui/Container";
import FadeIn from "../components/animations/FadeIn";
import { useEffect, useState } from "react";
import Server from "@/components/server/Server";
import InsuranceProductModal from "./InsuranceProductModal";

const Marketplace = () => {
  const [insuranceProducts, setInsuranceProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchInsuranceProducts = async () => {
    // Fetch insurance products from the API
    Server.getMarketplaceProducts()
      .then((response) => {
        setInsuranceProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchInsuranceProducts();
  }, []);
  return (
    <>
      <Helmet>
        <title>Insurance Marketplace - InsureHub</title>
        <meta
          name="description"
          content="Browse and compare insurance products from top providers on InsureHub's marketplace."
        />
      </Helmet>

      <main className="min-h-screen flex flex-col">
        <Navbar />

        <div className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-br from-white to-insurance-neutral/50">
          <Container>
            <FadeIn direction="up">
              <div className="text-center max-w-3xl mx-auto">
                <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-insurance-orange-light text-insurance-orange rounded-full mb-6">
                  Marketplace
                </span>
                <h1 className="heading-1 text-insurance-neutral-dark mb-6">
                  Find the Perfect Insurance Coverage
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Compare offerings from leading insurance providers and find
                  the best coverage for your needs.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={100}>
              <div className="mt-10 max-w-4xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search insurance products..."
                    className="w-full py-3 px-5 pr-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-insurance-orange/20 focus:border-insurance-orange/20"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-insurance-orange">
                    <Search className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  <button className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-700 hover:bg-insurance-orange/5 hover:border-insurance-orange/30">
                    <Filter className="h-4 w-4 mr-2" />
                    <span>Filter</span>
                  </button>
                  <button className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-700 hover:bg-insurance-orange/5 hover:border-insurance-orange/30">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    <span>Sort by Rating</span>
                  </button>
                  <button className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-700 hover:bg-insurance-orange/5 hover:border-insurance-orange/30">
                    <Tag className="h-4 w-4 mr-2" />
                    <span>Popular Plans</span>
                  </button>
                </div>
              </div>
            </FadeIn>
          </Container>
        </div>

        <section className="py-16">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {insuranceProducts.map((product, index) => (
                <FadeIn key={product.id} direction="up" delay={index * 100}>
                  <div className="glass-card overflow-hidden rounded-xl hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-insurance-neutral-dark">
                          {product.name}
                        </h3>
                        <div className="flex items-center bg-insurance-green-light/50 text-insurance-green-dark px-2 py-1 rounded-md text-sm">
                          <span className="mr-1">{product.rating}</span>
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-2">
                        Provider:{" "}
                        <span className="font-medium">{product.provider}</span>
                      </p>
                      <p className="text-gray-600 mb-4">
                        {product.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="inline-block px-2 py-1 text-xs bg-insurance-orange/10 text-insurance-orange rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <div>
                          <p className="text-sm text-gray-500">Price</p>
                          <p className="text-insurance-neutral-dark font-bold">
                            {product.price}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Coverage</p>
                          <p className="text-insurance-neutral-dark font-bold">
                            {product.coverageAmount}
                          </p>
                        </div>
                        <button
                          className="btn-primary text-sm py-2"
                          onClick={() => setSelectedProduct(product)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button className="btn-outline-primary inline-flex items-center">
                Load More Products
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </Container>
        </section>

        <section className="py-16 bg-insurance-neutral/50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeIn direction="right">
                <div>
                  <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-insurance-green-light text-insurance-green-dark rounded-full mb-4">
                    Why Choose Us
                  </span>
                  <h2 className="heading-2 text-insurance-neutral-dark mb-6">
                    Benefits of InsureHub Marketplace
                  </h2>
                  <p className="body-text mb-8">
                    Our marketplace is designed to make finding and comparing
                    insurance products simple, transparent, and hassle-free.
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 p-2 rounded-full bg-insurance-orange/10 text-insurance-orange">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">
                          Verified Providers
                        </h3>
                        <p className="text-gray-600">
                          All insurance providers on our platform are thoroughly
                          vetted and verified.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 p-2 rounded-full bg-insurance-orange/10 text-insurance-orange">
                        <BadgePercent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">
                          Exclusive Discounts
                        </h3>
                        <p className="text-gray-600">
                          Access to special rates and discounts available only
                          through InsureHub.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 p-2 rounded-full bg-insurance-orange/10 text-insurance-orange">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">
                          Price Transparency
                        </h3>
                        <p className="text-gray-600">
                          Clear pricing with no hidden fees or surprise charges
                          after purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="left">
                <img
                  src="https://images.unsplash.com/photo-1543269664-76bc3997d9ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Insurance marketplace benefits"
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </FadeIn>
            </div>
          </Container>
        </section>
        {selectedProduct && (
          <InsuranceProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
        <Footer />
      </main>
    </>
  );
};

export default Marketplace;
