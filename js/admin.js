import findElement from './utils/findElement.js';

const BASE_URL = 'https://63d3e856a93a149755b5c8f1.mockapi.io';

let products = [];

const templateProduct = findElement('#product-template');
const elCards = findElement('.cards');
const elForm = findElement('#add-product');

function renderProducts(array, parent = elCards) {
	parent.textContent = '';

	const fragment = document.createDocumentFragment();

	array.forEach((product) => {
		const template = templateProduct.content.cloneNode(true);

		const title = findElement('.card-title', template);
		const date = findElement('.date', template);
		const img = findElement('.card-img-top', template);
		const category = findElement('.category', template);
		const price = findElement('.price', template);
		const rating = findElement('.rating', template);

		const ratingFull = findElement('.rating-full', template);
		const ratingHalf = findElement('.rating-half', template);
		const ratingStars = findElement('.rating-stars', template);
		const deleteBtn = findElement('.btn-danger', template);
		const editBtn = findElement('.btn-info', template);

		deleteBtn.dataset.id = product.id;
		editBtn.dataset.id = product.id;

		if (product.rating === 5) {
			for (let i = 0; i < 5; i++) {
				const img = document.createElement('img');
				img.src = ratingFull.src;

				ratingStars.appendChild(img);
			}
		} else if (product.rating < 5 && product.rating >= 4.5) {
			for (let i = 0; i < 4; i++) {
				const img = document.createElement('img');
				img.src = ratingFull.src;

				ratingStars.appendChild(img);
			}
			const img = document.createElement('img');
			img.src = ratingHalf.src;
			ratingStars.appendChild(img);
		} else if (product.rating < 4.5 && product.rating >= 4) {
			for (let i = 0; i < 4; i++) {
				const img = document.createElement('img');
				img.src = ratingFull.src;

				ratingStars.appendChild(img);
			}
		} else if (product.rating < 4 && product.rating >= 3.5) {
			for (let i = 0; i < 3; i++) {
				const img = document.createElement('img');
				img.src = ratingFull.src;

				ratingStars.appendChild(img);
			}
			const img = document.createElement('img');

			img.src = ratingHalf.src;
			ratingStars.appendChild(img);
		} else if (product.rating < 3.5 && product.rating >= 3) {
			for (let i = 0; i < 3; i++) {
				const img = document.createElement('img');
				img.src = ratingFull.src;

				ratingStars.appendChild(img);
			}
		} else if (product.rating < 3 && product.rating >= 2.5) {
			for (let i = 0; i < 2; i++) {
				const img = document.createElement('img');
				img.src = ratingFull.src;

				ratingStars.appendChild(img);
			}
			const img = document.createElement('img');
			img.src = ratingHalf.src;
			ratingStars.appendChild(img);
		} else if (product.rating < 2.5 && product.rating >= 2) {
			for (let i = 0; i < 2; i++) {
				const img = document.createElement('img');
				img.src = ratingFull.src;

				ratingStars.appendChild(img);
			}
		} else if (product.rating < 2 && product.rating >= 1.5) {
			for (let i = 0; i < 1; i++) {
				const img = document.createElement('img');
				img.src = ratingFull.src;

				ratingStars.appendChild(img);
			}
			const img = document.createElement('img');
			img.src = ratingHalf.src;
			ratingStars.appendChild(img);
		} else if (product.rating < 1.5 && product.rating >= 1) {
			for (let i = 0; i < 1; i++) {
				const img = document.createElement('img');
				img.src = ratingFull.src;

				ratingStars.appendChild(img);
			}
		} else if (product.rating < 1 && product.rating >= 0.5) {
			const img = document.createElement('img');
			img.src = ratingHalf.src;
			ratingStars.appendChild(img);
		} else {
		}

		title.textContent = product.name;
		date.textContent = product.createdAt;
		category.textContent = product.category;
		price.textContent = product.price;
		rating.textContent = product.rating;
		img.src = product.image;

		fragment.appendChild(template);
		// parent.appendChild(template)
	});

	parent.appendChild(fragment);
}

function getData() {
	try {
		async function getData() {
			const res = await fetch(BASE_URL + '/products');

			if (res.status === 404) {
				throw new Error('qanaqadir xatolik');
			}
			let data = await res.json();

			products = data;

			renderProducts(products);
		}

		getData();
	} catch (err) {
		console.log(err);
	}
}

getData();

elForm.addEventListener('submit', (evt) => {
	evt.preventDefault();

	const name = evt.target.name.value;
	const image = evt.target.image.value;
	const category = evt.target.category.value;
	const price = evt.target.price.value;
	const rating = evt.target.rating.value;
	const createdAt = evt.target.createdAt.value;

	const newProduct = {
		name,
		image,
		category,
		rating,
		price,
		createdAt,
	};

	fetch(BASE_URL + '/products', {
		method: 'POST',
		body: JSON.stringify(newProduct),
	})
		.then((res) => res.json)
		.then((data) => {
			console.log(data);

			alert("mahsulot qo'shildi");
			getData();
			elForm.reset();
		})
		.catch((err) => {
			alert("xato topildi qaytadan urinib ko'ring");
		});
});

elCards.addEventListener('click', (evt) => {
	if (evt.target.className.includes('btn-danger')) {
		const id = evt.target.dataset.id;

		fetch(BASE_URL + '/products/' + id, {
			method: 'DELETE',
		})
			.then((res) => res.json())
			.then((data) => {
				alert("post muvaffaqqiyatli o'chdi");
				getData();
			})
			.catch((err) => {
				alert("post o'chirilmadi");
			});
	}
});
