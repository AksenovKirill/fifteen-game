import { container, shuffleButton, win } from './const.js';

const wonClass = 'fifteenWon';
const winFlatArray = new Array(16).fill(0).map((_, i) => i + 1);

export const isWon = (matrix) => {
  const flatMatrix = matrix.flat();
  for (let i = 0; i < winFlatArray.length; i++) {
    if (flatMatrix[i] !== winFlatArray[i]) {
      return false;
    }
  }
  return true;
};

export const addWonClass = () => {
  setTimeout(() => {
    container.classList.add(wonClass);

    setTimeout(() => {
      container.classList.remove(wonClass);
      win.classList.remove('invisible');
      win.classList.add('active');
      container.classList.add('invisible');
      shuffleButton.classList.remove('button-active');
      shuffleButton.classList.add('invisible');
    }, 3000);
  }, 500);
};
