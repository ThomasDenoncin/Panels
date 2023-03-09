export const Games = {
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