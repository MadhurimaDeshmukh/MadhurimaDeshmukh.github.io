// ----------------------------------------------
// Imports
// ----------------------------------------------
import $ from 'jquery';

// ----------------------------------------------
// Infinite Scroll
// ----------------------------------------------
const InfiniteScroll = (() => {
  let s;

  return {
    settings() {
      return {
        container: $('.posts__container'),
        next: $('.posts__next'),
        currentPage: 1,
        pathname: window.location.pathname.replace(/#(.*)$/g, '').replace('//g', '/'),
        isLoading: false
      };
    },

    init() {
      s = this.settings();
      this.bindEvents();
    },

    bindEvents() {
      s.next.on('click', () => {
        this.fetchPosts();
      });
    },

    fetchPosts() {
      if (s.isLoading || s.currentPage === maxPages) {
        console.log('Fucked');
        return;
      }

      s.isLoading = true;
      s.currentPage++;

      const nextPage = `${s.pathname}page/${s.currentPage}/`;

      $.ajax({
        url: nextPage,
        type: 'GET',
        success: response => {
          const parse = document.createRange().createContextualFragment(response);
          const posts = parse.querySelectorAll('.posts__post');

          if (posts.length) {
            setTimeout(() => {
              [].forEach.call(posts, post => {
                post.classList.add('fade-up');
                s.container.append(post);
              });

              if (s.currentPage === maxPages) {
                s.next.text('No More Articles');
              }
            }, 400);
          }
        },
        error: error => {
          console.error(error);
        }
      });

      s.isLoading = false;
    }
  };
})();

// ----------------------------------------------
// Exports
// ----------------------------------------------
export default InfiniteScroll;
