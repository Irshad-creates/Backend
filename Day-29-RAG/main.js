import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const loader = new PDFLoader("./story.pdf")
const splitter = new RecursiveCharacterTextSplitter({ chunkSize :100, chunkOverlap: 0  })

const docs = await loader.load()
const fullText = docs.map(doc => doc.pageContent).join('\n')
const texts = await splitter.splitText(fullText)

// console.log(docs);
console.log(texts,texts.Lenth);
