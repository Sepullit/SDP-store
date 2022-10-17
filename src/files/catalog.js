
document.addEventListener ('DOMContentLoaded', function() {
  const windowWidth = document.documentElement.clientWidth;
  const startPoint = document.getElementById('start');
  let cardStep = windowWidth > 768 ? 9 : 6;
  let currentBtn = '';
  let currentCard = 1;



  let cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    card.classList.add('section-catalog__card');
    if (Number(card.dataset.card)>cardStep) {
      card.classList.add('close');
    }
  });

  let navBtn=[]
  let btnList = document.querySelector('.section-catalog__button-list');
  for (let i=1; i<=Math.floor(cards.length/cardStep); i++){
    let btn = document.createElement('button');
    let li = document.createElement('li');
    btn.classList.add('section-catalog__btn', 'btn', 'btn-icon');
    btn.textContent = i;
    btn.dataset.btn = i;
    li.classList.add('section-catalog__button-item');
    if (i===1) {
      btn.classList.add('btn-type-1');
      currentBtn = btn;
    }
    else {
      btn.classList.add('btn-type-2');
    }
    navBtn.push(btn);
    li.append(btn);
    btnList.append(li);
  }

  navBtn.forEach(function(btn) {
    btn.addEventListener('click', function(){
      if (currentBtn.dataset.btn != btn.dataset.btn) {
        for (let i = currentCard-1; i<currentCard+cardStep-1; i++) {
          console.log(i)
          console.log(cards[i])
          cards[i].classList.add('close');
        }

        currentCard = currentBtn.dataset.btn < Number(btn.dataset.btn) ?
         currentCard+cardStep*(Number(btn.dataset.btn)-currentBtn.dataset.btn) : currentCard-cardStep*(currentBtn.dataset.btn-Number(btn.dataset.btn));
        currentBtn.classList.remove('btn-type-1');
        currentBtn.classList.add('btn-type-2');
        currentBtn = btn;
        currentBtn.classList.add('btn-type-1');
        currentBtn.classList.remove('btn-type-2');

        for(let i = currentCard-1; i<currentCard+cardStep-1; i++) {
          cards[i].classList.remove('close');
        }

        gsap.from(Array.from(cards).slice(currentCard-1, currentCard+cardStep), {duration: 0.7, opacity: 0})
        startPoint.scrollIntoView({
          behavior: 'smooth'
        });
      }
    })
  });

  let selectBtn = document.querySelectorAll('.section-catalog__filters-btn');
  let filtres = document.querySelectorAll('.section-catalog__filter');
  selectBtn.forEach(function(currentBtn) {
    currentBtn.addEventListener('click', function(){
      filtres.forEach(function(filter){
        if(filter.dataset.filterbtn!=currentBtn.dataset.filter) {
          filter.classList.add('close');
        }
      });
      selectBtn.forEach(function(btn){
        if(btn.dataset.filter!=currentBtn.dataset.filter) {
          btn.classList.remove('section-catalog__filters-btn--open');
        }
      });
      currentBtn.classList.toggle('section-catalog__filters-btn--open');
      document.querySelector(`[data-filterbtn="${currentBtn.dataset.filter}"]`).classList.toggle('close');
    })
  })

  let className = windowWidth>1024 ? 'desktop' : 'mobile';
  let inputs = document.querySelectorAll(`.js-input-${className}`);
  let labelText = '';
  let labelColor = '';
  let colorList = ['#DAFFD1', '#FFF5D1', '#F5E8FF', '#EAEAEA'];
  let numberColor = 0;
  let checkboxes = document.querySelectorAll(`.js-checkbox-${className}`);

  if (windowWidth>610) {
    checkboxes.forEach(function(checkbox){
      if (checkbox.checked){
        labelText = checkbox.nextElementSibling.textContent;
        labelColor = colorList[numberColor];
        numberColor =  numberColor === colorList.length-1 ? 0 : numberColor+1;
        createFilterLabel(checkbox.id, labelText, labelColor);
      }
      checkbox.addEventListener('input', function(){
        if (checkbox.checked) {
          labelText = checkbox.nextElementSibling.textContent;
          labelColor = colorList[numberColor];
          numberColor =  numberColor === colorList.length-1 ? 0 : numberColor+1;
          createFilterLabel(checkbox.id, labelText, labelColor);
        }
        else {
          document.querySelector(`[data-checkbox="${checkbox.id}"]`).remove();
        }
      });
    })
  }



  console.log(inputs)
  inputs.forEach(function(input){

    input.addEventListener('input', function() {
      this.value = this.value.replace(/[^0-9 \,]/, '');
      this.value = this.value.replace(/\s/g, '');
      this.value = costView(this.value);
    });

    input.addEventListener('change', function(){
      labelText = `${input.dataset.id} ${costView(input.value)}`;
      labelColor = colorList[numberColor];
      numberColor =  numberColor === colorList.length-1 ? 0 : numberColor+1;
      let beforeEl = document.querySelector(`[data-checkbox=${input.dataset.id}]`);
      if (beforeEl) beforeEl.remove();
      createFilterLabel(input.dataset.id, labelText, labelColor);
    });
  })
})



function costView(value) {
  value = String(value)
  let newValue = '';
  value = value.replace(/\s/g, '');
  if(value.length>=4) {
    let n = (value.length%3) ? Math.floor(value.length/3) : Math.floor(value.length/3) - 1;
    for (let i = 0; i < n; i++) {
      newValue =' '+value.slice(-3) + newValue;
      value = value.slice(0, value.length-3);
    }
    newValue = value + newValue;
    return newValue;
  }
  return value;
}

function createFilterLabel(id, text, color="#DAFFD1") {
  let filterLabel = document.createElement('li');
  let span = document.createElement('span');
  let btn = document.createElement('button');
  span.textContent = text;
  btn.innerHTML = '<svg class="section-catalog__head-btn-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.5999 8.40002L8.3999 15.6" stroke="#666666" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.3999 8.40002L15.5999 15.6" stroke="#666666" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  filterLabel.classList.add('section-catalog__head-item');
  span.classList.add('section-catalog__head-span');
  btn.classList.add('section-catalog__head-btn', 'btn', 'btn-icon');


  filterLabel.style.backgroundColor=color;
  filterLabel.dataset.checkbox = id;
  filterLabel.append(span);
  filterLabel.append(btn);

  let list = document.querySelector('.section-catalog__head-list');
  list.append(filterLabel);

  btn.addEventListener('click', function(){
    let element = document.getElementById(id);
    if(element) element.checked = false;
    filterLabel.remove();
  });
}

const rangeSlider = document.getElementById('slider');

if (rangeSlider) {
	noUiSlider.create(rangeSlider, {
    start: [2000, 150000],
		connect: true,
    keyboardSupport: true,
		step: 1,
    range: {
			'min': [500],
			'max': [300000]
    }
	});

	const input0 = document.getElementById('input-0');
	const input1 = document.getElementById('input-1');
	const inputs = [input0, input1];

	rangeSlider.noUiSlider.on('update', function(values, handle){
		inputs[handle].value = Math.round(values[handle]);
	});

	const setRangeSlider = (i, value) => {
		let arr = [null, null];
		arr[i] = value;

		console.log(arr);

		rangeSlider.noUiSlider.set(arr);
	};

	inputs.forEach((el, index) => {
		el.addEventListener('change', (e) => {
			console.log(index);
			setRangeSlider(index, e.currentTarget.value);
		});
	});
}