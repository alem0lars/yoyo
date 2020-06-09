const outlineButtons = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark",
].map((c) => `.btn-outline-${c}`);

const normalButtons = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark",
].map((c) => `.btn-${c}`);

export { normalButtons, outlineButtons };
