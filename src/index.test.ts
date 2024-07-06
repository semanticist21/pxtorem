import { pxToRem, remToPx } from ".";
import { test, expect } from "@jest/globals";

test("pxToRem", () => {
  // Arrange
  const px = 8;
  const expected = 0.5;

  // Act
  const result = pxToRem(px);

  // Assert
  expect(result).toBe(expected);
});

test("remToPx", () => {
  // Arrange
  const rem = 0.5;
  const expected = 8;

  // Act
  const result = remToPx(rem);

  // Assert
  expect(result).toBe(expected);
});

test("check document", () => {
  expect(document).toBeDefined();
});

test("check window", () => {
  expect(window).toBeDefined();
});
