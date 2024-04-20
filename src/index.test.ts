import { pxToRem } from ".";
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
