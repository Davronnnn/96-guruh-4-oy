import findElement from './utils/findElement.js';

const elImg = findElement('.card-img-top');
const elTitle = findElement('.card-title');
const elDescription = findElement('.card-text');
const elCategory = findElement('.card-category');
const elPrice = findElement('.card-price');

const id = localStorage.getItem('id');
let data = {};

fetch('https://fakestoreapi.com/products/' + id)
	.then((res) => res.json())
	.then((json) => {
		console.log(json);
		data = json;

		console.log(data, elTitle);
		elTitle.textContent = data.title;
		elDescription.textContent = data.description;
		elCategory.textContent = data.category;
		elPrice.textContent = data.price;
		elImg.src = data.image;
	});
