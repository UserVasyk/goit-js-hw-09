import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputSetCountingTime: document.querySelector('#datetime-picker'),
  btnStartCountingTime: document.querySelector('[data-start]'),
};
refs.btnStartCountingTime.addEventListener('click', onBtnStartTarget);
setAttributeDisabledOnBtn(refs.btnStartCountingTime);
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] > new Date()) {
      removeAttributeDisabledOnBtn(refs.btnStartCountingTime);
    } else if (selectedDates[0] < new Date()) {
      window.alert('Please choose a date in the future');
      setAttributeDisabledOnBtn(refs.btnStartCountingTime);
    }
  },
};
flatpickr(refs.inputSetCountingTime, options);
function setAttributeDisabledOnBtn(button) {
  button.setAttribute('disabled', '');
}
function removeAttributeDisabledOnBtn(button) {
  button.removeAttribute('disabled');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function onBtnStartTarget() {
  console.log(convertMs());
}
