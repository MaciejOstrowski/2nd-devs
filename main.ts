import axios from 'axios';

const authUrl = 'https://zadania.aidevs.pl/token';
const taskUrl = 'https://zadania.aidevs.pl/task';
const answerUrl = 'https://zadania.aidevs.pl/answer';
const apikey = '8aca88d4-7990-45d6-8d02-f85457d1cfb5';

export const AuthResp = async (taskName: string) =>
	await axios.post(
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
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.post(
			`${answerUrl}/${task_token}`,
			{
				answer: answer,
			},
			config
		);
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
