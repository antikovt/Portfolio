let currentIndex = 0;
const carousel = document.getElementById("carousel");
const children = carousel.children;
const date = document.getElementById("project-date");
const name = document.getElementById("project-name");

function carouselRight() {
    if (children.length === 0) return; // Exit if no children

    // Increment index and reset if it overflows
    currentIndex = (currentIndex + 1) % children.length;

    // Scroll to the current child element
    const targetChild = children[currentIndex];
    carousel.scrollTo({
        left: targetChild.offsetLeft,
        behavior: 'smooth'
    });

    if (currentIndex !== 0) {
        date.classList.add("hidden");
        name.classList.add("hidden");
    } else {
        date.classList.remove("hidden");
        name.classList.remove("hidden");
    }
}

function carouselLeft() {
    if (children.length === 0) return; // Exit if no children

    // Increment index and reset if it overflows
    currentIndex = (currentIndex - 1 + children.length) % children.length;

    // Scroll to the current child element
    const targetChild = children[currentIndex];
    carousel.scrollTo({
        left: targetChild.offsetLeft,
        behavior: 'smooth'
    });

    if (currentIndex !== 0) {
        date.classList.add("hidden");
        name.classList.add("hidden");
    } else {
        date.classList.remove("hidden");
        name.classList.remove("hidden");
    }
}