// import findElement from './js/utils/findElement.js';
// const form = findElement('form');
// const ul = findElement('ul');
// const template = findElement('#contact');

// class ContactForm {
// 	contacts = [
// 		{
// 			id: 0,
// 			name: 'Name',
// 			relationship: 'test',
// 			number: '9981234567',
// 		},
// 		{
// 			id: 1,
// 			name: 'Name',
// 			relationship: 'test',
// 			number: '9981234567',
// 		},
// 	];

// 	addContact(contact) {
// 		this.contacts.push(contact);
// 		this.renderContacts();
// 	}

// 	//
// 	deleteContact(id) {
// 		this.contacts = this.contacts.filter((contact) => {
// 			if (contact.id !== +id) {
// 				return contact;
// 			}
// 		});
// 		this.renderContacts();
// 	}
// 	editContact(contact2) {
// 		contacts = this.contacts.filter((contact) => {
// 			if (contact.id === contact2.id) {
// 				contact = contact2;
// 			}
// 		});
// 		this.renderContacts();
// 	}
// 	generateId() {
// 		const array = this.contacts;
// 		return array.length !== 0 ? array[array.length - 1].id + 1 : 0;
// 	}

// 	renderContacts() {
// 		this.contacts.forEach((contact) => {
// 			const newLi = template.content.cloneNode(true);

// 			const elName = findElement('h5', newLi);
// 			const elRelate = findElement('#relationship', newLi);
// 			const elPhone = findElement('#phone', newLi);
// 			const elDelete = findElement('.btn-danger', newLi);

// 			elName.textContent = contact.name;
// 			elRelate.textContent = contact.relationship;
// 			elPhone.textContent = contact.number;

// 			elDelete.dataset.id = contact.id;

// 			ul.appendChild(newLi);
// 		});
// 	}
// }

// const contacts = new ContactForm();

// contacts.renderContacts();

// form.addEventListener('submit', (evt) => {
// 	evt.preventDefault();

// 	const name = evt.target.userName.value;
// 	const relationship = evt.target.relationship.value;
// 	const number = evt.target.phone.value;

// 	const newContact = {
// 		id: contacts.generateId(),
// 		name,
// 		relationship,
// 		number,
// 	};

// 	ul.textContent = null;

// 	contacts.addContact(newContact);
// });

// ul.addEventListener('click', (evt) => {
// 	const target = evt.target;

// 	if (target.className.includes('btn-danger')) {
// 		ul.textContent = null;

// 		const id = target.dataset.id;

// 		contacts.deleteContact(id);
// 	}
// });

// inheritance -  vorislik;

class Animal {}

// child
class Tiger extends Animal {
	name = 'Tiger';

	constructor(age, color, speed) {
		super();

		this.age = age;
		this.color = color;
		this.speed = speed;
	}

	get getAllProperty() {
		return {
			name: this.name,
			age: this.age,
			color: this.color,
			speed: this.speed,
		};
	}

	updateName(name) {
		return (this.name = name);
	}
}

//
const animal = new Animal();

const tiger = new Tiger(5, 'black', 70);
