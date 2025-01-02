const burgerData = [
    {
        image: "images/burger1.png",
        sm1: { src: "images/sm1.png", alt: "wołowina" },
        sm2: { src: "images/sm2.png", alt: "kurczak" },
    },
    {
        image: "images/burger2.png",
        sm1: { src: "images/sm3.png", alt: "halloumi" },
        sm2: { src: "images/sm4.png", alt: "plant beef" },
    },
];

let currentIndex = 0;

const burgerContentElement = document.querySelector(".burgerContent");
const arrowLeft = document.querySelector(".arrowLeft");
const arrowRight = document.querySelector(".arrowRight");

function createBurgerHTML(burger) {
    return `
        <img src="${burger.image}" alt="burger image" class="burger">
    `;
}

function createNamesHTML(burger) {
    return `<div class="names">
            <div class="leftName">
                <img src="${burger.sm1.src}" alt="${burger.sm1.alt}">
            </div>
            <div class="rightName">
                <img src="${burger.sm2.src}" alt="${burger.sm2.alt}">
            </div>
        </div>`;
}

function updateBurger(direction) {
    burgerContentElement.classList.remove("slide-left", "slide-right", "exit-right", "exit-left");

    if (direction === "right") {
        burgerContentElement.classList.add("exit-left");
    } else if (direction === "left") {
        burgerContentElement.classList.add("exit-right");
    }

    setTimeout(() => {
        burgerContentElement.classList.remove("exit-right", "exit-left");
        burgerContentElement.innerHTML = createBurgerHTML(burgerData[currentIndex]);

        if (direction === "right") {
            burgerContentElement.classList.add("slide-right");
        } else if (direction === "left") {
            burgerContentElement.classList.add("slide-left");
        }

        setTimeout(() => {
            burgerContentElement.innerHTML += createNamesHTML(burgerData[currentIndex]);
        }, 500);
    }, 300); 
}

function slideLeft() {
    currentIndex = (currentIndex === 0) ? burgerData.length - 1 : currentIndex - 1;
    updateBurger("left");
    resetAutoSlide();
}

function slideRight() {
    currentIndex = (currentIndex + 1) % burgerData.length;
    updateBurger("right");
    resetAutoSlide();
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(slideRight, 7000);
}

arrowLeft.addEventListener("click", slideLeft);
arrowRight.addEventListener("click", slideRight);

autoSlideInterval = setInterval(slideRight, 5000);

updateBurger();
