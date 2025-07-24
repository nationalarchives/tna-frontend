window.TNAFrontendCookies = window.TNAFrontendCookies || null;
window.TNAFrontendCookieEvents = window.TNAFrontendCookieEvents || null;

export class CookieEventHandler {
  events = {};
  oneTimeEvents = {};
  debug = false;

  constructor(debug = false) {
    this.debug = debug;
    if (window.TNAFrontendCookieEvents) {
      this.log("Using existing TNAFrontendCookieEvents instance");
      return window.TNAFrontendCookieEvents;
    }
    window.TNAFrontendCookieEvents = this;
  }

  log(...args) {
    if (this.debug) {
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
      for (let i = this.oneTimeEvents[event].length - 1; i >= 0; i--) {
        const eventToTrigger = this.oneTimeEvents[event][i];
        eventToTrigger.call(this, data);
        this.oneTimeEvents[event].splice(i, 1);
      }
    }
  }
}

const tnaCookiePolicies = ["usage", "settings", "marketing", "essential"];

/**
 * Class to handle cookies.
 * @class Cookies
 * @constructor
 * @public
 */
export default class Cookies {
  /** @protected */
  defaultDomain = "";
  /** @protected */
  defaultPath = "";
  /** @protected */
  secure = true;
  /** @protected */
  policiesKey = "";
  /** @protected */
  events = null;
  /** @protected */
  defaultAge = null;
  /** @protected */
  policiesCorrectOnInit = false;
  /** @protected */
  debug = document.documentElement.dataset.tnaFrontendDebug === "true";

  /**
   * Create a cookie handler.
   * @param {String} [options.defaultDomain] - The domain to register the cookie with.
   * @param {String} [options.path] - The domain to register the cookie with.
   * @param {Boolean} [options.secure] - Only set cookie in HTTPS environments.
   * @param {String} [options.policiesKey] - The name of the cookie.
   * @param {Number} [options.defaultAge] - The default age of non-session cookies.
   * @param {String} [options.newInstance=false] - Create a fresh instance of the cookie class.
   * @param {Boolean} [options.noInit=false] - Don't initialise a blank cookie policy.
   */
  constructor(options = {}) {
    const {
      defaultDomain,
      defaultPath,
      secure,
      policiesKey,
      defaultAge,
      newInstance = false,
      noInit = false,
    } = options;
    if (!newInstance && window.TNAFrontendCookies) {
      return window.TNAFrontendCookies;
    }
    if (defaultDomain === undefined) {
      this.defaultDomain =
        document.documentElement.dataset.tnaCookiesDomain ||
        window.location.hostname;
    } else {
      this.defaultDomain = defaultDomain;
    }
    if (defaultPath === undefined) {
      this.defaultPath = document.documentElement.dataset.tnaCookiesPath || "/";
    } else {
      this.defaultPath = defaultPath;
    }
    if (secure === undefined) {
      this.secure =
        document.documentElement.dataset.tnaCookiesInsecure !== "true";
    } else {
      this.secure = secure;
    }
    if (policiesKey === undefined) {
      this.policiesKey =
        document.documentElement.dataset.tnaCookiesPoliciesKey ||
        "cookies_policy";
    } else {
      this.policiesKey = policiesKey;
    }
    if (defaultAge === undefined) {
      this.defaultAge =
        parseInt(document.documentElement.dataset.tnaCookiesDefaultAge) ||
        31536000; // 365 days;
    } else {
      this.defaultAge = defaultAge;
    }
    this.events = new CookieEventHandler(this.debug);
    this.policiesCorrectOnInit =
      Object.keys(this.policies).length === tnaCookiePolicies.length &&
      tnaCookiePolicies.every(
        (policy) =>
          Object.keys(this.policies).includes(policy) &&
          typeof this.policies[policy] === "boolean",
      );
    if (!this.policiesCorrectOnInit && !noInit) {
      this.init();
    }
    this.log({
      defaultDomain: this.defaultDomain,
      defaultPath: this.defaultPath,
      secure: this.secure,
      policiesKey: this.policiesKey,
      defaultAge: this.defaultAge,
      policiesCorrectOnInit: this.policiesCorrectOnInit,
    });
    if (!newInstance && !window.TNAFrontendCookies) {
      window.TNAFrontendCookies = this;
    }
  }

