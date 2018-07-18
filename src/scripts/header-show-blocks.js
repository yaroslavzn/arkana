const headerPopupTriggers = document.querySelectorAll('.headerPopupTrigger');

// Реализация открытия/закрытия скрытых элементов в .header__top
function showHidenHeaderBlock(arr) {

  for(let i = 0; i < headerPopupTriggers.length; i++) {
    headerPopupTriggers[i].addEventListener('click', function(e) {
      const $this = e.target;
      
      arr.forEach(function(className) {
        if ($this.classList.contains(className)) {
          $this.nextElementSibling.classList.toggle(className + '-on');
          $this.nextElementSibling.classList.toggle(className + '-off');
        }
      })

      e.preventDefault();
    })
  }
}

showHidenHeaderBlock(['lang__trigger', 'search__trigger', 'share__trigger', 'cart__trigger']);

// Реализация закрытия корзины
document.querySelector('.cart__overlay').addEventListener('click', function(e) {
  const cartOverlay = document.querySelector('.cart__overlay');
  const closeCartButton = document.querySelector('.cart__close');
  const className = 'cart__trigger';

  if (e.target == cartOverlay || e.target == closeCartButton) {
    cartOverlay.classList.toggle(className + '-on');
    cartOverlay.classList.toggle(className + '-off');
  }

});

