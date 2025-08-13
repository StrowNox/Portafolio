document.addEventListener('DOMContentLoaded', () => {
    // ---- Carrusel ----
    const imagesContainer = document.querySelector('.hero-image-container');
    const images = document.querySelectorAll('.hero-image');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-control-left');
    const nextBtn = document.querySelector('.carousel-control-right');
    const imageCount = images.length;
    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;

    function updateCarousel() {
        const offset = -currentIndex * 100;
        imagesContainer.style.transform = `translateX(${offset}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    function goToNext() {
        currentIndex = (currentIndex + 1) % imageCount;
        updateCarousel();
    }

    function goToPrev() {
        currentIndex = (currentIndex - 1 + imageCount) % imageCount;
        updateCarousel();
    }

    prevBtn.addEventListener('click', goToPrev);
    nextBtn.addEventListener('click', goToNext);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    imagesContainer.addEventListener('mousedown', e => {
        isDragging = true;
        startX = e.clientX;
        imagesContainer.style.transition = 'none';
    });

    imagesContainer.addEventListener('mousemove', e => {
        if (!isDragging) return;
        const dragDistance = e.clientX - startX;
        const currentOffset = -currentIndex * 100;
        imagesContainer.style.transform = `translateX(${currentOffset + (dragDistance / imagesContainer.offsetWidth) * 100}%)`;
    });

    imagesContainer.addEventListener('mouseup', e => {
        if (!isDragging) return;
        isDragging = false;
        imagesContainer.style.transition = 'transform 0.5s ease-in-out';
        const dragDistance = e.clientX - startX;
        const threshold = imagesContainer.offsetWidth / 4;
        if (dragDistance > threshold) goToPrev();
        else if (dragDistance < -threshold) goToNext();
        else updateCarousel();
    });

    imagesContainer.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            imagesContainer.style.transition = 'transform 0.5s ease-in-out';
            updateCarousel();
        }
    });

    imagesContainer.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        imagesContainer.style.transition = 'none';
    });

    imagesContainer.addEventListener('touchmove', e => {
        const dragDistance = e.touches[0].clientX - startX;
        const currentOffset = -currentIndex * 100;
        imagesContainer.style.transform = `translateX(${currentOffset + (dragDistance / imagesContainer.offsetWidth) * 100}%)`;
    });

    imagesContainer.addEventListener('touchend', e => {
        imagesContainer.style.transition = 'transform 0.5s ease-in-out';
        const endX = e.changedTouches[0].clientX;
        const dragDistance = endX - startX;
        const threshold = imagesContainer.offsetWidth / 4;
        if (dragDistance > threshold) goToPrev();
        else if (dragDistance < -threshold) goToNext();
        else updateCarousel();
    });

    updateCarousel();

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) document.body.classList.add('scrolled');
        else document.body.classList.remove('scrolled');
    });

    // ---- Aparición progresiva ----
    const fadeElements = document.querySelectorAll('.fade-in-up');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));
});