const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};
let timeId = null;

setAttributeDisabledOnBtn(refs.btnStop);

refs.btnStart.addEventListener('click', onBtnStartTarget);
refs.btnStop.addEventListener('click', onBtnStopTarget);
function onBtnStartTarget(evt) {
  setAttributeDisabledOnBtn(refs.btnStart);
  removeAttributeDisabledOnBtn(refs.btnStop);

  timeId = setInterval(() => {
    document.querySelector('body').style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onBtnStopTarget(evt) {
  setAttributeDisabledOnBtn(refs.btnStop);
  removeAttributeDisabledOnBtn(refs.btnStart);
  clearInterval(timeId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function setAttributeDisabledOnBtn(button) {
  button.setAttribute('disabled', '');
}
function removeAttributeDisabledOnBtn(button) {
  button.removeAttribute('disabled');
}
