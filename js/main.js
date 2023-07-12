// 스크롤 하면 badge 사라지게
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');
//lodash cdn
window.addEventListener('scroll', _.throttle(function() {
  if(window.scrollY > 500) {
    //badge 숨기기
    // gsap.to(요소, 지속시간, 옵션{객체 데이터 형태});
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    })
    //버튼 보이기
    gsap.to(toTopEl, .2, {
      x: 0
    });
  } else {
    //배지 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    //버튼 숨기기
    gsap.to(toTopEl, .2, {
      x: 100
    });
  }
}, 300));
// _.throttle(함수, 시간(ms))

toTopEl.addEventListener('click', function() {
  gsap.to(window, .7, {
    scrollTo: 0
  });
});



// 이미지 순차 출력
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .5, // 0.7, 1.4, 2.1 2.7
    opacity: 1
  });
});


//스와이퍼 new Swiper(선택자, 옵션{})
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true,
});

new Swiper('.promotion .swiper-container', {
  // direction: 'horizontal', <- 기본값
  slidesPerView: 3, //한번에 보여줄 슬라이드 개수
  spaceBetween: 10, //슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드 가운데 보이기
  loop: true,
  autoplay: {
    delay: 5000 //5s
  },
  pagination: {
    el: '.promotion .swiper-pagination', //페이지 번호 요소 선택자
    clickable: true, //사용자의 페이지 번호 요소 제어
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});

new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
})


//숨김인데 왜 if문에서 또 hide 값을 add 하는지????????? 기능 작동에는 상관이 없긴 하지만... 
//테스트 해보쟈.. 
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');

let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function(){
  isHidePromotion = !isHidePromotion;
  if(isHidePromotion){
    //true면 숨김 처리
    promotionEl.classList.add('hide');
  } else {
    //false면 보임 처리
    promotionEl.classList.remove('hide'); 
  }
});


// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

//floating 둥둥 뜨는 애니메이션 
function floatingObject(selector, delay, size) {
  // gsap.to(요소, 지속시간, 옵션);
  gsap.to(selector, //선택자
    random(1.5, 2.5),  //애니메이션 동작 시간
    {  //옵션
    y: size,
    repeat: -1,
    yoyo: true,
    ease: Power1.easeInOut,
    delay: random(0,delay)
  });
}

floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);


//ScrollMagic
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
  new ScrollMagic
  .Scene({
    triggerElement: spyEl, //보여짐 여부를 감시할 요소를 지정
    triggerHook: .8
  })
  .setClassToggle(spyEl, 'show') //(클래스 적용할 요소, 클래스 이름)
  .addTo(new ScrollMagic.Controller());
  //Scene은 감시, setClassToggle <- 클래스 속성을 토글로 지정, addTo <-컨트롤러 개념
  //체이닝 형태로 작성해서 가독성 업
});