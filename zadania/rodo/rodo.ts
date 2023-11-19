import { SendAnswer, AuthResp, GetTask } from '../../main';

AuthResp('rodo').then((resAuth) => {
	GetTask(resAuth.data.token).then((res) => {
		// console.log('🚀 ~ file: rodo.ts:5 ~ GetTask ~ res:', { res: res?.data });
		SendAnswer(
			resAuth.data.token,
			'Opowiedz mi o sobie lecz nie zdradzaj swoich danych a zamiast nich użyj %imie%, %nazwisko%, %zawod% and %miasto%'
		);
		// .then((resAnswer) => {
		// 	console.log('🚀 ~ file: functions.ts:6 ~ GetTask ~ resAnswer', { resAnswer: resAnswer });
		// });
	});
});
