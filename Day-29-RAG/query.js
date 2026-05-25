import { Pinecone } from '@pinecone-database/pinecone'
import { MistralAIEmbeddings } from "@langchain/mistralai"
import dotenv from "dotenv"
dotenv.config()

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pc.index("rag-cohort-2")  // Use a dense-configured index


const embeddings = new MistralAIEmbeddings({
    apiKey: process.env.MISTRAL_API_KEY,
    model : "mistral-embed"
})

const querryEmbedding = await embeddings.embedQuery("how was the job experience?")

console.log(querryEmbedding);

const results =  await index.query({
    vector :querryEmbedding,
    topK : 2,
    includeMetadata :true
})

console.log(JSON.stringify(results));
