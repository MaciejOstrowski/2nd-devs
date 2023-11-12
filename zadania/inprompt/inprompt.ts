import { AuthResp, GetTask, SendAnswer } from '../../main';
import { ChatPromptTemplate } from 'langchain/prompts';
import { ChatOpenAI } from 'langchain/chat_models/openai';

// Inicjalizacja domyślnego modelu, czyli gpt-3.5-turbo
const chat = new ChatOpenAI();

const systemTemplate = `
As a {role} who answers the questions ultra-concisely using CONTEXT below 
and nothing more and truthfully says "don't know" when the CONTEXT is not enough to give an answer.
Remember information about each person and then answer the question in POLISH.

context###{context}###
`;

const humanTemplate = '{text}';

// Utworzenie promptu z dwóch wiadomości według podanych szablonów:
const chatPrompt = ChatPromptTemplate.fromMessages([
	['system', systemTemplate],
	['human', humanTemplate],
]);

// Faktyczne uzupełnienie szablonów wartościami
const sendPrompt = async (question: string, context: Object) => {
	const formattedChatPrompt = await chatPrompt.formatMessages({
		context: JSON.stringify(context),
		role: 'Personal Assistant',
		text: `${question}`,
	});

	// Wykonanie zapytania do modelu
	const { content } = await chat.call(formattedChatPrompt);
	return content;
};

// Wykonanie zadanie
AuthResp('inprompt').then((resAuth) => {
	GetTask(resAuth.data.token).then(async (res) => {
		const name = getQuestionName(res?.data.question);
		const context = processPeopleInfo(res?.data.input, name);
		// console.log('🚀 ~ file: inprompt.ts:19 ~ GetTask ~ res.question, context:', {
		// 	question: res?.data.question,
		// 	context,
		// });
		const answer = await sendPrompt(res?.data.question, context);
		const answerResp = await SendAnswer(resAuth.data.token, answer as string);
		// console.log('🚀 ~ file: inprompt.ts:24 ~ GetTask ~ answerResp:', { answerResp });
	});
});

// Specyfic functions for this task
function getQuestionName(question: string): string {
	const questionWithoutMark = question.replace(/\?$/, '');
	const words = questionWithoutMark.split(' ');
	return words[words.length - 1];
}

// Funkcja, która przetwarza informacje o osobach
function processPeopleInfo(peopleInfo: string[], targetName: string): Record<string, string[]> {
	const personData: Record<string, string[]> = {};

	peopleInfo.forEach((info) => {
		const currentName = info.split(' ')[0];

		// Dodatkowa logika: Sprawdzanie, czy bieżące imię pasuje do imienia docelowego
		if (currentName.toLowerCase() === targetName.toLowerCase()) {
			if (!personData[currentName]) {
				personData[currentName] = [];
			}
			personData[currentName].push(info);
		}
	});

	return personData;
}
