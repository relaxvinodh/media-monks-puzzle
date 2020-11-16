
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BOARD_SIZE, TILE_COUNT } from "./constants";
import { canSwap, isSolved, shuffle, swap } from "./helpers";
import Tile from "./Tile";
import { TilesType } from "./types";


const tileArray: TilesType = new Array(TILE_COUNT).map((v, i) => i);

const Board:React.FC = () => {
  const [tiles, setTiles] = useState(tileArray);
  
  const shuffleTiles = useCallback(() => {
    const shuffledTiles = shuffle(tiles)
    setTiles(shuffledTiles);
  }, [tiles]);

  const swapTiles = useCallback((tileIndex: number) => {
    if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
      const swappedTiles = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1))
      setTiles(swappedTiles)
    }
  }, [tiles]);

  const handleTileClick = useCallback((index: number) => {
    swapTiles(index);
  }, [tiles]);

  useEffect(() => {
    shuffleTiles();
  }, []);

  const hasWon = useMemo(() => isSolved(tiles), [tiles]);
  const style = {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  };

  return (
    <>
      <ul style={style} className="board">
        {tiles.map((tile, index) => (
          <Tile
            key={tile}
            index={index}
            tile={tile}
            handleTileClick={handleTileClick}
          />
        ))}
      </ul>
      {hasWon && <div>Puzzle solved !!!</div>}
    </>
  );
}

export default Board;
