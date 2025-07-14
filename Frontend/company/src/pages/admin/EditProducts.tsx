import { useState } from "react";
import {
  Plus,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash,
  Package,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Server from "@/components/server/Server";

interface Product {
  id: string;
  name: string;
  email: string;
  category: string;
  description: string;
  provider: string;
  price: string;
  coverage: string;
  tags: string[];
  features: string[];
  requirements: string[];
  published: boolean;
  image?: string;
}

const EditProducts = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [productCategory, setProductCategory] = useState("all");

  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;

  // console.log(user);

  // Sample data for products
  const [products, setProducts] = useState<Product[]>([]);

  const handleAddProduct = () => {
    setCurrentProduct({
      id: "",
      name: "",
      category: "Auto",
      email: user?.email || "",
      description: "",
      provider: user?.name || "",
      price: "",
      coverage: "",
      tags: [],
      features: [""],
      requirements: [""],
      published: true,
    });
    setIsDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct({ ...product });
    setIsDialogOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    toast({
      title: "Product deleted",
      description: "The insurance product has been removed.",
    });
  };

  const handleInputChange = (
    field: keyof Product,
    value: string | string[] | boolean
  ) => {
    if (currentProduct) {
      setCurrentProduct({
        ...currentProduct,
        [field]: value,
      });
    }
  };

  const handleSaveProduct = () => {
    if (!currentProduct?.name || !currentProduct?.description) {
      toast({
        title: "Missing information",
        description: "Please provide product name and description.",
        variant: "destructive",
      });
      return;
    }

    if (currentProduct.id) {
      // Update existing product
      setProducts(
        products.map((p) => (p.id === currentProduct.id ? currentProduct : p))
      );
      toast({
        title: "Product updated",
        description: `"${currentProduct.name}" has been updated successfully.`,
      });
    } else {
      // Add new product
      const newProduct = {
        ...currentProduct,
        id: Math.random().toString(36).substr(2, 9),
      };
      console.log("current products == ",currentProduct);
      
      Server.addMarketplaceProduct(currentProduct)
        .then((response) => {
          console.log(response.data);
          setProducts([...products, response.data]);
        })
        .catch((error) => {
          console.error("Error adding product:", error);
          toast({
            title: "Error",
            description: "There was an error adding the product.",
            variant: "destructive",
          });
        });
     
      console.log(currentProduct);
      toast({
        title: "Product added",
        description: `"${newProduct.name}" has been added to your products.`,
      });
    }
    setIsDialogOpen(false);
  };

  const handleAddFeature = () => {
    if (currentProduct) {
      setCurrentProduct({
        ...currentProduct,
        features: [...currentProduct.features, ""],
      });
    }
  };

  const handleUpdateFeature = (index: number, value: string) => {
    if (currentProduct) {
      const updatedFeatures = [...currentProduct.features];
      updatedFeatures[index] = value;
      setCurrentProduct({
        ...currentProduct,
        features: updatedFeatures,
      });
    }
  };

  const handleRemoveFeature = (index: number) => {
    if (currentProduct && currentProduct.features.length > 1) {
      const updatedFeatures = [...currentProduct.features];
      updatedFeatures.splice(index, 1);
      setCurrentProduct({
        ...currentProduct,
        features: updatedFeatures,
      });
    }
  };

  const handleAddRequirement = () => {
    if (currentProduct) {
      setCurrentProduct({
        ...currentProduct,
        requirements: [...currentProduct.requirements, ""],
      });
    }
  };

  const handleUpdateRequirement = (index: number, value: string) => {
    if (currentProduct) {
      const updatedRequirements = [...currentProduct.requirements];
      updatedRequirements[index] = value;
      setCurrentProduct({
        ...currentProduct,
        requirements: updatedRequirements,
      });
    }
  };

  const handleRemoveRequirement = (index: number) => {
    if (currentProduct && currentProduct.requirements.length > 1) {
      const updatedRequirements = [...currentProduct.requirements];
      updatedRequirements.splice(index, 1);
      setCurrentProduct({
        ...currentProduct,
        requirements: updatedRequirements,
      });
    }
  };

  const handleTagsChange = (value: string) => {
    const tagsArray = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");
    handleInputChange("tags", tagsArray);
  };

  const filteredProducts =
    productCategory === "all"
      ? products
      : products.filter(
          (p) => p.category.toLowerCase() === productCategory.toLowerCase()
        );

  const categories = ["All", "Auto", "Home", "Life", "Health", "Business"];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Insurance Products</h2>
        <p className="text-muted-foreground">
          Manage your insurance product offerings in the marketplace.
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Tabs value={productCategory} onValueChange={setProductCategory}>
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger key={category} value={category.toLowerCase()}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <Button
          onClick={handleAddProduct}
          className="bg-insurance-orange hover:bg-insurance-orange-dark"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Product
        </Button>
      </div>

      <div className="grid gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="w-full md:w-1/5 flex justify-center md:justify-start">
                    <div className="border rounded-md p-4 w-40 h-40 flex items-center justify-center bg-gray-50">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <Package className="h-20 w-20 text-gray-300" />
                      )}
                    </div>
                  </div>

                  <div className="w-full md:w-4/5">
                    <div className="flex flex-col md:flex-row md:items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-medium">
                            {product.name}
                          </h3>
                          <Badge
                            variant={product.published ? "default" : "outline"}
                          >
                            {product.published ? "Published" : "Draft"}
                          </Badge>
                        </div>

                        <div className="text-sm text-muted-foreground mb-2">
                          <span className="font-medium">{product.price}</span> •
                          Coverage up to {product.coverage}
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {product.tags.map((tag, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="rounded-sm text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <p className="text-sm mb-4">{product.description}</p>

                        <div className="text-sm">
                          <strong>Key Features:</strong>
                          <ul className="list-disc list-inside pl-2 mt-1">
                            {product.features.slice(0, 3).map((feature, i) => (
                              <li key={i}>{feature}</li>
                            ))}
                            {product.features.length > 3 && (
                              <li>
                                + {product.features.length - 3} more features
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>

                      <div className="flex mt-4 md:mt-0 space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-10 text-center">
              <Package className="mx-auto h-10 w-10 text-muted-foreground/60 mb-4" />
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                {productCategory === "all"
                  ? "You haven't created any insurance products yet."
                  : `You don't have any ${productCategory} insurance products.`}
              </p>
              <Button onClick={handleAddProduct}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-3xl h-[600px] align-start">
          <DialogHeader>
            <DialogTitle>
              {currentProduct?.id ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="basic" className="w-full ">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="basic">Basic Details</TabsTrigger>
              <TabsTrigger value="features">
                Features & Requirements
              </TabsTrigger>
              <TabsTrigger value="pricing">Pricing & Coverage</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={currentProduct?.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="e.g., Comprehensive Auto Insurance"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={currentProduct?.category || ""}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="Auto">Auto Insurance</option>
                    <option value="Home">Home Insurance</option>
                    <option value="Life">Life Insurance</option>
                    <option value="Health">Health Insurance</option>
                    <option value="Business">Business Insurance</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={currentProduct?.description || ""}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Describe the insurance product..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={currentProduct?.tags.join(", ") || ""}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  placeholder="e.g., Auto, Full Coverage, Premium"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="published"
                  checked={currentProduct?.published || false}
                  onCheckedChange={(checked) =>
                    handleInputChange("published", Boolean(checked))
                  }
                />
                <label
                  htmlFor="published"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Publish this product in the marketplace
                </label>
              </div>
            </TabsContent>

            <TabsContent value="features" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Key Features</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddFeature}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Feature
                  </Button>
                </div>

                {currentProduct?.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={feature}
                      onChange={(e) =>
                        handleUpdateFeature(index, e.target.value)
                      }
                      placeholder={`Feature ${index + 1}`}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveFeature(index)}
                      disabled={currentProduct.features.length <= 1}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <Label>Requirements</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddRequirement}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Requirement
                  </Button>
                </div>

                {currentProduct?.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={requirement}
                      onChange={(e) =>
                        handleUpdateRequirement(index, e.target.value)
                      }
                      placeholder={`Requirement ${index + 1}`}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveRequirement(index)}
                      disabled={currentProduct.requirements.length <= 1}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price / month</Label>
                  <Input
                    id="price"
                    value={currentProduct?.price || ""}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="e.g., $99/month or $1200/year"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coverage">Coverage Amount</Label>
                  <Input
                    id="coverage"
                    value={currentProduct?.coverage || ""}
                    onChange={(e) =>
                      handleInputChange("coverage", e.target.value)
                    }
                    placeholder="e.g., $500,000"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProduct}>Save Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProducts;
