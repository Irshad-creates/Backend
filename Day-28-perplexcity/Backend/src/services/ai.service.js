import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage,createAgent,tool } from "langchain"
import * as z from "zod"
import { sendEmail } from "./mail.service.js";

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

const EmailTool = tool(
  sendEmail,
  {
    name : "emailTool",
    description :"use this tool to send email",
    schema: z.object({
      to : z.string().describe("The recipient's email address"),
      html : z.string().describe("the HTML content of the email"),
      subject : z.string().describe("The subject of email"),
      text : z.string().describe("the plain text content of the email")
    })
  }
)


const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

const agent =  createAgent({
  model ,
  tools : [ EmailTool]
})

let messages = []
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

  messages.push(new HumanMessage(userInput))

  const result = await agent.invoke({ messages })
  messages = result.messages

  const response = messages[messages.length - 1]

  console.log(
    `${colors.green}${AI_NAME}:${colors.reset} ${colors.yellow}${response.text}${colors.reset}`
  )
}

rl.close()
