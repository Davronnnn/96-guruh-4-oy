import { BASE_URL } from './utils/constantas.js';
import findElement from './utils/findElement.js';

const loader = findElement('#loader');
const templateProduct = findElement('#product-template');
const elCards = findElement('.cards');
const ulCategory = findElement('.list-group');

let products = [];

const renderProducts = (array, parent = elCards) => {
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
		const description = findElement('.description', template);
		const ratingFull = findElement('.rating-full', template);
		const ratingStars = findElement('.rating-stars', template);

		img.dataset.id = product.id;
		description.dataset.id = product.id;
		const roundRate = Math.round(product.rating.rate);
		for (let i = 0; i < roundRate; i++) {
			const img = document.createElement('img');
			img.src = ratingFull.src;
			ratingStars.appendChild(img);
		}

		title.textContent = product.name;
		date.textContent = product.createdAt;
		category.textContent = product.category;
		price.textContent = `${product.price}$`;
		rating.textContent = `${product.rating.count} ta odamdan ${product.rating.rate} ⭐️`;
		description.textContent = product.description;
		img.src = product.image;

		fragment.appendChild(template);
	});

	parent.appendChild(fragment);
};

const renderCategory = (data, parent = ulCategory) => {
	const fragment = document.createDocumentFragment();

	const li = document.createElement('li');
	li.className = 'w-25 list-group-item ';
	li.textContent = 'All';
	fragment.appendChild(li);
	data.forEach((category) => {
		const li = document.createElement('li');
		li.className = 'w-25 list-group-item ';
		li.textContent = category;
		fragment.appendChild(li);
	});

	parent.appendChild(fragment);
};

const getData = async () => {
	try {
		const res = await fetch(`${BASE_URL}products`);

		const resCategory = await fetch(`${BASE_URL}products/categories`);
		const jsonCategory = await resCategory.json();

		renderCategory(jsonCategory);

		loader.style.display = 'none';
		if (res.status === 404) {
			throw new Error('qanaqadir xatolik');
		}
		const data = await res.json();

		products = data;

		renderProducts(products);
	} catch (err) {
		console.error(err);
	}
};

elCards.addEventListener('click', (evt) => {
	if (
		evt.target.className.includes('description') ||
		evt.target.className.includes('card-img')
	) {
		const id = evt.target.dataset.id;
		localStorage.setItem('id', id);
		window.location.href = 'single-product.html';
	}
});

ulCategory.addEventListener('click', (evt) => {
	const target = evt.target;

	if (target.className.includes('list-group-item')) {
		loader.style.display = 'block';
		elCards.textContent = '';

		fetch(
			`${BASE_URL}products${
				target.textContent === 'All'
					? '/'
					: '/category/' + target.textContent
			}`
		)
			.then((res) => res.json())
			.then((data) => {
				renderProducts(data);
				loader.style.display = 'none';
			});
	}
});

getData();
