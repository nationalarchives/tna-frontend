window.TNAFrontendCookieEvents ||= null;

export class CookieEventHandler {
  events = {};
  oneTimeEvents = {};
  debug = false;

  constructor(debug = false) {
    this.debug = debug;
    if (window.TNAFrontendCookieEvents) {
      this.log("Using existing TNAFrontendCookieEvents instance");
      /* eslint-disable-next-line no-constructor-return */
      return window.TNAFrontendCookieEvents;
    }
    window.TNAFrontendCookieEvents = this;
  }

  log(...args) {
    if (this.debug) {
      /* eslint-disable-next-line no-console */
      console.log("[TNA Frontend Cookie Events]", ...args);
    }
  }

  /**
   * Add an event listener.
   * @param {String} event - The event to add a listener for.
   * @param {Function} callback - The callback function to call when the event is triggered.
   */
  on(event, callback) {
    if (!Object.hasOwn(this.events, event)) {
      this.events[event] = [];
    }
    this.events[event] = [...this.events[event], callback];
  }

  once(event, callback) {
    if (!Object.hasOwn(this.oneTimeEvents, event)) {
      this.oneTimeEvents[event] = [];
    }
    this.oneTimeEvents[event] = [...this.oneTimeEvents[event], callback];
  }

  /** @protected */
  trigger(event, data = {}) {
    if (Object.hasOwn(this.events, event)) {
      this.log(`Triggering event: ${event}`, data);
      this.events[event].forEach((eventToTrigger) =>
        eventToTrigger.call(this, data),
      );
    }
    if (Object.hasOwn(this.oneTimeEvents, event)) {
      this.log(`Triggering one-time event: ${event}`, data);

      for (
        /* eslint-disable-next-line no-magic-numbers */
        let eventIndex = this.oneTimeEvents[event].length - 1;
        /* eslint-disable-next-line no-magic-numbers */
        eventIndex >= 0;
        /* eslint-disable-next-line no-magic-numbers */
        eventIndex -= 1
      ) {
        const eventToTrigger = this.oneTimeEvents[event][eventIndex];
        eventToTrigger.call(this, data);
        /* eslint-disable-next-line no-magic-numbers */
        this.oneTimeEvents[event].splice(eventIndex, 1);
      }
    }
  }
}
