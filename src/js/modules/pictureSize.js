'use strict';

const pictureSize = (imgSelector) => {
  const blocks = document.querySelectorAll(imgSelector);

  function showImg(block) {
    const img = block.querySelector('img');
    // something.png => something-1.png
    img.src = img.src.slice(0, -4) + '-1.png'; // Отрезаем последние 4 символа и добавляем 6 символов
    block.querySelectorAll('p:not(.sizes-hit)').forEach(p =>{ // not позволяет выбрать все параграфы, кроме одного
      p.style.display = 'none';
    });
  }

  function hideImg(block) {
    const img = block.querySelector('img');
    // something-1.png => something.png
    img.src = img.src.slice(0, -6) + '.png'; // Отрезаем последние 4 символа и добавляем 6 символов
    block.querySelectorAll('p:not(.sizes-hit)').forEach(p => { // not позволяет выбрать все параграфы, кроме одного
      p.style.display = 'block';
    });
  }

  blocks.forEach(block => {
    block.addEventListener('mouseover', () =>{
      showImg(block);
    }); // Когда мышь наведена
    block.addEventListener('mouseout', () => {
      hideImg(block);
    }); // Когда мышь убрана
  });

  
};

export default pictureSize;