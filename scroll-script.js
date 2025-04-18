const container = document.getElementById('carousel');
let autoScrollInterval;
let userHasInteracted = false;

function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
}

function startAutoScroll() {
    if (autoScrollInterval || userHasInteracted) return;
    autoScrollInterval = setInterval(() => {
        if (!userHasInteracted && isInViewport(container)) {
            container.scrollLeft += 1;
        }
    }, 20);
}

function stopAutoScrollForever() {
    userHasInteracted = true;
    clearInterval(autoScrollInterval);
    autoScrollInterval = null;
}


let lastScrollLeft = container.scrollLeft;
container.addEventListener('scroll', () => {
    const currentScroll = container.scrollLeft;
    if (Math.abs(currentScroll - lastScrollLeft) > 2) {
        stopAutoScrollForever();
    }
    lastScrollLeft = currentScroll;
});


const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !userHasInteracted) {
            startAutoScroll();
        }
    });
}, {
    threshold: 0.75
});

observer.observe(container);

const overlay = document.getElementById("image-overlay");
const overlayImg = document.getElementById("overlay-img");
const overlayCaption = document.getElementById("overlay-caption");

document.querySelectorAll(".scroll-container img").forEach((img) => {
    img.addEventListener("click", (_) => {
        overlayImg.src = img.src; // Set the clicked image as the overlay image
        overlayCaption.textContent = img.alt || ""; // Set the caption
        overlay.classList.add("show"); // Show the overlay
    });
});

overlay.addEventListener("click", () => {
    overlay.classList.remove("show");
});
