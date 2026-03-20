import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyDouYjeRyr4FA8A1ITwe4pmEqcqeSsr-wE";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

async function test() {
    try {
        console.log("Testing Gemini API with model 'gemini-1.5-flash-latest'...");
        const result = await model.generateContent("Diga 'Olá Mundo'");
        const response = await result.response;
        console.log("Success! Response:", response.text());
    } catch (error) {
        console.error("API Test Failed:", error.message);
        if (error.message.includes("404")) {
            console.log("Retrying with 'gemini-pro'...");
            const modelPro = genAI.getGenerativeModel({ model: "gemini-pro" });
            const resultPro = await modelPro.generateContent("Diga 'Olá Mundo'");
            const responsePro = await resultPro.response;
            console.log("Success with 'gemini-pro'! Response:", responsePro.text());
        }
    }
}

test();
