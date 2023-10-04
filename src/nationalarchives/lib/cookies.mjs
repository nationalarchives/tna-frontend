/**
 * Class to handle cookies.
 * @class Cookies
 * @constructor
 * @public
 */
export default class Cookies {
  /** @protected */
  #policies = {};

  /**
   * Create a cookie handler.
   * @param {string[]} [policies=usage,settings] - The cookie policies to manage.
   * @param {string} [cookiesPolicyKey=cookies_policy] - The name of the cookie.
   */
  constructor(
    policies = ["usage", "settings"],
    cookiesPolicyKey = "cookies_policy",
  ) {
    this.cookiesPolicyKey = cookiesPolicyKey;
    policies.forEach((policy) => {
      this.#policies[policy.toLowerCase()] = false;
    });
    this.#policies.essential = true;
  }

  get policies() {
    return this.exists(this.cookiesPolicyKey)
      ? (this.#policies = {
          ...this.#policies,
          ...this.allPolicies,
        })
      : this.#policies;
  }

  set policies(newPolicyValues) {
    this.#policies = newPolicyValues;
  }

  /** @protected */
  #deserialise(cookieString) {
    const deserialised = {};
    cookieString.split(";").forEach((cookie) => {
      const parts = cookie.trim().split("=");
      deserialised[parts[0]] = parts[1];
    });
    return deserialised;
  }

  get all() {
    return this.#deserialise(document.cookie);
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
  }

  /**
   * Delete a cookie.
   * @param {string} key - The cookie name.
   * @param {string} [path=/] - The path to the cookie is registered on.
   */
  delete(key, path = "/") {
    this.set(key, "", 0, path);
  }

  get allPolicies() {
    return JSON.parse(this.get(this.cookiesPolicyKey) || "{}");
  }

  /**
   * Accept a policy.
   * @param {string} policy - The name of the policy.
   */
  acceptPolicy(policy) {
    this.#setPolicy(policy, true);
    this.savePolicies();
  }

  /**
   * Reject a policy.
   * @param {string} policy - The name of the policy.
   */
  rejectPolicy(policy) {
    if (policy === "essential") {
      return;
    }
    this.#setPolicy(policy, false);
    this.savePolicies();
  }

  /** @protected */
  #setPolicy(policy, accepted) {
    this.policies = {
      ...this.policies,
      [policy]: accepted,
      essential: true,
    };
  }

  /**
   * Commit the policy preferences to the browser.
   */
  savePolicies() {
    this.set(this.cookiesPolicyKey, JSON.stringify(this.policies));
  }

  /**
   * Accept all the cookie policies.
   */
  acceptAllPolicies() {
    Object.keys(this.policies).forEach((policy) =>
      this.#setPolicy(policy, true),
    );
    this.savePolicies();
  }

  /**
   * Reject all the cookie policies.
   */
  rejectAllPolicies() {
    Object.keys(this.policies).forEach((policy) =>
      this.#setPolicy(policy, false),
    );
    this.savePolicies();
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
}
