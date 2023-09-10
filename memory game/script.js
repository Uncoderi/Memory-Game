let cardN = 4;

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function unical(arr, n) {
    for (let i of arr) {
        if (i === n) {
            return false;
        }
    }
    return true;
}

function fadeText(cards) {
    let cardInner, cardInnerBack, cardBackText;

    cards.forEach((el) => {
        el.classList.remove("anim");
        cardInner = el.childNodes[0];
        cardInnerBack = cardInner.childNodes[1]
        cardBackText = cardInnerBack.childNodes[0];
        cardBackText.innerHTML = "";
        el.addEventListener("click", clickEvent);
        el.style.cursor = "pointer"
    });
}

function clearCards(cards) {
    cards.forEach((el) => {
        el.remove();
    });
}

function generateCardsContent(cards, uniqCardIndexes, uniq, numIndex) {
    cardIndexFirst = random(0, cards.length);
    cardIndexSecond = random(0, cards.length);

    for (let i = 0; i < 10000; i++) {
        if (cardIndexFirst === cardIndexSecond) {
            cardIndexFirst = random(0, cards.length);
            cardIndexSecond = random(0, cards.length);
        } else {
            break;
        }

    }

    let cardTextFirst = cards[cardIndexFirst].querySelector(".game-card-text")
    let cardTextSecond = cards[cardIndexSecond].querySelector(".game-card-text")


    if (cardIndexFirst !== cardIndexSecond) {
        if (unical(uniqCardIndexes, cardIndexFirst) && unical(uniqCardIndexes, cardIndexSecond)) {
            cardTextFirst.innerHTML = uniq[numIndex][0];
            cardTextSecond.innerHTML = uniq[numIndex][0];

            uniqCardIndexes.push(cardIndexFirst);
            uniqCardIndexes.push(cardIndexSecond);

        } else {
            generateCardsContent(cards, uniqCardIndexes, uniq, numIndex)
        }
    }
}

let cardDict = new Map();

function renderCards(n) {
    let uniq = [];
    let uniqCardIndexes = [];
    let uniqNumIndexes = [];

    let cardInner, cardInnerBack, cardBackText;


    let numIndex;
    let next = true;

    for (let i = 1; i <= n / 2; i++) {
        uniq.push([i]);
    }

    for (let i = 1; i <= n; i++) {
        const card = document.createElement("div");
        const cardInner = document.createElement("div");
        const cardFront = document.createElement("div");
        const cardBack = document.createElement("div");
        const cardText = document.createElement("p");
        const cardParent = document.querySelector(".game-playground");

        card.classList.add("game-card");
        card.classList.add("anim");
        card.dataset.busy = "false";
        cardInner.classList.add("game-card-inner");
        cardFront.classList.add("game-card-front");
        cardBack.classList.add("game-card-back");
        cardText.classList.add("game-card-text");




        cardParent.appendChild(card);

        card.appendChild(cardInner);
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardBack.appendChild(cardText);

    }
    const cards = document.querySelectorAll(".game-card");




    for (let i = 0; i < cards.length / 2; i++) {
        

        numIndex = i % 2 === 0 ? random(0, uniq.length) : numIndex;
        for (let i = 0; i < 10000; i++) {
            if (uniqNumIndexes.includes(numIndex)) {
                numIndex = next ? random(0, uniq.length) : numIndex;
            } else {
                break;
            }

        }

        next = false;

        generateCardsContent(cards, uniqCardIndexes, uniq, numIndex);
        setTimeout(fadeText, 2000, cards);

        for (let i of cards) {
            cardInner = i.childNodes[0];
            cardInnerBack = cardInner.childNodes[1]
            cardBackText = cardInnerBack.childNodes[0];
            cardDict.set(i, cardBackText.innerHTML);

        }


        uniqNumIndexes.push(numIndex);
        next = true
    }

}

renderCards(cardN);


let hasClickedFirstEl = false;
let hasClickedSecondEl = false;
let firstEl, secondEl;
let score = 0;
let wins = 0;
let rows = 2;
const cardsParent = document.querySelector(".game-playground");

const gameText = document.querySelector(".game-text");

function clickEvent() {
    const cards = document.querySelectorAll(".game-card");


    let cardText = this.querySelector(".game-card-text");


    this.classList.add("anim");



    if (!hasClickedFirstEl) {
        hasClickedFirstEl = true;
        for (let i of cardDict) {
            if (this === i[0]) {
                cardText.innerHTML = i[1];
                firstEl = this;
            }
        }
    } else {

        for (let i of cardDict) {
            if (this === i[0]) {
                cardText.innerHTML = i[1];
                secondEl = this;
            }
        }

        if (firstEl !== secondEl) {
            if (firstEl.innerHTML === secondEl.innerHTML) {
                if (firstEl.dataset.busy === "false" && secondEl.dataset.busy === "false") {
                    score++;
                    firstEl.dataset.busy = true;
                    secondEl.dataset.busy = true;


                    if (cardN / score === 2) {
                        wins++;
                        clearCards(cards);

                        if (wins % 3 === 0) {
                            cardN += 2;
                            cardsParent.style.gridTemplateColumns = `repeat(${cardN / 2}, 100px)`
                            rows = cardN % 2 === 0 && cardN !== 2 ? rows++ : rows;
                            cardsParent.style.gridTemplateRows = `repeat(${rows}, 100px)`

                            setTimeout(renderCards, 3000, cardN);
                        } else {
                            setTimeout(renderCards, 3000, cardN);
                        }




                        score = 0;
                    }
                }
            } else {
                if (firstEl.dataset.busy === "false" && secondEl.dataset.busy === "false") {

                    clearCards(cards)
                    gameText.innerHTML = "You lose(";
                }


            }
        }

        hasClickedFirstEl = false;
        firstEl = null;
        secondEl = null;
    }


}
