
document.addEventListener ('DOMContentLoaded', function() {
  const selectRegion = new CustomSelect('#citesSelect', {
    targetValue: 'Москва'
  });

  const selectCategory = new CustomSelect('#categorySelect')

  const burgerBtn = document.querySelector('.js-burger');
  const burgerMenu = document.querySelector('.js-menu');
  const menuCloseBtn = document.querySelector('.js-menu-close');

  let tlOpen = gsap.timeline();
  tlOpen.pause();
  tlOpen.add()
    .from(burgerMenu, {display: 'none', duration: 0.5, opacity: 0, y: -50});

  let tlClose = gsap.timeline();
  tlClose.pause();
  tlClose.add()
    .to(burgerMenu, {display: 'none', duration: 0.3, opacity: 0, y: -50})

  burgerBtn.addEventListener('click', function(){
    tlOpen.restart();
  });

  menuCloseBtn.addEventListener('click', function(){
    tlClose.restart();
  });
});
