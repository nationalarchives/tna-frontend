/* eslint-disable max-lines */
/* eslint-disable no-console */

import { CookieEventHandler } from "./cookie-events.mjs";

window.TNAFrontendCookies ||= null;

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
      /* eslint-disable-next-line no-constructor-return */
      return window.TNAFrontendCookies;
    }
    if (defaultDomain) {
      this.defaultDomain = defaultDomain;
    } else {
      this.defaultDomain =
        document.documentElement.dataset.tnaCookiesDomain ||
        window.location.hostname;
    }
    if (defaultPath) {
      this.defaultPath = defaultPath;
    } else {
      this.defaultPath = document.documentElement.dataset.tnaCookiesPath || "/";
    }
    if (secure) {
      this.secure = secure;
    } else {
      this.secure =
        document.documentElement.dataset.tnaCookiesInsecure !== "true";
    }
    if (policiesKey) {
      this.policiesKey = policiesKey;
    } else {
      this.policiesKey =
        document.documentElement.dataset.tnaCookiesPoliciesKey ||
        "cookies_policy";
    }
    if (defaultAge) {
      this.defaultAge = defaultAge;
    } else {
      /* eslint-disable-next-line no-magic-numbers */
      const secondsInAYear = 365 * 24 * 60 * 60;
      this.defaultAge =
        parseInt(document.documentElement.dataset.tnaCookiesDefaultAge, 10) ||
        secondsInAYear;
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
    if (Object.keys(filteredExistingPolicies).length) {
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
  /* eslint-disable-next-line class-methods-use-this */
  get all() {
    const deserialised = {};
    document.cookie
      .split("; ")
      .filter((cookie) => cookie.trim() !== "")
      .forEach((cookie) => {
        const parts = cookie.trim().split("=");
        const [key, value] = parts;
        if (key) {
          deserialised[key] = decodeURIComponent(value || "");
        }
      });
    return deserialised;
  }

  /** @protected */
  get policies() {
    try {
      return JSON.parse(this.get(this.policiesKey) || "{}");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
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
    return this.get(key) === value;
  }

  /**
   * Get a cookie.
   * @param {String} key - The cookie name.
   * @returns {String|Number|Boolean|null}
   */
  get(key) {
    if (this.exists(key)) {
      return decodeURIComponent(this.all[key]);
    }
    return null;
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
    let secureString = "";
    if (secure) {
      secureString = "; secure";
    }
    let sessionString = "";
    if (!session) {
      sessionString = `; max-age=${maxAge}`;
    }
    const cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; domain=${domain}; samesite=${sameSite}; path=${path}${sessionString}${secureString}`;
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
    const options = { maxAge: -1, path, domain: domain || this.defaultDomain };
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
      Object.keys(this.policies).map((key) => [key.toLowerCase(), true]),
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
        Object.keys(this.policies).map((key) => [key.toLowerCase(), false]),
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
    if (Object.hasOwn(this.policies, policy)) {
      return this.policies[policy] === true;
    }
    return null;
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
