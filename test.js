const obj = {
	name: 'john',
	age: 25,
	sayHello() {
		return 'salom ' + this.name;
	},
};

console.log(obj.sayHello());

const { name, sayHello } = obj;

console.log(window.name);
console.log(sayHello());
