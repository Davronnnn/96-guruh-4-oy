const elCards = document.querySelector('.cards');
const templateCard = document.querySelector('#film-template');
const editForm = document.querySelector('#edit-form');

const elTitle = editForm.querySelector('#title');

const elImgInput = editForm.querySelector('#img');
const elImg = editForm.querySelector('#edit-img');
const elOverview = editForm.querySelector('#overview');
const elDate = editForm.querySelector('#date');
const elDateText = editForm.querySelector('#date-text');

function generateDate(date) {
	return `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${
		date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
	} ${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}.${
		date.getMonth() + 1 < 10
			? '0' + (date.getMonth() + 1)
			: date.getMonth() + 1
	}.${date.getFullYear()}`;
}
function renderFilms(array, parent = elCards) {
	parent.textContent = null;
	const fragment = document.createDocumentFragment();

	array.forEach((film) => {
		const card = templateCard.content.cloneNode(true);
		const title = card.querySelector('.card-title');
		const image = card.querySelector('.card-img-top');
		const overview = card.querySelector('#overview');
		const elDate = card.querySelector('#date');
		const elGenres = card.querySelector('#genres');

		const deleteBtn = card.querySelector('.btn-danger');
		const editBtn = card.querySelector('.btn-primary');

		deleteBtn.dataset.id = film.id;
		editBtn.dataset.id = film.id;

		title.textContent = film.title;
		image.src = film.poster;
		overview.textContent = film.overview;

		const date = new Date(film.release_date);
		const result = generateDate(date);

		elDate.textContent = result;

		film.genres.forEach((genre) => {
			const li = document.createElement('li');
			li.textContent = genre;
			elGenres.appendChild(li);
		});

		fragment.appendChild(card);
	});

	parent.appendChild(fragment);
}

renderFilms(films);

elCards.addEventListener('click', (evt) => {
	if (evt.target.className.includes('btn-danger')) {
		const id = evt.target.dataset.id;

		const resultArray = films.filter((film) => {
			if (film.id !== id) {
				return film;
			}
		});
		films = resultArray;

		renderFilms(films);
	}
	if (evt.target.className.includes('btn-primary')) {
		const id = evt.target.dataset.id;

		films.forEach((film) => {
			if (id === film.id) {
				elImgInput.value = film.poster;
				elImg.src = film.poster;
				elTitle.value = film.title;
				elOverview.value = film.overview;

				const resultDate = generateDate(new Date(film.release_date));
				elDateText.textContent = resultDate;

				const editBtn = document.querySelector('#editHandler');

				editBtn.addEventListener('click', () => {
					const title = elTitle.value;
					const img = elImgInput.value;
					const date = elDate.value;
					const overview = elOverview.value;

					film.title = title;
					film.poster = img;
					film.release_date = date;
					film.overview = overview;

					renderFilms(films);
				});
			}
		});
	}
});
