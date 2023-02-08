import findElement from './utils/findElement.js';
import { BASE_URL } from './utils/constantas.js';

const passwordInput = findElement('#password-input');
const userInput = findElement('#user-input');
const form = findElement('.login-form');
const errorUser = findElement('#user-error');
const errorPassword = findElement('#password-error');

const errorTextGenerator = (element, text) => {
	element.textContent = text;
	element.style.display = 'block';

	const timer = setTimeout(() => {
		element.style.display = 'none';

		clearTimeout(timer);
	}, 3000);
};

form.addEventListener('submit', (evt) => {
	evt.preventDefault();

	if (userInput.value.length == 0) {
		errorTextGenerator(errorUser, "Iltimos ma'lumot to'ldiring");

		return;
	}
	if (passwordInput.value.length < 6) {
		errorTextGenerator(
			errorPassword,
			"Parol 6 ta belgidan kam bo'lmasligi kerak"
		);
		return;
	}

	const user = {
		// email: 'eve.holt@reqres.in',
		// password: 'cityslicka',
		email: userInput.value,
		password: passwordInput.value,
	};

	// fetch(BASE_URL + 'auth/login', {
	// 	method: 'POST',
	// 	headers: { 'Content-Type': 'application/json' },
	// 	body: JSON.stringify(user),
	// })
	// 	.then((res) => res.json())
	// 	.then((data) => {
	// 		console.log(data);
	// 	});

	fetch('https://reqres.in/api/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(user),
	})
		.then((res) => {
			if (res.status === 400) {
				throw new Error('Foydalanuvchi topilmadi');
			}
			return res.json();
		})
		.then((data) => {
			console.log(data);

			if (data.token) {
				const token = data.token;
				localStorage.setItem('token', token);
				window.location.href = 'http://127.0.0.1:5500/admin.html';
			}
		})

		.catch((err) => {
			console.log(err);
			errorTextGenerator(errorUser, err);
		});

	//
});
