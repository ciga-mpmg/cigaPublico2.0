import Swiper from 'swiper';

function createSwiper(params, config) {
    return new Swiper(params, config);
}

createSwiper('.swiper-control', {
    slidesPerView: 1.5,
    spaceBetween: 32,
    centeredSlides: true,
    grabCursor: true,
    initialSlide: 0,
    breakpoints: {
        1200: {
            slidesPerView: 3.5,
            initialSlide: 1,
        },
        800: {
            slidesPerView: 2.5,
            initialSlide: 1,
        },
    },
});
