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
    this.$droppableArea.classList.add(
      "tna-file-input__droppable",
      "tna-file-input__droppable--empty",
    );
    this.$body.insertBefore(this.$droppableArea, this.$input);
    this.$droppableArea.appendChild(this.$input);

    this.$pseudoSelectFileText = document.createElement("span");
    this.$pseudoSelectFileText.setAttribute("aria-live", "polite");
    this.$pseudoSelectFileText.classList.add(
      "tna-file-input__droppable-status",
    );

    let fileText = "file";
    if (this.acceptMutltipleFiles) {
      fileText += "s";
    }

    this.$pseudoSelectFileText.textContent = `No ${fileText} selected`;
    this.$droppableArea.appendChild(this.$pseudoSelectFileText);

    const $droppableButtons = document.createElement("div");
    $droppableButtons.classList.add(
      "tna-button-group",
      "tna-button-group--small",
      "tna-!--margin-top-s",
      "tna-file-input__droppable-buttons",
    );
    this.$droppableArea.appendChild($droppableButtons);

    const $pseudoSelectFileButton = document.createElement("span");
    $pseudoSelectFileButton.classList.add("tna-button");
    $pseudoSelectFileButton.textContent = `Choose ${fileText}`;
    $droppableButtons.appendChild($pseudoSelectFileButton);

    const $pseudoDropFileButton = document.createElement("span");
    $pseudoDropFileButton.textContent = `or drop ${fileText}`;
    $droppableButtons.appendChild($pseudoDropFileButton);

    this.$droppableAreaAriaLabel = document.createElement("span");
    this.$droppableAreaAriaLabel.classList.add("tna-visually-hidden");
    this.$droppableAreaAriaLabel.setAttribute("aria-live", "assertive");
    this.$droppableArea.appendChild(this.$droppableAreaAriaLabel);

    this.$input.addEventListener("dragenter", (event) =>
      this.showDropTarget(event),
    );
    this.$input.addEventListener("dragleave", () => this.hideDropTarget());
    this.$input.addEventListener("dragend", () => this.hideDropTarget());
    this.$input.addEventListener("change", () => this.onChange());
    this.$input.addEventListener("drop", () => this.onChange());
  }

  /* eslint-disable-next-line class-methods-use-this */
  isContainingFiles(dataTransfer) {
    const hasNoTypesInfo = !dataTransfer.types.length;
    const isDraggingFiles = dataTransfer.types.some((type) => type === "Files");
    return hasNoTypesInfo || isDraggingFiles;
  }

  showDropTarget(event, updateAriaLabel = true) {
    if (event.dataTransfer && this.isContainingFiles(event.dataTransfer)) {
      let classToAdd = "tna-file-input__droppable--over";
      if (event.dataTransfer.items.length) {
        classToAdd = "tna-file-input__droppable--over-multiple";
      }
      this.$droppableArea.classList.add(classToAdd);

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
    const { files } = this.$input;
    if (this.acceptMutltipleFiles) {
      if (files.length) {
        let fileText = "file";
        /* eslint-disable-next-line no-magic-numbers */
        if (files.length > 1) {
          fileText += "s";
        }
        const textContent = `${files.length} ${fileText} selected`;
        this.$pseudoSelectFileText.textContent = textContent;
      } else {
        this.$pseudoSelectFileText.textContent = `No files selected`;
      }
    } else {
      this.$pseudoSelectFileText.textContent =
        /* eslint-disable-next-line no-magic-numbers */
        files[0]?.name || `No file selected`;
    }
    if (files.length) {
      this.$droppableArea.classList.remove("tna-file-input__droppable--empty");
    } else {
      this.$droppableArea.classList.add("tna-file-input__droppable--empty");
    }
    this.hideDropTarget(false);
  }
}
