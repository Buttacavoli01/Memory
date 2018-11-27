/*jshint esversion: 6 */
let cards = [...$('.card')];
let moves = 0;
let match = $('matched');
let matched = 0;
oC = []; // array for opened cards

// startGame function created to start and play the game
function startGame() {
  function shuffle(array) {
    let currentIndex = array.length,
      temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    startTimer();
    return array;
  }
  let shuffleCards = shuffle(cards);

  // Each card is appened to the board after being shuffled
  for (let i = 0; i < shuffleCards.length; i++) {
    [].forEach.call(cards, (item) => {
      $('#card-deck').append(item);
    });
  }
}

function startTimer() {
  let seconds = 0,
    minute = 0;
  let interval = setInterval(() => {
    $('.timer').html(` ${minute} : ${seconds}`);
    seconds++;
    if (seconds === 60) {
      minute++;
      seconds = 0;
    }
  }, 1000);
}


// toggle between open and show class to display open Cards
function displayCard() {
  $(this).addClass('open show disabled');
}
// cardsFlipped function adds the selected cards to openCards array and checks if the cards are matched or not
function cardFlipped() {
  oC.push(this);
  if (oC.length === 2) {
    moves++;
    $('.move-counter').text(moves);
    //checking to see if the cards match
    if (oC[0].type === oC[1].type) {
      oC[0].classList.add('match', 'disabled');
      //addClass doesnt work with arrays? only applies to selectors
      oC[1].classList.add('match', 'disabled');
      matched += 2;
      oC = [];
    } else {
      oC[0].classList.add('unmatched');
      oC[1].classList.add('unmatched');
      disabled();

      setTimeout(() => {
        oC[0].classList.remove('open', 'show', 'no-event', 'unmatched');
        oC[1].classList.remove('open', 'show', 'no-event', 'unmatched');
        enable();
        oC = [];
      }, 800);
    }
  }
}

//cards are disabled temporarily
function disabled() {
  Array.prototype.filter.call(cards, () => {
    $('.card').addClass('disabled');
  });
}
//cards are enabled after interval and matched cards are disabled
function enable() {
  Array.prototype.filter.call(cards, () => {
    $('.card').removeClass('disabled');
    for (let i = 0; i < match.length; i++) {
      match[i].classList.add('disabled');
    }
  });
}
// EndGame function w/ popup
function endGame() {
  if (matched === 16) {
    // grabs time the game is completed

    //add show class to overlay class to show modalPop
    $('.overlay').css('visibility', 'visible');
    // show # of moves, time taken and stars on pop-up
    $('#finalMove').html(moves);
    $('#starRating').html(starRating);
    $('#totalTime').html();
  }
}

//starts game again from X button
function closeModal() {
  $('popup').click(() => {
    $('overlay').css('visibility', 'hidden');
  });
}

$('.card').click(displayCard);
$('.card').click(cardFlipped);
$('.card').click(endGame);
$(document).ready(startGame)
