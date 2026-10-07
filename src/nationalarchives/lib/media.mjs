export const breakpoints = () => ({
  tiny:
    getComputedStyle(document.documentElement).getPropertyValue(
      "--media-breakpoint-tiny",
    ) || "480px",
  small:
    getComputedStyle(document.documentElement).getPropertyValue(
      "--media-breakpoint-small",
    ) || "768px",
  medium:
    getComputedStyle(document.documentElement).getPropertyValue(
      "--media-breakpoint-medium",
    ) || "1024px",
});
