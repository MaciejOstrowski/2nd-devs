import { SendAnswer, AuthResp, GetTask } from '../../main';

AuthResp('functions').then((resAuth) => {
	GetTask(resAuth.data.token).then((res) => {
		// console.log('🚀 ~ file: functions.ts:6 ~ GetTask ~ res', { res });
		const body = JSON.stringify({ answer: addUserSchema });
		// console.log('🚀 ~ file: functions.ts:7 ~ GetTask ~ body:', body);
		console.log('🚀 ~ file: functions.ts:9 ~ SendAnswer ~ resAuth.data.token:', body);
		SendAnswer(resAuth.data.token, body).then((resAnswer) => {
			console.log('🚀 ~ file: functions.ts:6 ~ GetTask ~ resAnswer', { resAnswer: resAnswer.data });
		});
	});
});

const addUserSchema = {
	name: 'addUser',
	description: 'Add user to database',
	parameters: {
		type: 'object',
		properties: {
			name: {
				type: 'string',
				description: "User's name",
			},
			surname: {
				type: 'string',
				description: "User's surname",
			},
			year: {
				type: 'number',
				description: "User's year of birth",
			},
		},
		required: ['name', 'surname', 'year'],
	},
};
