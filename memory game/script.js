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
    for (let i of cards) {
        i.classList.remove("anim");
        cardInner = i.childNodes[0];
        cardInnerBack = cardInner.childNodes[1]
        cardBackText = cardInnerBack.childNodes[0];
        cardBackText.innerHTML = "";
    }
    cards.forEach((el) => {
        el.addEventListener("click", clickEvent);
        el.style.cursor = "pointer"
    });
}

function clearCards() {
    const cards = document.querySelectorAll(".game-card");

    cards.forEach((el) => {
        el.remove();
    });
}

const cardsParentTwo = document.querySelector(".game-playground");

function restart(cardN, wins, score, rows, func) {
    cardN = 4;
    cardsParentTwo.style.gridTemplateColumns = `repeat(${cardN / 2}, 100px)`
    wins = 0;
    score = 0;
    rows = 2;

    clearCards();

    func(cardN);
}

function generateCardsContent(cards, uniqIndexes, uniq, indexFirst, test) {
    for (let j = 1; j < 2; j++) {
        indexSecond = random(0, cards.length);
        indexThird = random(0, cards.length);

        for (let i = 0; i < 10000; i++) {
            if (indexSecond === indexThird) {
                indexSecond = random(0, cards.length);
                indexThird = random(0, cards.length);
            } else {
                break;
            }

        }

        let textSecond = cards[indexSecond].querySelector(".game-card-text")
        let textThird = cards[indexThird].querySelector(".game-card-text")


        if (indexSecond !== indexThird) {
            if (unical(uniqIndexes, indexSecond) && unical(uniqIndexes, indexThird)) {
                textSecond.innerHTML = uniq[indexFirst][test];
                textThird.innerHTML = uniq[indexFirst][test];

                uniqIndexes.push(indexSecond);
                uniqIndexes.push(indexThird);

            } else {
                generateCardsContent(cards, uniqIndexes, uniq, indexFirst, test)
            }
        }

        test++
    }
}

let cardDict = new Map();

function renderCards(n) {
    let uniq = [];
    let uniqIndexes = [];
    let uniqIndexesSecond = [];

    let cardInner, cardInnerBack, cardBackText;


    let test = 0;
    let indexFirst, indexSecond, indexThird;
    let next = true;

    for (let i = 1; i <= n / 2; i++) {
        uniq.push([i, i]);
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
        if (test >= uniq.length) {
            test = 0;
        }

        indexFirst = i % 2 === 0 ? random(0, uniq.length) : indexFirst;
        for (let i = 0; i < 10000; i++) {
            if (uniqIndexesSecond.includes(indexFirst)) {
                indexFirst = next ? random(0, uniq.length) : indexFirst;
            } else {
                break;
            }

        }

        next = false;

        generateCardsContent(cards, uniqIndexes, uniq, indexFirst, test);
        setTimeout(fadeText, 2000, cards);

        for (let i of cards) {
            cardInner = i.childNodes[0];
            cardInnerBack = cardInner.childNodes[1]
            cardBackText = cardInnerBack.childNodes[0];
            cardDict.set(i, cardBackText.innerHTML);

        }


        uniqIndexesSecond.push(indexFirst);
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
const cards = document.querySelectorAll(".game-card");

const gameText = document.querySelector(".game-text");

function clickEvent() {

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
                        clearCards();

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

                    clearCards()
                    gameText.innerHTML = "You lose(";
                }


            }
        }

        hasClickedFirstEl = false;
        firstEl = null;
        secondEl = null;
    }


}
