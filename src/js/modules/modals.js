'use strict';

const modals = () => {
  function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
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

        windows.forEach(item => {
          item.style.display = 'none';
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
      // document.body.classList.remove('modal-open');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal && closeClickOverlay) {
        windows.forEach(item => {
          item.style.display = 'none';
        });

        modal.style.display = 'none';
        document.body.style.overflow = '';
        document.body.style.marginRight = `0px`;
        // document.body.classList.remove('modal-open');
      }
    }); // Добавлено closeClickOverlay чтобы можно было передать false в аргумент и когда открыты нужные модалки клик по подложке не срабатывал
  }

  function showModalByTime(selector, time) {
    setTimeout(function () {
      document.querySelector(selector).style.display = 'block';
      document.body.style.overflow = 'hidden';
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

  bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
  bindModal('.phone_link', '.popup', '.popup .popup_close');
  bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
  bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
  bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
  // showModalByTime('.popup', 60000);
};

export default modals;