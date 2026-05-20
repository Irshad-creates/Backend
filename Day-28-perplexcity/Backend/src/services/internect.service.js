import { tavily as Tavily } from "@tavily/core"


const tavily = Tavily({
    apiKey : process.env.TAVILY_API_KEY,

})

export const searchInternet = async ({query}) => {
    try {
        console.log("Tavily search called with query:", query);
        const result = await tavily.search(query, {
            maxResults: 5,
            searchDepth: "advanced"
        });
        console.log("Tavily search result:", result);
        return result;
    } catch (error) {
        console.error("Tavily search error:", error.message);
        return {
            results: [],
            error: error.message
        };
    }
}