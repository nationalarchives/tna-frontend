export class FileInputDroppable {
  constructor($module) {
    this.$module = $module;
    this.$input = $module && $module.querySelector(".tna-file-input");

    if (!this.$module || !this.$input) {
      return;
    }

    this.acceptMutltipleFiles = this.$input.hasAttribute("multiple");

    this.$droppableArea = document.createElement("div");
    this.$droppableArea.classList.add("tna-file-input__droppable");
    this.$module.insertBefore(this.$droppableArea, this.$input);
    this.$droppableArea.appendChild(this.$input);

    this.$pseudoSelectFileText = document.createElement("span");
    this.$pseudoSelectFileText.classList.add(
      "tna-file-input__droppable-status",
    );
    this.$pseudoSelectFileText.textContent = `No file${this.acceptMutltipleFiles ? "s" : ""} chosen`;
    this.$droppableArea.appendChild(this.$pseudoSelectFileText);

    const $droppableButtons = document.createElement("div");
    $droppableButtons.classList.add(
      "tna-button-group",
      "tna-button-group--small",
      "tna-!--margin-top-xs",
      "tna-file-input__droppable-buttons",
    );
    this.$droppableArea.appendChild($droppableButtons);

    const $pseudoSelectFileButton = document.createElement("span");
    $pseudoSelectFileButton.classList.add("tna-button");
    $pseudoSelectFileButton.textContent = `Choose file${this.acceptMutltipleFiles ? "s" : ""}`;
    $droppableButtons.appendChild($pseudoSelectFileButton);

    const $pseudoDropFileButton = document.createElement("span");
    $pseudoDropFileButton.textContent = `or drop file${this.acceptMutltipleFiles ? "s" : ""}`;
    $droppableButtons.appendChild($pseudoDropFileButton);

    this.$droppableAreaAriaLabel = document.createElement("span");
    this.$droppableAreaAriaLabel.classList.add("tna-visually-hidden");
    this.$droppableAreaAriaLabel.setAttribute("aria-live", "assertive");
    this.$droppableArea.appendChild(this.$droppableAreaAriaLabel);

    this.$input.addEventListener("dragenter", (e) => this.onDragEnter(e));
    this.$input.addEventListener("dragleave", () => this.onDragLeave());
    this.$input.addEventListener("change", () => this.onChange());
    this.$input.addEventListener("drop", () => this.onChange());
  }

  isContainingFiles(dataTransfer) {
    const hasNoTypesInfo = dataTransfer.types.length === 0;
    const isDraggingFiles = dataTransfer.types.some((type) => type === "Files");
    return hasNoTypesInfo || isDraggingFiles;
  }

  onDragEnter(event) {
    if (event.dataTransfer && this.isContainingFiles(event.dataTransfer)) {
      this.$droppableArea.classList.add("tna-file-input__droppable--over");
      this.$droppableAreaAriaLabel.textContent = "Entered drop zone";
    }
  }

  onDragLeave() {
    this.$droppableArea.classList.remove("tna-file-input__droppable--over");
    this.$droppableAreaAriaLabel.textContent = "Left drop zone";
  }

  onChange() {
    const files = this.$input.files;
    if (this.acceptMutltipleFiles) {
      if (files.length === 0) {
        this.$pseudoSelectFileText.textContent = `No files chosen`;
      } else {
        this.$pseudoSelectFileText.textContent = `${files.length} file${files.length > 1 ? "s" : ""} chosen`;
      }
    } else {
      this.$pseudoSelectFileText.textContent =
        files[0]?.name || `No file chosen`;
    }
    this.$droppableArea.classList.remove("tna-file-input__droppable--over");
  }
}
