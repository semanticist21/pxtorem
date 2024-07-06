let rootPx =
  typeof getComputedStyle !== "undefined"
    ? Number(
        getComputedStyle(document.documentElement).fontSize.replace("px", "")
      )
    : 16;

// event handler
// update rootPx when visibility change
// only in csr.
const handleWindowVisibilityChange = () => {
  if (!document || document.hidden || !getComputedStyle) return;

  rootPx = Number(
    getComputedStyle(document.documentElement).fontSize.replace("px", "")
  );
};

if (typeof window !== "undefined") {
  window.addEventListener("visibilitychange", handleWindowVisibilityChange);
}

/**
 * remove existing event listener
 */
export const removeHandleWindowVisibilityChange = () => {
  if (typeof window !== "undefined") {
    window.removeEventListener(
      "visibilitychange",
      handleWindowVisibilityChange
    );
  }
};

/**
 *
 * @param px [number] - pixel value
 * @returns [number] - rem value
 */
export const pxToRem = (px: number): number => {
  return px / rootPx;
};

/**
 *
 * @param px [number] - pixel value
 * @returns [string] - rem value with 'rem' unit
 */
export const pxToRemString = (px: number): string => {
  return `${pxToRem(px)}rem`;
};

/**
 *
 * @param rem [number] - rem value
 * @returns [number] - pixel value
 */
export const remToPx = (rem: number): number => {
  return rootPx * rem;
};

/**
 *
 * @param rem [number] - rem value
 * @returns [string] - rem value with 'rem' unit
 */
export const remToPxString = (rem: number): string => {
  return `${remToPx(rem)}px`;
};

/**
 * update base px by yourself if your app is using SSR.
 */
export const updateBasePx = () => {
  if (!getComputedStyle) {
    console.error(
      "getComputedStyle is undefined. Make sure you are running in a browser environment."
    );
  }

  rootPx = Number(
    getComputedStyle(document.documentElement).fontSize.replace("px", "")
  );
};

