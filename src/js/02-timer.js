import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputSetCountingTime: document.querySelector('#datetime-picker'),
  btnStartCountingTime: document.querySelector('[data-start]'),
};
setAttributeDisabledOnBtn(refs.btnStartCountingTime);
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
flatpickr(refs.inputSetCountingTime, options);
function setAttributeDisabledOnBtn(button) {
  button.setAttribute('disabled', '');
}
