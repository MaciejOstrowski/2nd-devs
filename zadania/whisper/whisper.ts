import axios from 'axios';
import { AuthResp, GetTask, SendAnswer } from '../../main';

AuthResp('whisper').then(async (resAuth) => {
	GetTask(resAuth.data.token).then((res) => {
		console.log('🚀 ~ file: whisper.ts:6 ~ GetTask ~ resAuth.data.token:', resAuth.data.token);
		// console.log('🚀 ~ file: whisper.ts:39 ~ AuthResp ~ resAuth:', { res });
	});

	// TASK description:
	// data: {
	// 	code: 0,
	// 	msg: "please return transcription of this file: https://zadania.aidevs.pl/data/mateusz.mp3",
	// 	hint: "use WHISPER model - https://platform.openai.com/docs/guides/speech-to-text"
	//   }

	// const resp = await getWhisper();
	// console.log('🚀 ~ file: whisper.ts:49 ~ Authrespp ~ resp:', { resp: resp.data });

	// SendAnswer(resAuth.data.token, resp.data).then((res) => {
	//     console.log('🚀 ~ file: whisper.ts:52 ~ SendAnswer ~ res', { res });
	// });
});
