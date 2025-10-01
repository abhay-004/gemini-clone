
import {GoogleGenAI} from '@google/genai';
const GEMINI_API_KEY = "AIzaSyCQRWPjUct9o4qQaVw8uXyoGMRaVx9h9Vk";

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

async function main(prompt) {
  const response = await ai.models.generateContent({
    model: 'models/gemini-flash-latest',
    contents:prompt,
  });
  console.log(response.text);
  return response.text
}

export default main;

