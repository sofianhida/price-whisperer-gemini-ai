
import React, { useState } from 'react';
import ProductForm, { ProductData } from './ProductForm';
import PredictionResult, { PredictionData } from './PredictionResult';
import { Card } from '@/components/ui/card';
import { generatePricePrediction } from '@/services/geminiApi';
import { useToast } from '@/components/ui/toast';

const PriceWhisperer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [predictionData, setPredictionData] = useState<PredictionData | undefined>();
  const [productName, setProductName] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (data: ProductData) => {
    setIsLoading(true);
    setProductName(data.name);
    
    try {
      const prompt = `
        Kamu adalah asisten AI yang menganalisis harga produk. Tolong prediksi harga produk berikut berdasarkan detailnya:
        
        Nama Produk: ${data.name}
        Kategori: ${data.category}
        Merek: ${data.brand}
        Fitur/Spesifikasi: ${data.features}
        ${data.historicalPrices ? `Data Harga Historis: ${data.historicalPrices}` : ''}
        
        Berikan respons dalam format JSON berikut:
        {
          "predictedPrice": "Rp X.XXX.XXX", 
          "priceRange": { 
            "min": "Rp X.XXX.XXX", 
            "max": "Rp X.XXX.XXX"
          },
          "confidence": 85,
          "priceType": "low|medium|high",
          "factors": ["faktor 1", "faktor 2", "faktor 3"]
        }
        
        Berikan prediksi yang masuk akal berdasarkan tren pasar Indonesia saat ini.
      `;
      
      const result = await generatePricePrediction(prompt);
      setPredictionData(result);
      
      toast({
        title: "Prediksi Berhasil",
        description: "Hasil prediksi harga berhasil didapatkan.",
      });
    } catch (error) {
      console.error('Prediction error:', error);
      toast({
        title: 'Error',
        description: 'Gagal mendapatkan prediksi harga. Silakan coba lagi.',
        variant: 'destructive',
      });
      
      // Set fallback data for demonstration
      setPredictionData({
        predictedPrice: "Rp 2.499.000",
        priceRange: {
          min: "Rp 2.299.000",
          max: "Rp 2.799.000"
        },
        confidence: 75,
        priceType: "medium",
        factors: [
          "Spesifikasi standar untuk kategori ini",
          "Merek memiliki posisi menengah di pasar",
          "Fitur yang ditawarkan sesuai dengan harga"
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductForm onSubmit={handleSubmit} isLoading={isLoading} />
        {isLoading ? (
          <Card className="w-full flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Memproses prediksi harga...</p>
            </div>
          </Card>
        ) : (
          <PredictionResult data={predictionData} productName={productName} />
        )}
      </div>
    </div>
  );
};

export default PriceWhisperer;
