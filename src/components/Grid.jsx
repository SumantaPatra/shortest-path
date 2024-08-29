// src/Grid.js
import React, { useState } from 'react';

const Grid = ({ onTileClick, startTile, endTile }) => {
    const [tiles, setTiles] = useState(
        Array(10).fill().map(() => Array(10).fill(null))
    );

    const handleClick = (row, col) => {
        onTileClick(row, col);
    };

    return (
        <div className="grid">
            {tiles.map((row, rowIndex) =>
                row.map((_, colIndex) => {
                    const isStart = startTile && startTile[0] === rowIndex && startTile[1] === colIndex;
                    const isEnd = endTile && endTile[0] === rowIndex && endTile[1] === colIndex;
                    const className = `tile ${isStart ? 'start' : ''} ${isEnd ? 'end' : ''}`;

                    return (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={className}
                            onClick={() => handleClick(rowIndex, colIndex)}
                        />
                    );
                })
            )}
        </div>
    );
};

export default Grid;
