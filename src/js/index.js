import { getShuffle, changePositionByClick, changePositionByKeyBoard, countItems, items } from './position.js';
import { handleRulesButtonClick, handleStartButtonClick} from './handlers.js';
import { container, startButton, rulesButton, shuffleButton } from './const.js';

startButton.disabled = true;

if (items.length !== 16) {
  throw new Error(`Должно быть ровно ${countItems} items in HTML`);
}

startButton.addEventListener("click", handleStartButtonClick);
rulesButton.addEventListener("click", handleRulesButtonClick);
container.addEventListener("click", changePositionByClick);
window.addEventListener("keydown", changePositionByKeyBoard);
shuffleButton.addEventListener("click", getShuffle);
