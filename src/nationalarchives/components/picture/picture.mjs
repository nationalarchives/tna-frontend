import uuidv4 from "../../lib/uuid.mjs";

export class Picture {
  constructor($module) {
    this.$module = $module;
    this.$imageWrapper =
      $module && $module.querySelector(".tna-picture__image-wrapper");
    this.$transcript =
      $module && $module.querySelector(".tna-picture__transcript");
    this.transcriptOpened = false;
  }

  init() {
    if (!this.$module || !this.$imageWrapper || !this.$transcript) {
      return;
    }

    const uniqueId = `tna-picture-${uuidv4()}`;

    this.$transcriptToggle = document.createElement("button");
    this.$transcriptToggle.classList.add(
      "tna-picture__toggle-transcript",
      "tna-button",
      "tna-button--small",
      "tna-button--accent",
      "tna-button--solid-hover",
    );
    this.$transcriptToggle.setAttribute("aria-controls", uniqueId);
    this.$transcriptToggle.setAttribute("aria-expanded", false);
    this.$transcriptToggle.innerText = "Open transcript";
    this.$transcriptToggle.addEventListener("click", () =>
      this.handleToggleTranscript(),
    );
    this.$imageWrapper.appendChild(this.$transcriptToggle);

    this.$transcript.setAttribute("id", uniqueId);
    this.$transcript.setAttribute("hidden", true);
  }

  handleToggleTranscript() {
    const transcriptToggleOpenedClass =
      "tna-picture__toggle-transcript--opened";
    this.transcriptOpened = !this.transcriptOpened;
    if (this.transcriptOpened) {
      this.$transcriptToggle.classList.add(transcriptToggleOpenedClass);
      this.$transcriptToggle.setAttribute("aria-expanded", true);
      this.$transcriptToggle.innerText = "Close transcript";
      this.$transcript.removeAttribute("hidden");
    } else {
      this.$transcriptToggle.classList.remove(transcriptToggleOpenedClass);
      this.$transcriptToggle.setAttribute("aria-expanded", false);
      this.$transcriptToggle.innerText = "Open transcript";
      this.$transcript.setAttribute("hidden", true);
    }
  }
}
