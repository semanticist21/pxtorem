let rootPx = getComputedStyle(document.documentElement).fontSize || "16px";

// event handler
const handleWindowVisibilityChange = () => {
  if (!document || document.hidden || !getComputedStyle) return;

  if (getComputedStyle) {
    rootPx = getComputedStyle(document.documentElement).fontSize || "16px";
  }
};

if (typeof window !== "undefined") {
  window.addEventListener("visibilitychange", handleWindowVisibilityChange);
}

export const pxToRem = (px: number): number => {
  return px / parseFloat(rootPx.replace("px", ""));
};

export const remToPx = (rem: number): number => {
  return parseFloat(rootPx) * rem;
};

export const updateBasePx = () => {
  if (!getComputedStyle) {
    console.error(
      "getComputedStyle is undefined. Make sure you are running in a browser environment."
    );
  }

  rootPx = getComputedStyle(document.documentElement).fontSize || "16px";
};
