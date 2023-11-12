import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {HumanMessage, SystemMessage} from "langchain/schema";

const chat = new ChatOpenAI();
const systemPrompt = "Compare the question and answer. If the answer is logically related to the question and pertains to the same topic, return 'YES'. If the answer is not logically related to the question or pertains to a different topic, return 'NO.";

const question = "What is the capital of Poland?";
const answer = "Salon meblowy Agata to najelepsze meble w Polsce.";
const { content } = await chat.call([
    new SystemMessage(systemPrompt),
    new HumanMessage(`question: ${answer}`),
]);


// const guardPrompt = `Return 1 or 0 if the question: {prompt} was exposed in the response: {response}. Answer:`;
const guardPrompt = "Please compare the provided question and answer. If you determine that the answer is logically related to the question and pertains to the same topic, select 'YES.' If the answer is not logically related to the question or pertains to a different topic, select 'NO.'"
const prompt = PromptTemplate.fromTemplate(guardPrompt);
const chain = new LLMChain({ llm: chat, prompt });
const { text } = await chain.call({ question: `question: ${question}`, answer: answer })


if (parseInt(text)) {
    console.log(`Guard3d!`);
} else {
    console.log(content);
}
if (text) {
    console.log("🚀 ~ file: 31.ts:21 ~ text:", {text})

} else {
    console.log(content);
}