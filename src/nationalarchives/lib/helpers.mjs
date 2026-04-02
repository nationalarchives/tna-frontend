import uuidv4 from "./uuid.mjs";

export const iso8601ToPrettyDatetime = (dateStr) => {
  const datetime = dateStr;

  if (!datetime) {
    throw new Error("No datetime provided");
  }
  const isDateTime =
    /^\d{4}(-\d{2}){2}(T| )\d{2}(:\d{2}){1,2}(\.\d+)?(Z|((\+|-)\d{2}:\d{2}))?$/.test(
      datetime,
    );
  const isDate = /^\d{4}(-\d{2}){2}$/.test(datetime);
  if (!isDateTime && !isDate) {
    throw new Error("Invalid datetime provided");
  }

  const date = new Date(datetime);
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error("Invalid datetime provided");
  }

  const dayString = date.toLocaleDateString("en-GB", {
    weekday: "long",
  });

  const dateString = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (isDateTime && (date.getHours() || date.getMinutes())) {
    let timeString = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    if (date.getSeconds()) {
      timeString = date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    }
    return `${dayString} ${dateString}, ${timeString}`;
  } else {
    return `${dayString} ${dateString}`;
  }
};

/*
 * ==========================================
 * Transform any <time> element into a pretty
 * and human readable format that is based on
 * the valid ISO 8601 datetime attribute. The
 * replaced value will be localised according
 * to user's system settings, repurposing the
 * original text content as a title attribute
 * to allow users to see the value. A null or
 * invalid datetime format will result in the
 * element not being modified. If the updated
 * value is similar to the starting value for
 * the element text content, then the element
 * will not be updated to avoid redundancy.
 * ------------------------------------------
 * For example if the user's system has a UTC
 * timezone set then the element:
 *
 *   <time
 *     datetime="2026-03-05T13:48:00-05:00"
 *   >
 *     5 March 2026, 13:48 (UTC -5)
 *   </time>
 *
 * would become:
 *
 *   <time
 *     datetime="2026-03-05T13:48:00-05:00"
 *     title="5 March 2026, 13:48 (UTC -5)"
 *   >
 *     Thursday 5 March 2026, 09:48
 *   </time>
 * ==========================================
 */
export const updateTimeElement = ($el) => {
  const datetime = $el.getAttribute("datetime");

  try {
    const prettyDatetime = iso8601ToPrettyDatetime(datetime);
    if (!prettyDatetime.includes($el.textContent)) {
      $el.setAttribute("title", $el.textContent);
      $el.textContent = prettyDatetime;
    }
  } catch (e) {
    // Do nothing if the datetime is invalid or not provided
  }
};

export const checkTableForScroll = ($tableWrapper) => {
  const isUninitialised = !(
    $tableWrapper.dataset.tableScrollInitialised === "true"
  );
  const $caption = $tableWrapper.querySelector("caption");
  if (isUninitialised) {
    if (!$caption) {
      console.warn("Missing <caption> element on table", $tableWrapper);
    } else if (!$caption.id) {
      $caption.id = `table-caption-${uuidv4()}`;
    }
    $tableWrapper.dataset.tableScrollInitialised = "true";
  }
  if ($tableWrapper.scrollWidth > $tableWrapper.clientWidth) {
    $tableWrapper.setAttribute("tabindex", "0");
    $tableWrapper.setAttribute("role", "region");
    $tableWrapper.setAttribute("aria-labelledby", $caption?.id || "");
    $tableWrapper.classList.add("tna-table-wrapper--scroll");
  } else {
    $tableWrapper.removeAttribute("tabindex");
    $tableWrapper.removeAttribute("role");
    $tableWrapper.removeAttribute("aria-labelledby");
    $tableWrapper.classList.remove("tna-table-wrapper--scroll");
  }
};

export const initCodeBlock = ($codeBlock) => {
  if (
    navigator.clipboard &&
    $codeBlock.classList.contains("tna-code-block--copy")
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
    $codeBlock.prepend(copyButton);
    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(
          $codeBlock.querySelector("pre code").innerText,
        );
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
      copyButton.innerText = "Code copied";
    });
    copyButton.addEventListener("blur", () => {
      copyButton.innerText = "Copy code";
    });
  }
};
