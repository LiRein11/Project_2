'use strict';

// import { postImg } from "../services/requests";

const drop = () => {
  // События, которые используются при drag and drop функциональности (перестаскивание элементов). Со звёздчкой те события, которые срабатывают при перетаскивание DOM-элементов на странице. Другие же срабатывают при перетаскивание файлов из файловой системы.
  // drag *
  // dragend*
  // dragenter - объект над dropArea (любой элемент, который воспринимает это событие)
  // dragexit*
  // dragleave - объект перетащили за пределы dropArea
  // dragover - объект зависает над dropArea
  // dragstart*
  // drop - объект отправлен в dropArea

  const fileInputs = document.querySelectorAll('[name="upload"]');

  ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
    fileInputs.forEach(input => {
      input.addEventListener(eventName, preventDefaults, false);
    });
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation(); // Остановка всплытия
  }

  function highLight(item) {
    item.closest('.file_upload').style.border = '5px solid yellow';
    item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0, .7)';
  } // Подсветка элемента, в который переставскивается файл(изображение)

  function unhighLight(item) {
    item.closest('.file_upload').style.border = 'none';
    if (item.closest('.calc_form')) {
      item.closest('.file_upload').style.backgroundColor = '#fff';
    } else {
      item.closest('.file_upload').style.backgroundColor = '#ededed';
    }
  }

  ['dragenter', 'dragover',].forEach(eventName => {
    fileInputs.forEach(input => {
      input.addEventListener(eventName, () => highLight(input), false);
    });
  }); // Берем 2 события, перебираем файловые инпуты, с которыми будем работать и на каждый инпут навешиваем это событие и ставим обработчик

  ['dragleave', 'drop',].forEach(eventName => {
    fileInputs.forEach(input => {
      input.addEventListener(eventName, () => unhighLight(input), false);
    });
  });

  fileInputs.forEach(input => {
    input.addEventListener('drop', (e) => {
      input.files = e.dataTransfer.files; // Тот объект с файлом, который мы перетаскиваем, засовываем его в инпут и он там хранится
      // const formData = new FormData();
      // formData.append('file', input.files[0]);
      // postImg('assets/server.php', formData)
      //   .then(res => 
      //     console.log(res))
      //   .catch(console.log('error'));
      let dots;
      const arr = input.files[0].name.split('.'); // Превратить в массив
      // 'safasfajsfjsjf.jpg' => ['fsafasfasf', 'jpg']
      arr[0].length > 6 ? dots = '...' : dots = '.'; // Условие на проверку длины изображения
      const name = arr[0].substring(0, 6) + dots + arr[1]; // Обрезаем пришедшее название изображения + ... или . +  обрежется по 6 элемент (0-5)
      input.previousElementSibling.textContent = name; // Свойство чтобы найти предыдущего соседа
    });
  });
};

export default drop;