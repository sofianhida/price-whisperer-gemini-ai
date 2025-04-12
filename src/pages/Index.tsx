
import React from 'react';
import PriceWhisperer from '@/components/PriceWhisperer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-8 px-4 md:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 mb-4">
            Price Whisperer AI
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Prediksi harga produk dengan cepat dan akurat menggunakan AI. Masukkan detail produk dan dapatkan perkiraan harga berdasarkan data pasar terkini.
          </p>
        </div>

        <PriceWhisperer />
        
        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>Powered by Gemini AI &middot; &copy; {new Date().getFullYear()} Price Whisperer</p>
          <p className="mt-2">API Key yang digunakan hanya untuk demonstrasi</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
