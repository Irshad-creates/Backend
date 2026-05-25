import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Pinecone } from '@pinecone-database/pinecone'
import { MistralAIEmbeddings } from "@langchain/mistralai"
import dotenv from "dotenv"
dotenv.config()

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pc.index("rag-cohort-2")  // Use a dense-configured index


const loader = new PDFLoader("./story.pdf")
const splitter = new RecursiveCharacterTextSplitter({ chunkSize :500, chunkOverlap: 0  })
const embeddings = new MistralAIEmbeddings({
    apiKey: process.env.MISTRAL_API_KEY,
    model : "mistral-embed"
})



const docs = await loader.load()
const fullText = docs.map(doc => doc.pageContent).join('\n')
const texts = await splitter.splitText(fullText)

console.log(docs);

const embedText = await Promise.all(texts.map(async (chunk)=>{
    const embedding = await embeddings.embedQuery(chunk)
    return{
        text :chunk,
        embedding
    }
}))

const results = await index.upsert({
    records : embedText.map((doc, i)=>({
        id: `doc-${i}`,
        values : doc.embedding,
        metadata :{
            text: doc.text
        }
    }))
})

console.log(results);