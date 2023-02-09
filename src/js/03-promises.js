// Команди для встановлення бібліотек
// $ npm i notiflix

import Notiflix from 'notiflix'; // бібліотека повідомлень

// Починаємо відслідковувати події
const form = {
  body: document.querySelector('body'),
  form: document.querySelector('form.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  button: document.querySelector('[type="submit"]'),
}

// Відправка форми button-click
form.button.addEventListener('click', onPromiseCreate);


function onPromiseCreate(e){
  e.preventDefault(); // відміна оновлення сторінки
  
  // Збираємо данні з inputs
  let valueDelay = Number(form.delay.value);
  let step = Number(form.step.value);
  let amount = Number(form.amount.value);

  console.log(valueDelay, step, amount );

  // Запускаємо повідомлення згідно кількості amount
  for (let i = 1; i <= amount; i += 1){
    let promiseDelay = valueDelay + step * i; // рахуємо крок між повідомленнями

    createPromise(i, promiseDelay) 
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {useIcon: false,});
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {useIcon: false,});
    });
  };
};


// Викликаємо функцію згідно ТЗ
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

