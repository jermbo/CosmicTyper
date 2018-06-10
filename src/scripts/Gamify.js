const Gamify = function(){
    const scoreDisplay = document.querySelector('.score span');
    let playTimer;
    let playerScore;
    let internalTime = 0;

    let time = 0;
    let sick = 0;
    let pro = 0;
    let good = 0;

    function startTimer(obj) {
        time = obj.time * 1000;
        sick = time / 4;
        pro = time / 3;
        good = time / 2;

        console.log(`Sick ${sick} | Pro ${pro} | Good ${good}`);

        playTimer = setInterval(function(){
            internalTime++;
        }, time);
    }

    function stopTimer(){
        clearTimeout(playTimer);
        console.log(`internal timer ${internalTime}`);
    }

    function gameOver() {
        internalTime = 0;
        resetTimer();
    }

    return {
        startTimer: startTimer,
        gameOver: gameOver
    }
}();