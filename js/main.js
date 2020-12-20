let pages;
let fixScrollTimeout;
let lastKnowScrollPosition = 0;
let ticking = false;

function nextSlidePlease() {
    const currentSlide = document.querySelector('.paganini-project-image.active');
    const nextSlide = currentSlide.nextElementSibling || currentSlide.parentElement.firstElementChild;
    currentSlide.classList.remove('active');
    nextSlide.classList.add('active');
}

function initBP() {
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
  clearTimeout(fixScrollTimeout);
  fixScrollTimeout = setTimeout(() => {
      fixScrollPosition(scrollPosition);
  }, 500);
}

function fixScrollPosition(scrollPosition) {
    let nearestPage;
    let diffFromTop = Infinity;
    for(const [index, page] of Object.entries(pages)) {
        const rect = page.getBoundingClientRect();
        if(Math.abs(rect.top) < diffFromTop) {
            diffFromTop = Math.abs(rect.top)
            nearestPage = page;
        }
    }
    nearestPage.scrollIntoView({behavior:'smooth'});
}

document.addEventListener('scroll', function(e) {
  lastKnowScrollPosition = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(() => {
        scrollEvent(lastKnowScrollPosition);
        ticking = false;
    });
    ticking = true;
  }
});

window.addEventListener('DOMContentLoaded', (event) => {
    initBP();
});