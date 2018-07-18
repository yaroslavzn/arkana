// Реализация sticky header
window.onscroll = function() {
  makeHeaderSticky();
}

const header = document.querySelector('.page-header');

const sticky = header.offsetTop;

function makeHeaderSticky() {
  if (window.pageYOffset > sticky) {
    header.classList.add('page-header--sticky');
  } else {
    header.classList.remove('page-header--sticky');
  }
}