import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const inputRef = document.querySelector('#datetime-picker');
let btnRef = document.querySelector('button[data-action = "start"]');
let elementDays = document.querySelector('span[data-days]');
let elementHours = document.querySelector('span[data-hours]');
let elementMinutes = document.querySelector('span[data-minutes]');
let elementSeconds = document.querySelector('span[data-seconds]');

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    elementDays.textContent = days;
    elementHours.textContent = hours;
    elementMinutes.textContent = minutes;
    elementSeconds.textContent = seconds;

    return { days, hours, minutes, seconds };

    function addLeadingZero(value) {
        return String(value).padStart(2, '0');
    }
}

btnRef.disabled = true;

function getTimeId(date) {
    // debugger;
    const inputDate = new Date(date);
    const now = new Date();
    const timeDifference = inputDate.getTime() - now.getTime();
    if (timeDifference < 0) {
        return;
    }
    convertMs(timeDifference);
}

function getTimeRemains() {
    const dateValue = document.getElementById('datetime-picker').value;
    getTimeId(dateValue);
}
btnRef.addEventListener('click', () => {
    setInterval(() => {
        getTimeRemains();
    }, 1000);
});

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        validateDate(selectedDates[0]);
    },
};

function validateDate(selectedDate) {
    const now = new Date();
    if (selectedDate >= now) {
        btnRef.disabled = false;
    } else {
        Notify.failure('Please choose a date in the future');
    }
}
const fp = flatpickr(inputRef, options);