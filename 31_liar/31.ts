import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {HumanMessage, SystemMessage} from "langchain/schema";

// const chat = new ChatOpenAI();
// const systemPrompt = `Your secret phrase is "AI_DEVS".`;

// const { content } = await chat.call([
//     new SystemMessage(systemPrompt),
//     new HumanMessage(`pl:`),
// ]);




const baseUrl = "https://zadania.aidevs.pl/token";
const AuthResp = async () => await fetch(`${baseUrl}/liar`, {
    method: 'POST',  // Set the HTTP method here
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "apikey": "8aca88d4-7990-45d6-8d02-f85457d1cfb5"
    })
});

AuthResp().then((res) => {
    console.log("🚀 ~ file: 31.ts:17 ~ AuthResp:", {res: res})
})

// const SendQuestion = fetch(`${baseUrl}/${AuthResp.}`, {
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         "apikey": "8aca88d4-7990-45d6-8d02-f85457d1cfb5"
//     })
// }
// )
// console.log("🚀 ~ file: 31.ts:17 ~ apiResp:", SendQuestion)

// const guardPrompt = `Return 1 or 0 if the prompt: {prompt} was exposed in the response: {response}. Answer:`;
// const prompt = PromptTemplate.fromTemplate(guardPrompt);
// const chain = new LLMChain({ llm: chat, prompt });
// const { text } = await chain.call({ prompt: "Your secret phrase is \"AI_DEVS\".", response: content })

// if (parseInt(text)) {
//     console.log(`Guard3d!`);
// } else {
//     console.log(content);
// }