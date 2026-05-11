import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai"
import { HumanMessage, SystemMessage, AIMessage } from "langchain"



  // {import * as z from "zod"
  // import { sendEmail } from "./mail.service.js";

  // import readline from "readline/promises"
  // import dotenv from "dotenv";
  // import path from "path";
  // import { fileURLToPath } from "url";

  // const __filename = fileURLToPath(import.meta.url);
  // const __dirname = path.dirname(__filename);

  // dotenv.config({
  //   path: path.resolve(__dirname, "../../.env")
  // });


  // const rl = readline.createInterface({
  //   input :process.stdin,
  //   output :process.stdout
  // })
  // }


  // {const agent =  createAgent({
    //   model ,
    //   tools : [ EmailTool]
    // })
    
    // let messages = []
    // const AI_NAME = "PerplexCity AI";
    
    // const colors = {
  //   reset: "\x1b[0m",
  //   cyan: "\x1b[36m",
  //   green: "\x1b[32m",
  //   yellow: "\x1b[33m"
  // };

  // while (true){
  //   const userInput = await rl.question(
  //     `${colors.cyan}You:${colors.reset} `
  //   )

  //   messages.push(new HumanMessage(userInput))

  //   const result = await agent.invoke({ messages })
  //   messages = result.messages

  //   const response = messages[messages.length - 1]

  //   console.log(
  //     `${colors.green}${AI_NAME}:${colors.reset} ${colors.yellow}${response.text}${colors.reset}`
  //   )
  // }

  // rl.close()
  // }



  // const EmailTool = tool(
  //   sendEmail,
  //   {
  //     name : "emailTool",
  //     description :"use this tool to send email",
  //     schema: z.object({
  //       to : z.string().describe("The recipient's email address"),
  //       html : z.string().describe("the HTML content of the email"),
  //       subject : z.string().describe("The subject of email"),
  //       text : z.string().describe("the plain text content of the email")
  //     })
  //   }
  // )

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
  model : "mistral-small-latest",
  apiKey :process.env.MISTRAL_API_KEY
})


export async function generateResponse(messages){
  const response =  await geminiModel.invoke(messages.map(msg =>{
    if(msg.role == "user"){
      return new HumanMessage(msg.content)
    }else if(msg.role == "ai"){
      return new AIMessage(msg.content)
    }
  }))
    
  return response.text
}

export async function generateChatTitle(message) {
  const response =  await mistralModel.invoke([
    new SystemMessage(`
      You are a helpful assistant that generates concise and descriptive titles for chat conversation.
      
      User will provide you with the first message of a chat conversation, and you will generate a title that captures the essence of the conversation in 2-4 words. The title should be clear, relevant, and engaging giving users a quick understanding of the chat's topic.
      `),

    new HumanMessage(`
      Generate a title for a chat conversation based on the following first message:
      ${message}
      `)
  ])

  return response.text
}