export class FileInputDroppable {
  constructor($module) {
    this.$module = $module;
    this.$body = $module && $module.querySelector(".tna-form-item__body");
    this.$input = this.$body && this.$body.querySelector(".tna-file-input");

    if (!this.$module || !this.$body || !this.$input) {
      return;
    }

    this.acceptMutltipleFiles = this.$input.hasAttribute("multiple");

    this.$droppableArea = document.createElement("div");
    this.$droppableArea.classList.add("tna-file-input__droppable");
    this.$body.insertBefore(this.$droppableArea, this.$input);
    this.$droppableArea.appendChild(this.$input);

    this.$pseudoSelectFileText = document.createElement("span");
    this.$pseudoSelectFileText.setAttribute("aria-live", "polite");
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

    this.$input.addEventListener("dragenter", (e) => this.showDropTarget(e));
    this.$input.addEventListener("dragleave", () => this.hideDropTarget());
    this.$input.addEventListener("dragend", () => this.hideDropTarget());
    this.$input.addEventListener("change", () => this.onChange());
    this.$input.addEventListener("drop", () => this.onChange());
  }

  isContainingFiles(dataTransfer) {
    const hasNoTypesInfo = dataTransfer.types.length === 0;
    const isDraggingFiles = dataTransfer.types.some((type) => type === "Files");
    return hasNoTypesInfo || isDraggingFiles;
  }

  showDropTarget(event, updateAriaLabel = true) {
    if (event.dataTransfer && this.isContainingFiles(event.dataTransfer)) {
      this.$droppableArea.classList.add(
        event.dataTransfer.items.length > 1
          ? "tna-file-input__droppable--over-multiple"
          : "tna-file-input__droppable--over",
      );

      if (updateAriaLabel) {
        this.$droppableAreaAriaLabel.textContent = "Entered drop zone";
      }
    }
  }

  hideDropTarget(updateAriaLabel = true) {
    this.$droppableArea.classList.remove(
      "tna-file-input__droppable--over",
      "tna-file-input__droppable--over-multiple",
    );
    if (updateAriaLabel) {
      this.$droppableAreaAriaLabel.textContent = "Left drop zone";
    }
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
    this.hideDropTarget(false);
  }
}
