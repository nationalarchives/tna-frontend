window.TNAFrontendCookies = window.TNAFrontendCookies || null;
window.TNAFrontendCookieEvents = window.TNAFrontendCookieEvents || null;

export class CookieEventHandler {
  events = {};
  oneTimeEvents = {};

  constructor() {
    if (window.TNAFrontendCookieEvents) {
      return window.TNAFrontendCookieEvents;
    }
    window.TNAFrontendCookieEvents = this;
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
      this.events[event].forEach((eventToTrigger) =>
        eventToTrigger.call(this, data),
      );
    }
    if (Object.hasOwn(this.oneTimeEvents, event)) {
      for (let i = this.oneTimeEvents[event].length - 1; i >= 0; i--) {
        const eventToTrigger = this.oneTimeEvents[event][i];
        eventToTrigger.call(this, data);
        this.oneTimeEvents[event].splice(i, 1);
      }
    }
  }
}

/**
 * Class to handle cookies.
 * @class Cookies
 * @constructor
 * @public
 */
export default class Cookies {
  /** @protected */
  extraPolicies = [];
  /** @protected */
  domain = "";
  /** @protected */
  path = "";
  /** @protected */
  secure = true;
  /** @protected */
  policiesKey = "";
  /** @protected */
  events = null;
  /** @protected */
  defaultAge = null;

  /**
   * Create a cookie handler.
   * @param {String} [options.extraPolicies=[]] - The extra cookie policies to manage in addition to essential, settings, usage and marketing.
   * @param {String} [options.domain=""] - The domain to register the cookie with.
   * @param {String} [options.path=""] - The domain to register the cookie with.
   * @param {String} [options.secure=true] - Only set cookie in HTTPS environments.
   * @param {String} [options.policiesKey="cookies_policy"] - The name of the cookie.
   * @param {String} [options.newInstance=false] - Create a fresh instance of the cookie class.
   * @param {String} [options.defaultAge=31536000] - The default age of non-session cookies.
   */
  constructor(options = {}) {
    const {
      extraPolicies = [],
      domain = null,
      path = null,
      secure = true,
      policiesKey = "cookies_policy",
      newInstance = false,
      defaultAge = 31536000, // 365 days
    } = options;
    if (newInstance) {
      this.destroyInstance();
    } else if (window.TNAFrontendCookies) {
      return window.TNAFrontendCookies;
    }
    this.extraPolicies = extraPolicies;
    if (domain === null) {
      this.domain = document.documentElement.dataset.tnaCookiesDomain || "";
    } else {
      this.domain = domain;
    }
    if (path === null) {
      this.path = document.documentElement.dataset.tnaCookiesPath || "/";
    } else {
      this.path = path;
    }
    this.secure = secure;
    this.policiesKey = policiesKey;
    this.defaultAge = defaultAge;
    this.events = new CookieEventHandler();
    this.init();
    window.TNAFrontendCookies = this;
  }

  /** @protected */
  init() {
    this.savePolicies({
      ...Object.fromEntries(
        this.extraPolicies.map((k) => [k.toLowerCase(), false]),
      ),
      usage: false,
      settings: false,
      marketing: false,
      ...this.policies,
      essential: true,
    });
  }

  destroyInstance() {
    window.TNAFrontendCookies = null;
  }

  /** @protected */
  get all() {
    const deserialised = {};
    document.cookie
      .split("; ")
      .filter((x) => x)
      .forEach((cookie) => {
        const parts = cookie.trim().split("=");
        if (parts[0]) {
          deserialised[parts[0]] = parts[1];
        }
      });
    return deserialised;
  }

  /** @protected */
  get policies() {
    try {
      return JSON.parse(this.get(this.policiesKey) || "{}");
    } catch (e) {
      return {};
    }
  }

  /**
   * Check to see whether a cookie exists or not.
   * @param {String} key - The cookie name.
   * @returns {Boolean}
   */
  exists(key) {
    return Object.hasOwn(this.all, key);
  }

  /**
   * Check to see whether a cookie has a particular value.
   * @param {String} key - The cookie name.
   * @param {String|Number|Boolean} value - The value to check against.
   * @returns
   */
  hasValue(key, value) {
    return this.get(key) == value;
  }

  /**
   * Get a cookie.
   * @param {String} key - The cookie name.
   * @returns {String|Number|Boolean}
   */
  get(key) {
    return this.exists(key) ? decodeURIComponent(this.all[key]) : null;
  }

