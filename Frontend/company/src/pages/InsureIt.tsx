import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Camera,
  Upload,
  Check,
  ArrowRight,
  Clock,
  Shield,
  ThumbsUp,
  Image,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/ui/Container";
import FadeIn from "../components/animations/FadeIn";

const InsureIt = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Insure It - InsureHub</title>
        <meta
          name="description"
          content="Get quick insurance coverage by simply taking a photo of any item you want to insure. Fast, easy, and smart."
        />
      </Helmet>

      <main className="min-h-screen flex flex-col">
        <Navbar />

        <div className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-br from-white to-insurance-neutral/50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeIn direction="right">
                <div>
                  <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-insurance-orange-light text-insurance-orange rounded-full mb-6">
                    Insure It
                  </span>
                  <h1 className="heading-1 text-insurance-neutral-dark mb-6">
                    Snap a Photo, Get Insured
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed mb-8">
                    Simply take a photo of what you want to insure and get
                    instant coverage options. It's that easy.
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 p-2 rounded-full bg-insurance-orange/10 text-insurance-orange">
                        <Camera className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Take a Photo</h3>
                        <p className="text-gray-600">
                          Use your smartphone to snap a clear photo of the item
                          you want to insure.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 p-2 rounded-full bg-insurance-orange/10 text-insurance-orange">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Upload It</h3>
                        <p className="text-gray-600">
                          Upload the photo to our AI-powered platform for
                          instant analysis.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 p-2 rounded-full bg-insurance-orange/10 text-insurance-orange">
                        <Check className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Get Covered</h3>
                        <p className="text-gray-600">
                          Review personalized insurance options and get covered
                          in minutes.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button className="btn-primary inline-flex items-center">
                    Start Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </FadeIn>

              <FadeIn direction="left">
                <div className="glass-card p-8 rounded-xl">
                  <div className="mb-6 text-center">
                    <h2 className="text-2xl font-semibold text-insurance-neutral-dark mb-2">
                      Upload Your Photo
                    </h2>
                    <p className="text-gray-600">
                      Our AI will identify your item and suggest coverage
                      options
                    </p>
                  </div>

                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center bg-gray-50 mb-8">
                    <div className="w-20 h-20 bg-insurance-orange-light/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Image className="w-10 h-10 text-insurance-orange" />
                    </div>
                    <p className="text-gray-600 mb-4">
                      Drag and drop your photo here, or click to browse files
                    </p>
                    <button className="btn-outline-primary">Choose File</button>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-4">
                      Supported formats: JPG, PNG, HEIF – Max file size: 10MB
                    </p>
                    <div className="flex justify-center space-x-2">
                      <button className="p-2 rounded-full bg-insurance-orange-light/50 text-insurance-orange">
                        <Camera className="w-5 h-5" />
                      </button>
                      <p className="text-sm text-gray-600">
                        or use your camera directly
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </Container>
        </div>

        <section className="py-16 bg-insurance-neutral/50">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <FadeIn direction="up">
                <h2 className="heading-2 text-insurance-neutral-dark mb-6">
                  What Can You Insure?
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Our visual insurance technology can identify and provide
                  coverage for a wide range of items.
                </p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FadeIn direction="up" delay={100}>
                <div className="glass-card p-6 rounded-xl">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1679079456083-9f288e224e96?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D"
                    alt="Electronics"
                    className="w-full h-48 object-cover rounded-lg mb-5"
                  />
                  <h3 className="text-xl font-semibold text-insurance-neutral-dark mb-2">
                    Electronics
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Laptops, cameras, smartphones, tablets, TVs, gaming
                    consoles, and other valuable electronics.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-insurance-orange mt-1 mr-2 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">
                        Accidental damage coverage
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-insurance-orange mt-1 mr-2 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">Theft protection</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-insurance-orange mt-1 mr-2 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">
                        Extended warranty options
                      </span>
                    </li>
                  </ul>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={200}>
                <div className="glass-card p-6 rounded-xl">
                  <img
                    src="https://media.istockphoto.com/id/134157777/photo/suburbian-home.webp?a=1&b=1&s=612x612&w=0&k=20&c=4j5Nt53U12-ycIOkOCiSFefrtmVGkLY3I2rgp2m74lo="
                    alt="Jewelry"
                    className="w-full h-48 object-cover rounded-lg mb-5"
                  />
                  <h3 className="text-xl font-semibold text-insurance-neutral-dark mb-2">
                    Houses & Real State
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Protect your home, rental property, or real estate
                    investment from unforeseen events such as fire, theft,
                    natural disasters, and liability claims.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-insurance-orange mt-1 mr-2 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">
                        Fire and natural disaster coverage
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-insurance-orange mt-1 mr-2 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">
                        Theft and vandalism protection
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-insurance-orange mt-1 mr-2 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">
                        Liability and legal expense coverage
                      </span>
                    </li>
                  </ul>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={300}>
                <div className="glass-card p-6 rounded-xl">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1661499556690-610ac678a798?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FyJTIwaW5zdXJhbmNlJTIwemltYmFid2VhbnxlbnwwfHwwfHx8MA%3D%3D"
                    alt="Art"
                    className="w-full h-48 object-cover rounded-lg mb-5"
                  />
                  <h3 className="text-xl font-semibold text-insurance-neutral-dark mb-2">
  Motor Vehicles
