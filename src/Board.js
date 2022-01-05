import './Board.css';
import Tile from './Tile.js';
import { useEffect, useState } from 'react';
import { generateTiles } from './helpers.js';

function Board() {
    const [tiles, setTiles] = useState(generateTiles())
    const [selectionTileOne, setSelectionTileOne] = useState(null);
    const [selectionTileTwo, setSelectionTileTwo] = useState(null);
    const [blocked, setBlocked] = useState(false);
    const [flips, setFlips] = useState(0);

    const regenerate = (e) => {
        e.preventDefault();
        setTiles(generateTiles());
        setFlips(0);
        clearSelections();
    }

    const replaceTilesWith = (callback) => {
        setTiles(prevTiles => prevTiles.map(callback));
    }

    const selectTile = (tile) => {
        selectionTileOne ? setSelectionTileTwo(tile) : setSelectionTileOne(tile);

        replaceTilesWith(
            (existingTile) => {
                if (existingTile.id === tile.id) {
                    return { ...tile, revealed: true };
                }

                return existingTile;
            }
        );
    }

    useEffect(() => {
        if (selectionTileOne === null || selectionTileTwo === null) {
            return;
        }

        setBlocked(true);

        if (selectionTileOne.colour === selectionTileTwo.colour) {
            replaceTilesWith((existingTile) => {
                if (existingTile.colour === selectionTileOne.colour) {
                    return { ...existingTile, matched: true };
                }
                return existingTile;
            }
            );
        }

        setTimeout(() => {
            clearSelections();
            setFlips(prev => prev + 1)
        }, 1000);

    }, [selectionTileOne, selectionTileTwo]);

    const clearSelections = () => {
        setSelectionTileOne(null);
        setSelectionTileTwo(null);
        replaceTilesWith((tile) => ({ ...tile, revealed: false }));
        setBlocked(false);
    };

    return (
        <div className="container">
            <div className="board">
                {tiles.map(function (tile) {
                    return (<Tile blocked={blocked} tile={tile} key={tile.id} selectTile={selectTile}></Tile>);
                })}
            </div>
            <div className="info">
                <button onClick={regenerate}>Restart</button>
                <p>Attemps {flips}</p>
            </div>
        </div>);
}

export default Board;