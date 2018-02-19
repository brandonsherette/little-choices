const $ = window.jQuery;

class AppUtil {
  /**
   * Scrolls the page to the specifed target selector.
   * @param {String} [target] the target selector to scroll to DEFAULT: ".archfitters-shopper".
   */
  static scrollTo(target = '.app-component') {
    // move up to the top of the page
    const $target = $(target);
    if ($target.length === 0) {
      return true;
    }

    // wait a bit to allow any actions to trigger to get correct height offset
    window.setTimeout(function() {
      $('html, body').stop().animate({
        'scrollTop': $target.offset().top - $('.fixed-top').outerHeight()
      }, 900, 'swing', function() {
        //window.location.hash = target;
      });
    }, 100);
  }
}

export default AppUtil;