  /** @protected */
  init() {
    const existingPolicies = this.policies;
    this.log("Existing policies on init:", existingPolicies);
    const filteredExistingPolicies = Object.fromEntries(
      Object.keys(existingPolicies)
        .filter((policy) => tnaCookiePolicies.includes(policy))
        .map((policy) => [policy, existingPolicies[policy]]),
    );
    if (Object.keys(filteredExistingPolicies).length > 0) {
      this.log("Filtered existing policies:", filteredExistingPolicies);
    }
    this.savePolicies({
      usage: false,
      settings: false,
      marketing: false,
      ...filteredExistingPolicies,
      essential: true,
    });
  }

  log(...args) {
    if (this.debug) {
      console.log("[TNA Frontend Cookies]", ...args, this.all);
    }
  }

  destroyInstance() {
    this.log("Destroying TNAFrontendCookies instance");
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
   * @param {String} [options.domain=this.defaultDomain] - The domain to register the cookie with.
   * @param {String} [options.path=this.defaultPath] - The path to register the cookie with.
   * @param {String} [options.secure=this.secure] - Only set cookie in HTTPS environments.
   * @param {String} [options.session=false] - Set a session cookie.
   */
  set(key, value, options = {}) {
    const {
      maxAge = this.defaultAge,
      sameSite = "Lax",
      domain = this.defaultDomain,
      path = this.defaultPath,
      secure = this.secure,
      session = false,
    } = options;
    if (!key) {
      return;
    }
    const cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; domain=${domain}; samesite=${sameSite}; path=${path}${!session ? `; max-age=${maxAge}` : ""}${
      secure ? "; secure" : ""
    }`;
    document.cookie = cookie;
    this.log("Set cookie:", {
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
  delete(key, path = "/", domain = this.defaultDomain) {
    const options = { maxAge: -1, path, domain: domain || undefined };
    this.set(key, "", options);
    this.log("Deleted cookie:", { key, path, domain, ...options });
    this.events.trigger("deleteCookie", { key, ...options });
  }

  /**
   * Delete all cookies.
   */
  deleteAll(path = "/", domain = this.defaultDomain) {
    Object.keys(this.all).forEach((cookie) => {
      this.delete(cookie, path, domain);
    });
    this.log("Deleted all cookies", { path, domain });
    this.events.trigger("deleteAllCookies", { path, domain });
  }

  /**
   * Accept a policy.
   * @param {String} policy - The name of the policy.
   */
  acceptPolicy(policy) {
    this.log("Accepting policy:", policy);
    this.setPolicy(policy, true);
    this.events.trigger("acceptPolicy", policy);
    this.events.trigger("changePolicy", { [policy]: true });
  }

  /**
   * Reject a policy.
   * @param {String} policy - The name of the policy.
   */
  rejectPolicy(policy) {
    this.log("Rejecting policy:", policy);
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
      this.log("Cannot change essential policy, it is always accepted.");
      return;
    }
    this.log(`Setting policy ${policy} to ${accepted}`);
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
    this.log("Accepting all policies");
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
    this.log("Rejecting all policies");
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
    this.log("Saving policies:", policies);
    this.set(this.policiesKey, JSON.stringify(policies));
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
    this.log(`Adding event listener for: ${event}`);
    this.events.on(event, callback);
  }

  /**
   * Add a one-time event listener.
   * @param {String} event - The event to add a listener for.
   * @param {Function} callback - The callback function to call when the event is triggered.
   */
  once(event, callback) {
    this.log(`Adding one-time event listener for: ${event}`);
    this.events.once(event, callback);
  }
}
