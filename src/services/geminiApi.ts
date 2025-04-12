
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Generative AI API with your API key
const API_KEY = "AIzaSyCjdIpvAKK92gwSCBFnQ-q9A9pe_sqV8s4";
const genAI = new GoogleGenerativeAI(API_KEY);

export const generatePricePrediction = async (prompt: string) => {
  try {
    // For client-side, we use a simpler approach than the server-side example
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const generationConfig = {
      temperature: 0.2,
      topK: 32,
      topP: 0.95,
      maxOutputTokens: 1024,
    };

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig,
    });

    const response = result.response;
    const text = response.text();
    
    // Extract JSON from the response text
    const jsonMatch = text.match(/({[\s\S]*})/);
    if (!jsonMatch) {
      throw new Error('Format respons tidak valid');
    }

    const jsonText = jsonMatch[0];
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};
