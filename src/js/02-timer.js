// Команди для встановлення бібліотек
// $ npm i notiflix
// $ npm i flatpickr --save


import flatpickr from "flatpickr";// Описаний в документації
import "flatpickr/dist/flatpickr.min.css";// Додатковий імпорт стилів
import Notiflix from 'notiflix'; // бібліотека повідомлень



//  Пошук елементів на сторінці
const btnStart = document.querySelector('button[data-start]');
const inputWindow = document.querySelector("#datetime-picker");
// const timerHtml = document.querySelector('.timer');
const seconds = document.querySelector('span[data-seconds]');
const minutes = document.querySelector('span[data-minutes]');
const hours = document.querySelector('span[data-hours]');
const days = document.querySelector('span[data-days]');

btnStart.disabled = true; // початковий стан кнопки: вимкнена
btnStart.style.background = 'white';
let countdown ; // Змінна для збереження часу

//  Підключаємо календаря в інпут
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) { // виклик щоразу під час закриття елемента інтерфейсу
  
      // перевірка на вибір майбутньої дати, а не минулої
      if (selectedDates[0] < new Date()) {
        Notiflix.Notify.failure('Please choose a date in the future',{width:'350px', borderRadius: '10px', position: 'center-center',clickToClose: true, useIcon: false,});// Повідомлення помилка
        btnStart.disabled = true;// деактивуємо кнопку СТАРТ
        btnStart.style.background = 'white';
      } else {
        countdown = selectedDates[0] - new Date(); // Отримуємо час для таймера
        btnStart.disabled = false;// активуємо кнопку СТАРТ
        btnStart.style.background = 'black';
      }
    },
  };
  
  // виклик функції для вибору кінцевої дати та часу
  flatpickr(inputWindow, options);


// Для підрахунку значень використовуй готову функцію convertMs, 
// де ms - різниця між кінцевою і поточною датою в мілісекундах.
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

// додаємо слухача події до кнопки СТАРТ
btnStart.addEventListener('click', startCoint);

function startCoint() {
    btnStart.disabled = true; // деактивація кнопки СТАРТ
    btnStart.style.background = 'white';
    inputWindow.disabled = true; // деактивація вікна input
    let timeObject = convertMs(countdown);


    // таймер відліку часу
    timeClock = setInterval(() => {

        // перевірка таймера > секунди
        if (countdown >= 999) {
            // перевірка таймера < хвилини (зміна кольору)
            if (countdown <= 60999){
                days.style.color = 'red';
                hours.style.color = 'red';
                minutes.style.color = 'red';
                seconds.style.color = 'red';
            }
        btnStart.disabled = true;    
        countdown -= 1000;
        let timeObject = convertMs(countdown);
        padStart(timeObject);

        } else {
            Notiflix.Notify.success('Time is up...',{width:'350px', borderRadius: '10px', position: 'center-center',clickToClose: true, useIcon: false,}); // повідомлення про завершення підрахунку
            clearTimeout(timeClock ); // вихід із таймеру
            inputWindow.disabled = false; // активація вікна input

            days.style.color = 'black';
            hours.style.color = 'black';
            minutes.style.color = 'black';
            seconds.style.color = 'black';
        };
    }, 1000); 


};

// Виводимо данні таймера на сторінку
function padStart(evt){
    days.textContent = evt.days;
    hours.textContent = evt.hours;
    minutes.textContent = evt.minutes;
    seconds.textContent = evt.seconds;
}


// test




