// ----------------------------------------------
// Imports
// ----------------------------------------------
import anime from 'animejs';
import AOS from 'aos';
import Barba from 'barba.js';
import InfiniteScroll from './components/_infiniteScroll.js';
import { miscCycle, miscClip } from './components/_miscellaneous.js';

// ----------------------------------------------
// Inits
// ----------------------------------------------
$(() => {

  // Barba
  const SlideTransition = Barba.BaseTransition.extend({
    start() {
      Promise.all([this.newContainerLoading, this.slideOut(), new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 700);
      })]).then(this.slideIn.bind(this));
    },

    slideOut() {
      $('.transition').addClass('transition-out');

      return new Promise(resolve => {
        anime({
          targets: '.transition',
          translateX: '-=100%',
          easing: 'easeInQuart',
          duration: 350,
          complete() {
            resolve();
          }
        });
      });
    },

    slideIn() {
      $('.transition').removeClass('transition-out').addClass('transition-in');

      window.scrollTo(0, 0);
      this.oldContainer.style.display = 'none';
      this.newContainer.style.visibility = 'visible';

      this.done();
    }
  });

  Barba.Dispatcher.on('transitionCompleted', () => {
    anime({
      targets: '.transition',
      translateY: '-100%',
      easing: 'easeOutQuart',
      duration: 350,
      delay: 200,
      complete() {
        $('.transition').removeClass('transition-in');
      }
    });

    AOS.init({
      duration: 1000,
      easing: 'ease',
      once: true
    });

    miscCycle();
    miscClip();

    if ($('.posts').length && $('.posts__next').length) {
      InfiniteScroll.init();
    }

    $(window).on('resize scroll', miscClip);
  });

  Barba.Pjax.getTransition = () => SlideTransition;

  Barba.Pjax.start();

});
