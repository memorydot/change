const countElem = document.getElementById("count");
const cardImage = document.getElementById("card-image");
const elapsedTimeElem = document.getElementById("elapsed-time");
const infiniteModeCheckbox = document.getElementById("infinite-mode");
const autoSlideModeCheckbox = document.getElementById("auto-slide-mode");
const slideIntervalInput = document.getElementById("slide-interval");
const restartButton = document.getElementById("restart-button");

let startTime = new Date();
let cardCount = 0;
let usedCards = [];
let timer;
let elapsedTimeTimer;

function getRandomCard() {
    let suits = ['c', 'd', 'h', 's'];
    let cardNumber = Math.floor(Math.random() * 13) + 1;
    let suit = suits[Math.floor(Math.random() * suits.length)];
    let cardId = `${suit}${cardNumber.toString().padStart(2, '0')}`;
    return cardId;
}

function displayCard() {
    if (!infiniteModeCheckbox.checked && usedCards.length === 52) {
        clearInterval(elapsedTimeTimer);
        return;
    }

    let cardId;
    if (infiniteModeCheckbox.checked) {
        cardId = getRandomCard();
    } else {
        do {
            cardId = getRandomCard();
        } while (usedCards.includes(cardId));
        usedCards.push(cardId);
    }
    cardImage.src = `img/${cardId}.png`;
    cardCount++;
    countElem.textContent = cardCount;
}

function updateElapsedTime() {
    let currentTime = new Date();
    let elapsedTime = (currentTime - startTime) / 1000;
    elapsedTimeElem.textContent = elapsedTime.toFixed(1);
}

function restart() {
    startTime = new Date();
    cardCount = 0;
    usedCards = [];
    countElem.textContent = 1;
    clearInterval(elapsedTimeTimer);
    elapsedTimeElem.textContent = 0;
    displayCard();
    elapsedTimeTimer = setInterval(updateElapsedTime, 100);
}

function autoSlide() {
    clearInterval(timer);
    if (autoSlideModeCheckbox.checked) {
        timer = setInterval(displayCard, slideIntervalInput.value * 1000);
    }
}

restartButton.addEventListener("click", restart);
infiniteModeCheckbox.addEventListener("change", restart);
autoSlideModeCheckbox.addEventListener("change", autoSlide);
slideIntervalInput.addEventListener("input", autoSlide);
cardImage.addEventListener("click", displayCard);

restart();
autoSlide();
