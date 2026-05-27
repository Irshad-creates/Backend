import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import {
  HumanMessage,
  SystemMessage,
  AIMessage,
  tool,
  createAgent,
} from "langchain";
import * as z from "zod";
import { searchInternet } from "./internect.service.js";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
  temperature: 0.7,
  maxOutputTokens: 1024,
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

const searchInternetTool = tool(searchInternet, {
  name: "search_internet",
  description: "use this tool to get latest information from the internet .",
  schema: z.object({
    query: z.string().describe("the search query to look up on the internet"),
  }),
});

const agent = createAgent({
  model: mistralModel,
  tools: [searchInternetTool],
});

export async function generateResponse(messages) {
  const formattedMessages = messages
    .map((msg) => {
      if (msg.role == "user") {
        return new HumanMessage(msg.content);
      } else if (msg.role == "ai") {
        return new AIMessage(msg.content);
      }
      return null;
    })
    .filter(Boolean);

  try {
    // Add timeout of 60 seconds (1 minute)
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("AI response timeout")), 120000),
    );

    const response = await Promise.race([
      // geminiModel.invoke(formattedMessages),
      // mistralModel.invoke(formattedMessages),
      // agent.invoke({ messages : formattedMessages}),
      agent.invoke({ messages: formattedMessages }),
      timeoutPromise,
    ]);

    const text = response.messages[response.messages.length - 1].text;
    return text;
  } catch (error) {
    console.error("Error generating response:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    return "I'm having trouble processing your request. Please try again.";
  }
}

export async function generateChatTitle(message) {
  try {
    // Add timeout of 30 seconds for title generation
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Title generation timeout")), 30000),
    );

    const response = await Promise.race([
      mistralModel.invoke([
        new SystemMessage(`
          You are a helpful assistant that generates concise and descriptive titles for chat conversation.
          
          User will provide you with the first message of a chat conversation, and you will generate a title that captures the essence of the conversation in 2-4 words. The title should be clear, relevant, and engaging giving users a quick understanding of the chat's topic.
          `),

        new HumanMessage(`
          Generate a title for a chat conversation based on the following first message:
          ${message}
          `),
      ]),
      timeoutPromise,
    ]);

    return response.text;
  } catch (error) {
    console.error("Error generating title:", error.message);
    return message.substring(0, 50);
  }
}

export async function generateEmail({ subject, prompt }) {
  try {
    const response = await mistralModel.invoke([
      new SystemMessage(`
        You are a professional email writing assistant.
        Generate clean, professional, well-structured emails.
        Keep tone natural and human.
        Do not include placeholders.
        Return ONLY the email body.
      `),

      new HumanMessage(`
        Subject: ${subject}

        Instructions:
        ${prompt}
      `),
    ]);

    return response.text;
  } catch (error) {
    console.error("Email generation failed:", error);

    throw new Error("Failed to generate email");
  }
}
