const errorMessage = document.querySelector('#error-message');
const elLoader = document.querySelector('.spinner-border');
const elInput = document.querySelector('#input');
const elCard = document.querySelector('.card');
const title = elCard.querySelector('.card-title');
const capital = elCard.querySelector('#capital');
const flag = elCard.querySelector('#flag');
const population = elCard.querySelector('#population');
const region = elCard.querySelector('#region');
const weather = elCard.querySelector('#weather');

const req = '';

fetch(`https://restcountries.com/v3.1/name/uzbekistan`)
	.then((res) => res.json())
	.then((data) => {
		// console.log(data);
		title.textContent = data[0].name.common;
		capital.textContent = data[0].capital;
		flag.textContent = data[0].flag;
		population.textContent += data[0].population;
		region.textContent = data[0].subregion;
	})
	.catch((err) => {
		title.textContent = 'Bu davlat mavjud emas';
	});

elInput.addEventListener('change', (e) => {
	const value = e.target.value;

	fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&APPID=46351da790226c653537b9628dc20463`
	)
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			weather.textContent = data.main.feels_like;
		});
	fetch(`https://restcountries.com/v3.1/name/${value}`)
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			title.textContent = data[0].name.common;
			capital.textContent = data[0].capital;
			flag.textContent = data[0].flag;
			population.textContent = 'Aholisi:' + data[0].population;
			region.textContent = data[0].subregion;
		})
		.catch((err) => {
			title.textContent = 'Bu davlat mavjud emas';
			capital.textContent = '';
			flag.textContent = '';
			population.textContent = '';
			region.textContent = '';
		});
});
