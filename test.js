const word = 'test';

const obj = {
	e: 1,
	t: 1,
};

function findWords(text) {
	const array = word.split('');

	const result = {};

	for (let i = 0; i < array.length; i++) {
		if (result[array[i]]) {
			result[array[i]] = result[array[i]] + 1;
		} else {
			result[array[i]] = 1;
		}
	}
	return result;
}

console.log(findWords(word));
