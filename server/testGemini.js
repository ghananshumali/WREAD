import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function test() {

 try {

  const model = genAI.getGenerativeModel({
   model: "gemini-1.5-flash-8b"
  });

  const result = await model.generateContent(
   "Explain Artificial Intelligence in one short sentence"
  );

  console.log(result.response.text());

 } catch (error) {

  console.log("ERROR:", error);

 }

}

test();