'use strict';

const mask = (selector) => {
  let setCursorPosition = (pos, elem) => {
    elem.focus();

    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange){
      let range = elem.createTextRange();

      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  };

  function createMask(event) {
    let matrix = '+7 (___) ___ __ __',
      i = 0,
      def = matrix.replace(/\D/g, ''), // Статичное, работает на основе матрицы
      val = this.value.replace(/\D/g, ''); // Динамичное, работает на основе того, что ввёл пользователь

    if (def.length >= val.length) {
      val = def;
    } // Если кол-во цифр, которое останется в матрице после удаления всех не цифр внутри матрицы, если оно будет больше или равно кол-ву цифр в value, то значение нужно заменить на стандартное

    this.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
    });

    if (event.type === 'blur') {
      if (this.valeu.length == 2) {
        this.value = '';
      }
    } else {
      setCursorPosition(this.value.length, this);
    }
  }

  let inputs = document.querySelectorAll(selector);

  inputs.forEach(input => {
    input.addEventListener('input', createMask);
    input.addEventListener('focus', createMask);
    input.addEventListener('blur', createMask);
  });
};

export default mask;