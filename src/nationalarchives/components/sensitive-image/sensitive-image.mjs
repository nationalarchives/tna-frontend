function SensitiveImage($module) {
  this.$module = $module;
  this.$imageDetails =
    $module && $module.querySelector(".tna-sensitive-image__details");
  this.$image = $module && $module.querySelector(".tna-sensitive-image__image");
  this.imageIsVisible = false;
}

SensitiveImage.prototype.init = function () {
  console.log(this);
  if (!this.$module || !this.$imageDetails || !this.$image) {
    return;
  }
  this.$imageDetails.addEventListener(
    "toggle",
    this.handleImageDetailsToggle.bind(this)
  );
};

SensitiveImage.prototype.handleImageDetailsToggle = function (e) {
  if (this.$imageDetails.hasAttribute("open")) {
    this.$image.focus({ preventScroll: true, focusVisible: true });
  }
};

export default SensitiveImage;
