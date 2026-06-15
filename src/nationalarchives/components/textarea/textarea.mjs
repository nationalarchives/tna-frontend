export class TextAreaItemisedRows {
  constructor($module, options = {}) {
    this.$module = $module;
    this.$formFieldInput =
      this.$module && this.$module.querySelector(".tna-textarea");
    this.$formFieldInputHint =
      this.$module && this.$module.querySelector(".tna-form-item__hint");
    this.$formFieldBody =
      this.$module && this.$module.querySelector(".tna-form-item__body");

    if (
      !this.$module ||
      !this.$formFieldInput ||
      !this.$formFieldBody ||
      this.$formFieldInput.getAttribute("hidden") !== null
    ) {
      return;
    }

    const { enhancedHint } = options;

    this.values = this.$formFieldInput.value
      .split("\n")
      .map((value) => value.trim())
      .filter((value) => value);

    this.id = this.$formFieldInput.id;

    this.$formFieldNewInput = document.createElement("input");
    this.$formFieldNewInput.classList.add("tna-text-input");
    ["id", "aria-describedby"].forEach((attribute) => {
      this.$formFieldNewInput.setAttribute(
        attribute,
        this.$formFieldInput.getAttribute(attribute),
      );
      this.$formFieldInput.removeAttribute(attribute);
    });
    this.$formFieldBody.appendChild(this.$formFieldNewInput);
    this.$formFieldInput.setAttribute("hidden", "");
    this.$formFieldInput.addEventListener("keyup", () => this.updateList());
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
    this.$formFieldNewInputAddButtonInner = document.createElement("span");
    this.$formFieldNewInputAddButtonInner.innerText = "Add";
    this.$formFieldNewInputAddButtonInnerExtra = document.createElement("span");
    this.$formFieldNewInputAddButtonInnerExtra.classList.add(
      "tna-visually-hidden",
    );
    this.$formFieldNewInputAddButtonInnerExtra.innerText = " to list";
    this.$formFieldNewInputAddButtonInner.appendChild(
      this.$formFieldNewInputAddButtonInnerExtra,
    );
    this.$formFieldNewInputAddButton.appendChild(
      this.$formFieldNewInputAddButtonInner,
    );
    this.$formFieldBody.appendChild(this.$formFieldNewInputAddButton);
    this.$formFieldNewInputAddButton.addEventListener("click", () => {
      this.appendValue(this.$formFieldNewInput.value);
    });

    this.$formFieldLiveAria = document.createElement("div");
    this.$formFieldLiveAria.setAttribute("aria-live", "assertive");
    this.$formFieldLiveAria.classList.add("tna-visually-hidden");
    this.$module.appendChild(this.$formFieldLiveAria);

    this.$formFieldCounter = document.createElement("p");
    this.$formFieldCounter.id = `${this.id}-list-helper`;
    this.$formFieldCounter.classList.add("tna-!--margin-top-xs");
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
      "tna-!--margin-top-xs",
    );
    this.$valuesList.addEventListener("blur", () => {
      this.$valuesList.removeAttribute("tabindex");
      this.updateAriaText("");
    });
    this.$module.appendChild(this.$valuesList);

    if (!this.$formFieldInputHint) {
      this.$formFieldInputHint = document.createElement("p");
      this.$formFieldInputHint.classList.add("tna-form-item__hint");
      this.$formFieldBody.parentNode.insertBefore(
        this.$formFieldInputHint,
        this.$formFieldBody,
      );
    }
    this.$formFieldInputHint.innerText =
      enhancedHint || "Enter an item and press enter";

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
        this.$formFieldInput.value = this.values.join("\n");
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
      this.$formFieldInput.value = this.values.join("\n");
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
    const innerTextValue = `${this.values.length} ${innerTextItemValue} added`;
    this.$formFieldCounter.innerText = innerTextValue;
  }
}
