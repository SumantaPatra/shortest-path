// src/App.js
import React, { useState } from 'react';

import './App.css';
import Grid from './components/Grid';

const App = () => {
    const [startTile, setStartTile] = useState(null);
    const [endTile, setEndTile] = useState(null);

    const handleTileClick = (row, col) => {
        if (!startTile) {
            setStartTile([row, col]);
        } else if (!endTile) {
            setEndTile([row, col]);
        } else {
            setStartTile([row, col]);
            setEndTile(null);
        }
    };

    const resetGrid = () => {
        setStartTile(null);
        setEndTile(null);
    };

    const findShortestPath = () => {
        if (!startTile || !endTile) {
            alert('Please select both a start and end tile.');
            return;
        }

        // Simple BFS algorithm implementation for grid
        const bfs = (start, end) => {
            const directions = [
                [0, 1], [1, 0], [0, -1], [-1, 0]
            ];
            const queue = [[start]];
            const visited = new Set();
            visited.add(start.toString());

            while (queue.length) {
                const path = queue.shift();
                const [currentRow, currentCol] = path[path.length - 1];

                if (currentRow === end[0] && currentCol === end[1]) {
                    return path;
                }

                for (const [dRow, dCol] of directions) {
                    const newRow = currentRow + dRow;
                    const newCol = currentCol + dCol;

                    if (newRow >= 0 && newRow < 10 && newCol >= 0 && newCol < 10) {
                        const newTile = [newRow, newCol];
                        if (!visited.has(newTile.toString())) {
                            visited.add(newTile.toString());
                            queue.push([...path, newTile]);
                        }
                    }
                }
            }
            return [];
        };

        const path = bfs(startTile, endTile);
        path.forEach(([row, col]) => {
            document.querySelector(`.tile:nth-child(${row * 10 + col + 1})`).classList.add('path');
        });
    };

    return (
        <div className="app">
            <Grid
                onTileClick={handleTileClick}
                startTile={startTile}
                endTile={endTile}
            />
            <button onClick={findShortestPath}>Find Shortest Path</button>
            <button onClick={resetGrid}>Reset Grid</button>
        </div>
    );
};

export default App;
