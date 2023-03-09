import { Games } from './games/games.js';

(function() {
    const Panels = document.querySelector('.panels');
    const Timer = document.querySelector('.timer');
    const Score = document.querySelector('.score');
    const GamesList = document.querySelector('.game-selector > select');

    let grid = [];

    let score = 0;

    function launchGame(game) {
        generateGrid();
        Games[game]();
    }
    
    generateGrid();
    
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

    function generateGrid() {
        let buildingGrid = [];
        for (let i = 0; i < 16; i++) {
            buildingGrid[i] = {
                id: 'panel'+i,
                color: 'white',
                state: 'ready',
            };
        }
        grid = buildingGrid;
        
        renderGrid();
    }

    function renderGrid() {
        const panels = Panels.querySelectorAll('.panel');
        for (let elt of panels) {
            elt.remove();
        }
        
        grid.forEach(panel => {
            const block = document.createElement('div');
            block.id = panel.id;
            block.classList.add('panel', panel.color);
            block.onclick = (panel.state !== 'validated') ? panel.click || null : null;
            Panels.appendChild(block);
        })
    }

    document.querySelector('.loader').onclick = function() {
        launchGame(GamesList.options[GamesList.selectedIndex].value);
    }
 
 })();