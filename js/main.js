import { BASE_URL } from './utils/constantas.js';
import findElement from './utils/findElement.js';

const loader = findElement('#loader');
const templateProduct = findElement('#product-template');
const elCards = findElement('.cards');
const ulCategory = findElement('.list-group');
const searchInput = findElement('#search-input');

const pagination = findElement('.pagination');
const loginBtn = findElement('#login-btn');
const adminLink = findElement('#admin-link');

let categoryProducts = [];
const pageSize = 3;
let activePage = 1;
let lastPage = null;
const token = localStorage.getItem('token');

if (token) {
	loginBtn.textContent = 'Chiqish';
} else {
	adminLink.style.display = 'none';
}

loginBtn.addEventListener('click', () => {
	const token = localStorage.getItem('token');
	console.log(token);
	if (!token) {
		window.location.href = 'login.html';
	} else {
		localStorage.removeItem('token');
		loginBtn.textContent = 'Kirish';
		adminLink.style.display = 'none';
	}
});
let products = [];

searchInput.addEventListener('input', () => {
	const value = searchInput.value;

	const resultProducts = [];
	products.forEach((product) => {
		const title = product.title;

		const lengthValue = value.length;
		const searchedProduct = title.slice(0, lengthValue);
		if (value.toLowerCase() === searchedProduct.toLowerCase()) {
			resultProducts.push(product);
		}
	});

	renderProducts(resultProducts);
});

const renderProducts = (array, parent = elCards, page = 1) => {
	parent.textContent = '';

	const fragment = document.createDocumentFragment();

	const pages = Math.ceil(array.length / pageSize);

	pagination.textContent = null;
	const liFragment = document.createDocumentFragment();

	const prevBtn = document.createElement('button');
	prevBtn.textContent = '⬅️';
	prevBtn.id = 'prev';
	const nextBtn = document.createElement('button');
	nextBtn.textContent = '➡️';
	nextBtn.id = 'next';

	if (activePage === 1) {
		prevBtn.disabled = 'true';
	}
	if (activePage === lastPage) {
		nextBtn.disabled = 'true';
	}

	for (let i = 1; i <= pages; i++) {
		const li = document.createElement('li');
		li.className = 'btn btn-secondary ms-2';
		li.textContent = i;

		if (i === activePage) {
			li.className += ' btn-primary active';
		}

		liFragment.appendChild(li);
	}
	pagination.appendChild(prevBtn);
	pagination.appendChild(liFragment);
	pagination.appendChild(nextBtn);

	array
		.slice(pageSize * page - pageSize, pageSize * page)
		.forEach((product) => {
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

			title.textContent = product.title;
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

pagination.addEventListener('click', (evt) => {
	const prevBtn = findElement('#prev');
	if (evt.target.className.includes('btn')) {
		const value = +evt.target.textContent;

		activePage = value;
		if (categoryProducts.length > 0) {
			lastPage = +Math.ceil(categoryProducts.length / pageSize);

			renderProducts(categoryProducts, elCards, value);
			if (activePage === 1) {
				prevBtn.disabled = 'true';
			}
		} else {
			lastPage = +Math.ceil(products.length / pageSize);

			renderProducts(products, elCards, value);

			if (activePage === 1) {
				console.log(prevBtn);
				prevBtn.disabled = 'true';
				prevBtn.className = 'disabled p-3';
			}
		}
	}

	console.log(activePage, lastPage);
	if (evt.target.id.includes('prev')) {
		if (activePage === 1) {
			evt.target.disabled = 'true';
			return;
		}

		activePage--;
		if (categoryProducts.length > 0) {
			renderProducts(categoryProducts, elCards, activePage);
		} else {
			renderProducts(products, elCards, activePage);
		}
	}
	if (evt.target.id.includes('next')) {
		if (categoryProducts.length > 0) {
			lastPage = +Math.ceil(categoryProducts.length / pageSize);
			if (activePage === lastPage) {
				evt.target.disabled = 'true';
				return;
			}

			activePage++;
			renderProducts(categoryProducts, elCards, activePage);
		} else {
			lastPage = +Math.ceil(products.length / pageSize);

			activePage++;
			renderProducts(products, elCards, activePage);
		}
	}
});

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
		// window.location.href = 'single-product.html';
		window.open(
			'http://127.0.0.1:5500/single-product.html',
			'_blank' // <- This is what makes it open in a new window.
		);
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
				categoryProducts = data;

				renderProducts(data, elCards, 1);
				loader.style.display = 'none';
			});
	}
});

getData();
