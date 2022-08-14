'use strict';

const burger = (menuSelector, burgerSelector) => {
  const menuElem = document.querySelector(menuSelector),
    burgerElem = document.querySelector(burgerSelector);

  menuElem.style.display = 'none';

  burgerElem.addEventListener('click', () => {
    if (menuElem.style.display == 'none' && window.screen.availWidth < 993) { // Возвращает ширину экрана пользователя, которое служит для вывода информации (ширина без панели задач, полосы прокрутки и тд.(четкий контент сайта))
      menuElem.style.display = 'block';
    } else {
      menuElem.style.display = 'none';
    }
  });

  window.addEventListener('resize', () => {
    if(window.screen.availWidth > 992){
      menuElem.style.display = 'none';
    }
  });
};

export default burger;