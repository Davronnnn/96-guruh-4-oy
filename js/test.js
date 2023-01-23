// const getData = new Promise((resolve, reject) => {
// 	if (false) {
// 		resolve('Bajarildi');
// 	} else {
// 		reject('qaytarildi');
// 	}
// });
// getData
// 	.then((res) => {
// 		console.log(res);
// 	})
// 	.catch((res) => {
// 		console.log(res);
// 	});

const data = fetch('https://jsonplaceholder.typicode.com/posts');

data.then((res) => {
	return res.json();
}).then((res) => {
	console.log(res);
});
