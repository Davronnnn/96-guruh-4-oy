// api
const BASE_URL = 'https://63d3e856a93a149755b5c8f1.mockapi.io';

(async function () {
	const res = await fetch(BASE_URL + '/products');

	let data = await res.json();
	console.log(data);
})();
