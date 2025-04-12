
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

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value).replace('IDR', 'Rp');
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Hasil Prediksi: {productName}</span>
          <Badge className={getPriceColor(data.priceType)}>
            {data.priceType === 'low' ? 'Harga Rendah' : 
             data.priceType === 'medium' ? 'Harga Sedang' : 'Harga Tinggi'}
          </Badge>
        </CardTitle>
        <CardDescription>
          Confidence level: {data.confidence}%
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <h3 className="text-sm font-medium text-muted-foreground">Harga yang Diprediksi</h3>
          <p className="text-3xl font-bold text-primary">{data.predictedPrice}</p>
          <p className="text-sm text-muted-foreground">
            Kisaran: {data.priceRange.min} - {data.priceRange.max}
          </p>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => formatRupiah(value)} />
              <Tooltip formatter={(value) => formatRupiah(Number(value))} />
              <Bar dataKey="value" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="mb-2 font-medium">Faktor yang Mempengaruhi Harga:</h3>
          <ul className="list-disc pl-5 space-y-1">
            {data.factors.map((factor, index) => (
              <li key={index}>{factor}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionResult;
