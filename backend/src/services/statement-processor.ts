import { Statement } from "#models/statement.js";

export const validateStatements = (statements: Statement[]) => {
  console.log("running", statements);
  const validatedStatements = new Map<number, Statement>();
  const duplicateStatements: Statement[] = [];
  const incorrectBalanceStatements: Statement[] = [];
  // Validate that all transactions have a unique reference
  for (const statement of statements) {
    // TODO: If 2 or more statements have the same reference, all of them should be marked as duplicate
    if (validatedStatements.has(statement.reference)) {
      duplicateStatements.push(statement);
      continue;
    }
    // Round to two decimal places, because calculation does not have infinite precision
    const verifiedEndBalance = Math.round((statement.startBalance + statement.mutation) * 100) / 100;
    if (statement.endBalance !== verifiedEndBalance) {
      console.info(`endBalance: ${statement.endBalance.toString()} does not match calculated endBalance: ${verifiedEndBalance.toString()}`);
      incorrectBalanceStatements.push(statement);
    }

    // Statement has a unique reference and endBalance matches calculated value
    validatedStatements.set(statement.reference, statement);
  }

  return {
    duplicate: duplicateStatements,
    incorrectBalance: incorrectBalanceStatements,
    valid: Array.from(validatedStatements.values()),
  };
};
