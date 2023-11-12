import axios from 'axios';
import { AuthResp, GetTask, SendAnswer } from '../../main';

// Wykonanie zadanie
AuthResp('embedding').then(async (resAuth) => {
	GetTask(resAuth.data.token).then((res) => {
		// console.log('🚀 ~ file: embedding.ts:39 ~ AuthResp ~ resAuth:', { res });
	});

	const resp = await getEmbedding();
	// console.log('🚀 ~ file: embedding.ts:49 ~ Authrespp ~ resp:', { resp: resp.data });

	SendAnswer(resAuth.data.token, resp.data).then((res) => {
		console.log('🚀 ~ file: embedding.ts:52 ~ SendAnswer ~ res', { res });
	});
});

const getEmbedding = async () => {
	return await axios.post('https://hook.eu1.make.com/iux7w5o8s2dt1tbn4yzsgm3hbuyoieia', {
		text: 'Hawaiian pizza',
	});
};
