
import React, { useState } from 'react';
import ProductForm, { ProductData } from './ProductForm';
import PredictionResult, { PredictionData } from './PredictionResult';
import { Card } from '@/components/ui/card';
import { generatePricePrediction } from '@/services/geminiApi';
import { useToast } from '@/hooks/use-toast';

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
        You are an AI assistant that analyzes product prices. Please predict the price for the following product based on its details:
        
        Product Name: ${data.name}
        Category: ${data.category}
        Brand: ${data.brand}
        Features/Specifications: ${data.features}
        ${data.historicalPrices ? `Historical Price Data: ${data.historicalPrices}` : ''}
        
        Provide your response in the following JSON format:
        {
          "predictedPrice": "$X,XXX.XX", 
          "priceRange": { 
            "min": "$X,XXX.XX", 
            "max": "$X,XXX.XX"
          },
          "confidence": 85,
          "priceType": "low|medium|high",
          "factors": ["factor 1", "factor 2", "factor 3"]
        }
        
        Give a reasonable prediction based on current market trends.
      `;
      
      const result = await generatePricePrediction(prompt);
      setPredictionData(result);
      
      toast({
        title: "Prediction Success",
        description: "Price prediction results are ready.",
      });
    } catch (error) {
      console.error('Prediction error:', error);
      toast({
        title: 'Error',
        description: 'Failed to get price prediction. Please try again.',
        variant: 'destructive',
      });
      
      // Set fallback data for demonstration
      setPredictionData({
        predictedPrice: "$2,499.00",
        priceRange: {
          min: "$2,299.00",
          max: "$2,799.00"
        },
        confidence: 75,
        priceType: "medium",
        factors: [
          "Standard specifications for this category",
          "Brand has a mid-tier market position",
          "Features offered match the price point"
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductForm onSubmit={handleSubmit} isLoading={isLoading} />
        {isLoading ? (
          <Card className="w-full flex items-center justify-center min-h-[400px] bg-gradient-to-br from-background to-secondary/20 border border-secondary shadow-lg">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground font-medium">Processing price prediction...</p>
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
