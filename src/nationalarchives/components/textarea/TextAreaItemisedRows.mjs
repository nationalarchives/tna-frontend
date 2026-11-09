export default class TextAreaItemisedRows {
  constructor($module, options = {}) {
    this.$module = $module;
    this.$formItemInput = this.$module?.querySelector(".tna-textarea");
    this.$formItemHeader = this.$module?.querySelector(
      ".tna-form-item__header",
    );
    this.$formItemInputHint = this.$module?.querySelector(
      ".tna-form-item__hint",
    );
    this.$formItemBody = this.$module?.querySelector(".tna-form-item__body");

    if (
      !this.$module ||
      !this.$formItemHeader ||
      !this.$formItemInput ||
      !this.$formItemBody ||
      this.$formItemInput.getAttribute("hidden") !== null
    ) {
      return;
    }

    if (!(this.$formItemInput instanceof HTMLTextAreaElement)) {
      throw new Error("Expected a textarea element");
    }

    const { enhancedHint } = options;
    this.enhancedHint = "Enter an item and press enter";
    if (enhancedHint) {
      this.enhancedHint = enhancedHint;
    }

    this.values = this.$formItemInput.value
      .split("\n")
      .map((value) => value.trim())
      .filter((value) => value);

    this.id = this.$formItemInput.id;

    this.init();
  }

  init() {
    this.$formFieldNewInput = document.createElement("input");
    this.$formFieldNewInput.classList.add("tna-text-input");
    ["id", "aria-describedby"].forEach((attribute) => {
      this.$formFieldNewInput.setAttribute(
        attribute,
        this.$formItemInput.getAttribute(attribute),
      );
      this.$formItemInput.removeAttribute(attribute);
    });
    this.$formItemBody.appendChild(this.$formFieldNewInput);
    this.$formItemInput.setAttribute("hidden", "");
    this.$formItemInput.addEventListener("keyup", () => this.updateList());
    this.$formFieldNewInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.appendValue(event.target.value);
      }
    });

    this.$formFieldNewInputAddButton = document.createElement("button");
    this.$formFieldNewInputAddButton.setAttribute("type", "button");
    this.$formFieldNewInputAddButton.classList.add(
      "tna-button",
      "tna-button--small",
    );
    this.$formFieldNewInputAddButton.innerText = "Add";
    this.$formFieldNewInputAddButton.setAttribute(
      "aria-label",
      `Add to list for '${this.$formItemHeader.innerText}'`,
    );
    this.$formItemBody.appendChild(this.$formFieldNewInputAddButton);
    this.$formFieldNewInputAddButton.addEventListener("click", () => {
      this.appendValue(this.$formFieldNewInput.value);
    });

    this.$formFieldLiveAria = document.createElement("div");
    this.$formFieldLiveAria.setAttribute("aria-live", "assertive");
    this.$formFieldLiveAria.classList.add("tna-visually-hidden");
    this.$module.appendChild(this.$formFieldLiveAria);

    this.$formFieldCounter = document.createElement("p");
    this.$formFieldCounter.id = `${this.id}-list-helper`;
    this.$formFieldCounter.classList.add("tna-!--margin-block-start-xs");
    this.$module.appendChild(this.$formFieldCounter);

    this.$formFieldNewInput.setAttribute(
      "aria-describedby",
      `${this.$formFieldNewInput.getAttribute("aria-describedby")} ${
        this.$formFieldCounter.id
      }`,
    );

    this.$valuesList = document.createElement("ul");
    this.$valuesList.classList.add(
      "tna-compound-filters",
      "tna-!--margin-block-start-xs",
    );
    this.$valuesList.addEventListener("blur", () => {
      this.$valuesList.removeAttribute("tabindex");
      this.updateAriaText("");
    });
    this.$module.appendChild(this.$valuesList);

    if (!this.$formItemInputHint) {
      this.$formItemInputHint = document.createElement("p");
      this.$formItemInputHint.classList.add("tna-form-item__hint");
      this.$formItemBody.parentNode.insertBefore(
        this.$formItemInputHint,
        this.$formItemBody,
      );
    }
    this.$formItemInputHint.innerText = this.enhancedHint;

    this.updateList();
  }

  updateAriaText(content) {
    this.$formFieldLiveAria.innerText = content;
  }

  /* eslint-disable-next-line class-methods-use-this */
  normaliseValue(value) {
    return value.replace(/\s{2,}/u, " ").trim();
  }

  isValueInList(value) {
    return this.values
      .map((eachValue) => this.normaliseValue(eachValue).toLowerCase())
      .includes(value.toLowerCase().trim());
  }

  appendValue(value) {
    const newValue = this.normaliseValue(value);
    if (newValue) {
      if (this.isValueInList(newValue)) {
        this.updateAriaText(`'${newValue}' already added`);
      } else {
        this.values.push(newValue);
        this.$formItemInput.value = this.values.join("\n");
        this.updateList();
        this.updateAriaText(`'${newValue}' added`);
      }
    } else {
      this.updateAriaText("Enter an item to add");
    }
    this.$formFieldNewInput.value = "";
    this.$formFieldNewInput.focus();
  }

  removeValue(value) {
    const removeValue = this.normaliseValue(value);
    if (removeValue && this.isValueInList(removeValue)) {
      this.values = this.values.filter(
        (existingValue) => existingValue !== removeValue,
      );
      this.$formItemInput.value = this.values.join("\n");
      this.updateList();
      this.updateAriaText(`'${removeValue}' removed`);
    }
    if (this.values.length) {
      this.$valuesList.setAttribute("tabindex", "0");
      this.$valuesList.focus();
    } else {
      this.$formFieldNewInput.focus();
    }
  }

  updateList() {
    this.$valuesList.innerHTML = "";
    this.values
      .map((value) => {
        const $item = document.createElement("li");
        $item.classList.add("tna-compound-filters__item");
        const $itemLabel = document.createElement("span");
        $itemLabel.innerText = value;
        $item.appendChild($itemLabel);

        const $removeItemButton = document.createElement("button");
        $removeItemButton.innerText = `Remove '${value}'`;
        $removeItemButton.setAttribute("type", "button");
        $removeItemButton.classList.add("tna-compound-filters__link");
        $removeItemButton.addEventListener("click", () => {
          this.removeValue(value);
        });
        $item.appendChild($removeItemButton);
        return $item;
      })
      .forEach(($item) => this.$valuesList.appendChild($item));

    let innerTextItemValue = "item";
    /* eslint-disable-next-line no-magic-numbers */
    if (this.values.length !== 1) {
      innerTextItemValue += "s";
    }
    const innerTextValue = `${new Intl.NumberFormat().format(this.values.length)} ${innerTextItemValue} added`;
    this.$formFieldCounter.innerText = innerTextValue;
  }
}
