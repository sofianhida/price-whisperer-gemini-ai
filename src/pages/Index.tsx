
import React from 'react';
import PriceWhisperer from '@/components/PriceWhisperer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-8 px-4 md:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 mb-6">
            Price Whisperer AI
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Predict product prices quickly and accurately using AI. Enter product details and get price estimates based on current market data.
          </p>
        </div>

        <PriceWhisperer />
        
        <footer className="mt-20 text-center text-sm text-muted-foreground">
          <p>Powered by Gemini AI &middot; &copy; {new Date().getFullYear()} Price Whisperer</p>
          <p className="mt-2">API Key used for demonstration purposes only</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
