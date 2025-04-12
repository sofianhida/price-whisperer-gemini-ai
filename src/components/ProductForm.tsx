
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Prediksi Harga Produk</CardTitle>
        <CardDescription>
          Masukkan detail produk untuk mendapatkan prediksi harga
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Produk</Label>
              <Input 
                id="name" 
                name="name" 
                placeholder="Masukkan nama produk" 
                value={productData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Kategori</Label>
              <Select 
                onValueChange={handleCategoryChange} 
                value={productData.category}
                required
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="smartphone">Smartphone</SelectItem>
                  <SelectItem value="laptop">Laptop</SelectItem>
                  <SelectItem value="clothing">Pakaian</SelectItem>
                  <SelectItem value="electronics">Elektronik</SelectItem>
                  <SelectItem value="furniture">Furnitur</SelectItem>
                  <SelectItem value="other">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="brand">Merek</Label>
            <Input 
              id="brand" 
              name="brand" 
              placeholder="Masukkan merek produk" 
              value={productData.brand}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">Fitur/Spesifikasi</Label>
            <Input 
              id="features"
              name="features" 
              placeholder="Masukkan fitur atau spesifikasi produk" 
              value={productData.features}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="historicalPrices">
              Data Harga Historis (opsional)
            </Label>
            <Input 
              id="historicalPrices"
              name="historicalPrices" 
              placeholder="Contoh: 2.500.000 (Jan), 2.400.000 (Feb), 2.350.000 (Mar)" 
              value={productData.historicalPrices}
              onChange={handleChange}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          type="submit" 
          onClick={handleSubmit} 
          disabled={isLoading}
        >
          {isLoading ? 'Memproses...' : 'Prediksi Harga'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductForm;
