import Notiflix from 'notiflix';

const refs = {
  submitBtn: document.querySelector('[type="submit"]'),
  firstDelayInput: document.querySelector('[name="delay"]'),
  delayStepInput: document.querySelector('[name="step"]'),
  amountInput: document.querySelector('[name="amount"]'),
};

let firstDelayValue = 0;
let delayStepValue = 0;
let amountValue = 0;

refs.firstDelayInput.addEventListener(
  'input',
  evt => (firstDelayValue = evt.currentTarget.value)
);
refs.delayStepInput.addEventListener(
  'input',
  evt => (delayStepValue = evt.currentTarget.value)
);
refs.amountInput.addEventListener(
  'input',
  evt => (amountValue = evt.currentTarget.value)
);

refs.submitBtn.addEventListener('click', onSumbitBtnTarget);

function onSumbitBtnTarget(evt) {
  evt.preventDefault();

  for (let i = 0; i < amountValue; i++) {
    const delay = Number(firstDelayValue) + delayStepValue * i;
    timeid = setTimeout(() => {
      createPromise(i + 1, delay)
        .then(messageSuccess =>
          Notiflix.Notify.success(messageSuccess, {
            timeout: 3500,
            clickToClose: true,
          })
        )
        .catch(messageError =>
          Notiflix.Notify.failure(messageError, {
            timeout: 3000,
            clickToClose: true,
          })
        );
    }, delay);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } else {
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }
  });
}
