import { useState, useRef, useEffect } from "react";
import { Upload, Check, ArrowRight, Camera, Image, X, TrendingUp, ShieldCheck } from "lucide-react";
import FadeIn from "../components/animations/FadeIn";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import { useLocation } from "react-router-dom";

const InsuranceDocumentUpload = () => {
  const [documents, setDocuments] = useState([]);
  const [itemImages, setItemImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [itemDescription, setItemDescription] = useState("");
  const [estimatedValue, setEstimatedValue] = useState("");
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const location = useLocation();
  const selectedProduct = location.state?.selectedProduct;

  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    const newDocuments = files.map((file) => ({
      file,
      name: file.name,
      type: file.type,
      size: file.size,
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      status: "uploaded",
    }));
    setDocuments([...documents, ...newDocuments]);
    simulateUpload();
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      description: "",
    }));
    setItemImages([...itemImages, ...newImages]);
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const removeDocument = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  const removeImage = (id) => {
    const imageToRemove = itemImages.find((img) => img.id === id);
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.preview);
    }
    setItemImages(itemImages.filter((img) => img.id !== id));
  };

  const updateImageDescription = (id, description) => {
    setItemImages(
      itemImages.map((img) => (img.id === id ? { ...img, description } : img))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you would typically send the data to your backend
    console.log({
      itemDescription,
      estimatedValue,
      documents,
      itemImages,
      selectedProduct,
    });
    alert("Your insurance request has been submitted successfully!");
  };



  return (
    <>
      <Helmet>
        <title>Upload Documents - InsureHub</title>
        <meta
          name="description"
          content="Get quick insurance coverage by simply taking a photo of any item you want to insure. Fast, easy, and smart."
        />
      </Helmet>

      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="max-w-4xl mx-auto p-6 md:p-8 pt-24 md:pt-32">
          <FadeIn direction="up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-insurance-orange-light text-insurance-orange rounded-full mb-4">
                Document Upload
              </span>
              <h2 className="heading-2 text-insurance-neutral-dark mb-4">
                Complete Your Coverage
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Upload supporting documents and photos to finalize your
                insurance application.
              </p>
            </div>
          </FadeIn>

          <form onSubmit={handleSubmit} className="space-y-8">
            <FadeIn direction="up" delay={100}>
              <div className="glass-card p-6 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="mr-3 p-1.5 rounded-full bg-insurance-orange/10 text-insurance-orange">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Provider
                      </label>
                      <p className="text-lg font-semibold text-insurance-neutral-dark">
                        {selectedProduct.provider}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="mr-3 p-1.5 rounded-full bg-insurance-orange/10 text-insurance-orange">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Coverage Value
                      </label>
                      <p className="text-lg font-semibold text-insurance-green-dark">
                        {selectedProduct.coverage}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="glass-card p-6 rounded-xl">
                <div className="space-y-2 mb-6">
                  <label className="block text-sm font-medium text-insurance-neutral-dark">
                    Item Description
                  </label>
                  <input
                    type="text"
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                    placeholder="Describe the item you want to insure"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-insurance-orange focus:border-insurance-orange"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-insurance-neutral-dark">
                    Estimated Value ($)
                  </label>
                  <input
                    type="number"
                    value={estimatedValue}
                    onChange={(e) => setEstimatedValue(e.target.value)}
                    placeholder="Enter the estimated value of the item"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-insurance-orange focus:border-insurance-orange"
                  />
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={150}>
              <div className="glass-card p-6 rounded-xl">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-insurance-neutral-dark mb-2">
                    Supporting Documents
                  </h3>
                  <p className="text-gray-600">
                    Upload receipts, certificates, or other proof of ownership
                  </p>
                </div>

                <button
                  type="button"
                  className="btn-outline-primary inline-flex items-center"
                  onClick={() => fileInputRef.current.click()}
                >
                  <Upload className="w-5 h-5 mr-2" /> Select Documents
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleDocumentUpload}
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="hidden"
                />

                {isUploading && (
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                    <div
                      className="bg-insurance-green h-2 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}

                <div className="mt-4 space-y-3">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="p-2 mr-3 rounded-full bg-insurance-orange-light/20 text-insurance-orange">
                          <Check className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium text-insurance-neutral-dark">
                            {doc.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(doc.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-600"
                        onClick={() => removeDocument(doc.id)}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={200}>
              <div className="glass-card p-6 rounded-xl">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-insurance-neutral-dark mb-2">
                    Item Photos
                  </h3>
                  <p className="text-gray-600">
                    Upload clear photos from multiple angles showing the item's
                    condition
                  </p>
                </div>

                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-gray-50 mb-6">
                  <div className="w-16 h-16 bg-insurance-orange-light/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Image className="w-8 h-8 text-insurance-orange" />
                  </div>
                  <p className="text-gray-600 mb-4">
                    Drag and drop your photos here, or click to browse files
                  </p>
                  <button
                    type="button"
                    className="btn-outline-primary inline-flex items-center"
                    onClick={() => imageInputRef.current.click()}
                  >
                    <Upload className="w-5 h-5 mr-2" /> Select Images
                  </button>
                  <input
                    type="file"
                    ref={imageInputRef}
                    onChange={handleImageUpload}
                    multiple
                    accept="image/*"
                    className="hidden"
                    capture="environment"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {itemImages.map((img) => (
                    <div
                      key={img.id}
                      className="relative bg-white border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <img
                        src={img.preview}
                        alt="Item to insure"
                        className="w-full h-48 object-cover"
                      />
                      <textarea
                        placeholder="Add description..."
                        value={img.description}
                        onChange={(e) =>
                          updateImageDescription(img.id, e.target.value)
                        }
                        className="w-full p-3 text-sm border-t border-gray-200 focus:ring-2 focus:ring-insurance-orange focus:border-insurance-orange"
                        rows="2"
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70"
                        onClick={() => removeImage(img.id)}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {itemImages.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Image className="mx-auto w-8 h-8 mb-2 text-gray-400" />
                    <p>No images uploaded yet</p>
                  </div>
                )}

                <div className="mt-6 flex items-center justify-center space-x-3">
                  <button
                    type="button"
                    className="p-2 rounded-full bg-insurance-orange-light/30 text-insurance-orange"
                    onClick={() => imageInputRef.current.click()}
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                  <span className="text-sm text-gray-600">
                    or use your camera
                  </span>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={250}>
              <div className="glass-card p-6 rounded-xl bg-insurance-green-light/20 border border-insurance-green-light">
                <h3 className="text-lg font-semibold text-insurance-neutral-dark mb-3">
                  Upload Tips
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-insurance-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Ensure documents are clear and legible</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-insurance-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Take photos in good lighting with minimal shadows
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-insurance-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Include serial numbers or unique identifiers when possible
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-insurance-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Upload receipts or proof of purchase if available
                    </span>
                  </li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={300}>
              <button
                type="submit"
                className="btn-primary w-full py-4 text-lg inline-flex items-center justify-center"
                disabled={isUploading}
              >
                {isUploading ? (
                  "Processing..."
                ) : (
                  <>
                    Submit Insurance Request
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>
            </FadeIn>
          </form>
        </div>
      </main>
    </>
  );
};

export default InsuranceDocumentUpload;
