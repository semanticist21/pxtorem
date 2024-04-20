let rootPx = getComputedStyle(document.documentElement).fontSize || "16px";

if (typeof window !== "undefined") {
  window.addEventListener("visibilitychange", () => {
    if (document.hidden) return;

    rootPx = getComputedStyle(document.documentElement).fontSize || "16px";
  });
}

export const pxToRem = (px: number): number => {
  return parseFloat(rootPx.replace("px", "")) / px;
};

export const remToPx = (rem: number): number => {
  return parseFloat(rootPx) * rem;
};

export const updateBasePx = () => {
  rootPx = getComputedStyle(document.documentElement).fontSize || "16px";
};
