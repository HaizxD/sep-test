const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('#sliderDots span');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
let currentIndex = 0;
const totalSlides = slides.length;
function goToSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentIndex = (index + totalSlides) % totalSlides;
    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
}
function nextSlideFn() { goToSlide(currentIndex + 1); }
function prevSlideFn() { goToSlide(currentIndex - 1); }
prevBtn.addEventListener('click', prevSlideFn);
nextBtn.addEventListener('click', nextSlideFn);
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
});
let autoPlay = setInterval(nextSlideFn, 5000);
const sliderWrapper = document.querySelector('.testimonial-wrapper');
sliderWrapper.addEventListener('mouseenter', () => clearInterval(autoPlay));
sliderWrapper.addEventListener('mouseleave', () => {
    autoPlay = setInterval(nextSlideFn, 5000);
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')
        prevSlideFn();
    if (e.key === 'ArrowRight')
        nextSlideFn();
});
document.querySelector('[data-year]').textContent = new Date().getFullYear();
