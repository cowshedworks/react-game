function Tile({ tile, selectTile, blocked }) {

    function flipTile() {
        if (tile.matched || blocked) {
            return;
        }

        selectTile(tile);
    }

    function tileStyle() {
        return {
            backgroundColor: (tile.revealed || tile.matched) ? tile.colour : 'darkgray',
            height: 100 + 'px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid gray',
            borderRadius: '5px',
            padding: '20px',
        }
    }

    return (<div style={tileStyle()} key={tile.id} onClick={flipTile}></div>);
}

export default Tile;