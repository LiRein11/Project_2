'use strict';

const modals = () => {
  let btnPressed = false;

  function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll('[data-modal]'),
      scroll = calcScroll();

    trigger.forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target) {
          e.preventDefault(); // Для того, чтобы при нажатии например на ссылку стандартное поведение браузера сбрасывалось
        }

        btnPressed = true;

        if (destroy === true) {
          item.remove()
        } // Удаляем триггер, на который произошел клик

        windows.forEach(item => {
          item.style.display = 'none';
          item.classList.add('animated', 'fadeIn'); // Добавление анимации
        });
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Чтобы не было скролла при открытой модалке
        document.body.style.marginRight = `${scroll}px`;
        // document.body.classList.add('modal-open'); //// Через класс из библиотеки бутстрап
      });
    });


    close.addEventListener('click', () => {
      windows.forEach(item => {
        item.style.display = 'none';
      });

      modal.style.display = 'none';
      document.body.style.overflow = '';
      document.body.style.marginRight = `0px`;
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        windows.forEach(item => {
          item.style.display = 'none';
        });

        modal.style.display = 'none';
        document.body.style.overflow = '';
        document.body.style.marginRight = `0px`;
      }
    }); // Добавлено closeClickOverlay чтобы можно было передать false в аргумент и когда открыты нужные модалки клик по подложке не срабатывал
  }

  function showModalByTime(selector, time) {
    setTimeout(function () {
      let display;

      document.querySelectorAll('[data-modal]').forEach(item => {
        if (getComputedStyle(item).display !== 'none') {
          display = 'block';
        }
      });

      if (!display) {
        document.querySelector(selector).style.display = 'block';
        document.body.style.overflow = 'hidden';
        let scroll = calcScroll();
        document.body.style.marginRight = `${scroll}px`;
      }
    }, time);
  }

  function calcScroll() {
    let div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll'; // Содержимое обрезается и браузер использует элементы прокрутки, не важно было ли обрезано содержимое или нет
    div.style.visibility = 'hidden'; // Скрываем элемент без изменения разметки документа

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth; // Узнаём полную ширину и отнимаем от неё ширину паддингов и самый главный контент внутри (и сюда не включается прокрутка)
    div.remove();

    return scrollWidth;
  } // Убираем моргание(скачок) при нажатии на кнопку путём убирания размера скролла

  function openByScroll(selector) {
    window.addEventListener('scroll', () => {
      let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight); // Для работоспособности в старых браузерах (оптимизация)

      if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {
        document.querySelector(selector).click(); // Вызываем событие вручную (клик по подарку)
      } // Сколько пикселей пользователь отлистал сверху (верхний отступ (pageYOffset)) + тот контент, который виден пользователю сейчас >= полной высоты страницы
    });
  } // Проверяем, долистал ли пользователь до конца страницы 

  bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
  bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
  bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
  openByScroll('.fixed-gift');

  // showModalByTime('.popup-consultation', 60000);
};

export default modals;