import uuidv4 from "../../lib/uuid.mjs";

export class Gallery {
  constructor($module) {
    this.$module = $module;
    this.$items = $module.querySelector(".tna-gallery__items");
    this.opened = false;
  }

  init() {
    if (!this.$module || !this.$items) {
      return;
    }

    const supportTouchHorizontal = false;

    this.items = this.$module.querySelectorAll(".tna-gallery__item").length;

    if (this.items > 1) {
      const uniqueId = `tna-gallery-${uuidv4()}`;

      this.$module.classList.add("tna-gallery--collapsed");
      this.$items.setAttribute("tabindex", "-1");

      this.$galleryToggle = document.createElement("button");
      this.$galleryToggle.classList.add(
        "tna-gallery__toggle",
        "tna-button",
        "tna-button--accent",
      );
      this.$galleryToggle.setAttribute("aria-controls", uniqueId);
      this.$galleryToggle.setAttribute("aria-expanded", false);
      this.$galleryToggle.innerText = `View ${this.items} images`;

      const onFirstTouch = () => {
        this.$module.removeEventListener("touchstart", onFirstTouch);
        this.$module.classList.add("tna-gallery--touchable");
      };

      if (supportTouchHorizontal) {
        this.$module.addEventListener("touchstart", onFirstTouch);
      }

      this.$galleryToggle.addEventListener("click", () => {
        if (supportTouchHorizontal) {
          this.$module.removeEventListener("touchstart", onFirstTouch);
        }
        this.handleToggleGallery();
      });

      this.$galleryToggleWrapper = document.createElement("div");
      this.$galleryToggleWrapper.classList.add(
        "tna-column",
        "tna-column--full",
        "tna-gallery__toggle-wrapper",
      );

      this.$galleryToggleWrapper.appendChild(this.$galleryToggle);
      this.$items.parentElement.appendChild(this.$galleryToggleWrapper);

      this.$items.setAttribute("id", uniqueId);
    }
  }

  handleToggleGallery() {
    this.opened = !this.opened;
    if (this.opened) {
      this.$module.classList.remove("tna-gallery--collapsed");
      this.$galleryToggle.setAttribute("aria-expanded", true);
      this.$galleryToggle.innerText = "Close images";
      this.$items.setAttribute("tabindex", "0");
      this.$items.focus();
      this.$items.setAttribute("tabindex", "-1");
    } else {
      this.$module.classList.add("tna-gallery--collapsed");
      this.$galleryToggle.setAttribute("aria-expanded", false);
      this.$galleryToggle.innerText = `View ${this.items} images`;
    }
  }
}
