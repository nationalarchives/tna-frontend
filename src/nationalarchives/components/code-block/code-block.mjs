export class CodeBlock {
  constructor($module) {
    this.$module = $module;
    this.$code = this.$module?.querySelector("pre code");
    this.$copyButton = this.$module?.querySelector(".tna-code-block__copy");

    if (
      !this.$module ||
      !this.$code ||
      !this.$copyButton ||
      !navigator.clipboard
    ) {
      return;
    }

    this.$module.classList.add("tna-code-block__copyable");

    this.$copyButton.removeAttribute("hidden");
    this.copyButtonStartingText = this.$copyButton.innerText;

    this.$copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(this.$code.innerText);
        this.$copyButton.innerText = "Code copied";
      } catch {
        this.$copyButton.innerText = this.copyButtonStartingText;
      }
    });

    this.$copyButton.addEventListener("blur", () => {
      this.$copyButton.innerText = this.copyButtonStartingText;
    });
  }
}
