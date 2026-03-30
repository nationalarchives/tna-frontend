import Prism from "prismjs";

const init = () => {
  document
    .querySelectorAll('.tna-code-block:has(pre > code[class*="language-"])')
    .forEach(($codeBlock) => {
      const $codeBlockContent = $codeBlock.querySelector("pre code");
      Prism.highlightElement($codeBlockContent);

      if (
        $codeBlock.classList.contains("tna-code-block--copy") &&
        navigator.clipboard
      ) {
        const copyButton = document.createElement("button");
        copyButton.innerText = "Copy code";
        copyButton.classList.add(
          "tna-code-block__copy",
          "tna-button",
          "tna-button--plain",
          "tna-button--small",
        );
        copyButton.setAttribute("aria-live", "assertive");
        $codeBlock.appendChild(copyButton);
        copyButton.addEventListener("click", async () => {
          try {
            await navigator.clipboard.writeText($codeBlockContent.innerText);
          } catch (err) {
            console.error("Failed to copy: ", err);
          }
          copyButton.innerText = "Code copied";
        });
        copyButton.addEventListener("blur", () => {
          copyButton.innerText = "Copy code";
        });
      }
    });
};

export { init };
