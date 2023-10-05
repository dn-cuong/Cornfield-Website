const toTop = document.querySelector('.to_top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
})