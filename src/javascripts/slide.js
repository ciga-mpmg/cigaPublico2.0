import Swiper, { Autoplay, Pagination, Navigation } from 'swiper';

Swiper.use([Autoplay, Pagination, Navigation]);

function createSwiper(params, config) {
    return new Swiper(params, config);
}

createSwiper('.swiper-control', {
    slidesPerView: 1,
    grabCursor: true,
    navigation: {
        nextEl: '.button-next',
        prevEl: '.button-prev',
    },
    breakpoints: {
        1200: {
            slidesPerView: 2,
        },
    },
});
