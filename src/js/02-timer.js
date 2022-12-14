import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const refs = {
  inputSetCountingTime: document.querySelector('#datetime-picker'),
  btnStartCountingTime: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
setAttributeDisabledOnBtn(refs.btnStartCountingTime);
refs.btnStartCountingTime.addEventListener('click', onBtnStartTarget);
let selectedDate = {};
let timeId = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] > new Date()) {
      removeAttributeDisabledOnBtn(refs.btnStartCountingTime);
      return (selectedDate = selectedDates[0]);
    } else if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future', {
        timeout: 3000,
        clickToClose: true,
        position: 'center-top',
      });

      setAttributeDisabledOnBtn(refs.btnStartCountingTime);
    }
  },
};
flatpickr(refs.inputSetCountingTime, options);
function onBtnStartTarget() {
  setAttributeDisabledOnBtn(refs.btnStartCountingTime);
  setAttributeDisabledOnBtn(refs.inputSetCountingTime);

  timeId = setInterval(() => {
    const convertingDate = convertMs(selectedDate - new Date());
    refs.days.textContent = pad(convertingDate.days);
    refs.hours.textContent = pad(convertingDate.hours);
    refs.minutes.textContent = pad(convertingDate.minutes);
    refs.seconds.textContent = pad(convertingDate.seconds);

    if (
      refs.seconds.textContent === '00' &&
      refs.hours.textContent === '00' &&
      refs.minutes.textContent === '00' &&
      refs.seconds.textContent === '00'
    ) {
      clearInterval(timeId);
      Notiflix.Notify.success('Timer is over!', {
        timeout: 5000,
        position: 'center-top',
      });
    }
  }, 1000);
}
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

function pad(value) {
  return String(value).padStart(2, '0');
}
