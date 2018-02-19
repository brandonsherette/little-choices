const fbq = window.fbq; // facebook pixels
const gtag = window.gtag; // Google Analytics

const defaultGTagParams = {
  'event_category': '',
};
const CURRENCY = 'USD';

class TrackerUtil {
  // add public static methods below to trigger events specific to the app
  /*static triggerMyEvent() {
    triggerFBEvent('My Event');
    triggerGTagEvent('My Event');
  }*/
}

export default TrackerUtil;

///////////////////
function triggerFBEvent(eventName) {
  if (fbq && typeof fbq === 'function') {
    fbq('track', eventName);
  }
}

function triggerGTagEvent(eventName, params = {}) {
  if (gtag && typeof gtag === 'function') {
    gtag('event', eventName, Object.assign({}, defaultGTagParams, params));
  }
}