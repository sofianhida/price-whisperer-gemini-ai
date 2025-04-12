
import { useToast } from '@/components/ui/use-toast';

// Mock Gemini API response while we handle the API calls clientside
export const predictProductPrice = async (productData: {
  name: string;
  category: string;
  brand: string;
  features: string;
  historicalPrices?: string;
}) => {
  const { toast } = useToast();
  
  try {
    // Create a structured prompt for the Gemini AI model
    const prompt = `
      Kamu adalah asisten AI yang menganalisis harga produk. Tolong prediksi harga produk berikut berdasarkan detailnya:
      
      Nama Produk: ${productData.name}
      Kategori: ${productData.category}
      Merek: ${productData.brand}
      Fitur/Spesifikasi: ${productData.features}
      ${productData.historicalPrices ? `Data Harga Historis: ${productData.historicalPrices}` : ''}
      
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

    const API_KEY = 'AIzaSyCjdIpvAKK92gwSCBFnQ-q9A9pe_sqV8s4';
    const MODEL_NAME = 'gemini-1.5-flash';
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 32,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      throw new Error('Gagal menghubungi API Gemini');
    }

    const data = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('Tidak ada respons yang diterima dari API');
    }

    const text = data.candidates[0].content.parts[0].text;
    const jsonMatch = text.match(/({[\s\S]*})/);
    
    if (!jsonMatch) {
      throw new Error('Format respons tidak valid');
    }

    const jsonText = jsonMatch[0];
    const result = JSON.parse(jsonText);

    return result;
  } catch (error) {
    console.error('Gemini API error:', error);
    toast({
      title: 'Error',
      description: 'Gagal mendapatkan prediksi harga. Silakan coba lagi.',
      variant: 'destructive'
    });
    
    // Return fallback data for demonstration
    return {
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
    };
  }
};
