/* --------------------------------------
   ГАМБУРГЕР-МЕНЮ (открытие/закрытие)
-------------------------------------- */
const menuToggle = document.getElementById('menuToggle');
const navbar = document.getElementById('navbar');

menuToggle.addEventListener('click', () => {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', !isExpanded);
  navbar.classList.toggle('active');
  navbar.setAttribute('aria-hidden', isExpanded);
});

/* --------------------------------------
   КАРУСЕЛЬ ОТЗЫВОВ
-------------------------------------- */
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentTestimonialIndex = 0;

// Функция для показа отзыва
const showTestimonial = (index) => {
  testimonials.forEach((testimonial, i) => {
    if (i === index) {
      testimonial.classList.add('active');
      testimonial.setAttribute('aria-hidden', 'false'); // Доступность
    } else {
      testimonial.classList.remove('active');
      testimonial.setAttribute('aria-hidden', 'true'); // Доступность
    }
  });
};

// Обработчики кнопок
prevBtn.addEventListener('click', () => {
  currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentTestimonialIndex);
});

nextBtn.addEventListener('click', () => {
  currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
  showTestimonial(currentTestimonialIndex);
});

// Показываем первый отзыв при загрузке
showTestimonial(currentTestimonialIndex);


/* --------------------------------------
   КАРУСЕЛЬ ДЛЯ КАРПА (Ассортимент)
-------------------------------------- */
const fishSlides = document.querySelectorAll('.fish-slide');
const fishPrevBtn = document.querySelector('.fish-prev');
const fishNextBtn = document.querySelector('.fish-next');
let currentFishIndex = 0;

// Функция для показа слайда с рыбой
const showFishSlide = (index) => {
  fishSlides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add('active');
      slide.setAttribute('aria-hidden', 'false'); // Доступность
    } else {
      slide.classList.remove('active');
      slide.setAttribute('aria-hidden', 'true');  // Доступность
    }
  });
};

// Обработчики для кнопок карусели с рыбой
fishPrevBtn.addEventListener('click', () => {
  currentFishIndex = (currentFishIndex - 1 + fishSlides.length) % fishSlides.length;
  showFishSlide(currentFishIndex);
});

fishNextBtn.addEventListener('click', () => {
  currentFishIndex = (currentFishIndex + 1) % fishSlides.length;
  showFishSlide(currentFishIndex);
});

// Показываем первый слайд при загрузке
showFishSlide(currentFishIndex);

/* --------------------------------------
   КНОПКА "НАВЕРХ"
-------------------------------------- */
const btnToTop = document.getElementById('btnToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    btnToTop.classList.add('show'); // Добавляем класс show
  } else {
    btnToTop.classList.remove('show'); // Удаляем класс show
  }
});

btnToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

/* --------------------------------------
   АНИМАЦИЯ ПРИ СКРОЛЛЕ
-------------------------------------- */
const scrollElements = document.querySelectorAll('[data-scroll]');

const elementInView = (el) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 // 0.75 - коэффициент, когда элемент считается видимым (75% высоты окна)
  );
};

const displayScrollElement = (element) => {
  element.classList.add('scroll-active');
};

// Добавляем функцию скрытия элемента, если он не в области видимости
const hideScrollElement = (element) => {
   element.classList.remove('scroll-active');
};


const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el)) {
      displayScrollElement(el);
    } else {
       hideScrollElement(el); // Скрываем, если не в области видимости
    }
  });
};

// Инициализация при загрузке
window.addEventListener('DOMContentLoaded', handleScrollAnimation);
// Обновление при скролле (с оптимизацией throttle)
window.addEventListener('scroll', throttle(handleScrollAnimation, 100));

// Функция для оптимизации скролл-ивентов
function throttle(fn, wait) {
  let time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  };
}