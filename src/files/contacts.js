
function init(){
  var myMap = new ymaps.Map("map", {
      center: [55.758676, 37.647181],
      zoom: 14,
      controls: []
  });


  var myCollection = new ymaps.GeoObjectCollection(),
      myPoints = [
          { coords: [55.750616, 37.641809], name: 'SitDownPls на Солянке', address: 'м. Китай-город, ул. Солянка, д.24', phone: '+7 (495) 885-45-47', time: 'с 10:00 до 21:00', what: 'шоурум, пункт отгрузки, пункт выдачи, пункт обмена-возврата, сервисный центр'},
          { coords: [55.762429, 37.653110], name: 'SitDownPls на Покровке', address: 'ул. Покровка 44', phone: '+7 (495) 885-45-47', time: 'с 10:00 до 21:00', what: 'шоурум, сервисный центр'},
      ];

  // Заполняем коллекцию данными.


  // Добавляем коллекцию меток на карту.

  var MyBalloonContentLayoutClass = ymaps.templateLayoutFactory.createClass(
    `<div class="section-contactpage__tooltip">
      <h3 class="section-contactpage__tooltip-header">{{ properties.name }}</h3>
      <address class="section-contactpage__tooltip-address">{{ properties.address }}.</address>
      <a class="section-contactpage__tooltip-link header-top__link">
        <svg class="header-top__link-svg">
          <use class="header-top__link-svg-use" xlink:href="#mdi_call"></use>
        </svg>
        <span>{{properties.phone}}</span>
      </a>
      <div class="section-contactpage__tooltip-block">
        <span class="section-contactpage__tooltip-span">Часы работы: </span>
        <p class="section-contactpage__tooltip-text">{{properties.time}}</p>
      </div>
      <div class="section-contactpage__tooltip-block">
        <span class="section-contactpage__tooltip-span">Что здесь: </span>
        <p class="section-contactpage__tooltip-text">{{properties.what}}</p>
      </div>
    </div>`
  );

  for (var i = 0, l = myPoints.length; i < l; i++) {
    var point = myPoints[i];
    myCollection.add(new ymaps.Placemark(
        point.coords, {
          name: point.name,
          address: point.address,
          phone: point.phone,
          time: point.time,
          what: point.what
        }, {
          iconLayout: 'default#image',
          iconImageHref: 'img/mark.svg',
          iconImageSize: [32, 22],
          hideIconOnBalloonOpen: false,
          balloonOffset:[0, -40],
          balloonContentLayout: MyBalloonContentLayoutClass,
          balloonPanelMaxMapArea: 0
        }
    ));

  }
  myMap.geoObjects.add(myCollection);
  var mySearchControl = new ymaps.control.SearchControl({
    options: {
        // Заменяем стандартный провайдер данных (геокодер) нашим собственным.
        provider: new CustomSearchProvider(myPoints),
        // Не будем показывать еще одну метку при выборе результата поиска,
        // т.к. метки коллекции myCollection уже добавлены на карту.
        noPlacemark: true,
        resultsPerPage: 5
    }});

  // Добавляем контрол в верхний правый угол,
  myMap.controls
      .add(mySearchControl, { float: 'right' });

  let searchForm = document.querySelector('.section-contactpage__form');
  searchForm.addEventListener('submit', function(event){
    event.preventDefault();
    let request = event.target.querySelector('.js-search-input').value;
    mySearchControl.search(request);
  })
}

document.addEventListener ('DOMContentLoaded', function() {
  ymaps.ready(init);
});

function CustomSearchProvider(points) {
  this.points = points;
}

CustomSearchProvider.prototype.geocode = function (request, options) {
  var MyBalloonContentLayoutClass = ymaps.templateLayoutFactory.createClass(
    `<div class="section-contactpage__tooltip">
      <h3 class="section-contactpage__tooltip-header">{{ properties.name }}</h3>
      <address class="section-contactpage__tooltip-address">{{ properties.address }}.</address>
      <a class="section-contactpage__tooltip-link header-top__link">
        <svg class="header-top__link-svg">
          <use class="header-top__link-svg-use" xlink:href="#mdi_call"></use>
        </svg>
        <span>{{properties.phone}}</span>
      </a>
      <div class="section-contactpage__tooltip-block">
        <span class="section-contactpage__tooltip-span">Часы работы: </span>
        <p class="section-contactpage__tooltip-text">{{properties.time}}</p>
      </div>
      <div class="section-contactpage__tooltip-block">
        <span class="section-contactpage__tooltip-span">Что здесь: </span>
        <p class="section-contactpage__tooltip-text">{{properties.what}}</p>
      </div>
    </div>`
  );

  var deferred = new ymaps.vow.defer(),
      geoObjects = new ymaps.GeoObjectCollection(),
      offset = options.skip || 0,
      limit = options.results || 20;

  var points = [];
  console.log(this.points)
  for (var i = 0, l = this.points.length; i < l; i++) {
      var point = this.points[i];
      console.log(point.what.toLowerCase(), request.toLowerCase(), point.what.toLowerCase().indexOf(request.toLowerCase()))
      if (point.name.toLowerCase().indexOf(request.toLowerCase()) != -1 || point.what.toLowerCase().indexOf(request.toLowerCase()) != -1) {
          console.log(points)
          points.push({ coords: point.coords, name: point.name, address: point.address, phone: point.phone, time: point.time, what: point.what});
          console.log(points)
      }
  }
  console.log(points)
  points = points.splice(offset, limit);
  for (var i = 0, l = points.length; i < l; i++) {
      geoObjects.add(new ymaps.Placemark(points[i].coords,{
        name: points[i].name,
        address: points[i].address,
        phone: points[i].phone,
        time: points[i].time,
        what: points[i].what
      }, {
        iconLayout: 'default#image',
        iconImageHref: 'img/mark.svg',
        iconImageSize: [32, 22],
        hideIconOnBalloonOpen: false,
        balloonOffset:[0, -40],
        balloonContentLayout: MyBalloonContentLayoutClass,
        balloonPanelMaxMapArea: 0
      }));
  }

  deferred.resolve({
      geoObjects: geoObjects,
      metaData: {
          geocoder: {
              request: request,
              found: geoObjects.getLength(),
              results: limit,
              skip: offset
          }
      }
  });
  return deferred.promise();
};
