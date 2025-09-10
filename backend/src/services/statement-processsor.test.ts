import { DUPLICATE_STATEMENTS, INVALID_BALANCE_STATEMENTS, VALID_STATEMENTS } from "#mocks/validateStatements.js";
import { expect, test } from "vitest";

import { validateStatements } from "./statement-processor.js";

test("Asserts that duplicate statements are returned in in the 'duplicates' array", () => {
  const result = validateStatements(DUPLICATE_STATEMENTS);

  expect(result).toEqual({
    duplicate: DUPLICATE_STATEMENTS,
    incorrectBalance: [],
    valid: [],
  });
});

test("Asserts that statements with invalid balances are returned in the 'incorrectBalance' array", () => {
  const result = validateStatements(INVALID_BALANCE_STATEMENTS);
  expect(result).toEqual({
    duplicate: [],
    incorrectBalance: INVALID_BALANCE_STATEMENTS,
    valid: [],
  });
});

test("Asserts that valid statements are returned in the 'valid' array", () => {
  const result = validateStatements(VALID_STATEMENTS);
  expect(result).toEqual({
    duplicate: [],
    incorrectBalance: [],
    valid: VALID_STATEMENTS,
  });
});
