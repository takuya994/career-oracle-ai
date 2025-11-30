import { GoogleGenAI, Type } from "@google/genai";
import { OracleResponse, UserInput } from "../types";

// Initialize Gemini Client
// configured in vite.config.ts to inject the key
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCareerAdvice = async (input: UserInput): Promise<OracleResponse> => {
  const prompt = `
    あなたは神秘的なキャリアコンサルタントです。
    以下のユーザーの悩みに対して、少しスピリチュアルかつ実践的なアドバイスをしてください。
    
    ユーザー情報:
    - 現在の職業: ${input.jobTitle}
    - 悩み: ${input.concern}
    - 目標: ${input.goal}

    以下のJSON形式で出力してください。
    - advice: 具体的なアドバイス (150文字程度)
    - luckyAction: 明日からできる小さなラッキーアクション
    - luckyColor: ラッキーカラー
    - careerScore: 現在のキャリア運気 (0-100の整数)
    - tags: 関連するキーワード3つ
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          advice: { type: Type.STRING },
          luckyAction: { type: Type.STRING },
          luckyColor: { type: Type.STRING },
          careerScore: { type: Type.INTEGER },
          tags: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["advice", "luckyAction", "luckyColor", "careerScore", "tags"],
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  
  return JSON.parse(text) as OracleResponse;
};

export const generateVisionImage = async (input: UserInput, advice: string): Promise<string> => {
  // Use gemini-2.5-flash-image for cost efficiency and speed
  const prompt = `
    A mystical tarot card style illustration representing a bright future for a ${input.jobTitle}.
    Abstract, artistic, glowing, ethereal.
    Context: ${advice.substring(0, 50)}...
    Do not include text.
    Aspect Ratio 1:1.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
        // No specific config needed for flash-image other than defaults usually
    }
  });

  // Extract image from response parts
  const parts = response.candidates?.[0]?.content?.parts;
  if (parts) {
      for (const part of parts) {
          if (part.inlineData) {
              return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          }
      }
  }

  throw new Error("Failed to generate image");
};