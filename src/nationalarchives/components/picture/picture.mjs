import uuidv4 from "../../lib/uuid.mjs";

export class Picture {
  constructor($module) {
    this.$module = $module;
    this.$imageWrapper =
      $module && $module.querySelector(".tna-picture__image-wrapper");

    this.$transcriptToggle =
      this.$imageWrapper &&
      this.$imageWrapper.querySelector(".tna-picture__toggle-transcript");

    this.$transcript =
      $module && $module.querySelector(".tna-picture__transcript");
    this.transcriptOpened = false;

    if (
      !this.$module ||
      !this.$imageWrapper ||
      !this.$transcriptToggle ||
      !this.$transcript
    ) {
      return;
    }

    this.openLabel =
      this.$module.dataset.informationLabelOpen || "Open transcript";
    this.closeLabel =
      this.$module.dataset.informationLabelClose || "Close transcript";

    this.init();
  }

  init() {
    const uniqueId = `tna-picture-${uuidv4()}`;

    this.$transcriptToggle.removeAttribute("hidden");
    this.$transcriptToggle.setAttribute("aria-controls", uniqueId);
    this.$transcriptToggle.innerText = this.openLabel;
    this.$transcriptToggle.addEventListener("click", () =>
      this.toggleTranscript(),
    );

    this.$transcript.setAttribute("id", uniqueId);
    this.$transcript.setAttribute("hidden", "");

    this.$transcript.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "Escape":
          this.toggleTranscript();
          this.$transcriptToggle.focus();
          break;
      }
    });
  }

  toggleTranscript() {
    this.transcriptOpened = !this.transcriptOpened;
    if (this.transcriptOpened) {
      this.$transcriptToggle.setAttribute("aria-expanded", true);
      this.$transcriptToggle.innerText = this.closeLabel;
      this.$transcript.removeAttribute("hidden");
    } else {
      this.$transcriptToggle.setAttribute("aria-expanded", false);
      this.$transcriptToggle.innerText = this.openLabel;
      this.$transcript.setAttribute("hidden", "");
    }
  }
}
