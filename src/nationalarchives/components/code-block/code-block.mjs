export class CodeBlock {
  constructor($module) {
    this.$module = $module;
    this.$code = this.$module.querySelector("pre code");
    this.$copyButton = this.$module.querySelector(".tna-code-block__copy");

    if (
      !this.$module ||
      !this.$code ||
      !this.$copyButton ||
      !navigator.clipboard
    ) {
      return;
    }

    this.$copyButton.removeAttribute("hidden");
    this.$module.classList.add("tna-code-block__copyable");

    this.$copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(this.$code.innerText);
        this.$copyButton.innerText = "Code copied";
      } catch {
        // Continue regardless of error
      }
    });

    this.$copyButton.addEventListener("blur", () => {
      this.$copyButton.innerText = "Copy code";
    });
  }
}