  /**
   * Set a cookie.
   * @param {String} key - The cookie name.
   * @param {String|Number|Boolean} value - The cookie value.
   * @param {Object} options
   * @param {Number} [options.maxAge=this.defaultAge] - The maximum age of the cookie in seconds.
   * @param {String} [options.path=/] - The path to register the cookie for.
   * @param {String} [options.sameSite=Lax] - The sameSite attribute.
   * @param {String} [options.domain=this.domain] - The domain to register the cookie with.
   * @param {String} [options.path=this.path] - The path to register the cookie with.
   * @param {String} [options.secure=this.secure] - Only set cookie in HTTPS environments.
   * @param {String} [options.session=false] - Set a session cookie.
   */
  set(key, value, options = {}) {
    const {
      maxAge = this.defaultAge,
      sameSite = "Lax",
      domain = this.domain,
      path = this.path,
      secure = this.secure,
      session = false,
    } = options;
    if (!key) {
      return;
    }
    const cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)};${
      domain ? ` domain=${domain}; ` : ""
    } samesite=${sameSite}; path=${path}${!session ? `; max-age=${maxAge}` : ""}${
      secure ? "; secure" : ""
    }`;
    document.cookie = cookie;
    this.events.trigger("setCookie", {
      key,
      value,
      maxAge,
      path,
      sameSite,
      domain,
      secure,
      session,
      cookie,
    });
  }

  /**
   * Delete a cookie.
   * @param {String} key - The cookie name.
   * @param {String} [path=/] - The path to the cookie is registered on.
   */
  delete(key, path = "/", domain = null) {
    const options = { maxAge: -1, path, domain: domain || undefined };
    this.set(key, "", options);
    this.events.trigger("deleteCookie", { key, ...options });
  }

  /**
   * Delete all cookies.
   */
  deleteAll(path = "/", domain = null) {
    Object.keys(this.all).forEach((cookie) => {
      this.delete(cookie, path, domain);
    });
    this.events.trigger("deleteAllCookies", { path, domain });
  }

  /**
   * Accept a policy.
   * @param {String} policy - The name of the policy.
   */
  acceptPolicy(policy) {
    this.setPolicy(policy, true);
    this.events.trigger("acceptPolicy", policy);
    this.events.trigger("changePolicy", { [policy]: true });
  }

  /**
   * Reject a policy.
   * @param {String} policy - The name of the policy.
   */
  rejectPolicy(policy) {
    this.setPolicy(policy, false);
    this.events.trigger("rejectPolicy", policy);
    this.events.trigger("changePolicy", { [policy]: false });
  }

  /**
   * Set a policy.
   * @param {String} policy - The name of the policy.
   * @param {Boolean} accepted - Whether the policy is accepted or not.
   */
  setPolicy(policy, accepted) {
    if (policy === "essential") {
      return;
    }
    this.savePolicies({
      ...this.policies,
      [policy]: accepted,
      essential: true,
    });
    this.events.trigger("changePolicy", { [policy]: accepted });
  }

  /**
   * Accept all the cookie policies.
   */
  acceptAllPolicies() {
    const allPolicies = Object.fromEntries(
      Object.keys(this.policies).map((k) => [k.toLowerCase(), true]),
    );
    this.savePolicies(allPolicies);
    this.events.trigger("acceptAllPolicies");
    this.events.trigger("changePolicy", allPolicies);
  }

  /**
   * Reject all the cookie policies.
   */
  rejectAllPolicies() {
    const allPolicies = {
      ...Object.fromEntries(
        Object.keys(this.policies).map((k) => [k.toLowerCase(), false]),
      ),
      essential: true,
    };
    this.savePolicies(allPolicies);
    this.events.trigger("rejectAllPolicies");
    this.events.trigger("changePolicy", allPolicies);
  }

  /**
   * Commit policy preferences to the browser.
   * @param {object} policies - The policies to commit.
   */
  savePolicies(policies) {
    this.set(this.policiesKey, JSON.stringify(policies), {
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  /**
   * Get the acceptance status of a policy.
   * @param {String} policy - The name of the policy.
   * @returns {Boolean}
   */
  isPolicyAccepted(policy) {
    return Object.hasOwn(this.policies, policy)
      ? this.policies[policy] === true
      : null;
  }

  /**
   * Add an event listener.
   * @param {String} event - The event to add a listener for.
   * @param {Function} callback - The callback function to call when the event is triggered.
   */
  on(event, callback) {
    this.events.on(event, callback);
  }

  /**
   * Add a one-time event listener.
   * @param {String} event - The event to add a listener for.
   * @param {Function} callback - The callback function to call when the event is triggered.
   */
  once(event, callback) {
    this.events.once(event, callback);
  }
}
