import { findCoordinateByNumber, setPositionItem, swap, getMatrix, isValidForSwap, shuffleArray } from './helpers.js';
import { container } from './const.js';

export const items = Array.from(container.querySelectorAll('.item'));
export const countItems = 16;
const blankItem = 16;

items[countItems - 1].style.display = 'none';
let dataSetItems = items.map((item) => Number(item.dataset.matrixId));

export let matrix = getMatrix(dataSetItems);
setPositionItem(matrix);

export const changePositionByClick = (event) => {
  const item = event.target.closest('.item');
  if (!item) {
    return;
  }
  const itemNumber = Number(item.dataset.matrixId);
  const itemCoords = findCoordinateByNumber(itemNumber, matrix);
  const blankCoords = findCoordinateByNumber(blankItem, matrix);
  const isValid = isValidForSwap(itemCoords, blankCoords);

  if (isValid) {
    isValidForSwap(blankCoords, itemCoords, matrix);
    swap(blankCoords, itemCoords, matrix);
    setPositionItem(matrix);
  }
};

export const changePositionByKeyBoard = (event) => {
  if (!event.key.includes('Arrow')) {
    return;
  }
  const blankCoords = findCoordinateByNumber(blankItem, matrix);
  const itemCoords = {
    x: blankCoords.x,
    y: blankCoords.y,
  };
  const direction = event.key.split('Arrow')[1].toLowerCase();
  const maxIndexMatrix = matrix.length;
  switch (direction) {
    case 'up':
      itemCoords.y += 1;
      break;
    case 'down':
      itemCoords.y -= 1;
      break;
    case 'left':
      itemCoords.x += 1;
      break;
    case 'right':
      itemCoords.x -= 1;
      break;
  }
  if (
    itemCoords.y >= maxIndexMatrix ||
    itemCoords.y < 0 ||
    itemCoords.x >= maxIndexMatrix ||
    itemCoords.x < 0
  ) {
    return;
  }
  swap(blankCoords, itemCoords, matrix);
  setPositionItem(matrix);
};

export const getShuffle = () => {
  const flatMatrix = matrix.flat();
  const shuffledArray = shuffleArray(flatMatrix);
  matrix = getMatrix(shuffledArray);
  setPositionItem(matrix);
};