</h3>
<p className="text-gray-600 mb-4">
  Comprehensive coverage for cars, motorcycles, and commercial vehicles—protecting against accidents, theft, third-party liabilities, and unexpected repairs.
</p>
<ul className="space-y-2">
  <li className="flex items-start">
    <svg
      className="w-5 h-5 text-insurance-orange mt-1 mr-2 flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
    <span className="text-gray-700">Accident and collision coverage</span>
  </li>
  <li className="flex items-start">
    <svg
      className="w-5 h-5 text-insurance-orange mt-1 mr-2 flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
    <span className="text-gray-700">Theft and vandalism protection</span>
  </li>
  <li className="flex items-start">
    <svg
      className="w-5 h-5 text-insurance-orange mt-1 mr-2 flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
    <span className="text-gray-700">Third-party liability coverage</span>
  </li>
</ul>

                </div>
              </FadeIn>
            </div>

            <div className="mt-8 text-center">
              <FadeIn direction="up">
                <button className="btn-outline-primary inline-flex items-center">
                  View More Categories
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </FadeIn>
            </div>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeIn direction="right">
                <img
                  src="https://images.unsplash.com/photo-1551135049-8a33b5883817?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="AI-powered insurance"
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </FadeIn>

              <FadeIn direction="left">
                <div>
                  <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-insurance-green-light text-insurance-green-dark rounded-full mb-4">
                    AI Technology
                  </span>
                  <h2 className="heading-2 text-insurance-neutral-dark mb-6">
                    How Our Technology Works
                  </h2>
                  <p className="body-text mb-8">
                    Our advanced image recognition system identifies items and
                    calculates their value instantly, providing immediate
                    coverage options.
                  </p>

                  <div className="space-y-6 mb-8">
                    <div className="glass-card p-4 flex items-start">
                      <div className="mr-4 p-2 rounded-full bg-insurance-orange-light text-insurance-orange">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Instant Analysis</h3>
                        <p className="text-gray-600 text-sm">
                          Our AI analyzes your photo in seconds, identifying the
                          item type, brand, model, and approximate value.
                        </p>
                      </div>
                    </div>

                    <div className="glass-card p-4 flex items-start">
                      <div className="mr-4 p-2 rounded-full bg-insurance-orange-light text-insurance-orange">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">
                          Smart Coverage Options
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Based on the item's characteristics, we offer tailored
                          coverage options with appropriate limits and terms.
                        </p>
                      </div>
                    </div>

                    <div className="glass-card p-4 flex items-start">
                      <div className="mr-4 p-2 rounded-full bg-insurance-orange-light text-insurance-orange">
                        <ThumbsUp className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">
                          Simple Claims Process
                        </h3>
                        <p className="text-gray-600 text-sm">
                          If something happens to your insured item, simply
                          submit a photo of the damage for an expedited claims
                          process.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button className="btn-primary inline-block">
                    Try Insure It Now
                  </button>
                </div>
              </FadeIn>
            </div>
          </Container>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default InsureIt;
