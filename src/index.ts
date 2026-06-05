const DEFAULT_ROOT_PX = 16;

const getRootPx = (): number => {
  if (
    typeof document === "undefined" ||
    typeof getComputedStyle === "undefined"
  ) {
    return DEFAULT_ROOT_PX;
  }

  const fontSize = getComputedStyle(document.documentElement).fontSize;
  const rootPx = Number.parseFloat(fontSize);

  return Number.isFinite(rootPx) && rootPx > 0 ? rootPx : DEFAULT_ROOT_PX;
};

let rootPx = getRootPx();

// event handler
// update rootPx when visibility change
// only in csr.
const handleWindowVisibilityChange = () => {
  if (
    typeof document === "undefined" ||
    typeof getComputedStyle === "undefined" ||
    document.hidden
  ) {
    return;
  }

  rootPx = getRootPx();
};

if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", handleWindowVisibilityChange);
}

/**
 * remove existing event listener
 */
export const removeHandleWindowVisibilityChange = () => {
  if (typeof document !== "undefined") {
    document.removeEventListener(
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
  rootPx = getRootPx();
};
