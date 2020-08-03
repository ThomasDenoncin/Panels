(function() {
    const Panels = document.querySelector('.panels');
    const Timer = document.querySelector('.timer');
    const Score = document.querySelector('.score');
    const GamesList = document.querySelector('.game-selector > select');

    let grid = [];

    const Games = {
        footBallGame : function() {
            updateScore(0);
            
            launchTimer(15, () => {
                let buildingGrid = [...grid];
                buildingGrid.forEach(panel => {
                    panel.click = null;
                })
                grid = buildingGrid;
                renderGrid();

                Score.classList.add('blink');
            })

            let buildingGrid = [...grid];
            buildingGrid.forEach(panel => {
                panel.color = 'red';
                panel.click = (e) => {
                    const panel = grid.filter(panel => panel.id === e.target.id)[0];
                    if (panel.state !== 'validated') {
                        updateScore(1);
                        
                        let buildingGrid = [...grid];
                        if (grid.filter(panel => panel.state !== 'validated').length === 1) {
                            buildingGrid.forEach(panel => {
                                panel.color = 'red';
                                panel.state = 'ready';
                            })
                        } else {
                            buildingGrid[grid.indexOf(panel)].color = 'white';
                            buildingGrid[grid.indexOf(panel)].state = 'validated';
                        }
                        grid = buildingGrid;
                        renderGrid();
                    }
                };
            });
            grid = buildingGrid;
            renderGrid();
        }, 
        memoryGame: function() {
            updateScore(0);

            launchTimer(60, () => {
                let buildingGrid = [...grid];
                buildingGrid.forEach(panel => {
                    panel.click = null;
                })
                grid = buildingGrid;
                renderGrid();

                Score.classList.add('blink');
            })

            const colors = [
                'red',
                'green',
                'blue',
                'yellow',
                'cyan',
                'magenta',
                'black',
                'grey'
            ]

            let buildingGrid = [...grid];
            buildingGrid.forEach(panel => {
                let randomColor = null;
                do {
                    randomColor = colors[Math.floor(Math.random() * colors.length)];
                } while (buildingGrid.filter(panel => panel.secretColor === randomColor).length >= 2);

                panel.secretColor = randomColor;
                panel.click = (e) => {
                    const panel = grid.filter(panel => panel.id === e.target.id)[0];
                    if (panel.state === 'ready') {
                        let buildingGrid = [...grid];

                        let waitingPanel = grid.filter(panel => panel.state === 'waiting')[0];
                        
                        buildingGrid[grid.indexOf(panel)].color = panel.secretColor;
                        buildingGrid[grid.indexOf(panel)].state = 'waiting';
                        console.log('Waiting', waitingPanel);
                        if (waitingPanel) {
                            if (waitingPanel.secretColor === panel.secretColor) {
                                updateScore(1);

                                if (grid.filter(panel => panel.state !== 'validated').length === 2) {
                                    buildingGrid.forEach(panel => {
                                        panel.color = 'white';
                                        panel.state = 'ready';
                                    })
                                } else {
                                    buildingGrid[grid.indexOf(panel)].state = 'validated';
                                    buildingGrid[grid.indexOf(waitingPanel)].state = 'validated';    
                                }
                            } else {
                                setTimeout(() => {
                                    let buildingGrid = [...grid];
                                    buildingGrid[grid.indexOf(panel)].state = 'ready';
                                    buildingGrid[grid.indexOf(panel)].color = 'white';
                                    buildingGrid[grid.indexOf(waitingPanel)].state = 'ready';
                                    buildingGrid[grid.indexOf(waitingPanel)].color = 'white';
                                    grid = buildingGrid;
                                    renderGrid();
                                }, 2000);

                            }
                        }
                        grid = buildingGrid;
                        renderGrid();
                    }
                };
            });
            grid = buildingGrid;
            renderGrid();
        }
    }
    
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