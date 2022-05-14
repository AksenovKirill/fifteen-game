import {isWon, addWonClass} from './win.js';
import {container} from './const.js';
import {blankItem} from './position.js';

const items = Array.from(container.querySelectorAll('.item'));
let blockedCoords = null;

export const getMatrix = (array) => {
  const matrix = [[], [], [], []];
  let y = 0;
  let x = 0;
  for (let i = 0; i < array.length; i++) {
    if (x >= 4) {
      y++;
      x = 0;
    }
    matrix[y][x] = array[i];
    x++;
  }
  return matrix;
};

export const setPositionItem = (matrix) => {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const value = matrix[y][x];
      const node = items[value - 1];
      setNodeStyle(node, x, y);
    }
  }
};

export const setNodeStyle = (node, x, y) => {
  const shiftPs = 100;
  node.style.transform = `translate3d(${x * shiftPs}%, ${y * shiftPs}%, 0)`;
};

export const shuffleArray = (array) => {
  return array
    .map((value) => ({value, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(({value}) => value);
};

export const findCoordinateByNumber = (number, matrix) => {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === number) {
        return {x, y};
      }
    }
  }
  return null;
};

export const isValidForSwap = (coords1, coords2) => {
  const diffX = Math.abs(coords1.x - coords2.x);
  const diffY = Math.abs(coords1.y - coords2.y);
  return (
    (diffX === 1 || diffY === 1) &&
    (coords1.x === coords2.x || coords1.y === coords2.y)
  );
};

export const swap = (coords1, coords2, matrix) => {
  const coords1Number = matrix[coords1.y][coords1.x];
  matrix[coords1.y][coords1.x] = matrix[coords2.y][coords2.x];
  matrix[coords2.y][coords2.x] = coords1Number;
  if (isWon(matrix)) {
    addWonClass();
  }
};

export const randomSwap = (matrix) => {
  const blankCoords = findCoordinateByNumber(blankItem, matrix);
  const validCoords = findValidCoords({
    blankCoords,
    matrix,
    blockedCoords,
  });
  const swapCoords = validCoords[Math.floor(Math.random() * validCoords.length)];
  swap(blankCoords, swapCoords, matrix);
  blockedCoords = blankCoords;
};

const findValidCoords = ({blankCoords, matrix, blockedCoords}) => {
  const validCoords = [];
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (isValidForSwap({x, y}, blankCoords)) {
        if (!blockedCoords ||
          !(blockedCoords.x === x && blockedCoords.y === y)) {
          validCoords.push({x, y});
        }
      }
    }
  }
  return validCoords;
}
