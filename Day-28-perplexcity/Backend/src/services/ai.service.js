import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

export async function testAi (){
  model.invoke("how many times has CSK beaten MI in last 5 years")
  .then((response)=>{console.log(response.text)})
}