window.onload = function () {

  let itemDrop = document.querySelector('.nav-item.dropdown');
  let menuDrop = document.querySelector('.dropdown-menu');

  itemDrop.onmouseover = function show() {

  }


//---------------- slick index header

  $('.header-slick').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    arrows: true
  });

//---------------- slick partners

  $('.partners-slick').slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    responsive: [{
      breakpoint: 991,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      }
    }, {
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    }, {
      breakpoint: 420,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }]
  });

//---------------- slick custom-made-one

  $('.carousel-big').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    adaptiveHeight: true,
    infinite: false,
    useTransform: true,
    speed: 400,
    cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
    asNavFor: '.carousel-small'
  });

  $('.carousel-small')
    .on('init', function (event, slick) {
      $('.carousel-small .slick-slide.slick-current').addClass('is-active');
    })
    .slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      dots: false,
      autoplay: false,
      focusOnSelect: true,
      infinite: false,
      asNavFor: '.carousel-big',
      responsive: [{
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      }, {
        breakpoint: 568,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      }, {
        breakpoint: 368,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }]
    });

  $('.carousel-big').on('afterChange', function (event, slick, currentSlide) {
    $('.carousel-small').slick('slickGoTo', currentSlide);
    var currrentNavSlideElem = '.carousel-small .slick-slide[data-slick-index="' + currentSlide + '"]';
    $('.carousel-small .slick-slide.is-active').removeClass('is-active');
    $(currrentNavSlideElem).addClass('is-active');
  });

  $('.carousel-small').on('click', '.slick-slide', function (event) {
    event.preventDefault();
    var goToSingleSlide = $(this).data('slick-index');

    $('.carousel-big').slick('slickGoTo', goToSingleSlide);
  });

};