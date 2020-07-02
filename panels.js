(function() {
    const Panels = document.querySelector('.panels');
    const Timer = document.querySelector('.timer');
    const Score = document.querySelector('.score');
    let score = 0;

    for (let i = 0; i < 16; i++) {
        const panel = document.createElement('div');
        panel.classList.add('panel');
        Panels.appendChild(panel);
    }

    launchFootBallGame();

    function launchFootBallGame() {
        updateScore(0);
        
        launchTimer(15, () => {
            document.querySelectorAll('.panel').forEach((panel) => {
                panel.onclick = null;
            });
            Score.classList.add('blink');
        })

        document.querySelectorAll('.panel').forEach((panel) => {
            panel.classList.add('red');

            panel.onclick = (e) => {
                const target = e.target;
                if (target.classList.contains('red')) {
                    updateScore(1);
                    target.classList.remove('red');

                    if (document.querySelectorAll('.panel.red').length == 0) {
                        resetPanels(() => {
                            document.querySelectorAll('.panel').forEach((panel) => {
                                panel.classList.add('red');
                            });
                        });
                    }
                }
            }
        })
    }

    function updateScore(value) {
        score += value;
        Score.innerHTML = score;
    }

    function launchTimer(duration, endGame) {
        let timeLeft = duration;
        const timer = setInterval(function() {
            Timer.innerHTML = timeLeft + ' s';
            timeLeft -= 1;
            if (timeLeft < 0) {
                clearInterval(timer);
                endGame();
            }
        }, 1000);
    }

    function resetPanels(reset) {
        reset();
    }
 
 })();