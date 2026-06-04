import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEN_AI_KEY
});

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-3.5-flash",
//     contents: "Explain how AI works in a few words",
//   });

//   console.log(response.text);
// }

// main();

async function invokeGeminiAi(){
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "hello gemini ! explain whai is interview ?"
    })

    console.log(response.text)
}

export default invokeGeminiAi