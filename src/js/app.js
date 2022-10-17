
import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebP();

document.addEventListener ('DOMContentLoaded', function() {
  const swiperHero = new Swiper('.section-hero__swiper', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: '.section-hero__swiper-pagination',
      clickable: 'true',
      type: 'bullets',
      renderBullet: function (index, className) {
        return '<span class="' + className + '">'+
        '<svg class="fp-arc-loader" width="16" height="16" viewBox="0 0 16 16">'+
          '<circle cx="8" cy="8" r="5.5" fill="none" stroke-width="1.5px" stroke="#FFFFFF""></circle>'+
          '<circle class="path" cx="8" cy="8" r="5.5" fill="none" transform="rotate(-90 8 8)" stroke="#FF862F"'+
          'stroke-opacity="1" stroke-width="1.5px"></circle>'+
        '</svg></span>';
      },

  },
    navigation: {
      nextEl: null,
      prevEl: null,
    }
  });


  const swiperSpecial = new Swiper('.section-special__swiper', {
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    direction: 'horizontal',
    navigation: {
      nextEl: '.section-special__btn-next',
      prevEl: '.section-special__btn-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      610: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      921: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      1025: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
    },
    pagination: {},
  });

  const swiperUseful = new Swiper('.section-useful__swiper', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 32,
    direction: 'horizontal',
    navigation: {
      nextEl: '.section-useful__btn-next',
      prevEl: '.section-useful__btn-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      610: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      921: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      1025: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
    },
    pagination: {},
  });


  const cards = document.querySelectorAll('.card');
  const btnCards = document.querySelector('.section-rating__btn');
  let cardStep = 0;
  let currentCardNumber = 0;
  let cardsNumber = cards.length;
  const windowWidth = document.documentElement.clientWidth;
  if (windowWidth>1024) {
    currentCardNumber = 8;
    cardStep = 4;
  }
  else if (windowWidth>920) {
    currentCardNumber = 6;
    cardStep = 3;
  }
  else {
    currentCardNumber = 6;
    cardStep = 4;
  }

  
  cards.forEach((card) => {
    card.classList.add('section-rating__card');
    if (windowWidth>1024) {
      if(Number(card.dataset.card)>8) card.classList.add('close');
    }
    else  {
      if(Number(card.dataset.card)>6) card.classList.add('close');
    }
  });

  btnCards.addEventListener('click', () => {
    let cardsForOpen = []
    console.log(cardsForOpen);
    for( let i = currentCardNumber; i<currentCardNumber+cardStep; i++) {
      cardsForOpen.push(cards[i]);
    }
    gsap.to(cardsForOpen, {display: 'flex', duration: 0.7, opacity: 1})
    currentCardNumber+=cardStep;
    if (cardsNumber <= currentCardNumber) btnCards.classList.add('close');
  });

  tippy('.section-contacts__span', {
    content: 'Реплицированные с зарубежных источников, исследования формируют глобальную сеть.',
    trigger: 'mouseenter focus click',
  });


  let phone = document.getElementById("phone");
  let im = new Inputmask("+7 (999)-999-99-99");
  im.mask(phone);
  let validateForms = function(selector) {
    new JustValidate(selector, {
      colorWrong: '#FF6972',
      rules: {
        name: {
          required: true,
          minLength: 2,
          maxLength: 10,
        },
        phone: {
          required: true,
          function: (name, value) => {
            const tel = phone.inputmask.unmaskedvalue()
            return Number(tel)&&tel.length ===10
          }
        },
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: 'Недопустимый формат',
        phone: 'Недопустимый формат',
        email: 'Недопустимый формат'
      },
    });
  }
  validateForms('.section-contacts__form');

});



