const track = document.getElementById("horizontal-track");
const wrapper = document.getElementById("scroll-wrapper");

// Handle horizontal scroll
window.addEventListener("scroll", () => {
    const wrapperTop = wrapper.offsetTop;
    const wrapperHeight = wrapper.offsetHeight;
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    const start = wrapperTop - windowHeight / 2;
    const end = wrapperTop + wrapperHeight - windowHeight / 2;

    if (scrollY >= start && scrollY <= end) {
        const progress = (scrollY - start) / (end - start);

        const maxScroll = track.scrollWidth - window.innerWidth + 500;
        const translateX = Math.min(progress * maxScroll, maxScroll);
        track.style.transform = `translateX(-${translateX}px)`;
    }
});

// Image overlay functionality
const overlay = document.getElementById("image-overlay");
const overlayImg = document.getElementById("overlay-img");
const overlayCaption = document.getElementById("overlay-caption");

// Handle image clicks to show the overlay
document.querySelectorAll(".horizontal-track img").forEach((img) => {
    img.addEventListener("click", (e) => {
        overlayImg.src = img.src; // Set the clicked image as the overlay image
        overlayCaption.textContent = img.alt || ""; // Set the caption
        overlay.classList.add("show"); // Show the overlay
    });
});

// Close the overlay when clicked
overlay.addEventListener("click", () => {
    overlay.classList.remove("show");
});
