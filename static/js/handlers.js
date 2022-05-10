import { container, startButton, shuffleButton, win } from './const.js';

const rules = document.querySelector('.list-rules');

export const handleStartButtonClick = () => {
  container.classList.remove('invisible');
  container.classList.add('active');
  rules.classList.remove('active');
  rules.classList.add('invisible');
  shuffleButton.classList.remove('invisible');
  shuffleButton.classList.add('button-active');
  win.classList.add('invisible');
};

export const handleRulesButtonClick = () => {
  container.classList.remove('active');
  container.classList.add('invisible');
  rules.classList.remove('invisible');
  rules.classList.add('active');
  shuffleButton.classList.remove('button-active');
  shuffleButton.classList.add('invisible');
  startButton.disabled = false;
};
