export class FileInput {
  constructor($module) {
    this.$module = $module;
    this.$input = $module && $module.querySelector(".tna-file-input");

    if (!this.$module || !this.$input) {
      return;
    }

    // this.$input.addEventListener("cancel", () => {
    //   console.log("Cancelled.");
    // });
    // this.$input.addEventListener("change", () => {
    //   if (this.$input.files.length === 0) {
    //     console.log("No file selected");
    //   } else if (this.$input.files.length === 1) {
    //     console.log("File selected: ", this.$input.files[0]);
    //   } else {
    //     console.log("Files selected: ", this.$input.files);
    //   }
    // });
  }
}
