import { HumanMessage, SystemMessage } from 'langchain/schema';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { answerUrl, authUrl, taskUrl } from '../../main';

const chatDefault = new ChatOpenAI({
	modelName: 'gpt-3.5-turbo',
});
const chatGuard = new ChatOpenAI({
	modelName: 'gpt-4',
});

const resAuth: {
	code: number;
	msg: string;
	token: string;
} = await fetch(`${authUrl}/scraper`, {
	body: JSON.stringify({
		apikey: '8aca88d4-7990-45d6-8d02-f85457d1cfb5',
	}),
	headers: {
		'Content-Type': 'application/json',
	},
	method: 'POST',
}).then(async (res) => {
	const r = await res.json();
	// console.log({ r: r });
	return r;
});

// console.log('resAuth', resAuth);

const getTask = await fetch(`${taskUrl}/${resAuth?.token}`, {}).then(async (res) => {
	const resp = await res.json();
	console.log('res', resp);

	let success = false;
	let attempt = 0;
	while (!success && attempt < 5) {
		console.log('Pobieram tekst');
		try {
			setTimeout(async () => {
				await fetch('https://zadania.aidevs.pl/text_pasta_history.txt', {
					headers: {
						'Content-Type': 'application/json',
						'User-Agent':
							'Mozilla/5.0 (Macintosh; Intel Mac OS X 14.1; rv:109.0) Gecko/20100101 Firefox/119.0',
					},
				})
					.then((response) => response.text())
					.then(async (html) => {
						const text = html.replace(/<[^>]*>/g, ''); // Remove HTML tags
						if (text === 'server error X_X') {
							throw new Error('server error X_X');
						}
						console.log('Zadaje pytanie gpt');
						const GPTAnswer = AskGTPT(resp?.question, text);
						console.log('Wysyłam odpowiedź:', { GPTAnswer });

						const resAnswer = await fetch(`${answerUrl}/${resAuth?.token}`, {
							body: JSON.stringify({
								answer: GPTAnswer,
							}),
							headers: {
								'Content-Type': 'application/json',
							},
							method: 'POST',
						});

						console.log('🚀 ~ file: scraper.ts:61 ~ .then ~ resAnswer:', {
							resAnswer,
							token: resAuth?.token,
						});
					})
					.catch((error) => console.error(error));
			}, 5000);
			success = true; // Set success to true if the code runs without throwing an exception
		} catch (error) {
			console.log(`Attempt ${attempt}`, { error });
		}
	}
});

// const task = await GetTask(res.data.task_token);
// console.log(task);

// console.log('🚀 ~ file: scraper.ts:12 ~ res:', { res: res });

const AskGTPT = async (question: string, text: string) => {
	const system = `Return answer for the question in POLISH language, based on provided article. Maximum length for the answer is 200 characters.`;
	const query = `${question}`;

	const { content } = await chatGuard.call([
		new SystemMessage(system),
		new HumanMessage(text),
		new HumanMessage(query),
	]);
	console.log('🚀 ~ file: scraper.ts:82 ~ AskGTPT ~ content:', content);

	return content;
	// try {
	// 	console.log(`Trying to parse: ${content}`);
	// 	json = JSON.parse(content);
	// } catch (e) {
	// 	const { content } = await chatGuard.call([new SystemMessage(system), new HumanMessage(query)]);
	// 	console.log(`Trying to fix parse: ${content}`);
	// 	json = JSON.parse(content);
	// }
};
