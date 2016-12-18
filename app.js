/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying;
init();
//function btn(){   
//}
//selecting roll button and add eventListener for click. call btn. Callback function because is called by another function
//anonymous function can also be passed
//document.querySelector('.btn-roll').addEventListener('click',btn);
//anonymous function can also be passed
document.querySelector('.btn-roll').addEventListener('click', function () {
    //state variable
    if (gamePlaying) {
        var dice, diceDOM;
        //1. originate random number
        dice = Math.floor(Math.random() * 6) + 1;
        //2. display result
        diceDOM = document.querySelector('.dice');
        //display it
        diceDOM.style.display = 'block';
        //change image
        diceDOM.src = 'dice-' + dice + '.png';
        //3. update round score if rolled number is not one
        if (dice !== 1) {
            //add score
            roundScore += dice;
            //display 
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else {
            //next player
            nextPlayer();
        }
    }
});
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        //add current score to global score
        scores[activePlayer] += roundScore;
        //update UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        //next players turn
        //check if player won game
        //thia is coerced to ""
        var input = document.querySelector('.final-score').value;
        var winningScore;
        if (input) {
            winningScore = input;
        }
        else {
            winningScore = 100;
        }
        if (scores[activePlayer] >= winningScore) {
            //text content just changes content
            document.getElementById('name-' + activePlayer).textContent = 'Winner';
            //better to use css class than manipulate here
            document.querySelector('.dice').style.display = 'none';
            //using winner class from css -red and bold..check css
            //to entire panel
            //classlist to access classes of element
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('remove');
            //set state variable to false. Game over
            gamePlaying = false;
        }
        else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
    counter = 0;
    //next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    //reset score
    roundScore = 0;
    //reset UI
    document.getElementById('current-0').textContent = roundScore;
    document.getElementById('current-1').textContent = roundScore;
    // move dot from 0 to 1 - example
    //document.querySelector('.player-0-panel').classList.add('active');
    //      document.querySelector('.player-0-panel').classList.remove('active');
    //  we need to toggle from 0 to 1 and 1 to 0
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    //player 0 and player 1 (array 0 and 1 vals)
    activePlayer = 0;
    gamePlaying = true;
    //dom select(use id)
    //document.querySelector('#current-' + activePlayer).textContent = dice;
    //innerHTML for html manipulation
    //document.querySelector('#current-' + activePlayer).innerHTML = '<em>'+ dice +'<em>';
    //getter from dom
    //var x= document.querySelector('#score-0').textContent;
    //manipulate css..class uses dot. Hide dice in the beginning
    document.querySelector('.dice').style.display = 'none';
    //using get element by ids to reset eveything to zero
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //change name of players
    document.getElementById('name-0').textContent = 'P1';
    document.getElementById('name-1').textContent = 'P2';
    //remove class winner - highlight
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    //restart with player 1
    document.querySelector('.player-0-panel').classList.add('active');
}