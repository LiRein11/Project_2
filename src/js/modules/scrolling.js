'use strict';

const scrolling = (upSelector) => {
  const upElem = document.querySelector(upSelector);

  window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 1650) {
      upElem.classList.add('animated', 'fadeIn');
      upElem.classList.remove('fadeOut');
    } else {
      upElem.classList.add('fadeOut');
      upElem.classList.remove('fadeIn');
    }
  });

  // Скролл window.requestAnimationFrame()

  let links = document.querySelectorAll('[href^="#"]'), // Ищем все ссылки, начинающиеся с шарпа(#), ^ значит, что данное значение атрибута должно быть с начала строки
    speed = 0.3;

  links.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      let widthTop = document.documentElement.scrollTop,
        hash = this.hash,
        toBlock = document.querySelector(hash).getBoundingClientRect().top,
        start = null;

      requestAnimationFrame(step);

      function step(time) {
        if (start === null) {
          start = time;
        }

        let progress = time - start,
          r = (toBlock < 0 ? Math.max(widthTop - progress / speed, widthTop + toBlock) : Math.min(widthTop + progress / speed, widthTop + toBlock)); // Количество пикселей, на которые нужно пролистать в течение этой анимации

        document.documentElement.scrollTo(0, r);

        if (r != widthTop + toBlock) {
          requestAnimationFrame(step);
        } else {
          location.hash = hash;
        }
      }
    });
  });

  //Чистый js скролл

  // const element = document.documentElement,
  //   body = document.body;

  // const calcScroll = () => {
  //   upElem.addEventListener('click', function (event) {
  //     let scrollTop = Math.round(body.scrollTop || element.scrollTop); // Узнаём, какое расстояние было пролистано вниз

  //     if (this.hash !== '') {
  //       event.preventDefault();
  //       // let hashElement = document.getElementById(this.hash.substring(1)), // Получаем от хэша строчку без первой решетки
  //       let hashElement = document.querySelector(this.hash), // Другой вариант
  //         hashElementTop = 0; // Сколько нужно ещё пролистать пикселей до родителя хэш элемента

  //       while (hashElement.offsetParent) {
  //         hashElementTop += hashElement.offsetTop; // Сколько пикселей осталось до верхней границы родительского элемента от хэш элемента
  //         hashElement = hashElement.offsetParent; // Перебор всех родителей, которые могут быть основой для позиционирования данного элемента
  //       } // Тот элемент, относительно которого будет позиционироваться хэш элемент

  //       hashElementTop = Math.round(hashElementTop); // Округляем элемент
  //       smoothScroll(scrollTop, hashElementTop, this.hash);
  //     }
  //   });
  // };

  // const smoothScroll = (from, to, hash) => {
  //   let timeInterval = 1,
  //     prevScrollTop,
  //     speed;

  //   if (to > from) {
  //     speed = 30;
  //   } else {
  //     speed = -30;
  //   }

  //   let move = setInterval(function () {
  //     let scrollTop = Math.round(body.scrollTop || element.scrollTop);

  //     if (
  //       prevScrollTop === scrollTop ||
  //       (to > from && scrollTop >= to) ||
  //       (to < from && scrollTop <= to)
  //     ) {
  //       clearInterval(move);
  //       history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
  //     } else {
  //       body.scrollTop += speed;
  //       element.scrollTop += speed;
  //       prevScrollTop = scrollTop;
  //     }
  //   }, timeInterval);
  // };
  // calcScroll();
};

export default scrolling;