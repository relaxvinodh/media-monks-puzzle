import React from "react";
import { Motion, spring } from "react-motion";
import { BOARD_SIZE, GRID_SIZE, TILE_COUNT } from "./constants";
import { getMatrixPosition, getVisualPosition } from "./helpers";
import monkImage from './monks.jpg';

interface TileProps {
  index: number,
  tile: number,
  handleTileClick: (index: number) => void,
};

const Tile:React.FC<TileProps> = (props) => {
  const { tile, index, handleTileClick } = props;
  const { row, col } = getMatrixPosition(index);
  const visualPos = getVisualPosition(row, col);

  const tileStyle = {
    width: `calc(100% / ${GRID_SIZE})`,
    height: `calc(100% / ${GRID_SIZE})`,
    translateX: visualPos.x,
    translateY: visualPos.y,
    backgroundImage: `url(${monkImage})`,
    backgroundSize: `${BOARD_SIZE * 1.25}px`,
    backgroundPosition: `${(100 / GRID_SIZE) * (tile % GRID_SIZE)}% ${(100 / GRID_SIZE) * (Math.floor(tile / GRID_SIZE))}%`,
  };

  const motionStyle = {
    translateX: spring(visualPos.x),
    translateY: spring(visualPos.y)
  }

  return (
    <Motion style={motionStyle}>
      {({ translateX, translateY }) => (
        <li
          style={{
            ...tileStyle,
            transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
            // Is last tile?
            opacity: tile === TILE_COUNT - 1 ? 0 : 1,
          }}
          className="tile"
          onClick={() => handleTileClick(index)}
        >
          {`${tile + 1}`}
        </li>
      )}
    </Motion>
  );
}

export default Tile;
