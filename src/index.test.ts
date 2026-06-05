import { afterEach, describe, expect, test } from "bun:test";
import { Window } from "happy-dom";

const originalDocument = globalThis.document;
const originalGetComputedStyle = globalThis.getComputedStyle;
const originalWindow = globalThis.window;

const installDom = (rootFontSize: string) => {
  const window = new Window();
  Object.defineProperty(window, "SyntaxError", {
    configurable: true,
    value: SyntaxError,
  });
  window.document.documentElement.style.fontSize = rootFontSize;

  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: window,
  });
  Object.defineProperty(globalThis, "document", {
    configurable: true,
    value: window.document,
  });
  Object.defineProperty(globalThis, "getComputedStyle", {
    configurable: true,
    value: window.getComputedStyle.bind(window),
  });
};

const restoreGlobal = <T>(key: keyof typeof globalThis, value: T) => {
  if (value === undefined) {
    Reflect.deleteProperty(globalThis, key);
    return;
  }

  Object.defineProperty(globalThis, key, {
    configurable: true,
    value,
  });
};

afterEach(() => {
  restoreGlobal("window", originalWindow);
  restoreGlobal("document", originalDocument);
  restoreGlobal("getComputedStyle", originalGetComputedStyle);
});

const importFresh = (name: string) => import(`./index.ts?${name}`);

describe("px/rem conversion", () => {
  test("uses the document root font size when updating the base px", async () => {
    installDom("20px");

    const { pxToRem, pxToRemString, remToPx, remToPxString, updateBasePx } =
      await importFresh("root-font-size");

    updateBasePx();

    expect(pxToRem(10)).toBe(0.5);
    expect(pxToRemString(10)).toBe("0.5rem");
    expect(remToPx(0.5)).toBe(10);
    expect(remToPxString(0.5)).toBe("10px");
  });

  test("refreshes the base px when the document becomes visible", async () => {
    installDom("16px");

    const { pxToRem, updateBasePx } = await importFresh("visibility-change");
    updateBasePx();
    expect(pxToRem(16)).toBe(1);

    document.documentElement.style.fontSize = "32px";
    document.dispatchEvent(new window.Event("visibilitychange"));

    expect(pxToRem(16)).toBe(0.5);
  });

  test("can remove the visibility change listener", async () => {
    installDom("16px");

    const { pxToRem, removeHandleWindowVisibilityChange, updateBasePx } =
      await importFresh("remove-listener");

    updateBasePx();
    removeHandleWindowVisibilityChange();

    document.documentElement.style.fontSize = "32px";
    document.dispatchEvent(new window.Event("visibilitychange"));

    expect(pxToRem(16)).toBe(1);
  });

  test("falls back to 16px when imported without browser globals", async () => {
    const proc = Bun.spawn({
      cmd: [
        process.execPath,
        "-e",
        "const mod = await import('./src/index.ts'); console.log(`${mod.pxToRem(16)} ${mod.remToPx(1)}`);",
      ],
      cwd: process.cwd(),
      stderr: "pipe",
      stdout: "pipe",
    });

    const [stdout, stderr, exitCode] = await Promise.all([
      new Response(proc.stdout).text(),
      new Response(proc.stderr).text(),
      proc.exited,
    ]);

    expect(stderr).toBe("");
    expect(exitCode).toBe(0);
    expect(stdout.trim()).toBe("1 16");
  });
});
