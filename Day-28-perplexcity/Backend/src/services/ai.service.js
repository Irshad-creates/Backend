import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage,createAgent } from "langchain"
import * as z from "zod"
import readline from "readline/promises"
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../.env")
});


const rl = readline.createInterface({
  input :process.stdin,
  output :process.stdout
})


const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});


const message = []
const AI_NAME = "PerplexCity AI";

const colors = {
  reset: "\x1b[0m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m"
};

while (true){
  const userInput = await rl.question(
    `${colors.cyan}You:${colors.reset} `
  )

  message.push(new HumanMessage(userInput))

  const response = await model.invoke(message)

  message.push(response)

  console.log(
    `${colors.green}${AI_NAME}:${colors.reset} ${colors.yellow}${response.text}${colors.reset}`
  )
}

rl.close()
