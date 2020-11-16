import { BOARD_SIZE, GRID_SIZE, TILE_COUNT } from "./constants";
import { TilesType } from './types';

/**
 * check if it can be swapped
 * @param srcIndex source index
 * @param destIndex destination index
 * @return boolean
 */
export const canSwap = (srcIndex: number, destIndex: number) => {
  const { row: srcRow, col: srcCol } = getMatrixPosition(srcIndex);
  const { row: destRow, col: destCol } = getMatrixPosition(destIndex);
  return Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 1;
}

/**
 * Swap two numbers
 * @param tile numbers
 * @param src index of the src number
 * @param dest index of the dest number
 * @returns Swapped array
 */
export const swap = (tiles: TilesType, src: number, dest: number) => {
  const tilesResult = [...tiles];
  [tilesResult[src], tilesResult[dest]] = [tilesResult[dest], tilesResult[src]];
  return tilesResult;
}


/**
 * @param index index of the grid
 * @returns the row/col pair
 */
export const getMatrixPosition = (index: number) => {
  return {
    row: Math.floor(index / GRID_SIZE),
    col: index % GRID_SIZE,
  };
};


export const isSolvable = (tiles: TilesType) => {
  let product = 1;
  for (let i = 1, l = TILE_COUNT - 1; i <= l; i++) {
    for (let j = i + 1, m = l + 1; j <= m; j++) {
      product *= (tiles[i - 1] - tiles[j - 1]) / (i - j);
    }
  }
  return Math.round(product) === 1;
}

export const isSolved = (tiles: TilesType) => {
  for (let i = 0, l = tiles.length; i < l; i++) {
    if (tiles[i] !== i) {
      return false;
    }
  }
  return true;
}

const pieceWH = Math.round(BOARD_SIZE / GRID_SIZE);

export const getVisualPosition = (row: number, col: number) => {
  return {
    x: col * pieceWH,
    y: row * pieceWH,
  };
}

export const shuffle = (tiles: TilesType): number[] => {
  const shuffledTiles = [
    ...tiles
      .filter((t) => t !== tiles.length - 1)
      .sort(() => Math.random() - 0.5),
    tiles.length - 1,
  ];
  return isSolvable(shuffledTiles) && !isSolved(shuffledTiles)
    ? shuffledTiles
    : shuffle(shuffledTiles);
}
