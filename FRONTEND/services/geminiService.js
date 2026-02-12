
import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || "";

const ai = new GoogleGenAI({ apiKey });

export const estimateSugarContent = async (input) => {
    try {
        if (!apiKey) {
            console.warn("API Key not found for Gemini.");
         
            return null;
        }
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-exp", 
            
            contents: `Estimate the sugar content (in grams) for the following food item or meal: "${input}". Provide a realistic estimate for typical serving sizes.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        foodName: { type: Type.STRING, description: "Corrected name of the food" },
                        sugarGrams: { type: Type.NUMBER, description: "Estimated grams of sugar" },
                        calories: { type: Type.NUMBER, description: "Estimated calories" },
                        category: {
                            type: Type.STRING,
                            enum: ['drink', 'snack', 'meal', 'fruit'],
                            description: "The food category"
                        }
                    },
                    required: ["foodName", "sugarGrams", "category"]
                }
            }
        });

        const data = JSON.parse(response.text()); 
        return data;
    } catch (error) {
        console.error("AI Estimation Error:", error);
        return null;
    }
};
