export const updateTimeElement = ($el) => {
  const datetime = $el.getAttribute("datetime");
  if (
    !datetime ||
    !/^\d{4}-\d{2}-\d{2}((T| )\d{2}:\d{2}:\d{2}(Z|((\+|-)\d{2}:\d{2}))?)?$/.test(
      datetime,
    )
  ) {
    return;
  }
  const date = new Date(datetime);
  if (!(date instanceof Date) || isNaN(date)) {
    return;
  }
  $el.setAttribute("title", $el.textContent);
  const dateString = date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeString = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  if (date.getHours() || date.getMinutes() || date.getSeconds()) {
    $el.textContent = `${dateString}, ${timeString}`;
  } else {
    $el.textContent = dateString;
  }
};
