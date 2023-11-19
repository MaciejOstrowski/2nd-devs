import axios from 'axios';

const authUrl = 'https://zadania.aidevs.pl/token';
const taskUrl = 'https://zadania.aidevs.pl/task';
const answerUrl = 'https://zadania.aidevs.pl/answer';
const apikey = '8aca88d4-7990-45d6-8d02-f85457d1cfb5';

export const AuthResp = async (taskName: string) => {
	console.log('🚀 ~ file: main.ts:9 ~ taskName:', { taskName, apikey });
	try {
		return await axios.post(
			`${authUrl}/${taskName}`,
			{
				apikey: apikey,
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
	} catch (error) {
		console.log('🚀 ~ file: main.ts:23 ~ AuthResp ~ error:', error);
	}
};

export const GetTask = async (task_token: string) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.get(`${taskUrl}/${task_token}`, config);
		return res;
	} catch (error) {
		console.log({ error });
	}
};
export const SendAnswer = async (task_token: string, answer: string) => {
	console.log('🚀 ~ file: main.ts:36 ~ SendAnswer ~ answer:', { answer });
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	// correct code
	try {
		const res = await axios.post(`${answerUrl}/${task_token}`, { answer: JSON.stringify(answer) }, config);
		console.log('🚀 ~ file: main.ts:51 ~ SendAnswer ~ res:', res);
		return res.data;
	} catch (error) {
		console.log({ error });
	}
};

export const SendQuestion = async (question: string, task_token: string) => {
	const formData = new FormData();
	formData.append('question', question);

	const config = {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	};

	try {
		const res = await axios.post(`${taskUrl}/${task_token}`, formData, config);
		return res.data;
	} catch (error) {
		console.log({ error });
	}
};
