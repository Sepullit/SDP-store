function navigation(name) {
  let list = document.querySelector('.nav__list');
  let item = document.createElement('li');
  let link = document.createElement('a');
  item.classList.add('nav__list-item');
  link.classList.add('nav__list-link', 'menu-link');
  link.href = "#"
  link.textContent = name;
  item.append(link);
  list.lastElementChild.append("/")
  list.append(item);
}

function ModalWindowOpen(modalpath, modalScene, modalWindow) {
  let modal = document.querySelector(`[data-modal=${modalpath}]`);
  modal.classList.remove('close');
  if(modalpath==='product' || window.innerWidth <= 768)  modalWindow.classList.add('modalwindow-size');
  gsap.to(modalScene, {display: 'flex', duration: 0.3, opacity: 1});
  gsap.to(modalWindow, {display: 'block', duration: 0.3, opacity: 1, y: 100, daly: 0.1});
  return modal;
}

function ModalWindowClose(modal, modalWindow, modalScene) {
  gsap.to(modalWindow, {display: 'none', duration: 0.3, opacity: 0, y: -100, daly: 0.1});
  gsap.to(modalScene, {display: 'none', duration: 0.3, opacity: 0});
  modal.classList.add('close');
  modalWindow.classList.remove('modalwindow-size');
}

document.addEventListener ('DOMContentLoaded', function() {
  navigation("D-31")
 
  const swiperProduct = new Swiper('.section-product__content-swiper', {
    spaceBetween: 38,
            slidesPerView: "auto",
            freeMode: true,
            watchSlidesProgress: true,
            direction: "horizontal",
   
    breakpoints: {
      611: {
        spaceBetween: 18,
        slidesPerView: "auto",
        direction: 'vertical',
      },

      921: {
        direction: 'horizontal',
        slidesPerView: "auto",
        spaceBetween: 38,
      },
    }
    
  });
  const swiperBlock = new Swiper('.slider-product__body', {
    spaceBetween: 38,
    slidesPerView: 1,
    thumbs: {
      swiper: swiperProduct,
  },
  });

  const swiperProductModal = new Swiper('.modalwindow__product-swiper', {
    direction: 'horizontal',
    loop: false,
    loopAdditionalSlides: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 78,
    navigation: {
      nextEl: '.modalwindow__product-swiper-btn-next',
      prevEl: '.modalwindow__product-swiper-btn-prev',
    },
    breakpoints: {
      321: {
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        spaceBetween: 78,
      },
      611: {
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        spaceBetween: 78,
      },
      769: {
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        spaceBetween: 78,

      },
      1025: {
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        spaceBetween: 78,
      },
    },
    pagination: {},
  });




  const cards = document.querySelectorAll('.card');
  cards.forEach(function(card){
    card.classList.add('swiper-slide', 'section-similar__swiper-slide')
  })

  const swiperSimilar = new Swiper('.section-similar__swiper', {
    slidesPerView: 2,
    slidesPerGroup: 1,
    spaceBetween: 16,
    direction: 'horizontal',
    loop: false,
    navigation: {
      nextEl: '.section-similar__swiper-btn-next',
      prevEl: '.section-similar__swiper-btn-prev',
    },
    breakpoints: {
      611: {
        slidesPerView: 2,
        spaceBetween: 32,
      },
      921: {
        slidesPerView: 3,
        spaceBetween: 32,

      },
      1025: {
        slidesPerView: 4,
        spaceBetween: 32,
      },
    },
  });

  const subImg = document.querySelectorAll('.js-sub-img');

  let imgScene = document.querySelector('.js-img-scene');
  let modalCurrentMainImg = document.querySelector(`[data-sub="m1"]`);
  let modalCurrentSubImg = document.querySelector(`[data-main="m1"]`);
  let windowCurrentMainImg = document.querySelector(`[data-sub="1"]`);
  let windowCurrentSubImg = document.querySelector(`[data-main="1"]`);

  let currentMainImg = windowCurrentMainImg;
  let currentSubImg = windowCurrentSubImg;

  subImg.forEach(function(img){
    img.addEventListener('click', function() {
      console.log(currentMainImg.dataset.sub, currentSubImg.dataset.main)
      currentMainImg.classList.add('close');
      currentSubImg.classList.remove('close');
      let searchImg = document.querySelector(`[data-sub="${img.dataset.main}"]`);
      currentMainImg = searchImg;
      currentMainImg.classList.remove('close');
      currentSubImg = img;
      currentSubImg.classList.add('close');
    });
  });

  let modalScene =  document.querySelector('.scene');
  let modal = '';
  let modalClosbtn = document.querySelector('.js-modalwindow-close');
  let modalWindow = document.querySelector('.modalwindow');

  imgScene.addEventListener('click', function(){
    windowCurrentMainImg = currentMainImg;
    windowCurrentSubImg = currentSubImg;
    currentMainImg = modalCurrentMainImg;
    currentSubImg = modalCurrentSubImg;
    modal = ModalWindowOpen(imgScene.dataset.modalpath, modalScene, modalWindow);
    setTimeout(()=>{
      let navBtnNext = document.querySelector('.modalwindow__product-swiper-btn-next');
      let navBtnPrev = document.querySelector('.modalwindow__product-swiper-btn-prev');
      if (navBtnNext.disabled && navBtnPrev.disabled) {
        navBtnNext.classList.add('close');
        navBtnPrev.classList.add('close');
      }
    }, 100)

  });

  modalClosbtn.addEventListener('click', function(){
    ModalWindowClose(modal, modalWindow, modalScene);
    modalCurrentMainImg = currentMainImg;
    modalCurrentSubImg = currentSubImg;
    currentMainImg = windowCurrentMainImg;
    currentSubImg = windowCurrentSubImg;
  });

  let buyBtn = document.querySelector('.js-buy-btn');

  buyBtn.addEventListener('click', function(){
    modal = ModalWindowOpen(buyBtn.dataset.modalpath, modalScene, modalWindow);
  });


  let phone = document.getElementById("phone");
  let im = new Inputmask("+7 (999)-999-99-99");
  im.mask(phone);
  let validateForms = function(selector, successModal, yaGoal) {
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
      },
      messages: {
        name: 'Недопустимый формат',
        phone: 'Недопустимый формат',
      },
      submitHandler: function(form) {
        let formData = new FormData(form);
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log('Отправлено');
              ModalWindowClose(modal, modalWindow, modalScene);
              modal = ModalWindowOpen(documemt.querySelector(successModal).dataset.modalpath, modalScene, modalWindow);
            }
            if (xhr.status > 399) {
              ModalWindowClose(modal, modalWindow, modalScene);
              modal = ModalWindowOpen('error', modalScene, modalWindow);
            }
          }
        }
        xhr.open('POST', '../mail.php', true);
        xhr.send(formData);
        form.reset();
      }
    });
  }
  validateForms('.modalwindow__buy-form', '.js-modal-form', 'send goal');
});

