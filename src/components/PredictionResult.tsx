
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export type PredictionData = {
  predictedPrice: string;
  priceRange: {
    min: string;
    max: string;
  };
  confidence: number;
  factors: string[];
  priceType: 'low' | 'medium' | 'high';
};

interface PredictionResultProps {
  data?: PredictionData;
  productName: string;
}

const PredictionResult = ({ data, productName }: PredictionResultProps) => {
  if (!data) return null;
  
  const chartData = [
    { name: 'Minimum', value: parseInt(data.priceRange.min.replace(/\D/g, '')) },
    { name: 'Predicted', value: parseInt(data.predictedPrice.replace(/\D/g, '')) },
    { name: 'Maximum', value: parseInt(data.priceRange.max.replace(/\D/g, '')) }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getPriceColor = (type: string) => {
    switch (type) {
      case 'low':
        return 'bg-price-low';
      case 'medium':
        return 'bg-price-medium';
      case 'high':
        return 'bg-price-high';
      default:
        return 'bg-price';
    }
  };

  const getPriceLabel = (type: string) => {
    switch (type) {
      case 'low':
        return 'Low Price';
      case 'medium':
        return 'Medium Price';
      case 'high':
        return 'High Price';
      default:
        return 'Price Point';
    }
  };

  return (
    <Card className="w-full border border-secondary shadow-lg bg-gradient-to-br from-background to-secondary/5">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <CardTitle className="text-2xl font-bold">Prediction: {productName}</CardTitle>
            <CardDescription className="text-base mt-1">
              Confidence level: {data.confidence}%
            </CardDescription>
          </div>
          <Badge className={`${getPriceColor(data.priceType)} px-3 py-1 text-sm font-medium`}>
            {getPriceLabel(data.priceType)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="text-center bg-secondary/20 rounded-lg py-6 px-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Predicted Price</h3>
          <p className="text-4xl font-bold text-primary">{data.predictedPrice}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Range: {data.priceRange.min} - {data.priceRange.max}
          </p>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-secondary/10 p-5 rounded-lg">
          <h3 className="mb-3 font-medium text-lg">Factors Influencing Price:</h3>
          <ul className="space-y-2">
            {data.factors.map((factor, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block h-5 w-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold mr-2 mt-0.5">{index + 1}</span>
                <span>{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionResult;
