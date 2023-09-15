export default class Cookies {
  #policies = {};

  constructor(
    policies = ["usage", "settings"],
    cookiesPolicyKey = "cookies_policy",
    crossDomain = false,
  ) {
    this.cookiesPolicyKey = cookiesPolicyKey;
    this.crossDomain = crossDomain;
    policies.forEach((policy) => {
      this.#policies[policy.toLowerCase()] = false;
    });
    this.#policies.essential = true;
    this.#getPolicies();
  }

  #getPolicies() {
    if (this.exists(this.cookiesPolicyKey)) {
      this.#policies = {
        ...this.#policies,
        ...this.allPolicies,
      };
    }
  }

  get data() {
    return this.#deserialise(document.cookie);
  }

  #deserialise(cookieString) {
    const deserialised = {};
    cookieString.split(";").forEach((cookie) => {
      const parts = cookie.trim().split("=");
      deserialised[parts[0]] = parts[1];
    });
    return deserialised;
  }

  get all() {
    return this.data;
  }

  exists(key) {
    return Object.prototype.hasOwnProperty.call(this.data, key);
  }

  hasValue(key, value) {
    return this.get(key) === value;
  }

  get(key) {
    return decodeURIComponent(this.data[key]);
  }

  set(key, value, maxAge = 60 * 60 * 24 * 365, path = "/") {
    document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(
      value,
    )}; SameSite=${
      this.crossDomain ? "None" : "Lax"
    }; path=${path}; max-age=${maxAge}; Secure`;
    this.#getPolicies();
  }

  delete(key, path = "/") {
    this.set(key, "", 0, path);
  }

  get allPolicies() {
    return JSON.parse(this.get(this.cookiesPolicyKey));
  }

  policy(policy) {
    return this.#policies[policy];
  }

  acceptPolicy(policy) {
    this.setPolicy(policy, true);
  }

  rejectPolicy(policy) {
    if (policy === "essential") {
      return;
    }
    this.setPolicy(policy, false);
  }

  setPolicy(policy, accepted) {
    this.#policies = {
      ...this.#policies,
      [policy]: accepted,
      essential: true,
    };
    this.set(this.cookiesPolicyKey, JSON.stringify(this.#policies));
  }

  acceptAllPolicies() {
    Object.keys(this.#policies)
      .filter((policy) => policy !== "essential")
      .filter((policy) => this.#policies[policy] === false)
      .forEach((policy) => this.acceptPolicy(policy));
  }

  rejectAllPolicies() {
    Object.keys(this.#policies)
      .filter((policy) => policy !== "essential")
      .filter((policy) => this.#policies[policy] === true)
      .forEach((policy) => this.rejectPolicy(policy));
  }

  isPolicyAccepted(policy) {
    this.#getPolicies();
    return Object.prototype.hasOwnProperty.call(this.#policies, policy)
      ? this.#policies[policy] === true
      : null;
  }
}
