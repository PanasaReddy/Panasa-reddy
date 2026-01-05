import { GoogleGenAI, Type } from "@google/genai";
import { ClassificationCategory, ClassificationResult } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      code: {
        type: Type.STRING,
        description: "The HSN or SAC code."
      },
      description: {
        type: Type.STRING,
        description: "The official description of the HSN or SAC code."
      },
      category: {
        type: Type.STRING,
        enum: ['Goods', 'Service'],
        description: "The category, either 'Goods' or 'Service'."
      },
      gstRate: {
        type: Type.NUMBER,
        description: "The applicable GST rate in percentage (e.g., 18 for 18%)."
      },
      reason: {
        type: Type.STRING,
        description: "A brief explanation of why this code is a relevant match for the user's description."
      }
    },
    required: ['code', 'description', 'category', 'gstRate', 'reason']
  }
};


export const getClassification = async (
  description: string,
  category: ClassificationCategory
): Promise<ClassificationResult[]> => {
  try {
    const prompt = `
      You are an elite tax consultant specializing in the Indian Goods and Services Tax (GST) system. Your primary function is to accurately classify goods and services under the HSN and SAC code system.

      Analyze the following description and identify the top 5 most relevant HSN codes (for goods) or SAC codes (for services).

      CRITICAL INSTRUCTION ON LATEST AMENDMENTS:
      You MUST apply the very latest GST amendments, notifications, and rate changes up to and including 2025.
      Specifically, incorporate recommendations from the:
      - 55th GST Council Meeting (Dec 2024) - e.g., reduced rates on cancer drugs, specific snack pellets.
      - 54th GST Council Meeting (Sep 2024)
      - 53rd GST Council Meeting (June 2024)
      
      If a product's rate has changed recently (e.g., Namkeens, extruded snacks, carton boxes, solar cookers, etc.), you must provide the NEW rate.

      Description: "${description}"
      
      Category Hint: "${category}"
      
      If the Category Hint is "Auto Detect", first determine if the description refers to goods or a service, then proceed.
      
      For each result:
      1. Provide the exact HSN/SAC code.
      2. Provide the official description.
      3. Provide the CURRENT GST rate (%).
      4. Categorize as 'Goods' or 'Service'.
      5. Provide a reasoning that references why this fits, especially if it relates to a recent amendment.

      Provide your response strictly as a JSON array conforming to the schema.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2,
      },
    });
    
    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);
    
    if (!Array.isArray(result)) {
        throw new Error("API did not return a valid array.");
    }

    return result as ClassificationResult[];

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get classification from AI: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the AI service.");
  }
};