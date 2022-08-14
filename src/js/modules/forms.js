'use strict';

import {postData} from '../services/requests';

const forms = () => {
  const form = document.querySelectorAll('form'),
    inputs = document.querySelectorAll('input'),
    upload = document.querySelectorAll('[name="upload"]');

  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо, скоро мы с вами свяжемся!',
    failure: 'Произошла ошибка...',
    spinner: 'assets/img/spinner.gif',
    ok: 'assets/img/ok.png',
    fail: 'assets/img/fail.png'
  };

  const path = {
    designer: 'assets/server.php',
    question: 'assets/question.php'
  };

  function checkNumInputs(selector) {
    const numInputs = document.querySelectorAll(selector);

    numInputs.forEach(item => {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/\D/, '');
      });
    });
  }

  checkNumInputs('input[name=phone]');

  function clearInputs() {
    inputs.forEach(item => {
      item.value = '';
    });
    upload.forEach(item => {
      item.previousElementSibling.textContent = 'Файл не выбран';
    });
  }

  upload.forEach(item => {
    item.addEventListener('input', () => {
      console.log(item.files[0]);
      let dots;
      const arr = item.files[0].name.split('.'); // Превратить в массив
      // 'safasfajsfjsjf.jpg' => ['fsafasfasf', 'jpg']
      arr[0].length > 6 ? dots = '...' : dots = '.'; // Условие на проверку длины изображения
      const name = arr[0].substring(0, 6) + dots + arr[1]; // Обрезаем пришедшее название изображения + ... или . +  обрежется по 6 элемент (0-5)
      item.previousElementSibling.textContent = name; // Свойство чтобы найти предыдущего соседа
    });
  });

  form.forEach(item => {
    item.addEventListener('submit', (e) => {
      e.preventDefault();

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      item.parentNode.appendChild(statusMessage); // Изображение помещается в родителя формы (тк форму нужно скрыть после отправки данных)

      item.classList.add('animated', 'fadeOutUp'); // Анимация на скрытие формы (но она останется на месте, поэтому её следует модифицировать ниже)
      setTimeout(() => {
        item.style.display = 'none';
      }, 400);

      let statusImg = document.createElement('img');
      statusImg.setAttribute('src', message.spinner); // Добавляем спиннер в src изображения
      statusImg.classList.add('animated', 'fadeInUp');
      statusMessage.appendChild(statusImg);

      let textMessage = document.createElement('div');
      textMessage.textContent = message.loading;
      statusMessage.appendChild(textMessage);

      const formData = new FormData(item);
      let api; // Понадобится для формирования динамического пути, куда мы будем отправлять определенные данные 
      item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question; // Метод позволяет найти определенные блок по селектору у себя выше по иерархии и условием проверяем, есть такой блок или нет и в зависимости от этого отправляем данные куда нужно
      console.log(api);

      postData(api, formData)
        .then(res => {
          console.log(res);
          statusImg.setAttribute('src', message.ok);
          textMessage.textContent = message.success;
        })
        .catch(() => {
          statusImg.setAttribute('src', message.fail);
          textMessage.textContent = message.failure;
        })
        .finally(() => {
          clearInputs();
          document.querySelector('textarea[name=message]').value = '';
          setTimeout(() => {
            statusMessage.remove();
            item.style.display = 'block';
            item.classList.remove('fadeOutUp');
            item.classList.add('fadeInUp');
          }, 5000);
        });
    });
  });
};

export default forms;