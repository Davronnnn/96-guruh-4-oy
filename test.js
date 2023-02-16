const speechBtn = document.querySelector('#speechBtn');
const speechResult = document.querySelector('#speech-result');

const speech = new webkitSpeechRecognition();

speech.lang = 'en-US';

speechBtn.addEventListener('click', () => {
	speech.start();

	speech.onresult = (e) => {
		const transcript = e.results[0][0].transcript;

		document.body.style.background = transcript;
		speechResult.textContent = transcript;
	};

	speech.onend = () => {
		alert('Speech recognition service disconnected');
	};
});
