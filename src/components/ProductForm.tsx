
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export type ProductData = {
  name: string;
  category: string;
  brand: string;
  features: string;
  historicalPrices?: string;
};

interface ProductFormProps {
  onSubmit: (data: ProductData) => void;
  isLoading: boolean;
}

const ProductForm = ({ onSubmit, isLoading }: ProductFormProps) => {
  const [productData, setProductData] = useState<ProductData>({
    name: '',
    category: '',
    brand: '',
    features: '',
    historicalPrices: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setProductData(prev => ({ ...prev, category: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(productData);
  };

  return (
    <Card className="w-full border border-secondary shadow-lg bg-gradient-to-br from-background to-secondary/5">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Product Price Prediction</CardTitle>
        <CardDescription className="text-base">
          Enter product details to get a price estimate
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-medium">Product Name</Label>
              <Input 
                id="name" 
                name="name" 
                placeholder="Enter product name" 
                value={productData.name}
                onChange={handleChange}
                required
                className="border-muted-foreground/20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category" className="font-medium">Category</Label>
              <Select 
                onValueChange={handleCategoryChange} 
                value={productData.category}
                required
              >
                <SelectTrigger id="category" className="border-muted-foreground/20">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="smartphone">Smartphone</SelectItem>
                  <SelectItem value="laptop">Laptop</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="furniture">Furniture</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="brand" className="font-medium">Brand</Label>
            <Input 
              id="brand" 
              name="brand" 
              placeholder="Enter product brand" 
              value={productData.brand}
              onChange={handleChange}
              required
              className="border-muted-foreground/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="features" className="font-medium">Features/Specifications</Label>
            <Input 
              id="features"
              name="features" 
              placeholder="Enter product features or specifications" 
              value={productData.features}
              onChange={handleChange}
              required
              className="border-muted-foreground/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="historicalPrices" className="font-medium">
              Historical Price Data (optional)
            </Label>
            <Input 
              id="historicalPrices"
              name="historicalPrices" 
              placeholder="Example: $2,500 (Jan), $2,400 (Feb), $2,350 (Mar)" 
              value={productData.historicalPrices}
              onChange={handleChange}
              className="border-muted-foreground/20"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full font-medium text-base transition-all hover:shadow-lg" 
          type="submit" 
          onClick={handleSubmit} 
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Predict Price'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductForm;
