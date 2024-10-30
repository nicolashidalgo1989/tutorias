/**
 * What to do when an item enters the screen
 * If it is in the screen, isIntersecting will be true.
 * Add a class when it is.
 */
const intersectionCallback = (entries) => {
    for (const entry of entries) { // Loop over all elements that either enter or exit the view.
        if (entry.isIntersecting) { // This is true when the element is in view.
        let animation = entry.target.getAttribute('data-animation');
        let delay = entry.target.getAttribute('data-delay');
        entry.target.classList.add(animation); // Add a class.
        delay && entry.target.classList.add('animate__delay-' + delay + 's'); // Add a class.animate__delay-2s
        }
    }
}

  /**
   * Create a observer and use the instersectionCallback as 
   * the instructions for what to do when an element enters
   * or leaves the view
   */
  const observer = new IntersectionObserver(intersectionCallback);
  
  /**
   * Get all .item elements and loop over them.
   * Observe each individual item.
   */
  const items = document.querySelectorAll('.animate__animated');
  for (const item of items) {
    observer.observe(item);
  }

  const previousPagination = document.querySelector('.prepend-slide');
  const nextPagination = document.querySelector('.append-slide');

  const swiper = new Swiper('.swiper', {
    grabCursor: true,
    slidesPerView: 3,
    spaceBetween: 24, 
    pagination: {
        el: '.swiper-pagination',
        clickable: true, 
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
        }, 
    }, 
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
        
        init: function () {  
            this.navigation.prevEl.classList.contains('swiper-button-disabled') ? previousPagination.classList.add('opacity') :  previousPagination.classList.remove('opacity'); 
        }
    }
  });

  swiper.

  previousPagination.addEventListener('click',  (e) => {
    e.preventDefault();
    swiper.slidePrev(); 
    swiper.navigation.prevEl.classList.contains('swiper-button-disabled') ? e.target.classList.add('opacity') :  e.target.classList.remove('opacity');
    swiper.navigation.nextEl.classList.contains('swiper-button-disabled') ? nextPagination.classList.add('opacity') :  nextPagination.classList.remove('opacity');
  });


  nextPagination.addEventListener('click', (e) => {
    e.preventDefault();
    swiper.slideNext(); 
    swiper.navigation.prevEl.classList.contains('swiper-button-disabled') ? previousPagination.classList.add('opacity') :  previousPagination.classList.remove('opacity');
    swiper.navigation.nextEl.classList.contains('swiper-button-disabled') ? e.target.classList.add('opacity') :  e.target.classList.remove('opacity');
  });
 