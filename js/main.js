let pages;
let fixScrollTimeout;
let lastKnowScrollPosition = 0;
let ticking = false;

function nextSlidePlease() {
    const lastActiveSlide = document.querySelector('.paganini-project-image.deactivated');
    const currentSlide = document.querySelector('.paganini-project-image.active');
    const nextSlide = currentSlide.nextElementSibling || currentSlide.parentElement.firstElementChild;
    if(lastActiveSlide) {
        lastActiveSlide.classList.remove('deactivated');
    }
    currentSlide.classList.remove('active');
    currentSlide.classList.add('deactivated');
    nextSlide.classList.add('active');
}

function initBP() {
    const vh = window.innerHeight * 0.01;
    console.log(`set height: ${vh}`);
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    setInterval(nextSlidePlease, 7000);
    pages = {
        splash: document.querySelector('.main'),
        paganini: document.querySelector('.paganini'),
        projects: document.querySelector('.paganini-projects'),
        footer: document.querySelector('.footer'),
    }
    const scrollBtn = document.querySelector('.scroll-btn');
    scrollBtn.addEventListener('click', () => {
        pages.paganini.scrollIntoView({
            behavior:'smooth'
        });
    });
}

function scrollEvent(scrollPosition) {
  setFooterVisualPosition(scrollPosition);
}

function setFooterVisualPosition(scrollPosition) {
    const scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
    const windowHeight = document.documentElement.clientHeight;
    const footerVisual = pages.footer.querySelector('.footer-visual img');
    const fromBottom = scrollHeight - (scrollPosition + windowHeight);
    footerVisual.style.transform = `translate(0px, ${Math.min(footerVisual.clientHeight, fromBottom)}px)`;
}

window.addEventListener('DOMContentLoaded', (event) => {
    initBP();
});