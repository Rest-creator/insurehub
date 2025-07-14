
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  provider: string;
  price?: string;
  image?: string;
}

const EditMarketplace = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const [products, setProducts] = useState<Product[]>([
    { 
      id: 1, 
      name: "Comprehensive Auto Insurance",
      category: "Auto Insurance",
      description: "Full coverage for your vehicle including liability, collision, and comprehensive coverage.",
      provider: "Safe Drive Insurance Co.",
      price: "$120/month"
    },
    { 
      id: 2, 
      name: "Homeowners Plus",
      category: "Home Insurance",
      description: "Complete protection for your home with additional coverage for high-value items.",
      provider: "Secure Home Insurance",
      price: "$95/month"
    },
    { 
      id: 3, 
      name: "Term Life 20",
      category: "Life Insurance",
      description: "20-year term life insurance with fixed premiums and optional riders.",
      provider: "Family First Insurance",
      price: "$45/month"
    }
  ]);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentProduct) {
      if (currentProduct.id) {
        // Update existing product
        setProducts(products.map(p => 
          p.id === currentProduct.id ? currentProduct : p
        ));
        toast({
          title: "Product updated",
          description: `"${currentProduct.name}" has been updated successfully.`
        });
      } else {
        // Add new product
        const newProduct = {
          ...currentProduct,
          id: Math.max(0, ...products.map(p => p.id)) + 1
        };
        setProducts([...products, newProduct]);
        toast({
          title: "Product added",
          description: `"${newProduct.name}" has been added to the marketplace.`
        });
      }
      setIsDialogOpen(false);
      setCurrentProduct(null);
    }
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsDialogOpen(true);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: "Product deleted",
      description: "The product has been removed from the marketplace."
    });
  };

  const addNewProduct = () => {
    setCurrentProduct({
      id: 0,
      name: "",
      category: "",
      description: "",
      provider: ""
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Marketplace Management</h2>
        <p className="text-muted-foreground">
          Add, edit and manage insurance products in the marketplace.
        </p>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Insurance Products</h3>
        <Button onClick={addNewProduct}>
          Add New Product
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {products.map(product => (
              <div key={product.id} className="flex items-start justify-between p-4 border rounded-md">
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      {product.category}
                    </span>
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {product.provider}
                    </span>
                    {product.price && (
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
                        {product.price}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditProduct(product)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}

            {products.length === 0 && (
              <p className="text-center py-8 text-muted-foreground">
                No products added yet. Add your first product to get started.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>
              {currentProduct?.id ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddProduct}>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={currentProduct?.name || ""}
                  onChange={(e) => setCurrentProduct(prev => prev ? {...prev, name: e.target.value} : null)}
                  placeholder="e.g., Comprehensive Auto Insurance"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={currentProduct?.category || ""}
                    onChange={(e) => setCurrentProduct(prev => prev ? {...prev, category: e.target.value} : null)}
                    placeholder="e.g., Auto Insurance"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="provider">Provider</Label>
                  <Input
                    id="provider"
                    value={currentProduct?.provider || ""}
                    onChange={(e) => setCurrentProduct(prev => prev ? {...prev, provider: e.target.value} : null)}
                    placeholder="e.g., ABC Insurance"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="price">Price (Optional)</Label>
                <Input
                  id="price"
                  value={currentProduct?.price || ""}
                  onChange={(e) => setCurrentProduct(prev => prev ? {...prev, price: e.target.value} : null)}
                  placeholder="e.g., $99/month"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={currentProduct?.description || ""}
                  onChange={(e) => setCurrentProduct(prev => prev ? {...prev, description: e.target.value} : null)}
                  placeholder="Describe the insurance product..."
                  rows={3}
                  required
                />
              </div>
              <div>
                <Label htmlFor="image">Image URL (Optional)</Label>
                <Input
                  id="image"
                  value={currentProduct?.image || ""}
                  onChange={(e) => setCurrentProduct(prev => prev ? {...prev, image: e.target.value} : null)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditMarketplace;
