/**
 * Class to handle cookies.
 * @class Cookies
 * @constructor
 * @public
 */
export default class Cookies {
  /** @protected */
  events = {};
  cookiesPolicyKey = "cookies_policy";

  /**
   * Create a cookie handler.
   * @param {string[]} [extraPolicies=[]] - The extra cookie policies to manage.
   * @param {string} [cookiesPolicyKey=cookies_policy] - The name of the cookie.
   */
  constructor(extraPolicies = [], cookiesPolicyKey = "cookies_policy") {
    this.savePolicies({
      ...Object.fromEntries(extraPolicies.map((k) => [k.toLowerCase(), false])),
      usage: false,
      settings: false,
      ...this.policies,
      essential: true,
    });
    if (
      Cookies._instance &&
      Cookies._instance.cookiesPolicyKey === cookiesPolicyKey
    ) {
      return Cookies._instance;
    }
    Cookies._instance = this;
    this.cookiesPolicyKey = cookiesPolicyKey;
    this.events = {};
  }

  get all() {
    const deserialised = {};
    document.cookie.split(";").forEach((cookie) => {
      const parts = cookie.trim().split("=");
      deserialised[parts[0]] = parts[1];
    });
    return deserialised;
  }

  get policies() {
    return JSON.parse(this.get(this.cookiesPolicyKey) || "{}");
  }

  /**
   * Check to see whether a cookie exists or not.
   * @param {string} key - The cookie name.
   * @returns {boolean}
   */
  exists(key) {
    return Object.prototype.hasOwnProperty.call(this.all, key);
  }

  /**
   * Check to see whether a cookie has a particular value.
   * @param {string} key - The cookie name.
   * @param {string|number|boolean} value - The value to check against.
   * @returns
   */
  hasValue(key, value) {
    return this.get(key) == value;
  }

  /**
   * Get a cookie.
   * @param {string} key - The cookie name.
   * @returns {string|number|boolean}
   */
  get(key) {
    return this.exists(key) ? decodeURIComponent(this.all[key]) : null;
  }

  /**
   * Set a cookie.
   * @param {string} key - The cookie name.
   * @param {string|number|boolean} value - The cookie value.
   * @param {Object} options
   * @param {number} [options.maxAge=31536000] - The maximum age of the cookie in seconds.
   * @param {string} [options.path=/] - The path to register the cookie for.
   * @param {string} [options.sameSite=Lax] - The sameSite attribute.
   */
  set(key, value, options = {}) {
    const {
      maxAge = 60 * 60 * 24 * 365,
      path = "/",
      sameSite = "Lax",
    } = options;
    document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(
      value,
    )}; SameSite=${sameSite}; path=${path}; max-age=${maxAge}; Secure`;
    this.trigger("setCookie", { key, value, maxAge, path, sameSite });
  }

  /**
   * Delete a cookie.
   * @param {string} key - The cookie name.
   * @param {string} [path=/] - The path to the cookie is registered on.
   */
  delete(key, path = "/") {
    this.set(key, "", -1, path);
    this.trigger("deleteCookie", { key, path });
  }

  /**
   * Accept a policy.
   * @param {string} policy - The name of the policy.
   */
  acceptPolicy(policy) {
    this.setPolicy(policy, true);
    this.trigger("acceptPolicy", policy);
    this.trigger("changePolicy", { [policy]: true });
  }

  /**
   * Reject a policy.
   * @param {string} policy - The name of the policy.
   */
  rejectPolicy(policy) {
    this.setPolicy(policy, false);
    this.trigger("rejectPolicy", policy);
    this.trigger("changePolicy", { [policy]: false });
  }

  /**
   * Set a policy.
   * @param {string} policy - The name of the policy.
   * @param {boolean} accepted - Whether the policy is accepted or not.
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
    this.trigger("changePolicy", { [policy]: accepted });
  }

  /**
   * Accept all the cookie policies.
   */
  acceptAllPolicies() {
    const allPolicies = Object.fromEntries(
      Object.keys(this.policies).map((k) => [k.toLowerCase(), true]),
    );
    this.savePolicies(allPolicies);
    this.trigger("acceptAllPolicies");
    this.trigger("changePolicy", allPolicies);
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
    this.trigger("rejectAllPolicies");
    this.trigger("changePolicy", allPolicies);
  }

  /**
   * Commit policy preferences to the browser.
   * @param {object} policies - The policies to commit.
   */
  savePolicies(policies) {
    this.set(this.cookiesPolicyKey, JSON.stringify(policies));
  }

  /**
   * Get the acceptance status of a policy.
   * @param {string} policy - The name of the policy.
   * @returns {boolean}
   */
  isPolicyAccepted(policy) {
    return Object.prototype.hasOwnProperty.call(this.policies, policy)
      ? this.policies[policy] === true
      : null;
  }

  /**
   * Accept a policy.
   * @param {string} event - The event to add a listener for.
   * @param {function} callback - The callback function to call when the event is triggered.
   */
  on(event, callback) {
    if (!Object.prototype.hasOwnProperty.call(this.events, event)) {
      this.events[event] = [];
    }
    this.events[event] = [...this.events[event], callback];
  }

  /** @protected */
  trigger(event, data = {}) {
    if (Object.prototype.hasOwnProperty.call(this.events, event)) {
      this.events[event].forEach((eventToTrigger) =>
        eventToTrigger.call(this, data),
      );
    }
  }
}
