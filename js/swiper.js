import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js';

const swiper = new Swiper('.swiper', {
	loop: true,
	slidesPerView: 3,

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	breakpoints: {
		320: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		480: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
		640: {
			slidesPerView: 4,
			spaceBetween: 200,
		},
	},
	zoom: {
		maxRatio: 5,
	},

	// And if we need scrollbar
	// scrollbar: {
	// 	el: '.swiper-scrollbar',
	// },
});
