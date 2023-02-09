
// Для генерування випадкового кольору використовуй функцію getRandomHexColor
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

//  Пошук елементів на сторінці
  const body = document.querySelector("body");
  const btnStart = document.querySelector('button[data-start]');
  const btnStop = document.querySelector('button[data-stop]');
  let buttonTEST = true;

  btnStop.disabled = true; // початковий стан кнопки: вимкнена

  // Функція зміни кольору
  function changeColor() {
    btnStart.disabled = true; 
    btnStop.disabled = false; 
    

  // таймер для зміни кольору
  colorInterval = setInterval(() => {
    if (buttonTEST){
          // покраска фону у випаковий колір
          document.body.style.background = getRandomHexColor();
    }else{clearInterval(colorInterval);};

  }, 1000); // зміна кольору 1 раз на секунду
      buttonTEST = true;
  };

  btnStart.addEventListener("click", changeColor);

  // Функція зупинки
  function stopChangeColor () {
    btnStart.disabled = false; 
    btnStop.disabled = true; 
    clearInterval(colorInterval); // вихід із таймеру
    clearTimeout(colorInterval);
    buttonTEST = false;
  };

  btnStop.addEventListener("click", stopChangeColor);

