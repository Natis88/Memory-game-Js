const card = document.querySelectorAll('.card');
const everyChild = document.querySelectorAll("#container div");
const opend = [];
const matched = [];
let matchedIdx = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firCard, secCard;
var count = 5;
count = parseInt(document.getElementById('guess').innerHTML);


document.getElementById('guess').innerHTML = "כמות ניחושים:  " + `<span style="color:chartreuse;font-size:xx-large;font-weight:bold;"> ${count}</span>`;





function setAllImagesToArray() {

    for (var i = 0; i < everyChild.length; i++) {
        opend[i] = everyChild[i].getElementsByClassName('front');

    }

}


setAllImagesToArray();


function flipCard() {

    if (lockBoard)
        return;
    if (this === firCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {

        //first click
        hasFlippedCard = true;
        firCard = this;

    } else {

        //second click
        hasFlippedCard = false;
        secCard = this;

        checkMatch();

    }
}

function checkMatch() {

    //match between cards
    if (firCard.dataset.id === secCard.dataset.id) {
        //if match
        cardMatch();
    } else {

        //if not match
        cardUnMatch();
    }
}

function cardMatch() {

    firCard.removeEventListener('click', flipCard);
    secCard.removeEventListener('click', flipCard);
    addToMatched();
    resetBoard();
}

function addToMatched() {
    matched[matchedIdx] = firCard;
    matched[matchedIdx + 1] = secCard;
    matchedIdx += 2;
    setTimeout(() => {
        if (matched.length === opend.length) {
            showWin();
        }

    }, 200);
}

function cardUnMatch() {

    lockBoard = true;

    setTimeout(() => {

        firCard.classList.remove('flip');
        secCard.classList.remove('flip');

        document.getElementById('guess').innerHTML = "כמות ניחושים: " + `<span style="color:red;font-size:xx-large;font-weight:bold;"> ${(count-=1)}</span>`;

        checkCount();
        lockBoard = false;

    }, 500);

}

function checkCount() {
    if (count < 1) {

        lockBoard = false;
        setTimeout(() => {
            showLose();
        }, 200);

    }
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firCard, secCard] = [null, null];

}

(function shuffle() {
    card.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();


function showWin() {

    var modal = document.getElementById("win");
    modal.style.display = "block";

}

function showLose() {

    var modal = document.getElementById("lose");
    modal.style.display = "block";

}

card.forEach(card => card.addEventListener('click', flipCard));